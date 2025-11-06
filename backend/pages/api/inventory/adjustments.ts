import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import { connectToDatabase } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";
import { AuditService } from "../../../lib/auditService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { db, client } = await connectToDatabase(); // Get both db and client

  try {
    switch (req.method) {
      case "GET":
        const { itemId, limit = "50" } = req.query;

        let query: any = {};
        if (itemId) {
          query.itemId = new ObjectId(itemId as string);
        }

        const adjustments = await db
          .collection("inventory_adjustments")
          .find(query)
          .sort({ adjustedAt: -1 })
          .limit(parseInt(limit as string))
          .toArray();

        return res.status(200).json({ adjustments });

      case "POST":
        const adjustmentData = {
          ...req.body,
          _id: new ObjectId(),
          adjustedAt: new Date(),
          adjustedBy: userId,
          adjustedByName: "User", // You can fetch user details from Clerk if needed
        };

        // Get current item state
        const currentItem = await db.collection("inventory_items").findOne({
          _id: new ObjectId(adjustmentData.itemId as string),
        });

        if (!currentItem) {
          return res.status(404).json({ error: "Item not found" });
        }

        // Start a transaction to update both collections
        const session = client.startSession(); // Use client from connection

        try {
          await session.withTransaction(async () => {
            // Insert adjustment
            await db
              .collection("inventory_adjustments")
              .insertOne(adjustmentData, { session });

            // Update item quantity
            const updateResult = await db
              .collection("inventory_items")
              .updateOne(
                { _id: new ObjectId(adjustmentData.itemId as string) },
                {
                  $set: {
                    quantity: adjustmentData.newQuantity,
                    updatedAt: new Date(),
                  },
                },
                { session }
              );

            if (updateResult.matchedCount === 0) {
              throw new Error("Item not found");
            }
          });
        } finally {
          await session.endSession();
        }
        // Log quantity adjustment
        await AuditService.logChange({
          itemId: currentItem._id,
          itemName: currentItem.name,
          action: "ADJUST",
          fieldChanged: "quantity",
          oldValue: currentItem.quantity,
          newValue: adjustmentData.newQuantity,
          changedBy: userId,
          changedByName: "User",
          description: `Quantity adjusted: ${
            adjustmentData.quantityDelta > 0 ? "+" : ""
          }${adjustmentData.quantityDelta} (Reason: ${adjustmentData.reason})`,
        });

        await AuditService.logAuditTrail({
          itemId: currentItem._id,
          itemName: currentItem.name,
          action: "QUANTITY_ADJUSTMENT",
          changes: [
            {
              field: "quantity",
              oldValue: currentItem.quantity,
              newValue: adjustmentData.newQuantity,
            },
          ],
          performedBy: userId,
          performedByName: "User",
        });

        return res.status(201).json({ adjustment: adjustmentData });

      default:
        return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
