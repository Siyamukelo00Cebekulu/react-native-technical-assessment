import { ObjectId } from "mongodb";

export interface ApiStatus {
  status: string;
  database: string;
  collections?: {
    inventory_items: number;
    inventory_adjustments: number;
  };
 
  timestamp?: string;
}
export interface ApiEndpoint {
  method: string;
  path: string;
  description: string;
  requiresAuth: boolean;
}
export interface InventoryItem {
  _id?: ObjectId;
  name: string;
  category: string;
  unit: string;
  quantity: number;
  reorderThreshold: number;
  costPrice: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface InventoryAdjustment {
  _id?: ObjectId;
  itemId: ObjectId;
  itemName: string;
  quantityDelta: number;
  previousQuantity: number;
  newQuantity: number;
  reason: string;
  adjustedBy: string;
  adjustedByName: string;
  adjustedAt: Date;
}

export interface User {
  _id?: ObjectId;
  clerkId: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "admin" | "staff";
  createdAt: Date;
  updatedAt: Date;
}

