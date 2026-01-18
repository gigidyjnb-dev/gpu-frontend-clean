import React, { useState, useEffect } from 'react';
import { Zap, TrendingDown, Shield, Clock, ChevronRight, Sparkles, DollarSign } from 'lucide-react';

const GPURentalHomepage = () => {
  const [gpuPrices, setGpuPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://gpu-backend-clean-production-9735.up.railway.app/api/gpu/prices')
      .then(res => res.json())
      .then(data => {
        setGpuPrices(data.prices || []);
        setLoading(false);
      })
      .catch(() => {
        setGpuPrices([
          { id: 1, name: 'H100 80GB', provider: 'RunPod', basePrice: 2.89, ourPrice: 3.47, savings: 45, available: true, performance: 100 },
          { id: 2, name: 'A100 80GB', provider: 'Lambda', basePrice: 1.89, ourPrice: 2.27, savings: 32, available: true, performance: 85 },
          { id: 3, name: 'A100 40GB', provider: 'Vast.ai', basePrice: 1.29, ourPrice: 1.55, savings: 28, available: true, performance: 75 },
          { id: 4, name: 'RTX 4090', provider: 'RunPod', basePrice: 0.69, ourPrice: 0.83, savings: 15, available: true, performance: 60 },
          { id: 5, name: 'L40S 48GB', provider: 'Lambda', basePrice: 1.49, ourPrice: 1.79, savings: 25, available: false, performance: 70 },
          { id: 6, name: 'V100 32GB', provider: 'Vast.ai', basePrice: 0.89, ourPrice: 1.07, savings: 18, available: true, performance: 50 },
        ]);
        setLoading(false);
      });
  }, []);

  const [showQuoteModal, setShowQuoteModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300">Always Get The Best Price</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              GPU Rentals,
              <br />
              Done Right
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Stop overpaying for compute. We find you the cheapest GPU for your workload,
              <span className="text-blue-400 font-semibold"> guaranteed</span>.
            </p>

            <button
              onClick={() => setShowQuoteModal(true)}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-2xl shadow-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-blue-500/70"
            >
              <Zap className="w-6 h-6" />
              Get Your Best Quote Now
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="mt-8 flex items-center justify-center gap-8 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span>Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>Instant Provisioning</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-purple-400" />
                <span>Lowest Prices</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Live GPU Pricing</h2>
          <p className="text-xl text-slate-400">Real-time rates across all providers. Transparent pricing, always.</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-slate-800/50 rounded-xl p-6 animate-pulse">
                <div className="h-6 bg-slate-700 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-slate-700 rounded w-1/2 mb-6"></div>
                <div className="h-8 bg-slate-700 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gpuPrices.map((gpu) => (
              <div
                key={gpu.id}
                className="group relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-1"
              >
                {!gpu.available && (
                  <div className="absolute top-4 right-4 bg-red-500/20 border border-red-500/50 text-red-400 text-xs px-2 py-1 rounded">
                    Limited
                  </div>
                )}
                
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-white mb-1">{gpu.name}</h3>
                  <p className="text-sm text-slate-400">via {gpu.provider}</p>
                </div>

                <div className="mb-4">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-bold text-white">${gpu.ourPrice}</span>
                    <span className="text-slate-400">/hour</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-slate-500 line-through">${gpu.basePrice}</span>
                    <span className="text-green-400 font-semibold">Save ${gpu.savings}/day</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
                    <span>Performance</span>
                    <span>{gpu.performance}%</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                      style={{ width: `${gpu.performance}%` }}
                    ></div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700/50">
                  <div className="text-xs text-slate-500 mb-3">
                    <div className="flex items-center justify-between">
                      <span>Base Price:</span>
                      <span>${gpu.basePrice}/hr</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Our Service (20%):</span>
                      <span>+${(gpu.ourPrice - gpu.basePrice).toFixed(2)}/hr</span>
                    </div>
                    <div className="flex items-center justify-between font-semibold text-slate-400 mt-1 pt-1 border-t border-slate-700/30">
                      <span>Your Price:</span>
                      <span>${gpu.ourPrice}/hr</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showQuoteModal && <QuoteModal onClose={() => setShowQuoteModal(false)} />}
    </div>
  );
};

