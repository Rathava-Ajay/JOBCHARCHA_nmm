import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  Award, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Calculator,
  Download
} from 'lucide-react';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedQualification: string;
  setSelectedQualification: (qual: string) => void;
  selectedLocation: string;
  setSelectedLocation: (loc: string) => void;
  onOpenCutoffPredictor: () => void;
  onOpenQuickQuiz: () => void;
  onSelectTab: (tabId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedQualification,
  setSelectedQualification,
  selectedLocation,
  setSelectedLocation,
  onOpenCutoffPredictor,
  onOpenQuickQuiz,
  onSelectTab,
}) => {
  const categories = [
    { id: 'All', label: 'All Portals' },
    { id: 'UPSC', label: 'UPSC & IAS' },
    { id: 'SSC', label: 'SSC CGL/CHSL' },
    { id: 'Banking', label: 'Banking & IBPS' },
    { id: 'Railways', label: 'Railways RRB' },
    { id: 'Defense', label: 'Defense & Police' },
    { id: 'State PSC', label: 'State PSCs' },
    { id: 'Private', label: 'Private Jobs' },
  ];

  const qualifications = [
    'All Qualifications',
    'Graduate in Any Stream',
    '12th Pass / Intermediate',
    '10th Pass / Matriculation',
    'B.Tech / BE / Engineering',
    'Post Graduate / Master'
  ];

  const locations = [
    'All India / Central',
    'New Delhi',
    'Uttar Pradesh',
    'Maharashtra',
    'Karnataka',
    'West Bengal',
    'Bihar',
    'Tamil Nadu',
    'Gujarat'
  ];

  return (
    <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Hero Headline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 items-center">
          
          {/* Left Column (7 cols): Main Title & CTA */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>India's #1 Govt Jobs & CBT Exam Platform</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight mb-5 text-white leading-tight">
                Find Your Dream <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Government Job</span> & Crack Exams Faster
              </h1>
              <p className="text-sm sm:text-base text-slate-300 max-w-xl mb-8 leading-relaxed font-normal">
                Real-time official gazette job alerts, hall ticket downloads, merit list cutoffs, CBT mock tests, and AI-powered rank predictors for 42+ central & state departments.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => onSelectTab('jobs')}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-6 py-3.5 rounded-2xl text-xs font-extrabold shadow-lg shadow-emerald-500/20 transition-all active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <span>Explore 12,400+ Vacancies</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onSelectTab('exams')}
                className="bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 px-6 py-3.5 rounded-2xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-2"
              >
                <Award className="w-4 h-4 text-emerald-400" />
                <span>Admit Cards & Cutoffs</span>
              </button>
            </div>
          </div>

          {/* Right Column (5 cols): Modern Urgent Hall Ticket Widget */}
          <div className="lg:col-span-5 bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-4">
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-emerald-400" /> Trending Portal
                </span>
                <span className="text-[11px] font-mono text-slate-400 font-semibold">Live Feed</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white mb-2 leading-snug">
                UPSC Civil Services 2026 Prelims Admit Cards
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed mb-6 font-normal">
                Direct official link active. Check exam hall center allocation, guidelines, and download admit card PDF instantly.
              </p>

              <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-700/60 flex items-center justify-between mb-5">
                <div className="text-xs">
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Downloads Today</span>
                  <span className="font-bold text-emerald-400 font-mono">84,210 Aspirants</span>
                </div>
                <div className="text-xs text-right">
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Exam Date</span>
                  <span className="font-bold text-amber-400 font-mono">28th May 2026</span>
                </div>
              </div>

              <button
                onClick={() => onSelectTab('exams')}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Admit Card PDF</span>
              </button>
            </div>
          </div>

        </div>

        {/* Modern Unified Job Filter Bar */}
        <div className="bg-white text-slate-900 rounded-3xl p-6 shadow-xl border border-slate-200/80 mb-10">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-5">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Quick Filter Jobs</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-emerald-600 text-white font-bold shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-[11px] font-bold uppercase text-slate-500 block mb-1">Keywords / Post Name</label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. IAS, CGL, Assistant..."
                  className="w-full bg-slate-50 text-xs font-medium pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase text-slate-500 block mb-1">Qualification Needed</label>
              <div className="relative">
                <GraduationCap className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <select
                  value={selectedQualification}
                  onChange={(e) => setSelectedQualification(e.target.value)}
                  className="w-full bg-slate-50 text-xs font-medium pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:bg-white cursor-pointer"
                >
                  {qualifications.map((q) => (
                    <option key={q} value={q}>{q}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase text-slate-500 block mb-1">State / Location</label>
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full bg-slate-50 text-xs font-medium pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:bg-white cursor-pointer"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => onSelectTab('jobs')}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-3 px-4 rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Find Matching Jobs</span>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
              </button>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold text-emerald-700 uppercase">Popular AI Tools:</span>
              <button 
                onClick={onOpenCutoffPredictor}
                className="text-xs font-bold text-slate-800 hover:text-emerald-600 underline decoration-emerald-500"
              >
                <Calculator className="w-3.5 h-3.5 inline mr-1 text-emerald-600" />
                Cutoff Predictor
              </button>
              <span className="text-slate-300">•</span>
              <button 
                onClick={onOpenQuickQuiz}
                className="text-xs font-bold text-slate-800 hover:text-emerald-600 underline decoration-emerald-500"
              >
                <Sparkles className="w-3.5 h-3.5 inline mr-1 text-amber-500" />
                3-Min Daily Speed Test
              </button>
            </div>
            <div className="text-[11px] font-medium text-slate-500">
              ⚡ Synchronized live with Employment News & Official Department Portals
            </div>
          </div>
        </div>

        {/* Bottom Modern Metric Cards (4 Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-heading font-extrabold text-white">12,402+</div>
              <div className="text-xs text-slate-400">Verified Openings</div>
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-heading font-extrabold text-white">98.4%</div>
              <div className="text-xs text-slate-400">AI Cutoff Accuracy</div>
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-heading font-extrabold text-white">50k+ PDFs</div>
              <div className="text-xs text-slate-400">Solved Past Papers</div>
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-heading font-extrabold text-white">42 Depts</div>
              <div className="text-xs text-slate-400">Official Gazettes</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
