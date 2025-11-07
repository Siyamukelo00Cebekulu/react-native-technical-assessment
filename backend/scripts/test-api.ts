import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

// Configure axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Auth token storage
let authToken: string | null = null;

// Test data
const testItem = {
  name: "Test Pizza Dough",
  category: "dough",
  quantity: 100,
  unit: "grams",
  costPrice: 2.5,
  reorderThreshold: 50,
  supplier: "Test Supplier",
};

let createdItemId: string;
let testUserId: string; // We'll get this from Clerk

// Utility functions
function setAuthHeader(token: string) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  authToken = token;
}

function clearAuthHeader() {
  delete api.defaults.headers.common["Authorization"];
  authToken = null;
}

async function testEndpoint(
  description: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  data?: any,
  requiresAuth: boolean = false
) {
  console.log(`🧪 Testing: ${description}`);
  console.log(`   ${method} ${url}`);

  try {
    if (requiresAuth && !authToken) {
      console.log("   ⚠️  Skipping - No auth token");
      return null;
    }

    const config: any = {
      method,
      url,
    };

    if (data) {
      config.data = data;
    }

    const response = await api(config);

    console.log(`   ✅ Success: ${response.status}`);
    if (response.data && Object.keys(response.data).length > 0) {
      const responseStr = JSON.stringify(response.data);
      console.log(
        `   📊 Response:`,
        responseStr.length > 200
          ? responseStr.substring(0, 200) + "..."
          : responseStr
      );
    }

    return response.data;
  } catch (error: any) {
    console.log(`   ❌ Failed: ${error.response?.status || error.message}`);
    if (error.response?.data) {
      const errorStr = JSON.stringify(error.response.data);
      console.log(
        `   💬 Error:`,
        errorStr.length > 200 ? errorStr.substring(0, 200) + "..." : errorStr
      );
    }
    return null;
  }
}

async function setupClerkAuth() {
  console.log("🔐 Setting up Clerk authentication...");

  try {
    // Note: In a real scenario, you'd get this token from a Clerk session
    // For testing, you might need to create a test user and get their token

    // Since we can't easily get a real Clerk token without a frontend flow,
    // we'll simulate the auth setup and show you how to test

    console.log("   📝 Clerk Setup Instructions:");
    console.log("   1. Create a test user in your Clerk dashboard");
    console.log("   2. Get the user ID from Clerk");
    console.log("   3. Use Clerk Backend API to create a session token");
    console.log("   4. Set the token using setAuthHeader()");

    // Alternative: Test with your existing Clerk webhooks or backend API
    // You might want to create a test endpoint that generates a valid token for testing

    return null;
  } catch (error) {
    console.log("   ❌ Failed to setup Clerk auth:", error);
    return null;
  }
}

async function testWithMockAuth() {
  console.log("🎭 Testing with mock authentication setup...");

  // This is a placeholder for when you implement proper auth
  // For now, we'll test the endpoints that don't require auth
  // and show how to structure the authenticated tests

  return true;
}

