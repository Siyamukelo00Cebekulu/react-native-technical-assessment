import { MongoClient } from "mongodb";

async function testAll() {
  console.log("🧪 Starting comprehensive tests...\n");

  const client = new MongoClient("mongodb://localhost:27017/pizza_inventory");

  try {
    await client.connect();
    const db = client.db();

    // Test 1: Database connection
    console.log("1. Testing database connection...");
    await db.command({ ping: 1 });
    console.log("   ✅ Database connection successful\n");

    // Test 2: Check collections
    console.log("2. Checking collections...");
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map((c) => c.name);
    console.log("   📁 Collections:", collectionNames);

    // Test 3: Count documents
    console.log("\n3. Document counts:");
    for (const collection of collections) {
      const count = await db.collection(collection.name).countDocuments();
      console.log(`   ${collection.name}: ${count} documents`);
    }

    // Test 4: Sample data
    console.log("\n4. Sample inventory items:");
    const sampleItems = await db
      .collection("inventory_items")
      .find({})
      .limit(5)
      .toArray();

    if (sampleItems.length > 0) {
      sampleItems.forEach((item: any) => {
        console.log(
          `   - ${item.name}: ${item.quantity} ${item.unit} ($${item.costPrice})`
        );
      });
    } else {
      console.log('   No items found. Run "npm run seed" to add sample data.');
    }

    // Test 5: Low stock alerts
    console.log("\n5. Low stock alerts:");
    const lowStockItems = await db
      .collection("inventory_items")
      .find({ $expr: { $lte: ["$quantity", "$reorderThreshold"] } })
      .toArray();

    if (lowStockItems.length > 0) {
      lowStockItems.forEach((item: any) => {
        console.log(
          `   ⚠️  ${item.name}: ${item.quantity} ${item.unit} (reorder at ${item.reorderThreshold})`
        );
      });
    } else {
      console.log("   ✅ No low stock items");
    }

    console.log("\n🎉 All tests completed successfully!");
  } catch (error) {
    console.error("❌ Test failed:", error);
  } finally {
    await client.close();
  }
}

testAll();
