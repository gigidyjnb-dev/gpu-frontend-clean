import React, { useState } from "react";

export default function AvailabilityAlerts() {
  const [email, setEmail] = useState("");
  const [gpu, setGpu] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubscribe = async () => {
    const response = await fetch('https://a-processing-solutions.onrender.com/api/alert/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, gpu, maxPrice: parseFloat(maxPrice) })
    });
    const data = await response.json();
    if (data.success) setSuccess(true);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "20px auto", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
      <h2>🔔 GPU Availability Alerts</h2>
      <p>Get notified when your desired GPU becomes available</p>
      
      {!success ? (
        <>
          <input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ddd", borderRadius: "4px" }} />
          <input type="text" placeholder="GPU (e.g. H100 80GB)" value={gpu} onChange={(e) => setGpu(e.target.value)} style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ddd", borderRadius: "4px" }} />
          <input type="number" placeholder="Max price per hour" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ddd", borderRadius: "4px" }} />
          <button onClick={handleSubscribe} disabled={!email || !gpu || !maxPrice} style={{ padding: "10px 20px", backgroundColor: "#635BFF", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
            Subscribe to Alerts
          </button>
        </>
      ) : (
        <div style={{ padding: "20px", backgroundColor: "#E8F5E9", borderRadius: "4px", color: "#2E7D32" }}>
          <h3>✅ Alert Created!</h3>
          <p>We'll email you when {gpu} is available under ${maxPrice}/hr</p>
        </div>
      )}
    </div>
  );
}
