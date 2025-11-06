// lib/auditService.ts
import { ObjectId } from "mongodb";
import { connectToDatabase } from "./mongodb";
import { ChangeLog, AuditTrail } from "../types";

export class AuditService {
  static async logChange(changeData: {
    itemId: ObjectId;
    itemName: string;
    action: "CREATE" | "UPDATE" | "DELETE" | "ADJUST";
    fieldChanged?: string;
    oldValue?: any;
    newValue?: any;
    changedBy: string;
    changedByName: string;
    description: string;
  }) {
    const { db } = await connectToDatabase();

    const changeLog: Omit<ChangeLog, "_id"> = {
      ...changeData,
      changedAt: new Date(),
    };

    await db.collection("change_logs").insertOne(changeLog);
    console.log(
      `📝 Audit log created: ${changeData.action} on ${changeData.itemName}`
    );
  }

  static async logAuditTrail(auditData: {
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
    ipAddress?: string;
    userAgent?: string;
  }) {
    const { db } = await connectToDatabase();

    const auditTrail: Omit<AuditTrail, "_id"> = {
      ...auditData,
      performedAt: new Date(),
    };

    await db.collection("audit_trails").insertOne(auditTrail);
  }

  static async getItemChangeLog(itemId: ObjectId, limit: number = 50) {
    const { db } = await connectToDatabase();

    return await db
      .collection("change_logs")
      .find({ itemId })
      .sort({ changedAt: -1 })
      .limit(limit)
      .toArray();
  }

  static async getRecentActivity(limit: number = 100) {
    const { db } = await connectToDatabase();

    return await db
      .collection("change_logs")
      .find({})
      .sort({ changedAt: -1 })
      .limit(limit)
      .toArray();
  }

  static async getAuditTrail(itemId?: ObjectId, limit: number = 50) {
    const { db } = await connectToDatabase();

    const query = itemId ? { itemId } : {};

    return await db
      .collection("audit_trails")
      .find(query)
      .sort({ performedAt: -1 })
      .limit(limit)
      .toArray();
  }
}
