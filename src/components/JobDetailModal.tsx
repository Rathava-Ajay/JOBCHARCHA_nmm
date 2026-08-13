import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  MapPin, 
  Calendar, 
  Download, 
  ExternalLink, 
  Share2, 
  Bookmark, 
  CheckCircle2, 
  FileText, 
  ShieldCheck,
  Zap,
  MessageCircle,
  Send,
  Facebook,
  Sparkles,
  Users
} from 'lucide-react';
import { Job } from '../types';

interface JobDetailModalProps {
  job: Job | null;
  onClose: () => void;
  onBookmarkJob?: (jobId: string) => void;
  similarJobs?: Job[];
  onSelectSimilarJob?: (job: Job) => void;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({ 
  job, 
  onClose,
  onBookmarkJob,
  similarJobs = [],
  onSelectSimilarJob
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'eligibility' | 'dates' | 'howToApply' | 'selection'>('overview');
  const [isBookmarked, setIsBookmarked] = useState(job?.isSaved || false);

  if (!job) return null;

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
    if (onBookmarkJob) {
      onBookmarkJob(job.id);
    }
    alert(isBookmarked ? 'Job removed from saved bookmarks' : 'Job saved to your bookmarks!');
  };

  const handleShare = (platform: 'whatsapp' | 'telegram' | 'facebook') => {
    const text = `Check out this job opening: ${job.title} at ${job.companyOrDept} (${job.vacancyCount} Posts)! Apply here: https://naukriexams.in/jobs/${job.id}`;
    if (platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
    } else if (platform === 'telegram') {
      window.open(`https://t.me/share/url?url=${encodeURIComponent('https://naukriexams.in')}&text=${encodeURIComponent(text)}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://naukriexams.in')}`, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white text-slate-900 rounded-3xl max-w-3xl w-full p-6 sm:p-8 relative shadow-2xl border border-slate-200 my-8 max-h-[90vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                job.type === 'public'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-indigo-50 text-indigo-800 border border-indigo-200'
              }`}>
                {job.type === 'public' ? 'Government Recruitment' : 'Private Sector Job'}
              </span>
              {job.isFeatured && (
                <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2 py-0.5 rounded flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-600" /> Featured
                </span>
              )}
              {job.isUrgent && (
                <span className="bg-red-100 text-red-800 text-[10px] font-extrabold px-2 py-0.5 rounded">
                  Urgent Hiring
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">{job.title}</h2>
            <p className="text-xs sm:text-sm text-slate-600 font-semibold flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-emerald-600" /> {job.companyOrDept}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleBookmarkToggle}
              className={`p-2.5 rounded-2xl border cursor-pointer transition-colors ${
                isBookmarked ? 'bg-amber-50 border-amber-300 text-amber-600' : 'bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-900'
              }`}
              title="Bookmark Job"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 rounded-2xl cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Info Cards Grid */}
        <div className="mt-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Total Vacancies</span>
            <span className="font-extrabold text-slate-900 text-sm">{job.vacancyCount.toLocaleString()} Posts</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Salary Scale</span>
            <span className="font-extrabold text-emerald-700 text-sm">{job.salary}</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Location / District</span>
            <span className="font-semibold text-slate-800">{job.location}</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Last Date</span>
            <span className="font-extrabold text-amber-700 text-sm">{job.lastDate}</span>
          </div>
        </div>

        {/* Tabs Row */}
        <div className="flex border-b border-slate-200 mt-4 overflow-x-auto gap-2 text-xs font-bold">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'eligibility', label: 'Eligibility' },
            { id: 'dates', label: 'Important Dates' },
            { id: 'howToApply', label: 'How to Apply' },
            { id: 'selection', label: 'Selection Process' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-2.5 px-3 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-emerald-700 border-b-2 border-emerald-600 font-extrabold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Body */}
        <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-200/80 mt-3 text-xs space-y-3 overflow-y-auto flex-1">
          {activeTab === 'overview' && (
            <div className="space-y-3">
              <h4 className="font-extrabold text-slate-900 text-sm">Job Summary & Department Brief</h4>
              <p className="text-slate-600 leading-relaxed">
                {job.overview || `${job.companyOrDept} has officially released recruitment notification for ${job.vacancyCount} vacancies of ${job.title}. Candidates holding ${job.qualification} can apply before ${job.lastDate}.`}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {job.tags.map((t, idx) => (
                  <span key={idx} className="bg-slate-200/80 text-slate-700 px-2.5 py-1 rounded-md text-[10px] font-bold">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'eligibility' && (
            <div className="space-y-3">
              <h4 className="font-extrabold text-slate-900 text-sm">Educational Qualification & Age Limit</h4>
              <div className="p-3 bg-white rounded-xl border border-slate-200 font-medium text-slate-800">
                {job.qualification}
              </div>
              <ul className="space-y-1.5 text-slate-600 font-medium">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Minimum Age: 18 Years | Maximum Age: 32 Years (Age relaxation as per gov rules).
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Must possess valid certificate at time of document verification.
                </li>
              </ul>
            </div>
          )}

          {activeTab === 'dates' && (
            <div className="space-y-2">
              <h4 className="font-extrabold text-slate-900 text-sm">Key Exam & Application Dates</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px]">Notification Release</span>
                  <span className="font-bold text-slate-800">{job.postedDate}</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px]">Application Last Date</span>
                  <span className="font-bold text-amber-700">{job.lastDate}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'howToApply' && (
            <div className="space-y-2 text-slate-700 font-medium">
              <h4 className="font-extrabold text-slate-900 text-sm">Application Procedure</h4>
              <ol className="list-decimal list-inside space-y-1.5">
                <li>Visit the official portal link provided below.</li>
                <li>Register your mobile number and upload master candidate resume PDF.</li>
                <li>Fill in educational records and pay application fee online.</li>
                <li>Submit final confirmation page and save registration ID.</li>
              </ol>
            </div>
          )}

          {activeTab === 'selection' && (
            <div className="space-y-2 text-slate-700 font-medium">
              <h4 className="font-extrabold text-slate-900 text-sm">Selection Scheme</h4>
              <ul className="space-y-1.5">
                <li>• Phase 1: Computer Based Test (CBT Objective)</li>
                <li>• Phase 2: Skill Test / Interview (If applicable)</li>
                <li>• Phase 3: Document Verification & Medical Exam</li>
              </ul>
            </div>
          )}
        </div>

        {/* Share & Similar Jobs Section */}
        <div className="mt-4 pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Share buttons */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-500">Share:</span>
            <button
              onClick={() => handleShare('whatsapp')}
              className="p-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-xl cursor-pointer"
              title="Share on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleShare('telegram')}
              className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-xl cursor-pointer"
              title="Share on Telegram"
            >
              <Send className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleShare('facebook')}
              className="p-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 rounded-xl cursor-pointer"
              title="Share on Facebook"
            >
              <Facebook className="w-4 h-4" />
            </button>
          </div>

          {/* Download PDF & Apply Action */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => alert(`Downloading Official Notification PDF for ${job.title}...`)}
              className="flex-1 sm:flex-none bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3.5 py-2.5 rounded-xl border border-slate-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-emerald-600" /> PDF Notice
            </button>

            <a
              href={job.applyUrl || '#'}
              onClick={(e) => {
                e.preventDefault();
                alert(`Redirecting to official recruitment application portal for ${job.companyOrDept}...`);
              }}
              className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs px-6 py-2.5 rounded-xl shadow-md transition-transform active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Apply Online</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

