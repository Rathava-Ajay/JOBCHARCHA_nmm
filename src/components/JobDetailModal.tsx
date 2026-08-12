import React from 'react';
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
  Zap
} from 'lucide-react';
import { Job } from '../types';

interface JobDetailModalProps {
  job: Job | null;
  onClose: () => void;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({ job, onClose }) => {
  if (!job) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white text-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl border border-slate-200 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 bg-slate-100 p-2 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badges */}
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md ${
            job.type === 'public'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-indigo-50 text-indigo-800 border border-indigo-200'
          }`}>
            {job.type === 'public' ? 'Government Recruitment' : 'Private Sector Job'}
          </span>
          <span className="text-xs font-semibold text-slate-500">
            Category: {job.category}
          </span>
        </div>

        {/* Title & Organization */}
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">{job.title}</h2>
        <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-1 flex items-center gap-1">
          <Building2 className="w-4 h-4 text-slate-400" /> {job.companyOrDept}
        </p>

        {/* Detailed Metrics Table */}
        <div className="mt-6 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Total Vacancies</span>
            <span className="font-extrabold text-slate-900 text-sm">{job.vacancyCount.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Salary Scale</span>
            <span className="font-extrabold text-emerald-700 text-sm">{job.salary}</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase block">District / Location</span>
            <span className="font-semibold text-slate-800">{job.location}</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Last Date</span>
            <span className="font-extrabold text-amber-700 text-sm">{job.lastDate}</span>
          </div>
        </div>

        {/* Requirement & Qualification */}
        <div className="mt-6 space-y-4 text-xs">
          <div>
            <h4 className="font-bold text-slate-900 uppercase text-[11px] mb-1">Educational Qualification Required</h4>
            <p className="bg-slate-100 p-3 rounded-xl text-slate-800 font-medium">{job.qualification}</p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 uppercase text-[11px] mb-1">Application Steps & Official Docs</h4>
            <ul className="space-y-1.5 text-slate-600">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Verify eligibility criteria in the official notification PDF.</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Keep scanned photo, signature, and educational marksheets ready.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="mt-8 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => alert(`Official Notification PDF for ${job.title} downloaded!`)}
              className="flex-1 sm:flex-none bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3.5 py-2.5 rounded-xl border border-slate-200 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Download className="w-4 h-4 text-emerald-600" /> Notification PDF
            </button>
            <button
              onClick={() => alert('Job link copied to clipboard for sharing!')}
              className="p-2.5 text-slate-600 hover:bg-slate-100 border border-slate-200 rounded-xl"
              title="Share job link"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          <a
            href={job.applyUrl || '#'}
            onClick={(e) => {
              e.preventDefault();
              alert(`Redirecting to official portal for ${job.companyOrDept}...`);
            }}
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs px-6 py-2.5 rounded-xl shadow-md transition-transform active:scale-95 flex items-center justify-center gap-1.5"
          >
            <span>Apply Online Now</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>
    </div>
  );
};
