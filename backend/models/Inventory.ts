// backend/models/Inventory.ts
import { ObjectId } from "mongodb";
import { z } from "zod";

export const InventoryItemSchema = z.object({
  _id: z.string().or(z.instanceof(ObjectId)),
  name: z.string().min(1, "Name is required").max(100),
  category: z.string().min(1, "Category is required").max(50),
  unit: z.string().min(1, "Unit is required").max(20),
  quantity: z.number().min(0, "Quantity cannot be negative"),
  reorderThreshold: z.number().min(0, "Reorder threshold cannot be negative"),
  costPrice: z.number().min(0, "Cost price cannot be negative"),
  updatedAt: z.date(),
  createdAt: z.date(),
  createdBy: z.string(),
  lastSynced: z.date().optional(),
  deleted: z.boolean().default(false),
});

export const InventoryAdjustmentSchema = z.object({
  _id: z.string().or(z.instanceof(ObjectId)),
  itemId: z.string().or(z.instanceof(ObjectId)),
  itemName: z.string(),
  quantityDelta: z.number(),
  previousQuantity: z.number(),
  newQuantity: z.number(),
  reason: z.string().min(1, "Reason is required").max(200),
  adjustedBy: z.string(),
  adjustedByName: z.string(),
  adjustedAt: z.date(),
  lastSynced: z.date().optional(),
});

export type InventoryItem = z.infer<typeof InventoryItemSchema>;
export type InventoryAdjustment = z.infer<typeof InventoryAdjustmentSchema>;
