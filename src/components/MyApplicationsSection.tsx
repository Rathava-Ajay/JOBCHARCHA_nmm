import React, { useState } from 'react';
import { Briefcase, Upload, FileText, CheckCircle2, Clock, AlertCircle, Sparkles, Download, ExternalLink } from 'lucide-react';
import { JobApplication, UserProfile } from '../types';
import { INITIAL_APPLICATIONS } from '../data/mockData';

interface MyApplicationsSectionProps {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
}

export const MyApplicationsSection: React.FC<MyApplicationsSectionProps> = ({ user, setUser }) => {
  const [applications] = useState<JobApplication[]>(INITIAL_APPLICATIONS);
  const [resumeFile, setResumeFile] = useState<string>(user.resumeUrl || 'ajay_rathava_resume_2026.pdf');
  const [isUploading, setIsUploading] = useState(false);

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      setTimeout(() => {
        const fileName = e.target.files![0].name;
        setResumeFile(fileName);
        setUser({ ...user, resumeUrl: `https://naukriexams.in/resumes/${fileName}`, profileScore: 98 });
        setIsUploading(false);
        alert(`Resume PDF "${fileName}" uploaded to Cloudflare R2 Storage! Profile completeness updated to 98%.`);
      }, 1200);
    }
  };

  return (
    <section className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full mb-2">
              <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
              <span>Aspirant Career Hub</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 tracking-tight">
              My Job Applications & Resume Cloud
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Track status updates, employer shortlists, and manage your master candidate resume PDF.
            </p>
          </div>

          {/* Profile Completeness Badge */}
          <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 flex items-center gap-4 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Profile Strength</span>
              <span className="text-lg font-black text-emerald-400">{user.profileScore || 88}% Complete</span>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-emerald-500 flex items-center justify-center font-bold text-xs">
              {user.profileScore || 88}%
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Applications List (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-heading font-extrabold text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-600" /> Active Job Applications ({applications.length})
            </h2>

            {applications.map((app) => (
              <div key={app.id} className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-2xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-heading font-extrabold text-base text-slate-900">{app.jobTitle}</h3>
                    <p className="text-xs text-slate-500">{app.companyOrDept} • Applied on {app.appliedDate}</p>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    app.status === 'Shortlisted' ? 'bg-emerald-100 text-emerald-800' :
                    app.status === 'Under Review' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {app.status}
                  </span>
                </div>

                <div className="text-xs text-slate-600 flex justify-between items-center pt-1 font-medium">
                  <span>Attached Resume: <span className="font-bold text-slate-900">{resumeFile}</span></span>
                  <button
                    onClick={() => alert(`Opening Official Recruitment Portal for ${app.jobTitle}...`)}
                    className="text-emerald-700 font-bold hover:underline flex items-center gap-1"
                  >
                    <span>View Portal Notice</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Resume Upload Card (1 Col) */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-5 h-fit">
            <h2 className="text-lg font-heading font-extrabold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600" /> Master Resume PDF
            </h2>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
              <div className="flex items-center gap-2 text-slate-800 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="truncate">{resumeFile}</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Uploaded to Cloudflare R2 Storage. Accessible by verified government and private employers.
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">Upload Updated Resume (PDF)</label>
              <label className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-6 text-center block cursor-pointer transition-colors bg-slate-50/50">
                <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                <span className="text-xs font-bold text-slate-700 block">
                  {isUploading ? 'Uploading to Cloud...' : 'Click to Browse PDF Resume'}
                </span>
                <span className="text-[10px] text-slate-400">Max size 5 MB • PDF / DOCX</span>
                <input
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleResumeUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
