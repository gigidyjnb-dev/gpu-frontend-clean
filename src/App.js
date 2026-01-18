import React from "react";
import GPUPriceComparison from "./GPUPriceComparison";
import WorkloadOptimizer from "./WorkloadOptimizer";
import AvailabilityAlerts from "./AvailabilityAlerts";
import SpendAudit from "./SpendAudit";

function App() {
  return (
    <div>
      <GPUPriceComparison />
      <WorkloadOptimizer />
      <AvailabilityAlerts />
      <SpendAudit />
    </div>
  );
}

export default App;
