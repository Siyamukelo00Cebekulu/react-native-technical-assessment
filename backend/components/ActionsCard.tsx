"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface ActionsCardProps {
  onRefresh: () => void;
  isAuthenticated?: boolean;
}

type HoverStateKeys =
  | "health"
  | "viewInventory"
  | "manageItems"
  | "refresh"
  | "signIn"
  | "back";

export default function ActionsCard({
  onRefresh,
  isAuthenticated = false,
}: ActionsCardProps) {
  const router = useRouter();
  const [hoverStates, setHoverStates] = useState({
    health: false,
    viewInventory: false,
    manageItems: false,
    refresh: false,
    signIn: false,
    back: false,
  });

  const handleHover = (button: HoverStateKeys, isHovering: boolean) => {
    setHoverStates((prev) => ({
      ...prev,
      [button]: isHovering,
    }));
  };

  const handleProtectedAction = (actionName: string) => {
    if (!isAuthenticated) {
      alert(`Please sign in to ${actionName.toLowerCase()}`);
      router.push("/signin");
    }
  };

  const getButtonStyle = (
    button: HoverStateKeys,
    isPrimary: boolean = false
  ) => {
    const baseStyle = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0.5rem 1rem",
      borderRadius: "0.375rem",
      fontSize: "0.875rem",
      fontWeight: "500",
      textDecoration: "none",
      cursor: "pointer",
      transition: "all 0.2s",
      border: "1px solid #D1D5DB",
      color: "#374151",
      backgroundColor: "white",
    };

    if (isPrimary) {
      return {
        ...baseStyle,
        border: "1px solid transparent",
        color: "white",
        backgroundColor: hoverStates[button] ? "#047857" : "blueviolet",
      };
    }

    return {
      ...baseStyle,
      backgroundColor: hoverStates[button] ? "#F9FAFB" : "white",
    };
  };

  if (!isAuthenticated) {
    return (
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "0.5rem",
          border: "1px solid #E5E7EB",
          padding: "1.5rem",
          marginTop: "1.5rem",
        }}
      >
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: "600",
            color: "#111827",
            marginBottom: "1rem",
          }}
        >
          🔐 Authentication Required
        </h2>
        <div
          style={{
            backgroundColor: "#FFFBEB",
            border: "1px solid #FCD34D",
            borderRadius: "0.5rem",
            padding: "1rem",
            marginBottom: "1rem",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <div style={{ color: "#D97706", fontSize: "1.25rem" }}>⚠️</div>
            <div>
              <p style={{ fontWeight: "500", color: "#92400E", margin: 0 }}>
                Sign in required
              </p>
              <p
                style={{
                  color: "#B45309",
                  fontSize: "0.875rem",
                  margin: "0.25rem 0 0 0",
                }}
              >
                Please authenticate to access inventory management features
              </p>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          <a
            href="/api/health"
            target="_blank"
            rel="noopener noreferrer"
            style={getButtonStyle("health")}
          >
            Test Health Endpoint
          </a>
          <button
            onClick={() => router.push("/signin")}
            style={getButtonStyle("signIn", true)}
            onMouseEnter={() => handleHover("signIn", true)}
            onMouseLeave={() => handleHover("signIn", false)}
          >
            <span style={{ marginRight: "0.5rem" }}>🔑</span>
            Sign In
          </button>
          <button
            onClick={onRefresh}
            style={getButtonStyle("refresh")}
            onMouseEnter={() => handleHover("refresh", true)}
            onMouseLeave={() => handleHover("refresh", false)}
          >
            Refresh Status
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "0.5rem",
        border: "1px solid #E5E7EB",
        padding: "1.5rem",
        marginTop: "1.5rem",
      }}
    >
      <h2
        style={{
          fontSize: "1.25rem",
          fontWeight: "600",
          color: "#111827",
          marginBottom: "1rem",
        }}
      >
        Quick Actions
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
        }}
      >
        <a
          href="/api/health"
          target="_blank"
          rel="noopener noreferrer"
          style={getButtonStyle("health")}
          onMouseEnter={() => handleHover("health", true)}
          onMouseLeave={() => handleHover("health", false)}
        >
          Test Health Endpoint
        </a>
        <a
          href="/api/inventory/item"
          target="_blank"
          rel="noopener noreferrer"
          style={getButtonStyle("viewInventory")}
          onMouseEnter={() => handleHover("viewInventory", true)}
          onMouseLeave={() => handleHover("viewInventory", false)}
        >
          View Inventory Items
        </a>
        <button
          onClick={onRefresh}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0.5rem 1rem",
            border: "1px solid transparent",
            borderRadius: "0.375rem",
            fontSize: "0.875rem",
            fontWeight: "500",
            color: "white",
            backgroundColor: hoverStates.refresh ? "#1D4ED8" : "#2563EB",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={() => handleHover("refresh", true)}
          onMouseLeave={() => handleHover("refresh", false)}
        >
          Refresh All Data
        </button>
      </div>
    </div>
  );
}
