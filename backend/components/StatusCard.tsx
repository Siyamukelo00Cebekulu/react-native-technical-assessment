import { ApiStatus } from "../types";

interface StatusCardProps {
  apiStatus: ApiStatus | null;
}

export default function StatusCard({ apiStatus }: StatusCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "text-green-600 bg-green-100";
      case "unhealthy":
        return "text-red-600 bg-red-100";
      default:
        return "text-yellow-600 bg-yellow-100";
    }
  };

  const getDatabaseColor = (status: string) => {
    switch (status) {
      case "connected":
        return "text-green-600 bg-green-100";
      case "disconnected":
        return "text-red-600 bg-red-100";
      default:
        return "text-yellow-600 bg-yellow-100";
    }
  };

  return (
    <div className="card">
      <h2 className="card-title">Server Status</h2>

      {apiStatus ? (
        <div className="status-grid">
          <div className="status-item">
            <p className="status-label">API Status</p>
            <span
              className={`status-badge ${getStatusColor(apiStatus.status)}`}
            >
              {apiStatus.status}
            </span>
          </div>

          <div className="status-item">
            <p className="status-label">Database</p>
            <span
              className={`status-badge ${getDatabaseColor(apiStatus.database)}`}
            >
              {apiStatus.database}
            </span>
          </div>

          {apiStatus.collections && (
            <>
              <div className="status-item">
                <p className="status-label">Inventory Items</p>
                <p className="status-value">
                  {apiStatus.collections.inventory_items}
                </p>
              </div>

              <div className="status-item">
                <p className="status-label">Adjustments</p>
                <p className="status-value">
                  {apiStatus.collections.inventory_adjustments}
                </p>
              </div>
            </>
          )}
        </div>
      ) : (
        <p style={{ color: "#6B7280" }}>Unable to fetch server status</p>
      )}
    </div>
  );
}
