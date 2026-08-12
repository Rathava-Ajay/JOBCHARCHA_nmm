import React, { useState } from 'react';
import { 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  CreditCard, 
  Zap, 
  Star, 
  Lock, 
  HelpCircle,
  X
} from 'lucide-react';
import { PricingPlan } from '../types';

interface PricingSectionProps {
  pricingPlans: PricingPlan[];
  activeRole: 'aspirant' | 'employer';
  setActiveRole: (role: 'aspirant' | 'employer') => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  pricingPlans,
  activeRole,
  setActiveRole,
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<PricingPlan | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const filteredPlans = pricingPlans.filter((p) => p.targetRole === activeRole);

  const handleSimulatePayment = () => {
    setPaymentSuccess(true);
    setTimeout(() => {
      setPaymentSuccess(false);
      setSelectedPlanForCheckout(null);
    }, 2500);
  };

  return (
    <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
      
      {/* Background accents */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-purple-500/10 blur-[120px] pointer-events-none rounded-full"></div>
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-emerald-500/10 blur-[120px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full text-xs font-semibold mb-3">
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            <span>Transparent Subscription & Job Posting Plans</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Choose the Perfect Plan for Your Journey
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            No hidden fees. Instant access to 800+ CBT Mock Test Series or Employer Candidate Resume Unlocks.
          </p>

          {/* Role & Billing Toggles */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Role Switcher */}
            <div className="bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs font-semibold flex items-center">
              <button
                onClick={() => setActiveRole('aspirant')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeRole === 'aspirant' ? 'bg-emerald-500 text-slate-950 font-bold shadow-md' : 'text-slate-300 hover:text-white'
                }`}
              >
                For Job Aspirants
              </button>
              <button
                onClick={() => setActiveRole('employer')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeRole === 'employer' ? 'bg-indigo-600 text-white font-bold shadow-md' : 'text-slate-300 hover:text-white'
                }`}
              >
                For Employers & Recruiters
              </button>
            </div>

            {/* Cycle Switcher */}
            <div className="bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs font-semibold flex items-center gap-2">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  billingCycle === 'monthly' ? 'bg-white text-slate-950 font-bold' : 'text-slate-400'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                  billingCycle === 'yearly' ? 'bg-white text-slate-950 font-bold' : 'text-slate-400'
                }`}
              >
                Annual Pass <span className="text-[9px] bg-amber-400 text-slate-950 px-1 rounded font-extrabold">Save 50%</span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {filteredPlans.map((plan) => {
            const price = billingCycle === 'yearly' ? plan.priceYearly : plan.priceMonthly;

            return (
              <div
                key={plan.id}
                className={`bg-slate-800/90 border rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative transition-all ${
                  plan.popular ? 'border-emerald-400 ring-2 ring-emerald-500/30 shadow-2xl scale-102' : 'border-slate-700'
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3.5 right-6 bg-emerald-500 text-slate-950 text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-md">
                    {plan.badge}
                  </span>
                )}

                <div>
                  <h3 className="text-xl font-black text-white">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-black text-white">₹{price}</span>
                    <span className="text-xs text-slate-400 font-semibold">
                      / {billingCycle === 'yearly' ? 'year' : 'month'}
                    </span>
                  </div>

                  <ul className="mt-6 space-y-3 text-xs text-slate-300">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-700">
                  <button
                    onClick={() => setSelectedPlanForCheckout(plan)}
                    className={`w-full text-xs font-black py-3 rounded-xl transition-transform active:scale-98 flex items-center justify-center gap-1.5 cursor-pointer ${
                      plan.popular
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg'
                        : 'bg-white hover:bg-slate-100 text-slate-950'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>{price === 0 ? 'Start Free Now' : 'Upgrade Plan Now'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Razorpay Gateway Simulation Modal */}
        {selectedPlanForCheckout && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white text-slate-900 rounded-3xl max-w-md w-full p-6 relative shadow-2xl border border-slate-200">
              <button
                onClick={() => setSelectedPlanForCheckout(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <CreditCard className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Razorpay Secure Checkout</span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">{selectedPlanForCheckout.name}</h3>
                <p className="text-xs text-slate-500">
                  Total Amount: <span className="font-bold text-slate-900">₹{billingCycle === 'yearly' ? selectedPlanForCheckout.priceYearly : selectedPlanForCheckout.priceMonthly}</span>
                </p>
              </div>

              {paymentSuccess ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-center space-y-2">
                  <Check className="w-8 h-8 text-emerald-600 mx-auto" />
                  <div className="font-black text-sm">Payment Received Successfully!</div>
                  <div className="text-xs text-emerald-700">Receipt ID: #RZP-88492026 • Plan Activated</div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Payment Option</span>
                      <span className="font-bold text-slate-800">UPI / GPay / NetBanking / Cards</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">GST (Inclusive)</span>
                      <span className="font-bold text-slate-800">18% Included</span>
                    </div>
                  </div>

                  <button
                    onClick={handleSimulatePayment}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs py-3 rounded-xl shadow-md transition-transform active:scale-95 cursor-pointer"
                  >
                    Pay & Activate Instant Plan
                  </button>
                  <p className="text-[10px] text-center text-slate-400">
                    256-Bit SSL Encrypted • Cancel Anytime in Account Settings
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
