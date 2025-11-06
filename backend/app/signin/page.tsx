"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Call your API to authenticate user
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store auth state
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: data.user.email,
            role: data.user.role,
            authenticated: true,
          })
        );

        // Redirect to inventory page
        router.push("/inventory");
      } else {
        setError(data.error || "Sign in failed");
      }
    } catch (err) {
      setError("Sign in failed. Please try again.");
      console.error("Sign in error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F9FAFB",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "0.5rem",
          border: "1px solid #E5E7EB",
          padding: "2rem",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1
            style={{
              fontSize: "1.875rem",
              fontWeight: "bold",
              color: "#111827",
              margin: 0,
            }}
          >
            🍕 Pizza Inventory
          </h1>
          <p style={{ marginTop: "0.5rem", color: "#6B7280" }}>
            Sign in to access inventory
          </p>
        </div>

        <form onSubmit={handleSignIn}>
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#374151",
                marginBottom: "0.5rem",
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.5rem 0.75rem",
                border: "1px solid #D1D5DB",
                borderRadius: "0.375rem",
                fontSize: "0.875rem",
                color: "#374151",
                backgroundColor: "white",
              }}
              placeholder="Enter your email"
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#374151",
                marginBottom: "0.5rem",
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.5rem 0.75rem",
                border: "1px solid #D1D5DB",
                borderRadius: "0.375rem",
                fontSize: "0.875rem",
                color: "#374151",
                backgroundColor: "white",
              }}
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div
              style={{
                backgroundColor: "#FEF2F2",
                border: "1px solid #FECACA",
                borderRadius: "0.375rem",
                padding: "0.75rem",
                marginBottom: "1rem",
              }}
            >
              <p style={{ color: "#DC2626", fontSize: "0.875rem", margin: 0 }}>
                {error}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "1px solid transparent",
              borderRadius: "0.375rem",
              fontSize: "0.875rem",
              fontWeight: "500",
              color: "white",
              backgroundColor: loading ? "#9CA3AF" : "#2563EB",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = "#1D4ED8";
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = "#2563EB";
              }
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
          <p style={{ fontSize: "0.875rem", color: "#6B7280", margin: 0 }}>
            Demo credentials: admin@pizzashop.com / admin123
          </p>
        </div>
      </div>
    </div>
  );
}
