import React, { useState } from "react";

export default function SpendAudit() {
  const [spend, setSpend] = useState("");
  const [result, setResult] = useState(null);

  const handleAudit = async () => {
    const response = await fetch('https://a-processing-solutions.onrender.com/api/audit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ monthlySpend: parseFloat(spend) })
    });
    const data = await response.json();
    setResult(data);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "20px auto", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
      <h2>💰 Free GPU Spend Audit</h2>
      <p>Discover how much you're wasting on GPU costs</p>
      
      <input type="number" placeholder="Monthly GPU spend ($)" value={spend} onChange={(e) => setSpend(e.target.value)} style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ddd", borderRadius: "4px" }} />
      <button onClick={handleAudit} disabled={!spend} style={{ padding: "10px 20px", backgroundColor: "#635BFF", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
        Run Free Audit
      </button>

      {result && (
        <div style={{ marginTop: "20px", padding: "20px", backgroundColor: "white", borderRadius: "4px" }}>
          <h3 style={{ color: "#C62828" }}>⚠️ You're Wasting {result.totalWaste}</h3>
          <div style={{ marginTop: "15px" }}>
            {result.issues.map((issue, idx) => (
              <div key={idx} style={{ padding: "10px", marginBottom: "10px", backgroundColor: "#FFEBEE", borderRadius: "4px" }}>
                <strong>{issue.type}:</strong> {issue.waste}<br />
                <em>Fix: {issue.fix}</em>
              </div>
            ))}
          </div>
          <p style={{ marginTop: "20px", fontSize: "18px", fontWeight: "bold", color: "#2E7D32" }}>
            {result.savings}
          </p>
          <button style={{ marginTop: "10px", padding: "12px 24px", backgroundColor: "#2E7D32", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "16px" }}>
            {result.cta}
          </button>
        </div>
      )}
    </div>
  );
}