const QuoteModal = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    model: '',
    instances: 1,
    hours: 8,
  });

  const models = [
    'Llama 70B/405B',
    'GPT-J / GPT-NeoX',
    'Stable Diffusion XL',
    'Mistral 7B/8x7B',
    'Custom Model',
    "I don't know"
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Get Your Best Quote</h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3">
                  What model are you running?
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {models.map((model) => (
                    <button
                      key={model}
                      onClick={() => setFormData({ ...formData, model })}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        formData.model === model
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                      }`}
                    >
                      {model}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3">
                  How many instances? (parallel runs)
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={formData.instances}
                  onChange={(e) => setFormData({ ...formData, instances: parseInt(e.target.value) })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3">
                  How many hours will you run?
                </label>
                <input
                  type="range"
                  min="1"
                  max="168"
                  value={formData.hours}
                  onChange={(e) => setFormData({ ...formData, hours: parseInt(e.target.value) })}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-slate-400 mt-2">
                  <span>1 hour</span>
                  <span className="text-xl font-bold text-white">{formData.hours} hours</span>
                  <span>1 week</span>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-700">
                <p className="text-slate-400 text-sm mb-6">
                  Choose how you want to proceed:
                </p>
                
                <div className="space-y-4">
                  <button
                    onClick={() => setStep(2)}
                    disabled={!formData.model}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-slate-700 disabled:to-slate-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <div className="font-bold text-lg">Show Me The Cheapest</div>
                        <div className="text-sm opacity-90">Quick quote, instant checkout</div>
                      </div>
                      <ChevronRight className="w-6 h-6" />
                    </div>
                  </button>

                  <button
                    onClick={() => setStep(3)}
                    disabled={!formData.model}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 disabled:from-slate-700 disabled:to-slate-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 bg-yellow-400 text-slate-900 text-xs px-2 py-1 rounded-bl-lg font-bold">
                      RECOMMENDED
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <div className="font-bold text-lg flex items-center gap-2">
                          <Sparkles className="w-5 h-5" />
                          Optimize My Rental
                        </div>
                        <div className="text-sm opacity-90">FREE - Find the perfect GPU for your workload</div>
                      </div>
                      <ChevronRight className="w-6 h-6" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <QuickQuoteResults formData={formData} onBack={() => setStep(1)} />
          )}

          {step === 3 && (
            <OptimizerFlow formData={formData} onBack={() => setStep(1)} />
          )}
        </div>
      </div>
    </div>
  );
};

const QuickQuoteResults = ({ formData, onBack }) => {
  const recommendation = {
    gpu: 'A100 40GB',
    provider: 'Vast.ai',
    basePrice: 1.29,
    ourPrice: 1.55,
    totalCost: (1.55 * formData.hours * formData.instances).toFixed(2)
  };

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="text-blue-400 hover:text-blue-300 flex items-center gap-2">
        ← Back
      </button>

      <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="bg-green-500/20 p-3 rounded-lg">
            <Zap className="w-8 h-8 text-green-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2">Best Match: {recommendation.gpu}</h3>
            <p className="text-slate-300">via {recommendation.provider}</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 rounded-xl p-6 space-y-4">
        <h4 className="font-semibold text-lg">Price Breakdown</h4>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-400">GPU Rate:</span>
            <span>${recommendation.ourPrice}/hour</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Instances:</span>
            <span>{formData.instances}x</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Duration:</span>
            <span>{formData.hours} hours</span>
          </div>
          <div className="pt-3 border-t border-slate-700 flex justify-between text-lg font-bold">
            <span>Total Cost:</span>
            <span className="text-green-400">${recommendation.totalCost}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-700 text-xs text-slate-500">
          <div className="flex justify-between mb-1">
            <span>Provider Base Rate:</span>
            <span>${recommendation.basePrice}/hr</span>
          </div>
          <div className="flex justify-between">
            <span>Our Service Fee (20%):</span>
            <span>+${(recommendation.ourPrice - recommendation.basePrice).toFixed(2)}/hr</span>
          </div>
        </div>
      </div>

      <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
        <DollarSign className="w-5 h-5" />
        Proceed to Checkout
      </button>

      <p className="text-center text-sm text-slate-400">
        Want better savings? Try our <button onClick={() => {}} className="text-green-400 hover:text-green-300 underline">AI Optimizer</button> (FREE)
      </p>
    </div>
  );
};

const OptimizerFlow = ({ formData, onBack }) => {
  const [optimizerData, setOptimizerData] = useState({
    gpuMemory: '',
    batchSize: '',
    workloadType: '',
    budget: ''
  });

  const [showResults, setShowResults] = useState(false);

  if (showResults) {
    return <OptimizerResults formData={formData} optimizerData={optimizerData} onBack={() => setShowResults(false)} />;
  }

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="text-blue-400 hover:text-blue-300 flex items-center gap-2">
        ← Back
      </button>

      <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <Sparkles className="w-6 h-6 text-green-400" />
          <h3 className="text-xl font-bold">FREE AI Optimization</h3>
        </div>
        <p className="text-slate-300 text-sm">
          Answer a few questions and we'll find you the perfect GPU that saves you the most money.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Estimated GPU Memory Needed
          </label>
          <select
            value={optimizerData.gpuMemory}
            onChange={(e) => setOptimizerData({ ...optimizerData, gpuMemory: e.target.value })}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500"
          >
            <option value="">Select...</option>
            <option value="16gb">16GB or less</option>
            <option value="24gb">24GB</option>
            <option value="40gb">40GB</option>
            <option value="80gb">80GB</option>
            <option value="unsure">Not sure</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Workload Type
          </label>
          <select
            value={optimizerData.workloadType}
            onChange={(e) => setOptimizerData({ ...optimizerData, workloadType: e.target.value })}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500"
          >
            <option value="">Select...</option>
            <option value="training">Training (fine-tuning)</option>
            <option value="inference">Inference only</option>
            <option value="both">Both training & inference</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Typical Batch Size
          </label>
          <select
            value={optimizerData.batchSize}
            onChange={(e) => setOptimizerData({ ...optimizerData, batchSize: e.target.value })}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500"
          >
            <option value="">Select...</option>
            <option value="small">Small (1-8)</option>
            <option value="medium">Medium (8-32)</option>
            <option value="large">Large (32+)</option>
            <option value="unsure">Not sure</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Budget (per hour)
          </label>
          <select
            value={optimizerData.budget}
            onChange={(e) => setOptimizerData({ ...optimizerData, budget: e.target.value })}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500"
          >
            <option value="">Select...</option>
            <option value="budget">Budget ($0.50-$1.50/hr)</option>
            <option value="balanced">Balanced ($1.50-$2.50/hr)</option>
            <option value="performance">Performance ($2.50+/hr)</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>
      </div>

      <button
        onClick={() => setShowResults(true)}
        disabled={!optimizerData.gpuMemory || !optimizerData.workloadType || !optimizerData.batchSize || !optimizerData.budget}
        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 disabled:from-slate-700 disabled:to-slate-700 text-white px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <Sparkles className="w-5 h-5" />
        Find My Perfect GPU
      </button>
    </div>
  );
};

const OptimizerResults = ({ formData, optimizerData, onBack }) => {
  const optimized = {
    gpu: 'A100 40GB',
    provider: 'Vast.ai',
    basePrice: 1.29,
    ourPrice: 1.55,
    totalCost: (1.55 * formData.hours * formData.instances).toFixed(2),
    savings: 79.20
  };

  const alternatives = [
    { name: 'H100 80GB', price: 3.47, cost: (3.47 * formData.hours * formData.instances).toFixed(2), waste: 153.60 },
    { name: 'A100 80GB', price: 2.27, cost: (2.27 * formData.hours * formData.instances).toFixed(2), waste: 57.60 },
    { name: 'RTX 4090 x2', price: 1.66, cost: (1.66 * formData.hours * formData.instances).toFixed(2), waste: 8.80 }
  ];

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="text-blue-400 hover:text-blue-300 flex items-center gap-2">
        ← Back to questions
      </button>

      <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-500/50 rounded-xl p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="bg-green-500/30 p-3 rounded-lg">
            <Sparkles className="w-8 h-8 text-green-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2 text-green-400">Perfect Match Found!</h3>
            <p className="text-slate-300">Based on your workload analysis</p>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xl font-bold">{optimized.gpu}</span>
            <span className="text-2xl font-bold text-green-400">${optimized.totalCost}</span>
          </div>
          <div className="text-sm text-slate-400">
            via {optimized.provider} • {formData.instances}x instances • {formData.hours} hours
          </div>
        </div>

        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-1">${optimized.savings.toFixed(2)}</div>
            <div className="text-sm text-slate-300">Saved vs. next best option</div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 rounded-xl p-6">
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <TrendingDown className="w-5 h-5 text-red-400" />
          What You Would've Wasted
        </h4>
        
        <div className="space-y-3">
          {alternatives.map((alt, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-700
">
              <div>
                <div className="font-medium">{alt.name}</div>
                <div className="text-sm text-slate-400">${alt.price}/hr</div>
              </div>
              <div className="text-right">
                <div className="text-slate-300">${alt.cost} total</div>
                <div className="text-sm text-red-400">+${alt.waste.toFixed(2)} wasted</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-800/50 rounded-xl p-6">
        <h4 className="font-semibold text-lg mb-4">Transparent Pricing</h4>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-400">Provider Base Rate:</span>
            <span>${optimized.basePrice}/hour</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Our Service Fee (20%):</span>
            <span>+${(optimized.ourPrice - optimized.basePrice).toFixed(2)}/hour</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Your Rate:</span>
            <span className="font-semibold">${optimized.ourPrice}/hour</span>
          </div>
          <div className="pt-3 border-t border-slate-700 flex justify-between">
            <span className="text-slate-400">Instances × Duration:</span>
            <span>{formData.instances}x × {formData.hours}hrs</span>
          </div>
          <div className="flex justify-between text-lg font-bold pt-2 border-t border-slate-700">
            <span>Final Total:</span>
            <span className="text-green-400">${optimized.totalCost}</span>
          </div>
        </div>
      </div>

      <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
        <DollarSign className="w-5 h-5" />
        Proceed to Checkout - ${optimized.totalCost}
      </button>

      <div className="text-center text-sm text-slate-400">
        <p>🎉 This optimization was <span className="text-green-400 font-semibold">FREE</span></p>
        <p className="mt-1">Want this every time you rent? We'll ask at checkout.</p>
      </div>
    </div>
  );
};

export default GPURentalHomepage;
