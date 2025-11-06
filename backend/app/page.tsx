"use client";

import { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import StatusCard from "../components/StatusCard";
import EndpointsCard from "../components/EndpointsCard";
import ActionsCard from "../components/ActionsCard";
import { ApiStatus, InventoryItem, ApiEndpoint } from "../types";
import "../styles/dashboard.css";

export default function ApiDashboard() {
  const [apiStatus, setApiStatus] = useState<ApiStatus | null>(null);
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiEndpoints: ApiEndpoint[] = [
    {
      method: "GET",
      path: "/api/health",
      description: "Server health check",
      requiresAuth: false,
    },
    {
      method: "GET",
      path: "/api/inventory/item",
      description: "Get all inventory items",
      requiresAuth: true,
    },
    {
      method: "POST",
      path: "/api/inventory/items",
      description: "Create new inventory item",
      requiresAuth: true,
    },
    {
      method: "GET",
      path: "/api/inventory/items/[id]",
      description: "Get specific item",
      requiresAuth: true,
    },
    {
      method: "PUT",
      path: "/api/inventory/items/[id]",
      description: "Update item",
      requiresAuth: true,
    },
    {
      method: "DELETE",
      path: "/api/inventory/items/[id]",
      description: "Delete item",
      requiresAuth: true,
    },
    {
      method: "GET",
      path: "/api/inventory/adjustments",
      description: "Get adjustments history",
      requiresAuth: true,
    },
    {
      method: "POST",
      path: "/api/inventory/adjustments",
      description: "Create adjustment",
      requiresAuth: true,
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch API health status
      const healthResponse = await fetch("/api/health");
      const healthData = await healthResponse.json();
      setApiStatus(healthData);

      // Fetch inventory items (if API is healthy)
      if (healthData.status === "healthy") {
        try {
          const itemsResponse = await fetch("/api/inventory/item");
          if (itemsResponse.ok) {
            const itemsData = await itemsResponse.json();
            setInventoryItems(itemsData.items || []);
          }
        } catch (itemsError) {
          console.log("Inventory items fetch failed (might need auth)");
        }
      }

      setError(null);
    } catch (err) {
      setError(
        "Failed to connect to API server. Make sure the server is running on localhost:3000"
      );
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="dashboard-container">
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
        {/* Header */}
        <div className="dashboard-header">
          <h1 className="dashboard-title">📊 API Dashboard</h1>
          <p className="dashboard-subtitle">
            Monitor your backend API endpoints and server status
          </p>
        </div>

        {error && (
          <div className="error-alert">
            <div className="error-content">
              <div className="error-icon">⚠️</div>
              <p className="error-message">{error}</p>
            </div>
          </div>
        )}

        {/* Server Status */}
        <StatusCard apiStatus={apiStatus} />

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }}
        >
          {/* API Endpoints */}
          <EndpointsCard endpoints={apiEndpoints} />
        </div>

        {/* Quick Actions */}
        <ActionsCard onRefresh={fetchData} isAuthenticated={false} />

        {/* Footer Info */}
        <div className="footer">
          <p>Backend Server Running on http://localhost:3000</p>
          <p style={{ marginTop: "0.25rem" }}>
            MongoDB:{" "}
            {apiStatus?.database === "connected"
              ? "✅ Connected"
              : "❌ Disconnected"}
          </p>
        </div>
      </div>
    </div>
  );
}
