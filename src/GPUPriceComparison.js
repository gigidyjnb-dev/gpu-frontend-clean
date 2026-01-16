import React, { useState, useEffect } from "react";

export default function GPUPriceComparison() {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const fetchPrices = async () => {
    try {
      const backendUrl = 'https://gpu-backend-clean-production-9735.up.railway.app';
      const response = await fetch(`${backendUrl}/api/gpu-prices`);
      const data = await response.json();
      setPrices(data);
      setLastUpdate(new Date());
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch prices:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  const getAffiliateLink = (provider) => {
    const links = {
      "RunPod": "https://runpod.io?ref=YOUR_ID",
      "Vast.ai": "https://vast.ai?ref=YOUR_ID",
      "Lambda": "https://lambdalabs.com?ref=YOUR_ID"
    };
    return links[provider] || "#";
  };

  if (loading) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        Loading live prices...
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1 style={{ margin: 0 }}>Live GPU Rental Prices</h1>
        <div style={{ fontSize: "14px", color: "#666" }}>
          Last updated: {lastUpdate.toLocaleTimeString()}
        </div>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <thead>
          <tr style={{ backgroundColor: "#635BFF", color: "white" }}>
            <th style={{ padding: "12px", textAlign: "left" }}>GPU Model</th>
            <th style={{ padding: "12px", textAlign: "left" }}>Provider</th>
            <th style={{ padding: "12px", textAlign: "right" }}>Price/Hour</th>
            <th style={{ padding: "12px", textAlign: "center" }}>Availability</th>
            <th style={{ padding: "12px", textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((item, idx) => (
            <tr key={idx} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "12px", fontWeight: "600" }}>{item.gpu}</td>
              <td style={{ padding: "12px" }}>{item.provider}</td>
              <td style={{ padding: "12px", textAlign: "right", fontSize: "18px", fontWeight: "bold", color: "#635BFF" }}>
                ${item.price}
              </td>
              <td style={{ padding: "12px", textAlign: "center" }}>
                <span style={{
                  padding: "4px 12px",
                  borderRadius: "12px",
                  fontSize: "12px",
                  backgroundColor: item.available ? "#E8F5E9" : "#FFEBEE",
                  color: item.available ? "#2E7D32" : "#C62828"
                }}>
                  {item.available ? "Available" : "Sold Out"}
                </span>
              </td>
              <td style={{ padding: "12px", textAlign: "center" }}>
                {item.available && (
                  <a
                    href={getAffiliateLink(item.provider)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block",
                      padding: "8px 16px",
                      backgroundColor: "#635BFF",
                      color: "white",
                      textDecoration: "none",
                      borderRadius: "4px",
                      fontSize: "14px"
                    }}
                  >
                    Rent Now →
                  </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
