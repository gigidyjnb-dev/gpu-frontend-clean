import React, { useState, useEffect } from "react";

export default function GPUPriceComparison() {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [selectedHours, setSelectedHours] = useState({});

  const fetchPrices = async () => {
    try {
      const backendUrl = 'https://a-processing-solutions.onrender.com';
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

  const handleHoursChange = (index, hours) => {
    setSelectedHours(prev => ({ ...prev, [index]: hours }));
  };

  const handleRentNow = async (item, index) => {
    const hours = selectedHours[index] || 1;
    const pricePerHour = parseFloat(item.price);
    const markup = 1.20;
    const yourPrice = pricePerHour * markup;
    
    try {
      const backendUrl = 'https://a-processing-solutions.onrender.com';
      const response = await fetch(`${backendUrl}/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          provider: item.provider,
          gpu: item.gpu,
          hours: hours,
          providerPrice: pricePerHour,
          yourPrice: yourPrice
        }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Failed to start checkout. Please try again.");
    }
  };

  const handleDonate = async () => {
    try {
      const backendUrl = 'https://a-processing-solutions.onrender.com';
      const response = await fetch(`${backendUrl}/donate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 5 }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Donation error:", err);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        Loading live prices...
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1400px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <div>
          <h1 style={{ margin: "0 0 10px 0" }}>Live GPU Rental Prices</h1>
          <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
            Last updated: {lastUpdate.toLocaleTimeString()} • Prices include transparent 20% service fee
          </p>
        </div>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <thead>
          <tr style={{ backgroundColor: "#635BFF", color: "white" }}>
            <th style={{ padding: "12px", textAlign: "left" }}>GPU Model</th>
            <th style={{ padding: "12px", textAlign: "left" }}>Provider</th>
            <th style={{ padding: "12px", textAlign: "right" }}>Provider Price</th>
            <th style={{ padding: "12px", textAlign: "right" }}>Your Price (+20%)</th>
            <th style={{ padding: "12px", textAlign: "center" }}>Hours</th>
            <th style={{ padding: "12px", textAlign: "right" }}>Total Cost</th>
            <th style={{ padding: "12px", textAlign: "center" }}>Status</th>
            <th style={{ padding: "12px", textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((item, idx) => {
            const hours = selectedHours[idx] || 1;
            const providerPrice = parseFloat(item.price);
            const yourPrice = providerPrice * 1.20;
            const totalCost = yourPrice * hours;
            
            return (
              <tr key={idx} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "12px", fontWeight: "600" }}>{item.gpu}</td>
                <td style={{ padding: "12px" }}>{item.provider}</td>
                <td style={{ padding: "12px", textAlign: "right", color: "#666", fontSize: "14px" }}>
                  ${providerPrice.toFixed(2)}/hr
                </td>
                <td style={{ padding: "12px", textAlign: "right", fontSize: "16px", fontWeight: "bold", color: "#635BFF" }}>
                  ${yourPrice.toFixed(2)}/hr
                </td>
                <td style={{ padding: "12px", textAlign: "center" }}>
                  <input
                    type="number"
                    min="1"
                    max="720"
                    value={hours}
                    onChange={(e) => handleHoursChange(idx, parseInt(e.target.value) || 1)}
                    style={{
                      width: "60px",
                      padding: "6px",
                      textAlign: "center",
                      border: "1px solid #ddd",
                      borderRadius: "4px"
                    }}
                  />
                </td>
                <td style={{ padding: "12px", textAlign: "right", fontSize: "18px", fontWeight: "bold", color: "#2E7D32" }}>
                  ${totalCost.toFixed(2)}
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
                    <button
                      onClick={() => handleRentNow(item, idx)}
                      style={{
                        padding: "8px 20px",
                        backgroundColor: "#635BFF",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor: "pointer"
                      }}
                    >
                      Rent Now
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div style={{ 
        marginTop: "30px",
        padding: "20px",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
        border: "1px solid #dee2e6"
      }}>
        <h3 style={{ margin: "0 0 10px 0", fontSize: "16px" }}>💡 Transparent Pricing</h3>
        <p style={{ margin: 0, fontSize: "14px", color: "#666", lineHeight: "1.6" }}>
          We show you exactly what we pay providers and add a transparent 20% service fee. 
          This covers instant provisioning, 24/7 monitoring, automatic failover, and support.
        </p>
      </div>

      <div style={{ 
        marginTop: "50px", 
        padding: "40px", 
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: "16px",
        boxShadow: "0 10px 40px rgba(102, 126, 234, 0.3)",
        textAlign: "center",
        color: "white"
      }}>
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ 
            margin: "0 0 12px 0", 
            fontSize: "28px", 
            fontWeight: "700",
            letterSpacing: "-0.5px"
          }}>
            ☕ Support Our Mission
          </h2>
          <p style={{ 
            margin: 0, 
            fontSize: "16px", 
            opacity: 0.95,
            maxWidth: "500px",
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: "1.6"
          }}>
            We're keeping GPU pricing transparent, real-time, and completely ad-free. 
            If we've saved you time or money, consider buying us a coffee!
          </p>
        </div>
        
        <button
          onClick={handleDonate}
          onMouseOver={(e) => e.target.style.transform = "translateY(-2px)"}
          onMouseOut={(e) => e.target.style.transform = "translateY(0)"}
          style={{
            padding: "16px 48px",
            backgroundColor: "white",
            color: "#667eea",
            border: "none",
            borderRadius: "50px",
            fontSize: "18px",
            fontWeight: "700",
            cursor: "pointer",
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            transition: "all 0.3s ease",
