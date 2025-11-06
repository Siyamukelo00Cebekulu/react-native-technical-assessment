"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface InventoryItem {
  _id: string;
  name: string;
  category: string;
  unit: string;
  quantity: number;
  reorderThreshold: number;
  costPrice: number;
  createdAt: string;
}

export default function InventoryPage() {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/signin");
      return;
    }

    fetchInventory();
  }, [router]);

  const fetchInventory = async () => {
    try {
      const response = await fetch("/api/inventory/item");
      if (response.ok) {
        const data = await response.json();
        setInventoryItems(data.items || []);
      } else {
        setError("Failed to load inventory/ Authorization!");
      }
    } catch (err) {
      setError("Failed to load inventory");
      console.error("Inventory fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#F9FAFB",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              animation: "spin 1s linear infinite",
              borderRadius: "50%",
              height: "3rem",
              width: "3rem",
              borderBottom: "2px solid #2563EB",
            }}
          ></div>
          <p style={{ marginTop: "1rem", color: "#6B7280" }}>
            Loading inventory...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F9FAFB",
        padding: "2rem 0",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "2.25rem",
                fontWeight: "bold",
                color: "#111827",
                margin: 0,
              }}
            >
              📦 Inventory Management
            </h1>
            <p style={{ marginTop: "0.5rem", color: "#6B7280" }}>
              Manage your pizza inventory items
            </p>
          </div>
          <button
            onClick={handleSignOut}
            style={{
              padding: "0.5rem 1rem",
              border: "1px solid #D1D5DB",
              borderRadius: "0.375rem",
              fontSize: "0.875rem",
              fontWeight: "500",
              color: "#374151",
              backgroundColor: "white",
              cursor: "pointer",
            }}
          >
            Sign Out
          </button>
        </div>

        {error && (
          <div
            style={{
              backgroundColor: "#FEF2F2",
              border: "1px solid #FECACA",
              borderRadius: "0.5rem",
              padding: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            <p style={{ color: "#DC2626", margin: 0 }}>{error}</p>
          </div>
        )}

        {/* Inventory Table */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "0.5rem",
            border: "1px solid #E5E7EB",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "1.5rem",
              borderBottom: "1px solid #E5E7EB",
            }}
          >
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                color: "#111827",
                margin: 0,
              }}
            >
              Inventory Items ({inventoryItems.length})
            </h2>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#F9FAFB" }}>
                  <th
                    style={{
                      padding: "0.75rem 1rem",
                      textAlign: "left",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      color: "#374151",
                      borderBottom: "1px solid #E5E7EB",
                    }}
                  >
                    Item Name
                  </th>
                  <th
                    style={{
                      padding: "0.75rem 1rem",
                      textAlign: "left",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      color: "#374151",
                      borderBottom: "1px solid #E5E7EB",
                    }}
                  >
                    Category
                  </th>
                  <th
                    style={{
                      padding: "0.75rem 1rem",
                      textAlign: "right",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      color: "#374151",
                      borderBottom: "1px solid #E5E7EB",
                    }}
                  >
                    Quantity
                  </th>
                  <th
                    style={{
                      padding: "0.75rem 1rem",
                      textAlign: "right",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      color: "#374151",
                      borderBottom: "1px solid #E5E7EB",
                    }}
                  >
                    Cost Price
                  </th>
                  <th
                    style={{
                      padding: "0.75rem 1rem",
                      textAlign: "right",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      color: "#374151",
                      borderBottom: "1px solid #E5E7EB",
                    }}
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {inventoryItems.map((item) => (
                  <tr
                    key={item._id}
                    style={{ borderBottom: "1px solid #E5E7EB" }}
                  >
                    <td
                      style={{
                        padding: "0.75rem 1rem",
                        fontSize: "0.875rem",
                        color: "#111827",
                      }}
                    >
                      <div style={{ fontWeight: "500" }}>{item.name}</div>
                      <div style={{ color: "#6B7280", fontSize: "0.75rem" }}>
                        {item.unit}
                      </div>
                    </td>
                    <td
                      style={{
                        padding: "0.75rem 1rem",
                        fontSize: "0.875rem",
                        color: "#6B7280",
                      }}
                    >
                      {item.category}
                    </td>
                    <td
                      style={{
                        padding: "0.75rem 1rem",
                        textAlign: "right",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        color: "#111827",
                      }}
                    >
                      {item.quantity}
                    </td>
                    <td
                      style={{
                        padding: "0.75rem 1rem",
                        textAlign: "right",
                        fontSize: "0.875rem",
                        color: "#059669",
                      }}
                    >
                      ${item.costPrice.toFixed(2)}
                    </td>
                    <td
                      style={{
                        padding: "0.75rem 1rem",
                        textAlign: "right",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          padding: "0.25rem 0.625rem",
                          borderRadius: "9999px",
                          fontSize: "0.75rem",
                          fontWeight: "500",
                          backgroundColor:
                            item.quantity <= item.reorderThreshold
                              ? "#FEF2F2"
                              : "#F0FDF4",
                          color:
                            item.quantity <= item.reorderThreshold
                              ? "#DC2626"
                              : "#059669",
                        }}
                      >
                        {item.quantity <= item.reorderThreshold
                          ? "Low Stock"
                          : "In Stock"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {inventoryItems.length === 0 && (
            <div
              style={{
                padding: "3rem 2rem",
                textAlign: "center",
                color: "#6B7280",
              }}
            >
              <p>No inventory items found.</p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
