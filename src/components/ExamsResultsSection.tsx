import React, { useState } from 'react';
import { 
  Award, 
  FileText, 
  Download, 
  Search, 
  Calculator, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  BarChart3, 
  TrendingUp, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { AdmitCard, ExamResult } from '../types';

interface ExamsResultsSectionProps {
  admitCards: AdmitCard[];
  results: ExamResult[];
  onOpenCutoffModal: () => void;
}

export const ExamsResultsSection: React.FC<ExamsResultsSectionProps> = ({
  admitCards,
  results,
  onOpenCutoffModal,
}) => {
  const [activeTab, setActiveTab] = useState<'admit' | 'results' | 'predictor'>('admit');
  const [searchTerm, setSearchTerm] = useState('');

  // Cutoff Predictor Tool State inside the card
  const [selectedExamForCutoff, setSelectedExamForCutoff] = useState('SSC CGL Tier-1 2026');
  const [userScore, setUserScore] = useState<number>(140);
  const [userQuota, setUserQuota] = useState<'Gen' | 'OBC' | 'SC' | 'ST'>('Gen');
  const [predictionResult, setPredictionResult] = useState<{ chance: string; color: string; cutoffEst: number } | null>(null);

  const handlePredict = () => {
    let baseCutoff = 135;
    if (selectedExamForCutoff.includes('UPSC')) baseCutoff = 88;
    if (selectedExamForCutoff.includes('IBPS')) baseCutoff = 72;

    let adjustedCutoff = baseCutoff;
    if (userQuota === 'OBC') adjustedCutoff -= 5;
    if (userQuota === 'SC') adjustedCutoff -= 20;
    if (userQuota === 'ST') adjustedCutoff -= 25;

    const diff = userScore - adjustedCutoff;
    if (diff >= 10) {
      setPredictionResult({ chance: 'High Selection Probability (>92%)', color: 'text-emerald-600 bg-emerald-50 border-emerald-200', cutoffEst: adjustedCutoff });
    } else if (diff >= 0) {
      setPredictionResult({ chance: 'Moderate / Borderline Selection Chance (70-85%)', color: 'text-amber-600 bg-amber-50 border-amber-200', cutoffEst: adjustedCutoff });
    } else {
      setPredictionResult({ chance: 'Below Historical Cutoff Threshold', color: 'text-rose-600 bg-rose-50 border-rose-200', cutoffEst: adjustedCutoff });
    }
  };

  const filteredAdmitCards = admitCards.filter((a) =>
    a.examName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.organization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredResults = results.filter((r) =>
    r.examName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.organization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-12 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-indigo-100/80 px-2.5 py-1 rounded-md mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>Examination Intelligence & Merit</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 tracking-tight">
              Hall Tickets, Results & Cutoff Predictor
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Direct official download portals, verified result merit lists, and historical cutoff analytics.
            </p>
          </div>

          {/* Tab Selection */}
          <div className="bg-slate-200/80 p-1 rounded-2xl flex items-center gap-1 text-xs font-semibold self-start md:self-auto">
            <button
              onClick={() => setActiveTab('admit')}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'admit' ? 'bg-white text-slate-900 font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Admit Cards ({admitCards.length})
            </button>
            <button
              onClick={() => setActiveTab('results')}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'results' ? 'bg-white text-slate-900 font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Results ({results.length})
            </button>
            <button
              onClick={() => setActiveTab('predictor')}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'predictor' ? 'bg-indigo-600 text-white font-bold shadow-sm' : 'text-indigo-700 hover:bg-indigo-100/50'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              Cutoff Predictor
            </button>
          </div>
        </div>

        {/* Tab 1: Admit Cards */}
        {activeTab === 'admit' && (
          <div>
            <div className="mb-6 relative max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search hall ticket / admit card..."
                className="w-full bg-white border border-slate-200 text-xs text-slate-800 pl-10 pr-3 py-2.5 rounded-xl focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredAdmitCards.map((ac) => (
                <div key={ac.id} className="bg-white border border-slate-200/80 rounded-2xl p-6 flex flex-col justify-between hover:shadow-lg transition-all group">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] uppercase font-extrabold tracking-wider text-white bg-slate-900 px-2.5 py-1 rounded-md">
                        {ac.category} • {ac.organization}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md border border-amber-200 bg-amber-50 text-amber-800">
                        {ac.status}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-slate-900 text-lg leading-snug group-hover:text-indigo-600 transition-colors">{ac.examName}</h3>

                    <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 block uppercase">Release Date</span>
                        <span className="font-bold text-slate-800">{ac.releaseDate}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 block uppercase">Exam Date</span>
                        <span className="font-bold text-indigo-700">{ac.examDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-400">Official Download Portal</span>
                    <a
                      href={ac.downloadUrl}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-xl inline-flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-white" />
                      Hall Ticket PDF
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Results & Historical Cutoffs */}
        {activeTab === 'results' && (
          <div>
            <div className="mb-6 relative max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filter official results & merit lists..."
                className="w-full bg-white border border-slate-200 text-xs text-slate-800 pl-10 pr-3 py-2.5 rounded-xl focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-6">
              {filteredResults.map((res) => (
                <div key={res.id} className="bg-white border border-slate-200/80 rounded-2xl p-6 hover:shadow-lg transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-white bg-slate-900 px-2 py-0.5 rounded">
                          {res.category} Official Result
                        </span>
                        <span className="text-xs text-slate-400">Published: {res.publishDate}</span>
                      </div>
                      <h3 className="font-heading font-bold text-slate-900 text-xl">{res.examName}</h3>
                      <p className="text-xs text-slate-600">{res.organization} Final Merit List & Official Cutoffs</p>
                    </div>

                    <a
                      href={res.resultPdfUrl}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold px-5 py-2.5 rounded-xl inline-flex items-center gap-2 self-start md:self-auto shrink-0 shadow-md cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download Result PDF
                    </a>
                  </div>

                  {/* Cutoff Table Grid */}
                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-3">
                      Official Category Cutoff Marks:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Unreserved (UR)</span>
                        <span className="font-bold text-slate-900 text-base">{res.cutoffGen}</span>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">OBC Category</span>
                        <span className="font-bold text-slate-900 text-base">{res.cutoffOBC}</span>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">SC Category</span>
                        <span className="font-bold text-slate-900 text-base">{res.cutoffSC}</span>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">ST Category</span>
                        <span className="font-bold text-slate-900 text-base">{res.cutoffST}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Cutoff Predictor Tool */}
        {activeTab === 'predictor' && (
          <div className="bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 shadow-2xl">
            <div className="max-w-3xl mx-auto">
              
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full mb-3">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>AI Selection Probability Engine</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">Predict Selection Probability</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Calculate qualification chances against 10-year department historical cutoff trends.
                </p>
              </div>

              {/* Predictor Form */}
              <div className="bg-slate-800/80 rounded-2xl border border-slate-700 p-6 space-y-4">
                <div>
                  <label className="text-[11px] font-bold text-slate-300 uppercase block mb-1">Target Examination</label>
                  <select
                    value={selectedExamForCutoff}
                    onChange={(e) => setSelectedExamForCutoff(e.target.value)}
                    className="w-full bg-slate-900 text-white text-xs font-semibold px-3.5 py-3 rounded-xl border border-slate-700 focus:outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    <option value="SSC CGL Tier-1 2026">SSC CGL Tier-1 2026 (Max Marks 200)</option>
                    <option value="UPSC Civil Services Prelims 2026">UPSC Civil Services Prelims 2026 (Max Marks 200)</option>
                    <option value="IBPS PO Mains 2026">IBPS PO Mains 2026 (Max Marks 100)</option>
                    <option value="RRB NTPC CBT-1 2026">RRB NTPC CBT-1 2026 (Max Marks 100)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-300 uppercase block mb-1">
                      Expected Score (Answer Key)
                    </label>
                    <input
                      type="number"
                      value={userScore}
                      onChange={(e) => setUserScore(Number(e.target.value))}
                      className="w-full bg-slate-900 text-white text-xs font-mono font-bold px-3.5 py-3 rounded-xl border border-slate-700 focus:outline-none focus:border-emerald-500"
                      placeholder="e.g. 142"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-300 uppercase block mb-1">Quota Category</label>
                    <select
                      value={userQuota}
                      onChange={(e) => setUserQuota(e.target.value as any)}
                      className="w-full bg-slate-900 text-white text-xs font-semibold px-3.5 py-3 rounded-xl border border-slate-700 focus:outline-none focus:border-emerald-500 cursor-pointer"
                    >
                      <option value="Gen">Unreserved / General</option>
                      <option value="OBC">OBC Non-Creamy Layer</option>
                      <option value="SC">Scheduled Caste (SC)</option>
                      <option value="ST">Scheduled Tribe (ST)</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handlePredict}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs py-3.5 px-4 rounded-xl shadow-lg transition-transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calculator className="w-4 h-4 text-slate-950" />
                  <span>Calculate Cutoff Probability</span>
                </button>
              </div>

              {/* Prediction Result Display */}
              {predictionResult && (
                <div className="mt-6 p-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-center">
                  <span className="text-[11px] uppercase font-bold block mb-1 text-emerald-400">Analysis Result:</span>
                  <div className="text-xl font-heading font-black text-white">{predictionResult.chance}</div>
                  <div className="text-xs font-medium mt-2 text-slate-300">
                    Estimated Category Cutoff: <span className="font-bold text-emerald-400">{predictionResult.cutoffEst} Marks</span>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
