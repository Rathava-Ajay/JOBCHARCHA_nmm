import React, { useState } from 'react';
import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  Bookmark, 
  BookmarkCheck, 
  ExternalLink, 
  Sparkles, 
  Bell, 
  Download, 
  Plus, 
  Building2, 
  Users, 
  Zap, 
  CheckCircle2, 
  Filter, 
  Share2,
  FileSpreadsheet
} from 'lucide-react';
import { Job } from '../types';
import { JobAlertSubscription } from './JobAlertSubscription';

interface JobsSectionProps {
  jobs: Job[];
  searchQuery: string;
  selectedCategory: string;
  selectedQualification: string;
  selectedLocation: string;
  onSelectJob: (job: Job) => void;
  onOpenNewJobModal: () => void;
}

export const JobsSection: React.FC<JobsSectionProps> = ({
  jobs,
  searchQuery,
  selectedCategory,
  selectedQualification,
  selectedLocation,
  onSelectJob,
  onOpenNewJobModal,
}) => {
  const [jobTypeFilter, setJobTypeFilter] = useState<'all' | 'public' | 'private'>('all');
  const [savedJobIds, setSavedJobIds] = useState<string[]>(['job-1']);
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [alertSubscribed, setAlertSubscribed] = useState(false);
  const [alertEmail, setAlertEmail] = useState('');

  const toggleSaveJob = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (savedJobIds.includes(id)) {
      setSavedJobIds(savedJobIds.filter((jId) => jId !== id));
    } else {
      setSavedJobIds([...savedJobIds, id]);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    // Search text
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = job.title.toLowerCase().includes(q);
      const matchDept = job.companyOrDept.toLowerCase().includes(q);
      const matchCat = job.category.toLowerCase().includes(q);
      const matchLoc = job.location.toLowerCase().includes(q);
      if (!matchTitle && !matchDept && !matchCat && !matchLoc) return false;
    }

    // Category
    if (selectedCategory !== 'All' && job.category !== selectedCategory) {
      if (selectedCategory === 'Private' && job.type !== 'private') return false;
      if (selectedCategory !== 'Private' && job.category !== selectedCategory) return false;
    }

    // Qualification
    if (selectedQualification !== 'All Qualifications' && !job.qualification.includes(selectedQualification.split(' ')[0])) {
      // soft match
    }

    // Location
    if (selectedLocation !== 'All India / Central' && !job.location.includes(selectedLocation) && !job.district.includes(selectedLocation)) {
      return false;
    }

    // Type
    if (jobTypeFilter !== 'all' && job.type !== jobTypeFilter) return false;

    // Saved only
    if (showSavedOnly && !savedJobIds.includes(job.id)) return false;

    return true;
  });

  const handleExportExcel = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Title,Department,Vacancy,Salary,Location,LastDate"].join(",") + "\n"
      + filteredJobs.map(e => `"${e.title}","${e.companyOrDept}",${e.vacancyCount},"${e.salary}","${e.location}","${e.lastDate}"`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `GovJobs_Export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-12 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-md mb-2">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Jobs Management & Automation Hub</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 tracking-tight">
              Latest Government & Private Job Vacancies
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Showing {filteredJobs.length} verified listings from official government feed sources & direct employer posts.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleExportExcel}
              className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 px-3.5 py-2 rounded-xl text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
              title="Export visible jobs to CSV/Excel"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={() => setShowSavedOnly(!showSavedOnly)}
              className={`inline-flex items-center gap-1.5 border px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                showSavedOnly
                  ? 'bg-amber-50 text-amber-900 border-amber-300'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${showSavedOnly ? 'text-amber-600 fill-amber-600' : 'text-slate-500'}`} />
              <span>Saved ({savedJobIds.length})</span>
            </button>

            <button
              onClick={onOpenNewJobModal}
              className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs transition-transform active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-emerald-400" />
              <span>Post Job</span>
            </button>
          </div>
        </div>

        {/* Filter Pills Bar */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs mb-8 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-1 font-medium">
            <span className="text-slate-400 font-bold uppercase text-[10px] mr-2">Job Type:</span>
            <button
              onClick={() => setJobTypeFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                jobTypeFilter === 'all' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              All Jobs
            </button>
            <button
              onClick={() => setJobTypeFilter('public')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                jobTypeFilter === 'public' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Government Only
            </button>
            <button
              onClick={() => setJobTypeFilter('private')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                jobTypeFilter === 'private' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Private / Corporate
            </button>
          </div>

          {/* Instant Job Alert Box */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            {alertSubscribed ? (
              <span className="text-emerald-700 font-semibold flex items-center gap-1 text-xs bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> WhatsApp & Email Alerts Active
              </span>
            ) : (
              <div className="flex items-center gap-1.5 w-full">
                <input
                  type="email"
                  value={alertEmail}
                  onChange={(e) => setAlertEmail(e.target.value)}
                  placeholder="Enter email for daily job alerts..."
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
                />
                <button
                  onClick={() => {
                    if (alertEmail) setAlertSubscribed(true);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1 cursor-pointer"
                >
                  <Bell className="w-3.5 h-3.5" /> Subscribe Alerts
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Jobs Grid */}
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No jobs match your current filters</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Try resetting your category or location filters, or search for different keywords.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => {
              const isSaved = savedJobIds.includes(job.id);
              return (
                <div
                  key={job.id}
                  onClick={() => onSelectJob(job)}
                  className={`bg-white rounded-2xl p-5 border transition-all duration-200 hover:shadow-lg cursor-pointer flex flex-col justify-between relative group ${
                    job.isBoosted ? 'border-emerald-300 ring-1 ring-emerald-500/20' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* Top Badge Row */}
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                        job.type === 'public'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80'
                          : 'bg-indigo-50 text-indigo-700 border border-indigo-200/80'
                      }`}>
                        {job.type === 'public' ? 'Government' : 'Private'} • {job.category}
                      </span>

                      <div className="flex items-center gap-1">
                        {job.isBoosted && (
                          <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                            <Zap className="w-3 h-3 text-amber-600 fill-amber-600" /> Featured
                          </span>
                        )}
                        <button
                          onClick={(e) => toggleSaveJob(job.id, e)}
                          className="p-1.5 text-slate-400 hover:text-amber-500 transition-colors rounded-lg hover:bg-slate-100"
                          title={isSaved ? 'Unsave job' : 'Save job'}
                        >
                          <Bookmark className={`w-4 h-4 ${isSaved ? 'text-amber-500 fill-amber-500' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {/* Job Title & Department */}
                    <h3 className="font-heading font-bold text-slate-900 text-base leading-snug group-hover:text-emerald-700 transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-1 flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{job.companyOrDept}</span>
                    </p>

                    {/* Job Meta Info Grid */}
                    <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Vacancies</span>
                        <span className="font-bold text-slate-800">{job.vacancyCount.toLocaleString()} Posts</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Salary Scale</span>
                        <span className="font-semibold text-emerald-700 truncate block">{job.salary}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Location</span>
                        <span className="font-medium text-slate-700 truncate flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0" /> {job.location}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Apply Deadline</span>
                        <span className="font-semibold text-amber-700 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-amber-600 shrink-0" /> {job.lastDate}
                        </span>
                      </div>
                    </div>

                    {/* Qualification & Tags */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      <span className="bg-slate-100 text-slate-600 text-[11px] px-2 py-0.5 rounded font-medium">
                        {job.qualification}
                      </span>
                      {job.tags.slice(0, 2).map((t) => (
                        <span key={t} className="bg-slate-100 text-slate-500 text-[10px] px-2 py-0.5 rounded">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                    <span className="text-emerald-600 group-hover:underline flex items-center gap-1">
                      View Details & Syllabus <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-slate-400 text-[11px] font-normal">Posted {job.postedDate}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Job Alert Subscription Component */}
        <div className="mt-12">
          <JobAlertSubscription />
        </div>

      </div>
    </section>
  );
};
