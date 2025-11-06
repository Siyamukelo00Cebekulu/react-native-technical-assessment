import { MongoClient, Db } from "mongodb";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/pizza_inventory";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<{
  client: MongoClient,
  db: Db,
}> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  try {
    console.log("🔌 Connecting to MongoDB...");
    const client = new MongoClient(MONGODB_URI);
    await client.connect();

    const db = client.db();
    await db.command({ ping: 1 });
    console.log("✅ Connected to MongoDB successfully");

    cachedClient = client;
    cachedDb = db;

    return { client, db };
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    console.log("💡 Make sure MongoDB is running with:");
    console.log(
      '   "C:\\Program Files\\MongoDB\\Server\\8.2\\bin\\mongod.exe" --dbpath C:\\mongodb-data'
    );
    throw error;
  }
}
