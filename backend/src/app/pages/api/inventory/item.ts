import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";

import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../../../lib/mongodb";
import { InventoryItemSchema } from "../../../../../models/Inventory";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { db } = await connectToDatabase();

  try {
    switch (req.method) {
      case "GET":
        // Get all inventory items
        const items = await db
          .collection("inventory_items")
          .find({ deleted: { $ne: true } })
          .sort({ name: 1 })
          .toArray();

        return res.status(200).json({ items });

      case "POST":
        // Parse the request body to ensure numbers are converted
        const body = {
          ...req.body,
          quantity: parseFloat(req.body.quantity),
          reorderThreshold: parseFloat(req.body.reorderThreshold),
          costPrice: parseFloat(req.body.costPrice),
        };

        // Validate the input data
        const validationResult = InventoryItemSchema.safeParse(body);

        if (!validationResult.success) {
          return res.status(400).json({
            error: "Validation failed",
            details: validationResult.error.issues,
          });
        }

        // Create the new item with additional fields
        const newItem = {
          ...validationResult.data,
          _id: new ObjectId(), // Generate ID here
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: userId,
          deleted: false,
        };

        const result = await db
          .collection("inventory_items")
          .insertOne(newItem);

        return res.status(201).json({
          item: { ...newItem, _id: result.insertedId },
        });

      default:
        return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
