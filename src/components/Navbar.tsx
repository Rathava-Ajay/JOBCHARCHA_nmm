import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  Wallet, 
  User, 
  Briefcase, 
  GraduationCap, 
  FileText, 
  Award, 
  Sparkles, 
  Layers, 
  BookOpen, 
  ChevronDown, 
  LogOut,
  Share2,
  Clock,
  ShoppingBag,
  ShieldCheck,
  Building2,
  FolderOpen
} from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  user: UserProfile;
  activeRole: 'aspirant' | 'employer' | 'admin';
  setActiveRole: (role: 'aspirant' | 'employer' | 'admin') => void;
  onOpenAuth: () => void;
  onOpenExamTracker?: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSelectTab: (tabId: string) => void;
  activeTab: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  activeRole,
  setActiveRole,
  onOpenAuth,
  onOpenExamTracker,
  searchQuery,
  setSearchQuery,
  onSelectTab,
  activeTab,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-200 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80' : 'bg-white border-b border-slate-200/60'
    }`}>
      {/* Top Notification Announcement Bar */}
      <div className="bg-slate-900 text-white text-xs py-2 px-4 sm:px-6 flex justify-between items-center overflow-x-auto whitespace-nowrap">
        <div className="flex items-center space-x-3 mx-auto sm:mx-0">
          <span className="bg-emerald-500 text-slate-950 font-bold px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-slate-950" /> Portal Role
          </span>
          <span className="font-semibold text-slate-200">
            Current View: <span className="text-emerald-400 uppercase font-black">{user.role || activeRole}</span> • Switch roles anytime from top navigation bar!
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-6 text-slate-400 text-[11px]">
          <span>Toll Free Support: 1800-110-GOV</span>
          <span className="text-slate-700">|</span>
          <button 
            onClick={() => onSelectTab('referral')}
            className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1 font-bold"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Refer & Earn ₹200 Bonus
          </button>
        </div>
      </div>

      {/* Main Header Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4 border-b border-slate-100">
          
          {/* Logo & Platform Role Switcher */}
          <div className="flex items-center gap-6">
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-11 h-11 bg-gradient-to-tr from-emerald-600 to-teal-500 rounded-2xl text-white flex items-center justify-center font-heading font-black text-2xl shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                N
              </div>
              <div>
                <span className="text-2xl font-heading font-extrabold tracking-tight text-slate-900 block leading-none">
                  Naukri<span className="text-emerald-600">Exams</span>
                </span>
                <span className="text-[11px] font-semibold text-slate-500 block mt-1">
                  Verified Govt Job Portal
                </span>
              </div>
            </a>

            {/* Role Switcher Pill */}
            <div className="hidden lg:flex items-center bg-slate-100 p-1 rounded-2xl text-xs font-semibold border border-slate-200">
              <button
                onClick={() => { setActiveRole('aspirant'); onSelectTab('jobs'); }}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeRole === 'aspirant'
                    ? 'bg-slate-900 text-white shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <GraduationCap className="w-4 h-4 text-emerald-400" />
                Aspirant
              </button>

              <button
                onClick={() => { setActiveRole('employer'); onSelectTab('employer'); }}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeRole === 'employer'
                    ? 'bg-slate-900 text-white shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-4 h-4 text-indigo-400" />
                Employer
              </button>

              <button
                onClick={() => { setActiveRole('admin'); onSelectTab('admin'); }}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeRole === 'admin'
                    ? 'bg-slate-900 text-white shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                Admin
              </button>
            </div>
          </div>

          {/* Global Search Box with Hotkey */}
          <div className="flex-1 max-w-md hidden md:block relative">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search jobs, admit cards, cutoff, mock tests..."
                className="w-full bg-slate-50 text-slate-800 text-xs pl-10 pr-12 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all placeholder:text-slate-400"
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 bg-white px-2 py-0.5 rounded-md border border-slate-200 text-[10px] font-mono text-slate-400 shadow-2xs">
                /
              </kbd>
            </div>
          </div>

          {/* Navigation Links & Action Buttons */}
          <div className="flex items-center gap-3">
            
            {/* Exam Tracker Sidebar Trigger */}
            <button
              onClick={onOpenExamTracker}
              className="hidden sm:flex items-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 px-3 py-1.5 rounded-2xl text-xs font-bold transition-all cursor-pointer shadow-2xs"
              title="Personal Exam Date Tracker & Countdowns"
            >
              <Clock className="w-3.5 h-3.5 text-indigo-600" />
              <span>Exam Tracker</span>
            </button>

            {/* Wallet Balance Badge */}
            <button
              onClick={() => onSelectTab('referral')}
              className="flex flex-col items-end cursor-pointer group bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-2xl border border-slate-200 transition-colors"
              title="Click to view wallet & referrals"
            >
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Wallet</span>
              <span className="text-xs font-bold text-emerald-700 font-mono">₹{user.walletBalance}.00</span>
            </button>

            {/* User Profile / Auth CTA */}
            <button
              onClick={onOpenAuth}
              className="bg-slate-900 hover:bg-slate-800 text-white px-4 sm:px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95 flex items-center gap-2"
            >
              <User className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">{user.name ? user.name.split(' ')[0] : 'Login'}</span>
            </button>
          </div>
        </div>

        {/* Secondary Category Sub-Nav Bar */}
        <div className="flex items-center space-x-1.5 py-3 text-xs font-semibold text-slate-700 overflow-x-auto scrollbar-none">
          <button
            onClick={() => onSelectTab('jobs')}
            className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'jobs' ? 'bg-emerald-600 text-white font-bold shadow-2xs' : 'bg-slate-100/80 hover:bg-slate-200/80 text-slate-700'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            Jobs & Vacancies
          </button>

          <button
            onClick={() => onSelectTab('exams')}
            className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'exams' ? 'bg-indigo-600 text-white font-bold shadow-2xs' : 'bg-slate-100/80 hover:bg-slate-200/80 text-slate-700'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            Admit Cards & Cutoffs
          </button>

          <button
            onClick={() => onSelectTab('mocktests')}
            className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'mocktests' ? 'bg-emerald-600 text-white font-bold shadow-2xs' : 'bg-slate-100/80 hover:bg-slate-200/80 text-slate-700'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Mock Tests & Papers
          </button>

          <button
            onClick={() => onSelectTab('store')}
            className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'store' ? 'bg-indigo-600 text-white font-bold shadow-2xs' : 'bg-slate-100/80 hover:bg-slate-200/80 text-slate-700'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Book Store & Marketplace
          </button>

          <button
            onClick={() => onSelectTab('study')}
            className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'study' ? 'bg-emerald-600 text-white font-bold shadow-2xs' : 'bg-slate-100/80 hover:bg-slate-200/80 text-slate-700'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Study Notes & Syllabus
          </button>

          <button
            onClick={() => onSelectTab('myapplications')}
            className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'myapplications' ? 'bg-slate-900 text-white font-bold' : 'bg-slate-100/80 hover:bg-slate-200/80 text-slate-700'
            }`}
          >
            <FolderOpen className="w-3.5 h-3.5 text-emerald-400" />
            My Applications
          </button>

          <button
            onClick={() => onSelectTab('employer')}
            className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'employer' ? 'bg-slate-900 text-white font-bold' : 'bg-slate-100/80 hover:bg-slate-200/80 text-slate-700'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-indigo-400" />
            Employer Studio
          </button>

          <button
            onClick={() => onSelectTab('admin')}
            className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'admin' ? 'bg-slate-900 text-white font-bold' : 'bg-slate-100/80 hover:bg-slate-200/80 text-slate-700'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            Admin Suite
          </button>
        </div>
      </div>
    </header>
  );
};