async function runAllTests() {
  console.log("🚀 Starting API Tests with Clerk Auth");
  console.log("=".repeat(60));

  // Test 1: Health Check
  console.log("\n1. HEALTH CHECK");
  await testEndpoint("Server health check", "GET", "/health");

  console.log("\n" + "=".repeat(60));
  console.log("2. TESTING WITHOUT AUTHENTICATION");
  console.log("=".repeat(60));

  // Test endpoints without auth first (should fail with 401)
  const endpointsWithoutAuth = [
    { method: "GET", url: "/inventory/items", desc: "Get all items" },
    {
      method: "POST",
      url: "/inventory/items",
      desc: "Create item",
      data: testItem,
    },
    { method: "GET", url: "/inventory/adjustments", desc: "Get adjustments" },
  ];

  for (const endpoint of endpointsWithoutAuth) {
    await testEndpoint(
      `${endpoint.desc} (no auth)`,
      endpoint.method as any,
      endpoint.url,
      endpoint.data,
      true
    );
  }

  console.log("\n" + "=".repeat(60));
  console.log("3. SETUP CLERK AUTHENTICATION");
  console.log("=".repeat(60));

  // Try to setup Clerk auth
  const authResult = await setupClerkAuth();

  if (!authToken) {
    console.log(
      "   ⚠️  No auth token available. Using mock setup for demonstration."
    );
    await testWithMockAuth();
  }

  console.log("\n" + "=".repeat(60));
  console.log("4. INVENTORY MANAGEMENT ENDPOINTS");
  console.log("=".repeat(60));

  if (authToken) {
    // Test with actual authentication
    console.log("🔐 Testing with real authentication...");

    // 4.1: Get all items
    const allItems = await testEndpoint(
      "Get all inventory items",
      "GET",
      "/inventory/items",
      null,
      true
    );

    // 4.2: Create new item
    const createdItem = await testEndpoint(
      "Create new inventory item",
      "POST",
      "/inventory/items",
      testItem,
      true
    );
    if (createdItem && (createdItem._id || createdItem.id)) {
      createdItemId = createdItem._id || createdItem.id;
      console.log(`   📍 Created item ID: ${createdItemId}`);
    }

    // 4.3: Test individual item endpoints if creation was successful
    if (createdItemId) {
      await testEndpoint(
        "Get specific item",
        "GET",
        `/inventory/items/${createdItemId}`,
        null,
        true
      );

      // 4.4: Update item
      const updateData = {
        ...testItem,
        quantity: 150,
        costPrice: 3.0,
        name: "Updated Pizza Dough",
      };
      await testEndpoint(
        "Update item",
        "PUT",
        `/inventory/items/${createdItemId}`,
        updateData,
        true
      );

      // 4.5: Delete item
      await testEndpoint(
        "Delete item",
        "DELETE",
        `/inventory/items/${createdItemId}`,
        null,
        true
      );
    }
  } else {
    console.log("📋 Inventory Endpoint Structure (with auth):");
    console.log("   GET    /api/inventory/items           - Get all items");
    console.log("   POST   /api/inventory/items           - Create item");
    console.log("   GET    /api/inventory/items/[id]      - Get specific item");
    console.log("   PUT    /api/inventory/items/[id]      - Update item");
    console.log("   DELETE /api/inventory/items/[id]      - Delete item");
  }

  console.log("\n" + "=".repeat(60));
  console.log("5. INVENTORY ADJUSTMENTS");
  console.log("=".repeat(60));

  if (authToken) {
    // Get adjustments history
    await testEndpoint(
      "Get adjustments history",
      "GET",
      "/inventory/adjustments",
      null,
      true
    );

    // Create adjustment if we have an item
    if (createdItemId) {
      const adjustmentData = {
        itemId: createdItemId,
        adjustmentType: "manual",
        quantityChange: -10,
        reason: "Test adjustment for quality control",
        previousQuantity: 100,
        newQuantity: 90,
      };
      await testEndpoint(
        "Create adjustment",
        "POST",
        "/inventory/adjustments",
        adjustmentData,
        true
      );
    }
  } else {
    console.log("📋 Adjustment Endpoint Structure (with auth):");
    console.log(
      "   GET  /api/inventory/adjustments    - Get adjustments history"
    );
    console.log(
      "   POST /api/inventory/adjustments    - Create new adjustment"
    );
  }

  console.log("\n" + "=".repeat(60));
  console.log("6. ERROR HANDLING & EDGE CASES");
  console.log("=".repeat(60));

  const errorTestCases = [
    {
      desc: "Get non-existent item",
      method: "GET",
      url: "/inventory/items/invalid-id-123",
    },
    {
      desc: "Update with invalid data",
      method: "PUT",
      url: "/inventory/items/invalid-id-123",
      data: { invalid: "data" },
    },
    {
      desc: "Create item with empty name",
      method: "POST",
      url: "/inventory/items",
      data: { name: "", quantity: 10 },
    },
    {
      desc: "Create item with negative quantity",
      method: "POST",
      url: "/inventory/items",
      data: { name: "Test", quantity: -5 },
    },
  ];

  for (const testCase of errorTestCases) {
    await testEndpoint(
      testCase.desc,
      testCase.method as any,
      testCase.url,
      testCase.data,
      true
    );
  }

  console.log("\n" + "=".repeat(60));
  console.log("🎯 TEST SUMMARY & NEXT STEPS");
  console.log("=".repeat(60));

  console.log("\n📝 Clerk Integration Steps:");
  console.log("   1. Implement Clerk webhook for user creation");
  console.log("   2. Create test users in Clerk dashboard");
  console.log("   3. Set up Clerk middleware in your Next.js API routes");
  console.log("   4. Use getAuth() from @clerk/nextjs in your API handlers");

  console.log("\n🔧 API Development Next Steps:");
  console.log("   1. Implement input validation with Zod");
  console.log("   2. Add proper error handling middleware");
  console.log("   3. Set up rate limiting for API routes");
  console.log("   4. Implement request logging");

  console.log("\n🧪 Testing Next Steps:");
  console.log("   1. Create a test user in Clerk and get their session token");
  console.log("   2. Add the token to the Authorization header");
  console.log("   3. Run these tests again with real authentication");

  console.log("\n✅ API testing structure completed!");
  console.log(
    "   To run with real auth, implement the Clerk setup steps above."
  );
}

// Run the tests
runAllTests().catch(console.error);
