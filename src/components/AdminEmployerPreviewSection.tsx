import React, { useState } from 'react';
import { 
  Sparkles, 
  Share2, 
  BarChart3, 
  Send, 
  Plus, 
  Users, 
  TrendingUp, 
  CheckCircle2, 
  ShieldCheck, 
  Calendar, 
  MessageSquare, 
  Globe, 
  Clock,
  Layers
} from 'lucide-react';
import { Job } from '../types';

interface AdminEmployerPreviewSectionProps {
  jobs?: Job[];
  onAddJob?: (newJob: Partial<Job>) => void;
  onPostJob?: (newJob: Partial<Job>) => void;
  onOpenAuth?: () => void;
}

export const AdminEmployerPreviewSection: React.FC<AdminEmployerPreviewSectionProps> = ({
  onAddJob,
  onPostJob,
}) => {
  const handleJobSubmit = (jobData: Partial<Job>) => {
    if (onAddJob) onAddJob(jobData);
    if (onPostJob) onPostJob(jobData);
  };
  const [activeSubTab, setActiveSubTab] = useState<'quickpost' | 'social' | 'analytics'>('quickpost');

  // Quick Post Form
  const [title, setTitle] = useState('');
  const [dept, setDept] = useState('');
  const [category, setCategory] = useState('SSC');
  const [location, setLocation] = useState('New Delhi');
  const [salary, setSalary] = useState('₹45,000 / month');
  const [vacancies, setVacancies] = useState(120);
  const [postType, setPostType] = useState<'public' | 'private'>('public');

  // Scheduled Social Posts
  const [socialPosts, setSocialPosts] = useState([
    { id: 'sp-1', platform: 'Telegram Channel (180k Subs)', content: '🚨 SSC CGL Tier-1 Result Out! Direct Cutoff Merit PDF Link inside:', status: 'Published', time: '10:30 AM Today' },
    { id: 'sp-2', platform: 'LinkedIn Page (45k Followers)', content: 'We are hiring Senior Software Engineers for EduTech infrastructure! Apply:', status: 'Scheduled', time: '02:00 PM Today' },
    { id: 'sp-3', platform: 'Facebook Group (220k Members)', content: 'UPSC IAS Prelims 2026 Strategy & Free Solved Mock Paper Download:', status: 'Scheduled', time: '06:00 PM Today' }
  ]);

  const [newSocialText, setNewSocialText] = useState('');

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !dept) return;

    handleJobSubmit({
      title,
      companyOrDept: dept,
      category,
      location,
      salary,
      vacancyCount: vacancies,
      qualification: 'Graduate Degree',
      type: postType,
      lastDate: '2026-09-30',
      postedDate: new Date().toISOString().slice(0, 10),
      isBoosted: true,
      tags: ['Quick Post', category]
    });

    setTitle('');
    setDept('');
    alert('Job vacancy published successfully and broadcasted across feed sources!');
  };

  const handleAddSocialPost = () => {
    if (!newSocialText) return;
    setSocialPosts([
      ...socialPosts,
      {
        id: `sp-${Date.now()}`,
        platform: 'Telegram & Social Broadcast',
        content: newSocialText,
        status: 'Scheduled',
        time: 'In 15 Mins'
      }
    ]);
    setNewSocialText('');
  };

  return (
    <section className="py-12 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-800 bg-indigo-50 px-2.5 py-1 rounded-md mb-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Employer & Admin Management Studio</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Quick Job Publishing, Social Auto-Scheduler & Analytics
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              One-click multi-channel distribution across Telegram, LinkedIn, Threads, and Web Push notifications.
            </p>
          </div>

          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 text-xs font-semibold self-start md:self-auto">
            <button
              onClick={() => setActiveSubTab('quickpost')}
              className={`px-3.5 py-2 rounded-lg transition-all ${
                activeSubTab === 'quickpost' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Quick Job Post
            </button>
            <button
              onClick={() => setActiveSubTab('social')}
              className={`px-3.5 py-2 rounded-lg transition-all ${
                activeSubTab === 'social' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Social Scheduler
            </button>
            <button
              onClick={() => setActiveSubTab('analytics')}
              className={`px-3.5 py-2 rounded-lg transition-all ${
                activeSubTab === 'analytics' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              KPI Analytics
            </button>
          </div>
        </div>

        {/* Tab 1: Quick Job Posting */}
        {activeSubTab === 'quickpost' && (
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-3xl mx-auto">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-indigo-600" /> Simplified Job Creation Form
            </h3>

            <form onSubmit={handleCreateJob} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Job Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. SSC CHSL Data Entry Operator 2026"
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Department / Company Name</label>
                  <input
                    type="text"
                    required
                    value={dept}
                    onChange={(e) => setDept(e.target.value)}
                    placeholder="e.g. Staff Selection Commission"
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
                  >
                    <option value="UPSC">UPSC</option>
                    <option value="SSC">SSC</option>
                    <option value="Banking">Banking</option>
                    <option value="Railways">Railways</option>
                    <option value="Defense">Defense</option>
                    <option value="Private">Private Industry</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Sector</label>
                  <select
                    value={postType}
                    onChange={(e) => setPostType(e.target.value as any)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
                  >
                    <option value="public">Government (Public)</option>
                    <option value="private">Private Sector</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Total Vacancies</label>
                  <input
                    type="number"
                    value={vacancies}
                    onChange={(e) => setVacancies(Number(e.target.value))}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-3 rounded-xl shadow-md transition-transform active:scale-98 cursor-pointer"
              >
                Publish Job & Broadcast Instantly
              </button>
            </form>
          </div>
        )}

        {/* Tab 2: Social Scheduler */}
        {activeSubTab === 'social' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={newSocialText}
                onChange={(e) => setNewSocialText(e.target.value)}
                placeholder="Draft post to auto-broadcast across Telegram, LinkedIn, Facebook & Threads..."
                className="flex-1 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none"
              />
              <button
                onClick={handleAddSocialPost}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl flex items-center justify-center gap-1.5 shrink-0"
              >
                <Send className="w-3.5 h-3.5" /> Schedule Broadcast
              </button>
            </div>

            <div className="space-y-3">
              {socialPosts.map((post) => (
                <div key={post.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] uppercase font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
                        {post.platform}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" /> {post.time}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-800">{post.content}</p>
                  </div>

                  <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full shrink-0 ${
                    post.status === 'Published' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {post.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Admin Analytics Dashboard */}
        {activeSubTab === 'analytics' && (
          <div className="space-y-6 max-w-5xl mx-auto">
            {/* Small Data Metric Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              
              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 transition-all hover:shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Today's Applications</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                </div>
                <div className="text-2xl font-black text-slate-900">1,428</div>
                <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 mt-1">
                  <TrendingUp className="w-3 h-3" /> +18.4% vs yesterday
                </span>
              </div>

              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 transition-all hover:shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">New Registrations</span>
                  <Users className="w-3.5 h-3.5 text-indigo-500" />
                </div>
                <div className="text-2xl font-black text-slate-900">852</div>
                <span className="text-[10px] text-indigo-600 font-bold flex items-center gap-0.5 mt-1">
                  +120 last hour
                </span>
              </div>

              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 transition-all hover:shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Active Openings</span>
                  <Layers className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <div className="text-2xl font-black text-slate-900">148</div>
                <span className="text-[10px] text-slate-500 font-medium mt-1 block">
                  32 Government, 116 Private
                </span>
              </div>

              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 transition-all hover:shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Alert Subscribers</span>
                  <Send className="w-3.5 h-3.5 text-emerald-500" />
                </div>
                <div className="text-2xl font-black text-slate-900">42,910</div>
                <span className="text-[10px] text-emerald-600 font-bold mt-1 block">
                  Email & WhatsApp
                </span>
              </div>

              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 transition-all hover:shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Mocks Taken</span>
                  <BarChart3 className="w-3.5 h-3.5 text-purple-500" />
                </div>
                <div className="text-2xl font-black text-slate-900">3,620</div>
                <span className="text-[10px] text-purple-600 font-bold mt-1 block">
                  CBT Quizzes today
                </span>
              </div>

              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 transition-all hover:shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Pass Pro Revenue</span>
                  <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                </div>
                <div className="text-2xl font-black text-emerald-700">₹1,84.5k</div>
                <span className="text-[10px] text-slate-500 font-medium mt-1 block">
                  Monthly Subscriptions
                </span>
              </div>

            </div>

            {/* Dashboard Visual Feed & Pending Moderation Queue */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Recent Candidate Activity Stream */}
              <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-2xs">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-heading font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <Users className="w-4 h-4 text-indigo-600" /> Live Application Stream
                  </h4>
                  <span className="text-[10px] font-bold uppercase text-slate-400">Real-time</span>
                </div>

                <div className="space-y-3">
                  {[
                    { name: 'Rahul Sharma', job: 'SSC CGL Assistant Section Officer', time: '2 mins ago', status: 'Verified' },
                    { name: 'Priya Patel', job: 'IBPS PO Probationary Officer', time: '5 mins ago', status: 'Under Review' },
                    { name: 'Amit Kumar', job: 'RRB NTPC Traffic Assistant', time: '12 mins ago', status: 'Shortlisted' },
                    { name: 'Neha Gupta', job: 'Senior Software Engineer (Private)', time: '18 mins ago', status: 'Verified' },
                  ].map((app, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                      <div>
                        <div className="font-bold text-slate-900">{app.name}</div>
                        <div className="text-[11px] text-slate-500">{app.job} • {app.time}</div>
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        app.status === 'Verified'
                          ? 'bg-emerald-100 text-emerald-800'
                          : app.status === 'Shortlisted'
                          ? 'bg-indigo-100 text-indigo-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Employer Job Post Moderation Queue */}
              <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-2xs">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-heading font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" /> Employer Post Moderation Queue
                  </h4>
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                    2 Pending
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>Data Analyst - EdTech Corp</span>
                      <span className="text-slate-500 text-[11px]">Private • Delhi</span>
                    </div>
                    <p className="text-[11px] text-slate-600">Requires 2+ Yrs SQL, Python & Tableau. Salary: ₹6.5 LPA.</p>
                    <div className="flex gap-2 pt-1">
                      <button onClick={() => alert('Post approved!')} className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] py-1.5 rounded-xl cursor-pointer">
                        Approve Post
                      </button>
                      <button onClick={() => alert('Post rejected.')} className="px-3 bg-slate-200 text-slate-700 font-bold text-[11px] py-1.5 rounded-xl cursor-pointer">
                        Reject
                      </button>
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>Junior Electrical Engineer</span>
                      <span className="text-slate-500 text-[11px]">Contractual • Gujarat</span>
                    </div>
                    <p className="text-[11px] text-slate-600">State Power Corp apprenticeship 45 vacancies.</p>
                    <div className="flex gap-2 pt-1">
                      <button onClick={() => alert('Post approved!')} className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] py-1.5 rounded-xl cursor-pointer">
                        Approve Post
                      </button>
                      <button onClick={() => alert('Post rejected.')} className="px-3 bg-slate-200 text-slate-700 font-bold text-[11px] py-1.5 rounded-xl cursor-pointer">
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
