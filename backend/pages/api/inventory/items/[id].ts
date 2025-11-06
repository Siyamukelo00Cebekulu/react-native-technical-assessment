// pages/api/inventory/items/[id].ts
import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import { connectToDatabase } from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";
import { AuditService } from "../../../../lib/auditService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { id } = req.query;
  const { db } = await connectToDatabase();

  try {
    switch (req.method) {
      case "GET":
        const item = await db.collection("inventory_items").findOne({
          _id: new ObjectId(id as string),
        });

        if (!item) {
          return res.status(404).json({ error: "Item not found" });
        }

        return res.status(200).json({ item });

      case "PUT":
        const existingItem = await db.collection("inventory_items").findOne({
          _id: new ObjectId(id as string),
        });

        if (!existingItem) {
          return res.status(404).json({ error: "Item not found" });
        }

        const updateData = {
          ...req.body,
          updatedAt: new Date(),
        };

        // Track changes for audit
        const changes = [];
        for (const [key, newValue] of Object.entries(req.body)) {
          const oldValue = existingItem[key];
          if (oldValue !== newValue && key !== "updatedAt") {
            changes.push({
              field: key,
              oldValue,
              newValue,
            });

            // Log individual field changes
            await AuditService.logChange({
              itemId: existingItem._id,
              itemName: existingItem.name,
              action: "UPDATE",
              fieldChanged: key,
              oldValue,
              newValue,
              changedBy: userId,
              changedByName: "User",
              description: `Updated ${key} from ${oldValue} to ${newValue}`,
            });
          }
        }

        const result = await db
          .collection("inventory_items")
          .updateOne({ _id: new ObjectId(id as string) }, { $set: updateData });

        if (result.matchedCount === 0) {
          return res.status(404).json({ error: "Item not found" });
        }

        // Log comprehensive audit trail
        if (changes.length > 0) {
          await AuditService.logAuditTrail({
            itemId: existingItem._id,
            itemName: existingItem.name,
            action: "UPDATE_ITEM",
            changes,
            performedBy: userId,
            performedByName: "User",
          });
        }

        const updatedItem = await db.collection("inventory_items").findOne({
          _id: new ObjectId(id as string),
        });

        return res.status(200).json({ item: updatedItem });

      case "DELETE":
        const itemToDelete = await db.collection("inventory_items").findOne({
          _id: new ObjectId(id as string),
        });

        if (!itemToDelete) {
          return res.status(404).json({ error: "Item not found" });
        }

        // Soft delete
        const deleteResult = await db
          .collection("inventory_items")
          .updateOne(
            { _id: new ObjectId(id as string) },
            { $set: { deleted: true, updatedAt: new Date() } }
          );

        if (deleteResult.matchedCount === 0) {
          return res.status(404).json({ error: "Item not found" });
        }

        // Log deletion
        await AuditService.logChange({
          itemId: itemToDelete._id,
          itemName: itemToDelete.name,
          action: "DELETE",
          changedBy: userId,
          changedByName: "User",
          description: `Deleted inventory item: ${itemToDelete.name}`,
        });

        await AuditService.logAuditTrail({
          itemId: itemToDelete._id,
          itemName: itemToDelete.name,
          action: "DELETE_ITEM",
          changes: [
            {
              field: "deleted",
              oldValue: false,
              newValue: true,
            },
          ],
          performedBy: userId,
          performedByName: "User",
        });

        return res.status(200).json({ message: "Item deleted successfully" });

      default:
        return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
