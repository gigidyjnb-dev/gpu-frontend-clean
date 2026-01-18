import React, { useState } from "react";

export default function WorkloadOptimizer() {
  const [model, setModel] = useState("");
  const [result, setResult] = useState(null);

  const models = [
    "Llama 3.1 8B",
    "Llama 3.1 70B", 
    "Stable Diffusion XL",
    "GPT-3 Fine-tuning",
    "Whisper Large",
    "BERT Training"
  ];

  const handleOptimize = async () => {
    const response = await fetch('https://a-processing-solutions.onrender.com/api/optimize-workload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ modelName: model, currentGPU: "H100", currentPrice: 3.00 })
    });
    const data = await response.json();
    setResult(data);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "20px auto", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
      <h2>🎯 GPU Workload Optimizer</h2>
      <p>Find the cheapest GPU for your workload</p>
      
      <select value={model} onChange={(e) => setModel(e.target.value)} style={{ width: "100%", padding: "10px", marginBottom: "10px" }}>
        <option value="">Select your model...</option>
        {models.map(m => <option key={m} value={m}>{m}</option>)}
      </select>
      
      <button onClick={handleOptimize} disabled={!model} style={{ padding: "10px 20px", backgroundColor: "#635BFF", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
        Optimize
      </button>

      {result && (
        <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "white", borderRadius: "4px" }}>
          <h3>✅ Recommendation</h3>
          <p><strong>Best GPU:</strong> {result.recommendedGPU}</p>
          <p><strong>Min VRAM:</strong> {result.minVRAM}GB</p>
          <p><strong>Potential Savings:</strong> {result.potentialSavings}</p>
          <p>{result.message}</p>
        </div>
      )}
    </div>
  );
}
