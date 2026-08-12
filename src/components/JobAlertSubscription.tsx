import React, { useState } from 'react';
import { Bell, CheckCircle2, Mail, MessageSquare, ShieldCheck, Sparkles, Filter, Check } from 'lucide-react';

interface JobAlertSubscriptionProps {
  onClose?: () => void;
  isModal?: boolean;
}

export const JobAlertSubscription: React.FC<JobAlertSubscriptionProps> = ({ onClose, isModal = false }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [frequency, setFrequency] = useState<'instant' | 'daily' | 'weekly'>('daily');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['SSC', 'UPSC', 'Banking']);
  const [selectedQualification, setSelectedQualification] = useState('Graduate');
  const [selectedRegion, setSelectedRegion] = useState('All India / Central');
  const [deliveryChannels, setDeliveryChannels] = useState<{ email: boolean; whatsapp: boolean; push: boolean }>({
    email: true,
    whatsapp: true,
    push: false,
  });

  const [subscribed, setSubscribed] = useState(false);

  const categoriesList = ['UPSC', 'SSC', 'Banking', 'Railways', 'Defense', 'State PSC', 'Teaching', 'Police', 'Private IT'];
  const qualificationsList = ['10th Pass', '12th Pass', 'Diploma', 'Graduate', 'Engineering / B.Tech', 'Post Graduate'];
  const regionsList = ['All India / Central', 'Delhi NCR', 'Uttar Pradesh', 'Bihar', 'Maharashtra', 'Gujarat', 'South India'];

  const toggleCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <div className={`bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden ${isModal ? 'max-w-2xl w-full mx-auto' : ''}`}>
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 relative">
        <div className="absolute right-4 top-4 opacity-10 pointer-events-none">
          <Bell className="w-32 h-32 text-indigo-400" />
        </div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Automated Daily Job Alerts</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white tracking-tight">
            Never Miss Official Vacancies
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-lg">
            Get instant WhatsApp & Email alerts customized for your category, state, and qualification. Zero spam guaranteed.
          </p>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-6 sm:p-8">
        {subscribed ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-heading font-extrabold text-slate-900">
              Alert Preferences Saved!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              We have configured daily notifications for <span className="font-bold text-slate-900">{email}</span> matching{' '}
              <span className="font-bold text-emerald-700">{selectedCategories.join(', ')}</span> vacancies.
            </p>

            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 max-w-md mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between text-slate-600">
                <span>Frequency:</span>
                <span className="font-bold text-slate-900 capitalize">{frequency} Dispatch</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Qualification:</span>
                <span className="font-bold text-slate-900">{selectedQualification}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Target Region:</span>
                <span className="font-bold text-slate-900">{selectedRegion}</span>
              </div>
            </div>

            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={() => setSubscribed(false)}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 underline cursor-pointer"
              >
                Modify Alert Preferences
              </button>
              {onClose && (
                <button
                  onClick={onClose}
                  className="bg-slate-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer"
                >
                  Close Window
                </button>
              )}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Contact details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Email Address <span className="text-emerald-600">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="aspirant@gmail.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 pl-10 pr-3 py-3 focus:outline-none focus:border-emerald-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  WhatsApp Number (Optional)
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 pl-10 pr-3 py-3 focus:outline-none focus:border-emerald-500 font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Category selection */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">
                Select Target Categories (Choose multiple)
              </label>
              <div className="flex flex-wrap gap-2">
                {categoriesList.map((cat) => {
                  const isSelected = selectedCategories.includes(cat);
                  return (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold shadow-2xs'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                      <span>{cat}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Qualification & Region */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Highest Qualification</label>
                <select
                  value={selectedQualification}
                  onChange={(e) => setSelectedQualification(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 px-3 py-2.5 focus:outline-none focus:border-emerald-500 font-medium cursor-pointer"
                >
                  {qualificationsList.map((q) => (
                    <option key={q} value={q}>
                      {q}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Target Region / State</label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 px-3 py-2.5 focus:outline-none focus:border-emerald-500 font-medium cursor-pointer"
                >
                  {regionsList.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Delivery Channels & Frequency */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">Alert Frequency</label>
                <div className="flex gap-2">
                  {[
                    { id: 'instant', label: 'Realtime' },
                    { id: 'daily', label: 'Daily 9 AM' },
                    { id: 'weekly', label: 'Weekly' },
                  ].map((f) => (
                    <button
                      type="button"
                      key={f.id}
                      onClick={() => setFrequency(f.id as any)}
                      className={`flex-1 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                        frequency === f.id
                          ? 'bg-slate-900 text-white border-slate-900 font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">Channels</label>
                <div className="flex items-center gap-4 text-xs font-medium text-slate-700">
                  <label className="inline-flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={deliveryChannels.email}
                      onChange={(e) => setDeliveryChannels({ ...deliveryChannels, email: e.target.checked })}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Email</span>
                  </label>
                  <label className="inline-flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={deliveryChannels.whatsapp}
                      onChange={(e) => setDeliveryChannels({ ...deliveryChannels, whatsapp: e.target.checked })}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>WhatsApp</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                1-Click Unsubscribe Anytime
              </span>

              <div className="flex gap-2">
                {onClose && (
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-6 py-2.5 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Activate Job Alerts
                </button>
              </div>
            </div>

          </form>
        )}
      </div>
    </div>
  );
};
