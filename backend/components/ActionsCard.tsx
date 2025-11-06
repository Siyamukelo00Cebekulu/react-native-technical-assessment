// components/ActionsCard.tsx
interface ActionsCardProps {
  onRefresh: () => void;
  isAuthenticated?: boolean;
}

export default function ActionsCard({
  onRefresh,
  isAuthenticated = false,
}: ActionsCardProps) {
  const handleAuthAction = (e: React.MouseEvent, action: string) => {
    if (!isAuthenticated) {
      e.preventDefault();
      alert(`Please sign in to ${action.toLowerCase()}`);
      // You can redirect to signin page instead
      // window.location.href = '/api/auth/signin';
    }
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
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.5rem 1rem",
              border: "1px solid #D1D5DB",
              borderRadius: "0.375rem",
              fontSize: "0.875rem",
              fontWeight: "500",
              color: "#374151",
              backgroundColor: "white",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Test Health Endpoint
          </a>
          <button
            onClick={() => (window.location.href = "/api/auth/signin")}
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
              backgroundColor: "#2563EB",
              cursor: "pointer",
            }}
          >
            Sign In
          </button>
          <button
            onClick={onRefresh}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
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
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0.5rem 1rem",
            border: "1px solid #D1D5DB",
            borderRadius: "0.375rem",
            fontSize: "0.875rem",
            fontWeight: "500",
            color: "#374151",
            backgroundColor: "white",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          Test Health Endpoint
        </a>
        <a
          href="/api/inventory/item"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0.5rem 1rem",
            border: "1px solid #D1D5DB",
            borderRadius: "0.375rem",
            fontSize: "0.875rem",
            fontWeight: "500",
            color: "#374151",
            backgroundColor: "white",
            textDecoration: "none",
            cursor: "pointer",
          }}
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
            backgroundColor: "#2563EB",
            cursor: "pointer",
          }}
        >
          Refresh All Data
        </button>
      </div>
    </div>
  );
}
