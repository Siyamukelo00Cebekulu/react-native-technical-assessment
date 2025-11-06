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
  deleted?: boolean;
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

export interface ChangeLog {
  _id?: ObjectId;
  itemId: ObjectId;
  itemName: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'ADJUST';
  fieldChanged?: string;
  oldValue?: any;
  newValue?: any;
  changedBy: string;
  changedByName: string;
  changedAt: Date;
  description: string;
}

export interface User {
  _id?: ObjectId;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'staff';
  createdAt: Date;
  updatedAt: Date;
}

export interface AuditTrail {
  _id?: ObjectId;
  itemId: ObjectId;
  itemName: string;
  action: string;
  changes: {
    field: string;
    oldValue: any;
    newValue: any;
  }[];
  performedBy: string;
  performedByName: string;
  performedAt: Date;
  ipAddress?: string;
  userAgent?: string;
}


export interface ChangeLog {
  _id?: ObjectId;
  itemId: ObjectId;
  itemName: string;
  action: "CREATE" | "UPDATE" | "DELETE" | "ADJUST";
  fieldChanged?: string;
  oldValue?: any;
  newValue?: any;
  changedBy: string;
  changedByName: string;
  changedAt: Date;
  description: string;
}
