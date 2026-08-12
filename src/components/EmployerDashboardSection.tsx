import React, { useState } from 'react';
import { Building2, PlusCircle, FileSpreadsheet, Users, ShieldCheck, CheckCircle2, Clock, Unlock, Eye, Filter, ArrowUpRight, Check, X, Sparkles, Upload, Wallet } from 'lucide-react';
import { Job, JobApplication, UserProfile } from '../types';
import { INITIAL_APPLICATIONS } from '../data/mockData';

interface EmployerDashboardSectionProps {
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
}

export const EmployerDashboardSection: React.FC<EmployerDashboardSectionProps> = ({ jobs, setJobs, user, setUser }) => {
  const [activeTab, setActiveTab] = useState<'listings' | 'post' | 'applicants' | 'bulk'>('listings');
  const [applications, setApplications] = useState<JobApplication[]>(INITIAL_APPLICATIONS);

  // New Job Form State
  const [jobTitle, setJobTitle] = useState('');
  const [department, setDepartment] = useState(user.companyName || 'EdTech Solutions');
  const [category, setCategory] = useState('Private');
  const [location, setLocation] = useState('Bengaluru / Remote');
  const [district, setDistrict] = useState('Bengaluru Urban');
  const [vacancyCount, setVacancyCount] = useState<number>(5);
  const [salary, setSalary] = useState('₹8,00,000 - ₹12,00,000 / year');
  const [qualification, setQualification] = useState('B.Tech / MCA');
  const [jobType, setJobType] = useState<'public' | 'private'>('private');
  const [lastDate, setLastDate] = useState('2026-09-30');
  const [tags, setTags] = useState('Private Job, Tech, High Growth');

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle) return;

    const newJob: Job = {
      id: `job-${Date.now()}`,
      title: jobTitle,
      companyOrDept: department,
      category,
      location,
      district,
      vacancyCount,
      salary,
      qualification,
      type: jobType,
      lastDate,
      postedDate: new Date().toISOString().split('T')[0],
      isBoosted: false,
      tags: tags.split(',').map((t) => t.trim()),
      officialNotificationUrl: '#',
      applyUrl: '#'
    };

    setJobs([newJob, ...jobs]);
    alert(`Job Posting "${jobTitle}" created successfully! It is now live for candidates.`);
    setJobTitle('');
    setActiveTab('listings');
  };

  const handleExcelImport = () => {
    alert('Simulating Excel / CSV Bulk Upload... Parsed 12 Job Postings from spreadsheet into draft queue.');
    setActiveTab('listings');
  };

  const handleApplicationStatus = (appId: string, newStatus: JobApplication['status']) => {
    setApplications(applications.map((app) => app.id === appId ? { ...app, status: newStatus } : app));
  };

  const handleUnlockResume = (app: JobApplication) => {
    if (user.unlockedResumesCount <= 0 && user.walletBalance < 50) {
      alert('Insufficient Wallet Credits. Please top up your Employer Wallet to unlock verified candidate contact details.');
      return;
    }

    if (user.unlockedResumesCount > 0) {
      setUser({ ...user, unlockedResumesCount: user.unlockedResumesCount - 1 });
    } else {
      setUser({ ...user, walletBalance: user.walletBalance - 50 });
    }

    alert(`Candidate Contact Unlocked!\nName: ${app.applicantName}\nPhone: ${app.applicantPhone}\nEmail: ${app.applicantEmail}`);
  };

  return (
    <section className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Banner */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold">
              <Building2 className="w-3.5 h-3.5" />
              <span>Verified Employer Portal</span>
              {user.isCompanyVerified && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight">
              {user.companyName || 'Employer Studio'} Management Suite
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Post job openings, parse bulk Excel spreadsheets, screen applicants, and unlock candidate resumes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 relative z-10">
            <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 text-xs">
              <span className="text-slate-400 block text-[10px] uppercase font-extrabold">Resume Credits</span>
              <span className="font-black text-emerald-400 text-base">{user.unlockedResumesCount} Free Unlocks</span>
            </div>

            <button
              onClick={() => setActiveTab('post')}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-5 py-3 rounded-2xl cursor-pointer shadow-lg transition-all flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post New Vacancy</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 overflow-x-auto gap-4 text-xs font-bold">
          {[
            { id: 'listings', label: `My Job Postings (${jobs.filter((j) => j.type === 'private').length})`, icon: Building2 },
            { id: 'post', label: 'Post Vacancy', icon: PlusCircle },
            { id: 'applicants', label: `Candidate Applications (${applications.length})`, icon: Users },
            { id: 'bulk', label: 'Bulk Excel Import', icon: FileSpreadsheet },
          ].map((tab) => {
            const IconComp = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 px-2 flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
                  isActive
                    ? 'text-emerald-700 border-b-2 border-emerald-600 font-extrabold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <IconComp className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: LISTINGS */}
        {activeTab === 'listings' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-heading font-extrabold text-slate-900">Active Posted Jobs</h2>

            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="bg-slate-900 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded">
                        {job.category}
                      </span>
                      {job.isBoosted && (
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-600" /> Featured Boosted
                        </span>
                      )}
                    </div>
                    <h3 className="font-heading font-extrabold text-base text-slate-900">{job.title}</h3>
                    <p className="text-xs text-slate-500">
                      {job.location} • {job.vacancyCount} Vacancies • Salary: {job.salary} • Last Date: {job.lastDate}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveTab('applicants')}
                      className="bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-bold text-xs px-4 py-2 rounded-xl cursor-pointer"
                    >
                      View Applications
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: POST JOB FORM */}
        {activeTab === 'post' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-heading font-extrabold text-slate-900">Create New Job Posting</h2>

            <form onSubmit={handlePostJob} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold">
              <div className="md:col-span-2">
                <label className="text-slate-700 block mb-1">Job Designation Title</label>
                <input
                  type="text"
                  required
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Senior Software Engineer / Assistant Manager"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 font-medium"
                />
              </div>

              <div>
                <label className="text-slate-700 block mb-1">Company / Department Name</label>
                <input
                  type="text"
                  required
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="text-slate-700 block mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-medium"
                >
                  <option value="Private">Private IT / Corporate</option>
                  <option value="State PSC">State Government / Board</option>
                  <option value="Banking">Banking Sector</option>
                  <option value="UPSC">UPSC Central</option>
                </select>
              </div>

              <div>
                <label className="text-slate-700 block mb-1">Location & District</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="text-slate-700 block mb-1">Number of Vacancies</label>
                <input
                  type="number"
                  required
                  value={vacancyCount}
                  onChange={(e) => setVacancyCount(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="text-slate-700 block mb-1">Salary Range</label>
                <input
                  type="text"
                  required
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="text-slate-700 block mb-1">Eligibility / Qualification Required</label>
                <input
                  type="text"
                  required
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-medium"
                />
              </div>

              <div className="md:col-span-2 pt-2">
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-6 py-3 rounded-xl cursor-pointer shadow-md transition-all"
                >
                  Publish Job Vacancy Immediately
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: CANDIDATE APPLICATIONS & RESUME UNLOCK */}
        {activeTab === 'applicants' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-heading font-extrabold text-slate-900">Received Candidate Applications</h2>

            <div className="space-y-4">
              {applications.map((app) => (
                <div key={app.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="font-heading font-extrabold text-base text-slate-900">{app.applicantName}</h3>
                      <p className="text-xs text-slate-500">
                        Applied for <span className="font-bold text-slate-800">{app.jobTitle}</span> on {app.appliedDate}
                      </p>
                    </div>

                    <span className={`px-3 py-1 rounded-full text-xs font-bold text-center ${
                      app.status === 'Shortlisted' ? 'bg-emerald-100 text-emerald-800' :
                      app.status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {app.status}
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 flex flex-wrap gap-4 font-medium border-y border-slate-200/60 py-2">
                    <span>Qualification: {app.qualification}</span>
                    <span>Experience: {app.experienceYears} Years</span>
                    <span>Resume: Registered PDF</span>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => handleUnlockResume(app)}
                      className="bg-slate-900 text-white font-bold text-xs px-3.5 py-2 rounded-xl cursor-pointer flex items-center gap-1.5 shadow-xs"
                    >
                      <Unlock className="w-3.5 h-3.5 text-emerald-400" /> Unlock Contact Info
                    </button>

                    <button
                      onClick={() => handleApplicationStatus(app.id, 'Shortlisted')}
                      className="bg-emerald-600 text-white font-bold text-xs px-3.5 py-2 rounded-xl cursor-pointer"
                    >
                      Shortlist
                    </button>

                    <button
                      onClick={() => handleApplicationStatus(app.id, 'Rejected')}
                      className="bg-slate-200 text-slate-700 hover:bg-slate-300 font-bold text-xs px-3.5 py-2 rounded-xl cursor-pointer"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: BULK EXCEL UPLOAD */}
        {activeTab === 'bulk' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto">
              <FileSpreadsheet className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-heading font-extrabold text-slate-900">Bulk Job Import via Excel / CSV</h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Upload standard .xlsx spreadsheets containing job postings to automatically import multiple listings into your draft queue.
            </p>
            <button
              onClick={handleExcelImport}
              className="bg-emerald-600 text-white font-extrabold text-xs px-6 py-3 rounded-2xl cursor-pointer shadow-md"
            >
              Select Excel File (.xlsx / .csv)
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
