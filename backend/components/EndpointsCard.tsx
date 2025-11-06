interface ApiEndpoint {
  method: string;
  path: string;
  description: string;
  requiresAuth: boolean;
}

interface EndpointsCardProps {
  endpoints: ApiEndpoint[];
}

export default function EndpointsCard({ endpoints }: EndpointsCardProps) {
  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "bg-blue-100 text-blue-800";
      case "POST":
        return "bg-green-100 text-green-800";
      case "PUT":
        return "bg-yellow-100 text-yellow-800";
      case "DELETE":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="card">
      <h2 className="card-title">API Endpoints</h2>
      <div className="endpoints-grid">
        {endpoints.map((endpoint, index) => (
          <div key={index} className="endpoint-item">
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
            >
              <span
                className={`endpoint-method ${getMethodColor(endpoint.method)}`}
              >
                {endpoint.method}
              </span>
              <code className="endpoint-path">{endpoint.path}</code>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              {endpoint.requiresAuth && (
                <span className="endpoint-auth">Auth</span>
              )}
              <span className="endpoint-description">
                {endpoint.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
