import { MongoClient, ObjectId } from "mongodb";

interface InventoryItem {
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

interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: "admin" | "staff";
  createdAt: Date;
  updatedAt: Date;
}

async function seedDatabase() {
  console.log("🌱 Starting database seeding...");

  const client = new MongoClient("mongodb://localhost:27017/pizza_inventory");

  try {
    await client.connect();
    const db = client.db();

    console.log("✅ Connected to database");

    // Get existing collections
    const existingCollections = await db.listCollections().toArray();
    const existingCollectionNames = existingCollections.map((col) => col.name);

    // Create collections if they don't exist
    const requiredCollections = [
      "inventory_items",
      "inventory_adjustments",
      "change_logs",
      "audit_trails",
      "users",
    ];

    for (const collectionName of requiredCollections) {
      if (!existingCollectionNames.includes(collectionName)) {
        await db.createCollection(collectionName);
        console.log(`✅ Created ${collectionName} collection`);
      } else {
        console.log(`✅ ${collectionName} collection already exists`);
      }
    }

    // Sample pizza inventory data
    const inventoryItems: InventoryItem[] = [
      {
        name: "Pizza Flour",
        category: "Dough Ingredients",
        unit: "kg",
        quantity: 25.5,
        reorderThreshold: 10,
        costPrice: 1.2,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: "system",
      },
      {
        name: "Fresh Yeast",
        category: "Dough Ingredients",
        unit: "kg",
        quantity: 2.3,
        reorderThreshold: 1,
        costPrice: 4.5,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: "system",
      },
      {
        name: "Mozzarella Cheese",
        category: "Cheeses",
        unit: "kg",
        quantity: 15.8,
        reorderThreshold: 8,
        costPrice: 12.5,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: "system",
      },
      {
        name: "Parmesan Cheese",
        category: "Cheeses",
        unit: "kg",
        quantity: 4.2,
        reorderThreshold: 2,
        costPrice: 18.75,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: "system",
      },
      {
        name: "Pepperoni",
        category: "Meats",
        unit: "kg",
        quantity: 8.5,
        reorderThreshold: 4,
        costPrice: 15.25,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: "system",
      },
      {
        name: "Italian Sausage",
        category: "Meats",
        unit: "kg",
        quantity: 6.3,
        reorderThreshold: 3,
        costPrice: 14.8,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: "system",
      },
      {
        name: "Tomato Sauce",
        category: "Sauces",
        unit: "liters",
        quantity: 12.5,
        reorderThreshold: 6,
        costPrice: 3.25,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: "system",
      },
      {
        name: "Fresh Tomatoes",
        category: "Vegetables",
        unit: "kg",
        quantity: 9.8,
        reorderThreshold: 5,
        costPrice: 2.8,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: "system",
      },
      {
        name: "Mushrooms",
        category: "Vegetables",
        unit: "kg",
        quantity: 3.5,
        reorderThreshold: 2,
        costPrice: 6.4,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: "system",
      },
      {
        name: "Black Olives",
        category: "Vegetables",
        unit: "kg",
        quantity: 0.8,
        reorderThreshold: 2,
        costPrice: 8.9,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: "system",
      },
    ];

    // Demo users (in production, use proper password hashing!)
    const demoUsers: User[] = [
      {
        email: "admin@pizzashop.com",
        password: "admin123",
        firstName: "Admin",
        lastName: "User",
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "staff@pizzashop.com",
        password: "staff123",
        firstName: "Staff",
        lastName: "User",
        role: "staff",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "manager@pizzashop.com",
        password: "manager123",
        firstName: "Manager",
        lastName: "User",
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // Clear existing data
    console.log("🧹 Clearing existing data...");
    await db.collection("inventory_items").deleteMany({});
    await db.collection("inventory_adjustments").deleteMany({});
    await db.collection("change_logs").deleteMany({});
    await db.collection("audit_trails").deleteMany({});
    await db.collection("users").deleteMany({});

    // Insert inventory items
    console.log("📦 Inserting inventory items...");
    const inventoryResult = await db
      .collection("inventory_items")
      .insertMany(inventoryItems);
    console.log(`✅ Inserted ${inventoryResult.insertedCount} inventory items`);

    // Insert demo users
    console.log("👥 Inserting demo users...");
    const usersResult = await db.collection("users").insertMany(demoUsers);
    console.log(`✅ Inserted ${usersResult.insertedCount} demo users`);

    // Create sample adjustments and audit logs
    console.log("📊 Creating sample adjustments and audit logs...");
    const insertedIds = Object.values(inventoryResult.insertedIds);

    // Sample adjustments
    const adjustments = [
      {
        _id: new ObjectId(),
        itemId: insertedIds[0],
        itemName: "Pizza Flour",
        quantityDelta: 5,
        previousQuantity: 20.5,
        newQuantity: 25.5,
        reason: "Weekly restock delivery",
        adjustedBy: "system",
        adjustedByName: "System",
        adjustedAt: new Date("2024-01-20T10:30:00Z"),
      },
      {
        _id: new ObjectId(),
        itemId: insertedIds[2],
        itemName: "Mozzarella Cheese",
        quantityDelta: -2.5,
        previousQuantity: 18.3,
        newQuantity: 15.8,
        reason: "Daily pizza production",
        adjustedBy: "system",
        adjustedByName: "System",
        adjustedAt: new Date("2024-01-23T08:15:00Z"),
      },
      {
        _id: new ObjectId(),
        itemId: insertedIds[9],
        itemName: "Black Olives",
        quantityDelta: -0.5,
        previousQuantity: 1.3,
        newQuantity: 0.8,
        reason: "Themed pizza night",
        adjustedBy: "system",
        adjustedByName: "System",
        adjustedAt: new Date("2024-01-22T18:45:00Z"),
      },
    ];

    await db.collection("inventory_adjustments").insertMany(adjustments);
    console.log(`✅ Inserted ${adjustments.length} sample adjustments`);

    // Sample audit logs
    const changeLogs = [
      {
        _id: new ObjectId(),
        itemId: insertedIds[0],
        itemName: "Pizza Flour",
        action: "CREATE",
        changedBy: "system",
        changedByName: "System",
        changedAt: new Date("2024-01-15T09:00:00Z"),
        description: "Created new inventory item: Pizza Flour",
      },
      {
        _id: new ObjectId(),
        itemId: insertedIds[0],
        itemName: "Pizza Flour",
        action: "ADJUST",
        fieldChanged: "quantity",
        oldValue: 20.5,
        newValue: 25.5,
        changedBy: "system",
        changedByName: "System",
        changedAt: new Date("2024-01-20T10:30:00Z"),
        description: "Quantity adjusted: +5 (Reason: Weekly restock delivery)",
      },
      {
        _id: new ObjectId(),
        itemId: insertedIds[2],
        itemName: "Mozzarella Cheese",
        action: "CREATE",
        changedBy: "system",
        changedByName: "System",
        changedAt: new Date("2024-01-15T09:00:00Z"),
        description: "Created new inventory item: Mozzarella Cheese",
      },
      {
        _id: new ObjectId(),
        itemId: insertedIds[2],
        itemName: "Mozzarella Cheese",
        action: "ADJUST",
        fieldChanged: "quantity",
        oldValue: 18.3,
        newValue: 15.8,
        changedBy: "system",
        changedByName: "System",
        changedAt: new Date("2024-01-23T08:15:00Z"),
        description: "Quantity adjusted: -2.5 (Reason: Daily pizza production)",
      },
    ];

    await db.collection("change_logs").insertMany(changeLogs);
    console.log(`✅ Inserted ${changeLogs.length} sample change logs`);

    // Create indexes for better performance
    console.log("⚡ Creating database indexes...");

    // Inventory items indexes
    await db
      .collection("inventory_items")
      .createIndex({ name: 1 }, { unique: true });
    await db.collection("inventory_items").createIndex({ category: 1 });
    await db.collection("inventory_items").createIndex({ updatedAt: -1 });

    // Adjustments indexes
    await db.collection("inventory_adjustments").createIndex({ itemId: 1 });
    await db
      .collection("inventory_adjustments")
      .createIndex({ adjustedAt: -1 });
    await db.collection("inventory_adjustments").createIndex({ adjustedBy: 1 });

    // Audit log indexes
    await db
      .collection("change_logs")
      .createIndex({ itemId: 1, changedAt: -1 });
    await db.collection("change_logs").createIndex({ changedAt: -1 });
    await db.collection("change_logs").createIndex({ action: 1 });
    await db.collection("change_logs").createIndex({ changedBy: 1 });

    // Audit trail indexes
    await db
      .collection("audit_trails")
      .createIndex({ itemId: 1, performedAt: -1 });
    await db.collection("audit_trails").createIndex({ performedAt: -1 });
    await db.collection("audit_trails").createIndex({ action: 1 });
    await db.collection("audit_trails").createIndex({ performedBy: 1 });

    // Users indexes
    await db.collection("users").createIndex({ email: 1 }, { unique: true });
    await db.collection("users").createIndex({ role: 1 });

    console.log("✅ Database indexes created");

    // Verify the data
    const itemCount = await db.collection("inventory_items").countDocuments();
    const adjustmentCount = await db
      .collection("inventory_adjustments")
      .countDocuments();
    const changeLogCount = await db.collection("change_logs").countDocuments();
    const userCount = await db.collection("users").countDocuments();

    console.log("\n📊 Seeding completed successfully!");
    console.log(`   Inventory Items: ${itemCount}`);
    console.log(`   Adjustments: ${adjustmentCount}`);
    console.log(`   Change Logs: ${changeLogCount}`);
    console.log(`   Users: ${userCount}`);

    // Show low stock items
    const lowStockItems = await db
      .collection("inventory_items")
      .find({ $expr: { $lte: ["$quantity", "$reorderThreshold"] } })
      .toArray();

    if (lowStockItems.length > 0) {
      console.log("\n⚠️  Low Stock Alerts:");
      lowStockItems.forEach((item) => {
        console.log(
          `   - ${item.name}: ${item.quantity} ${item.unit} (reorder at ${item.reorderThreshold})`
        );
      });
    }

    // Show demo login credentials
    console.log("\n🔐 Demo Login Credentials:");
    demoUsers.forEach((user) => {
      console.log(`   - ${user.email} / ${user.password} (${user.role})`);
    });
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    await client.close();
  }
}

// Run if called directly
if (require.main === module) {
  seedDatabase();
}

export { seedDatabase };
