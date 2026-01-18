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
            Last updated: {lastUpdate.toLocaleTimeString()}
          </p>
        </div>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <thead>
          <tr style={{ backgroundColor: "#635BFF", color: "white" }}>
            <th style={{ padding: "12px", textAlign: "left" }}>GPU</th>
            <th style={{ padding: "12px", textAlign: "left" }}>Provider</th>
            <th style={{ padding: "12px", textAlign: "right" }}>Price/hr</th>
            <th style={{ padding: "12px", textAlign: "center" }}>Hours</th>
            <th style={{ padding: "12px", textAlign: "right" }}>Total</th>
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
                <td style={{ padding: "12px", textAlign: "right", fontSize: "16px", fontWeight: "bold", color: "#635BFF" }}>
                  ${yourPrice.toFixed(2)}
                </td>
                <td style={{ padding: "12px", textAlign: "center" }}>
                  <input
                    type="number"
                    min="1"
                    max="720"
                    value={hours}
                    onChange={(e) => handleHoursChange(idx, parseInt(e.target.value) || 1)}
                    style={{ width: "60px", padding: "6px", textAlign: "center", border: "1px solid #ddd", borderRadius: "4px" }}
                  />
                </td>
                <td style={{ padding: "12px", textAlign: "right", fontSize: "18px", fontWeight: "bold", color: "#2E7D32" }}>
                  ${totalCost.toFixed(2)}
                </td>
                <td style={{ padding: "12px", textAlign: "center" }}>
                  {item.available && (
                    <button onClick={() => handleRentNow(item, idx)} style={{ padding: "8px 20px", backgroundColor: "#635BFF", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                      Rent Now
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
