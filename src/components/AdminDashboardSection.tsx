import React, { useState } from 'react';
import { ShieldCheck, Users, Briefcase, FileCheck, ShoppingCart, Send, Settings, CheckCircle2, XCircle, PlusCircle, BarChart3, TrendingUp, AlertTriangle, Layers, Database, Lock, RefreshCw, Check } from 'lucide-react';
import { Job, MockTest, Product, Order, UserProfile } from '../types';

interface AdminDashboardSectionProps {
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
  mockTests: MockTest[];
  setMockTests: React.Dispatch<React.SetStateAction<MockTest[]>>;
}

export const AdminDashboardSection: React.FC<AdminDashboardSectionProps> = ({ jobs, setJobs, mockTests, setMockTests }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'jobs' | 'mocks' | 'orders' | 'social'>('overview');

  // Simulated Users
  const [userList, setUserList] = useState<UserProfile[]>([
    { id: 'usr-1', name: 'Ajay Rathava', email: 'ajayrathava942@gmail.com', phone: '9876543210', role: 'aspirant', walletBalance: 450, unlockedResumesCount: 12, referralCode: 'GOVPREP', referralsCount: 7, status: 'Active' },
    { id: 'usr-2', name: 'Rohan Sharma', email: 'rohan@edtech.com', phone: '9812345678', role: 'employer', companyName: 'EdTech Solutions', walletBalance: 2500, unlockedResumesCount: 50, referralCode: 'EDTECH', referralsCount: 2, status: 'Active' },
    { id: 'usr-3', name: 'Admin Master', email: 'admin@naukriexams.in', phone: '9999999999', role: 'admin', walletBalance: 10000, unlockedResumesCount: 999, referralCode: 'ADMIN', referralsCount: 0, status: 'Active' },
  ]);

  // Social Broadcast State
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [channels, setChannels] = useState({ telegram: true, push: true, linkedin: false, threads: false });

  // New Mock Test State
  const [newMockTitle, setNewMockTitle] = useState('');
  const [newMockCategory, setNewMockCategory] = useState('UPSC');
  const [newMockDuration, setNewMockDuration] = useState(60);

  const handleToggleUserStatus = (userId: string) => {
    setUserList(userList.map((u) => u.id === userId ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u));
  };

  const handleApproveJob = (jobId: string) => {
    setJobs(jobs.map((j) => j.id === jobId ? { ...j, isBoosted: true } : j));
    alert('Job Listing Approved & Featured on Portal Feed!');
  };

  const handleDeleteJob = (jobId: string) => {
    setJobs(jobs.filter((j) => j.id !== jobId));
    alert('Job Listing Removed from Portal Database.');
  };

  const handleCreateMockTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMockTitle) return;

    const test: MockTest = {
      id: `mt-${Date.now()}`,
      title: newMockTitle,
      examCategory: newMockCategory,
      totalQuestions: 25,
      durationMinutes: newMockDuration,
      totalMarks: 50,
      attemptsCount: 0,
      difficulty: 'Moderate',
      isFree: true,
      questions: [
        {
          id: 'q-1',
          questionText: 'Which article of the Indian Constitution guarantees Equality Before Law?',
          options: ['Article 12', 'Article 14', 'Article 19', 'Article 21'],
          correctIndex: 1,
          explanation: 'Article 14 guarantees equality before law and equal protection of laws.'
        }
      ]
    };

    setMockTests([test, ...mockTests]);
    alert(`Mock Test Series "${newMockTitle}" Created and Live for Aspirants!`);
    setNewMockTitle('');
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastMessage) return;
    alert(`Broadcast Dispatched via Telegram & Push Notifications to 42,900+ Subscribers!`);
    setBroadcastMessage('');
  };

  return (
    <section className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Header */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-3 py-1 rounded-full text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>System Control & Admin Suite</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight">
              Master Admin Control Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              User role management, job moderation queue, CBT test creator, order fulfillment, and social broadcasts.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 p-3 rounded-2xl border border-white/10 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Server Health</span>
              <span className="font-extrabold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 100% Operational
              </span>
            </div>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-200 overflow-x-auto gap-4 text-xs font-bold">
          {[
            { id: 'overview', label: 'KPI Analytics', icon: BarChart3 },
            { id: 'users', label: `User Accounts (${userList.length})`, icon: Users },
            { id: 'jobs', label: `Job Moderation (${jobs.length})`, icon: Briefcase },
            { id: 'mocks', label: 'CBT Test Studio', icon: FileCheck },
            { id: 'social', label: 'Social Broadcast', icon: Send },
          ].map((tab) => {
            const IconComp = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 px-2 flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
                  isActive
                    ? 'text-indigo-600 border-b-2 border-indigo-600 font-extrabold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <IconComp className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* OVERVIEW KPI METRICS */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Registered Users', val: '128,450', change: '+12% this week', color: 'text-indigo-600' },
                { label: 'Active Job Openings', val: jobs.length.toString(), change: '148 Verified', color: 'text-emerald-600' },
                { label: 'Monthly Pass Pro Revenue', val: '₹4,85,900', change: '+18% growth', color: 'text-amber-600' },
                { label: 'Total CBT Mocks Taken', val: '94,200', change: 'Live Leaderboard', color: 'text-blue-600' },
              ].map((kpi, idx) => (
                <div key={idx} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs space-y-1">
                  <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">{kpi.label}</span>
                  <div className={`text-2xl font-black ${kpi.color}`}>{kpi.val}</div>
                  <span className="text-[11px] text-slate-400 font-semibold">{kpi.change}</span>
                </div>
              ))}
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-4">
              <h3 className="font-heading font-extrabold text-lg text-slate-900">System Activity Logs & Automated Jobs</h3>
              <div className="space-y-2 text-xs font-mono">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex justify-between text-slate-700">
                  <span>[HANGFIRE] Auto-dispatched 42,900 daily exam alert emails</span>
                  <span className="text-emerald-600 font-bold">SUCCESS (0.2s)</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex justify-between text-slate-700">
                  <span>[RSS PARSER] Synced UPSC & SSC official feed items</span>
                  <span className="text-emerald-600 font-bold">14 NEW JOBS</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex justify-between text-slate-700">
                  <span>[RAZORPAY] Webhook processed Pass Pro subscription order</span>
                  <span className="text-emerald-600 font-bold">VERIFIED ₹499</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* USER MANAGEMENT TAB */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-heading font-extrabold text-slate-900">User Accounts Control</h2>

            <div className="space-y-3">
              {userList.map((u) => (
                <div key={u.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{u.name} ({u.role.toUpperCase()})</div>
                    <div className="text-slate-500">{u.email} • {u.phone} • Wallet: ₹{u.walletBalance}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${u.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                      {u.status}
                    </span>
                    <button
                      onClick={() => handleToggleUserStatus(u.id)}
                      className="bg-slate-900 text-white font-bold text-[11px] px-3 py-1.5 rounded-xl cursor-pointer"
                    >
                      {u.status === 'Active' ? 'Suspend' : 'Activate'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* JOB MODERATION QUEUE TAB */}
        {activeTab === 'jobs' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-heading font-extrabold text-slate-900">Job Moderation & Verification Queue</h2>

            <div className="space-y-3">
              {jobs.map((j) => (
                <div key={j.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{j.title}</div>
                    <div className="text-slate-500">{j.companyOrDept} • Vacancies: {j.vacancyCount} • {j.salary}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleApproveJob(j.id)}
                      className="bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-xl cursor-pointer"
                    >
                      Approve & Feature
                    </button>
                    <button
                      onClick={() => handleDeleteJob(j.id)}
                      className="bg-red-600 text-white font-bold px-3 py-1.5 rounded-xl cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CBT TEST CREATOR STUDIO */}
        {activeTab === 'mocks' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-heading font-extrabold text-slate-900">Create New CBT Mock Test Series</h2>

            <form onSubmit={handleCreateMockTest} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold">
              <div className="sm:col-span-2">
                <label className="text-slate-700 block mb-1">Mock Test Series Title</label>
                <input
                  type="text"
                  required
                  value={newMockTitle}
                  onChange={(e) => setNewMockTitle(e.target.value)}
                  placeholder="e.g. SSC CGL 2026 Tier-1 Official Pattern Mock #05"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="text-slate-700 block mb-1">Category</label>
                <select
                  value={newMockCategory}
                  onChange={(e) => setNewMockCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-medium"
                >
                  <option value="UPSC">UPSC</option>
                  <option value="SSC">SSC</option>
                  <option value="Banking">Banking</option>
                  <option value="Railways">Railways</option>
                </select>
              </div>

              <div className="sm:col-span-3">
                <button
                  type="submit"
                  className="bg-indigo-600 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl cursor-pointer shadow-md"
                >
                  Publish CBT Test Series
                </button>
              </div>
            </form>
          </div>
        )}

        {/* SOCIAL BROADCAST SCHEDULER */}
        {activeTab === 'social' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-heading font-extrabold text-slate-900">Multi-Channel Social Broadcast Studio</h2>

            <form onSubmit={handleSendBroadcast} className="space-y-4 text-xs font-bold">
              <div>
                <label className="text-slate-700 block mb-1">Alert Broadcast Message</label>
                <textarea
                  rows={4}
                  required
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  placeholder="🔥 NEW VACANCY ALERT: SSC CGL 14,250 Posts Notification Out! Apply before Sept 15..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-slate-900 font-medium focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="bg-indigo-600 text-white font-extrabold text-xs px-6 py-3 rounded-2xl cursor-pointer shadow-md flex items-center gap-2"
              >
                <Send className="w-4 h-4" /> Dispatch Broadcast to 42.9k Subscribers
              </button>
            </form>
          </div>
        )}

      </div>
    </section>
  );
};
