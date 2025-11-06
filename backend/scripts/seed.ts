// backend/scripts/seed.ts
import { connectToDatabase } from "../lib/mongodb";
import { ObjectId } from "mongodb";

// Sample pizza shop inventory data
const sampleUsers = [
  {
    _id: new ObjectId(),
    clerkId: "user_2abc123def456",
    email: "manager@pizzashop.com",
    firstName: "Maria",
    lastName: "Rossi",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId(),
    clerkId: "user_2xyz789uvw012",
    email: "chef@pizzashop.com",
    firstName: "Luca",
    lastName: "Bianchi",
    role: "staff",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId(),
    clerkId: "user_3xdz759dfr623",
    email: "admin@pizzashop.com",
    password: "admin123", // In production, use proper password hashing!
    firstName: "Admin",
    lastName: "User",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId(),
    clerkId: "user_2hgr727uvt010", // In production, use proper password hashing!
    email: "staff@pizzashop.com",
    password: "staff123",
    firstName: "Staff",
    lastName: "User",
    role: "staff",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const sampleInventoryItems = [
  // Dough & Base Ingredients
  {
    _id: new ObjectId(),
    name: "Pizza Flour",
    category: "Dough Ingredients",
    unit: "kg",
    quantity: 25.5,
    reorderThreshold: 10,
    costPrice: 1.2,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
    createdBy: "user_2abc123def456",
    deleted: false,
  },
  {
    _id: new ObjectId(),
    name: "Fresh Yeast",
    category: "Dough Ingredients",
    unit: "kg",
    quantity: 2.3,
    reorderThreshold: 1,
    costPrice: 4.5,
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-22"),
    createdBy: "user_2abc123def456",
    deleted: false,
  },
  {
    _id: new ObjectId(),
    name: "Olive Oil",
    category: "Dough Ingredients",
    unit: "liters",
    quantity: 8.2,
    reorderThreshold: 5,
    costPrice: 8.75,
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-21"),
    createdBy: "user_2abc123def456",
    deleted: false,
  },

  // Cheeses
  {
    _id: new ObjectId(),
    name: "Mozzarella Cheese",
    category: "Cheeses",
    unit: "kg",
    quantity: 15.8,
    reorderThreshold: 8,
    costPrice: 12.5,
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-23"),
    createdBy: "user_2abc123def456",
    deleted: false,
  },
  {
    _id: new ObjectId(),
    name: "Parmesan Cheese",
    category: "Cheeses",
    unit: "kg",
    quantity: 4.2,
    reorderThreshold: 2,
    costPrice: 18.75,
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-22"),
    createdBy: "user_2abc123def456",
    deleted: false,
  },

  // Meats
  {
    _id: new ObjectId(),
    name: "Pepperoni",
    category: "Meats",
    unit: "kg",
    quantity: 8.5,
    reorderThreshold: 4,
    costPrice: 15.25,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-23"),
    createdBy: "user_2abc123def456",
    deleted: false,
  },
  {
    _id: new ObjectId(),
    name: "Italian Sausage",
    category: "Meats",
    unit: "kg",
    quantity: 6.3,
    reorderThreshold: 3,
    costPrice: 14.8,
    createdAt: new Date("2024-01-19"),
    updatedAt: new Date("2024-01-22"),
    createdBy: "user_2abc123def456",
    deleted: false,
  },
  {
    _id: new ObjectId(),
    name: "Ham",
    category: "Meats",
    unit: "kg",
    quantity: 5.1,
    reorderThreshold: 3,
    costPrice: 12.9,
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-21"),
    createdBy: "user_2abc123def456",
    deleted: false,
  },

  // Vegetables
  {
    _id: new ObjectId(),
    name: "Tomato Sauce",
    category: "Vegetables & Sauces",
    unit: "liters",
    quantity: 12.5,
    reorderThreshold: 6,
    costPrice: 3.25,
    createdAt: new Date("2024-01-14"),
    updatedAt: new Date("2024-01-23"),
    createdBy: "user_2abc123def456",
    deleted: false,
  },
  {
    _id: new ObjectId(),
    name: "Fresh Tomatoes",
    category: "Vegetables & Sauces",
    unit: "kg",
    quantity: 9.8,
    reorderThreshold: 5,
    costPrice: 2.8,
    createdAt: new Date("2024-01-22"),
    updatedAt: new Date("2024-01-23"),
    createdBy: "user_2abc123def456",
    deleted: false,
  },
  {
    _id: new ObjectId(),
    name: "Mushrooms",
    category: "Vegetables & Sauces",
    unit: "kg",
    quantity: 3.5,
    reorderThreshold: 2,
    costPrice: 6.4,
    createdAt: new Date("2024-01-21"),
    updatedAt: new Date("2024-01-23"),
    createdBy: "user_2abc123def456",
    deleted: false,
  },
  {
    _id: new ObjectId(),
    name: "Bell Peppers",
    category: "Vegetables & Sauces",
    unit: "kg",
    quantity: 4.2,
    reorderThreshold: 2,
    costPrice: 4.2,
    createdAt: new Date("2024-01-21"),
    updatedAt: new Date("2024-01-23"),
    createdBy: "user_2abc123def456",
    deleted: false,
  },
  {
    _id: new ObjectId(),
    name: "Onions",
    category: "Vegetables & Sauces",
    unit: "kg",
    quantity: 7.1,
    reorderThreshold: 3,
    costPrice: 1.8,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-22"),
    createdBy: "user_2abc123def456",
    deleted: false,
  },

  // Low stock items (for testing alerts)
  {
    _id: new ObjectId(),
    name: "Black Olives",
    category: "Vegetables & Sauces",
    unit: "kg",
    quantity: 0.8,
    reorderThreshold: 2,
    costPrice: 8.9,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-23"),
    createdBy: "user_2abc123def456",
    deleted: false,
  },
  {
    _id: new ObjectId(),
    name: "Anchovies",
    category: "Meats",
    unit: "kg",
    quantity: 0.5,
    reorderThreshold: 1,
    costPrice: 22.5,
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-23"),
    createdBy: "user_2abc123def456",
    deleted: false,
  },
];

const sampleAdjustments = [
  {
    _id: new ObjectId(),
    itemId: sampleInventoryItems[0]._id, // Pizza Flour
    itemName: "Pizza Flour",
    quantityDelta: 5,
    previousQuantity: 20.5,
    newQuantity: 25.5,
    reason: "Weekly restock delivery",
    adjustedBy: "user_2abc123def456",
    adjustedByName: "Maria Rossi",
    adjustedAt: new Date("2024-01-20T10:30:00Z"),
  },
  {
    _id: new ObjectId(),
    itemId: sampleInventoryItems[3]._id, // Mozzarella
    itemName: "Mozzarella Cheese",
    quantityDelta: -2.5,
    previousQuantity: 18.3,
    newQuantity: 15.8,
    reason: "Used for daily pizza production",
    adjustedBy: "user_2xyz789uvw012",
    adjustedByName: "Luca Bianchi",
    adjustedAt: new Date("2024-01-23T08:15:00Z"),
  },
  {
    _id: new ObjectId(),
    itemId: sampleInventoryItems[5]._id, // Pepperoni
    itemName: "Pepperoni",
    quantityDelta: -1.2,
    previousQuantity: 9.7,
    newQuantity: 8.5,
    reason: "Pepperoni pizza orders",
    adjustedBy: "user_2xyz789uvw012",
    adjustedByName: "Luca Bianchi",
    adjustedAt: new Date("2024-01-23T12:45:00Z"),
  },
];

async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding...");

    const { db } = await connectToDatabase();

    
    // Clear existing data (optional - for clean seeding)
    console.log("🧹 Clearing existing data...");
    await db.collection("users").deleteMany({});
    await db.collection("inventory_items").deleteMany({});
    await db.collection("inventory_adjustments").deleteMany({});

    // Insert users
    console.log("👥 Inserting users...");
    const userResult = await db.collection("users").insertMany(sampleUsers);
    console.log(`✅ Inserted ${userResult.insertedCount} users`);

    // Insert inventory items
    console.log("📦 Inserting inventory items...");
    const inventoryResult = await db
      .collection("inventory_items")
      .insertMany(sampleInventoryItems);
    console.log(`✅ Inserted ${inventoryResult.insertedCount} inventory items`);

    // Insert adjustments
    console.log("📊 Inserting adjustments...");
    const adjustmentResult = await db
      .collection("inventory_adjustments")
      .insertMany(sampleAdjustments);
    console.log(`✅ Inserted ${adjustmentResult.insertedCount} adjustments`);

    // Verify the data
    const userCount = await db.collection("users").countDocuments();
    const itemCount = await db.collection("inventory_items").countDocuments();
    const adjustmentCount = await db
      .collection("inventory_adjustments")
      .countDocuments();

    console.log("\n🎉 Database seeding completed!");
    console.log(`📊 Summary:`);
    console.log(`   Users: ${userCount}`);
    console.log(`   Inventory Items: ${itemCount}`);
    console.log(`   Adjustments: ${adjustmentCount}`);

    // Show low stock items
    const lowStockItems = await db
      .collection("inventory_items")
      .find({
        quantity: { $lte: { $expr: { $getField: "reorderThreshold" } } },
      })
      .toArray();

    console.log("️⚠️  Low Stock Alerts:");
    lowStockItems.forEach((item) => {
      console.log(
        `   - ${item.name}: ${item.quantity} ${item.unit} (reorder at ${item.reorderThreshold})`
      );
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seedDatabase();
