import { MongoClient } from "mongodb";

async function testDatabase() {
  console.log("🧪 Testing MongoDB connection...");

  const client = new MongoClient("mongodb://localhost:27017/pizza_inventory");

  try {
    await client.connect();
    const db = client.db();

    // Test connection
    await db.command({ ping: 1 });
    console.log("✅ MongoDB connection successful");

    // List collections
    const collections = await db.listCollections().toArray();
    console.log(
      "📁 Collections:",
      collections.map((c) => c.name)
    );

    // Count documents
    for (const collection of collections) {
      const count = await db.collection(collection.name).countDocuments();
      console.log(`   ${collection.name}: ${count} documents`);
    }

    // Show sample data
    const sampleItems = await db
      .collection("inventory_items")
      .find({})
      .limit(3)
      .toArray();

    console.log("\n🔍 Sample Inventory Items:");
    sampleItems.forEach((item: any) => {
      console.log(`   - ${item.name}: ${item.quantity} ${item.unit}`);
    });

    // Show low stock items
    const lowStockItems = await db
      .collection("inventory_items")
      .find({ $expr: { $lte: ["$quantity", "$reorderThreshold"] } })
      .toArray();

    if (lowStockItems.length > 0) {
      console.log("\n⚠️  Low Stock Items:");
      lowStockItems.forEach((item: any) => {
        console.log(
          `   - ${item.name}: ${item.quantity} ${item.unit} (threshold: ${item.reorderThreshold})`
        );
      });
    }
  } catch (error) {
    console.error("❌ Test failed:", error);
  } finally {
    await client.close();
  }
}

testDatabase();
