/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { JobsSection } from './components/JobsSection';
import { ExamsResultsSection } from './components/ExamsResultsSection';
import { MockTestsSection } from './components/MockTestsSection';
import { SchemesNewsSection } from './components/SchemesNewsSection';
import { PricingSection } from './components/PricingSection';
import { ReferralWalletSection } from './components/ReferralWalletSection';
import { AdminEmployerPreviewSection } from './components/AdminEmployerPreviewSection';
import { ECommerceMarketplaceSection } from './components/ECommerceMarketplaceSection';
import { StudyMaterialSection } from './components/StudyMaterialSection';
import { EmployerDashboardSection } from './components/EmployerDashboardSection';
import { AdminDashboardSection } from './components/AdminDashboardSection';
import { MyApplicationsSection } from './components/MyApplicationsSection';
import { Footer } from './components/Footer';

import { JobDetailModal } from './components/JobDetailModal';
import { AuthModal } from './components/AuthModal';
import { MockTestModal } from './components/MockTestModal';
import { ExamTrackerSidebar } from './components/ExamTrackerSidebar';

import { 
  INITIAL_JOBS, 
  INITIAL_ADMIT_CARDS, 
  INITIAL_RESULTS, 
  INITIAL_MOCK_TESTS, 
  INITIAL_OLD_PAPERS, 
  INITIAL_SCHEMES, 
  INITIAL_NEWS, 
  PRICING_PLANS, 
  DEFAULT_USER 
} from './data/mockData';

import { Job, MockTest, UserProfile } from './types';

export default function App() {
  // Application State
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER);
  const [activeRole, setActiveRole] = useState<'aspirant' | 'employer' | 'admin'>('aspirant');
  const [activeTab, setActiveTab] = useState<string>('jobs');

  // Search & Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedQualification, setSelectedQualification] = useState('All Qualifications');
  const [selectedLocation, setSelectedLocation] = useState('All India / Central');

  // Datasets
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [admitCards] = useState(INITIAL_ADMIT_CARDS);
  const [results] = useState(INITIAL_RESULTS);
  const [mockTests, setMockTests] = useState(INITIAL_MOCK_TESTS);
  const [oldPapers] = useState(INITIAL_OLD_PAPERS);
  const [schemes] = useState(INITIAL_SCHEMES);
  const [newsPosts] = useState(INITIAL_NEWS);

  // Modals & Sidebars State
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedMockTest, setSelectedMockTest] = useState<MockTest | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showExamTrackerSidebar, setShowExamTrackerSidebar] = useState(false);

  // Dynamic SEO & Meta Tags Injector for Search Ranking & Social Previews
  useEffect(() => {
    let title = "NaukriExams - Verified Government & Private Job Vacancies 2026";
    let description = "Latest Central & State government job notifications, admit cards, results, CBT mock tests, and youth schemes across India.";

    if (selectedJob) {
      title = `${selectedJob.title} - ${selectedJob.vacancyCount} Vacancies | NaukriExams`;
      description = `Apply for ${selectedJob.title} at ${selectedJob.companyOrDept}. Salary: ${selectedJob.salary}. Qualification: ${selectedJob.qualification}. Last Date: ${selectedJob.lastDate}.`;
    } else if (selectedMockTest) {
      title = `${selectedMockTest.title} - Free CBT Test Series | NaukriExams`;
      description = `Attempt official pattern online mock test for ${selectedMockTest.title}. ${selectedMockTest.totalQuestions} Questions, ${selectedMockTest.durationMinutes} Mins.`;
    } else if (activeTab === 'jobs') {
      title = "Government & Private Job Vacancies 2026 - Instant Alerts | NaukriExams";
      description = "Browse verified UPSC, SSC, Banking, Railway, Defense and State PSC recruitment notices with official notification PDFs.";
    } else if (activeTab === 'exams') {
      title = "Hall Tickets, Exam Results & AI Cutoff Predictor 2026 | NaukriExams";
      description = "Download official admit cards, merit lists, cutoff marks, and check AI probability for SSC, Banking, and UPSC exams.";
    } else if (activeTab === 'mocktests') {
      title = "Free CBT Mock Tests, Daily Speed Quizzes & Solved Archives | NaukriExams";
      description = "Practice online CBT mock tests with instant score evaluation, daily 3-minute quizzes, and past 10-year solved papers.";
    } else if (activeTab === 'schemes') {
      title = "Government Youth Welfare Schemes & Exam Notifications 2026 | NaukriExams";
      description = "Explore Central and State welfare initiatives, skill development grants, and exam policy updates.";
    } else if (activeTab === 'pricing') {
      title = "Pass Pro Unlimited Access & Employer Postings | NaukriExams";
      description = "Unlock 500+ CBT test series, unlimited resume downloads, and priority recruitment tools.";
    } else if (activeTab === 'referral') {
      title = "Invite Aspirants & Earn Wallet Credits | NaukriExams";
      description = "Share your referral code and earn ₹200 instant wallet bonus for every candidate who joins.";
    } else if (activeTab === 'admin') {
      title = "Employer Studio & Admin Analytics Dashboard | NaukriExams";
      description = "Manage job listings, view application conversion analytics, and broadcast automated job alerts.";
    }

    // Set Document Title
    document.title = title;

    // Helper to safely set or create meta elements
    const setMetaTag = (selector: string, attrName: string, attrVal: string, contentVal: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', contentVal);
    };

    setMetaTag('meta[name="description"]', 'name', 'description', description);
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'NaukriExams Portal');
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', selectedJob ? 'article' : 'website');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);

  }, [activeTab, selectedJob, selectedMockTest]);

  // Keyboard shortcut listener for global search `/`
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        if (searchInput) searchInput.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleAddJob = (newJobData: Partial<Job>) => {
    const newJob: Job = {
      id: `job-${Date.now()}`,
      title: newJobData.title || 'Untitled Job Position',
      companyOrDept: newJobData.companyOrDept || 'Government Department',
      category: newJobData.category || 'General',
      location: newJobData.location || 'Pan India',
      district: 'New Delhi',
      vacancyCount: newJobData.vacancyCount || 10,
      salary: newJobData.salary || '₹35,000 / month',
      qualification: newJobData.qualification || 'Graduate',
      type: newJobData.type || 'public',
      lastDate: newJobData.lastDate || '2026-10-31',
      postedDate: new Date().toISOString().slice(0, 10),
      isBoosted: true,
      tags: newJobData.tags || ['Latest Vacancy']
    };

    setJobs([newJob, ...jobs]);
    setActiveTab('jobs');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-500 selection:text-white flex flex-col">
      
      {/* Top Header Navbar */}
      <Navbar
        user={user}
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        onOpenAuth={() => setShowAuthModal(true)}
        onOpenExamTracker={() => setShowExamTrackerSidebar(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSelectTab={(tabId) => setActiveTab(tabId)}
        activeTab={activeTab}
      />

      {/* High Conversion Hero Section */}
      <HeroSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedQualification={selectedQualification}
        setSelectedQualification={setSelectedQualification}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        onOpenCutoffPredictor={() => setActiveTab('exams')}
        onOpenQuickQuiz={() => setActiveTab('mocktests')}
        onSelectTab={(tabId) => setActiveTab(tabId)}
      />

      {/* Main Dynamic View Content according to selected Tab */}
      <main className="flex-1">
        
        {activeTab === 'store' ? (
          <ECommerceMarketplaceSection user={user} setUser={setUser} />
        ) : activeTab === 'study' ? (
          <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <StudyMaterialSection />
          </div>
        ) : activeTab === 'myapplications' ? (
          <MyApplicationsSection user={user} setUser={setUser} />
        ) : activeTab === 'employer' ? (
          <EmployerDashboardSection jobs={jobs} setJobs={setJobs} user={user} setUser={setUser} />
        ) : activeTab === 'admin' ? (
          <AdminDashboardSection jobs={jobs} setJobs={setJobs} mockTests={mockTests} setMockTests={setMockTests} />
        ) : (
          /* HOMEPAGE & FULL PORTAL SECTIONS */
          <>
            <HeroSection
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedQualification={selectedQualification}
              setSelectedQualification={setSelectedQualification}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              onOpenCutoffPredictor={() => setActiveTab('exams')}
              onOpenQuickQuiz={() => setActiveTab('mocktests')}
              onSelectTab={(tabId) => setActiveTab(tabId)}
            />

            <div id="jobs-section">
              <JobsSection
                jobs={jobs}
                searchQuery={searchQuery}
                selectedCategory={selectedCategory}
                selectedQualification={selectedQualification}
                selectedLocation={selectedLocation}
                onSelectJob={(job) => setSelectedJob(job)}
                onOpenNewJobModal={() => setActiveTab('employer')}
              />
            </div>

            <div id="exams-section">
              <ExamsResultsSection
                admitCards={admitCards}
                results={results}
                onOpenCutoffModal={() => setActiveTab('exams')}
              />
            </div>

            <div id="mocktests-section">
              <MockTestsSection
                mockTests={mockTests}
                oldPapers={oldPapers}
                onStartFullMockTest={(test) => setSelectedMockTest(test)}
                onSelectTab={(tabId) => setActiveTab(tabId)}
              />
            </div>

            <div id="schemes-section">
              <SchemesNewsSection
                schemes={schemes}
                newsPosts={newsPosts}
              />
            </div>

            <div id="pricing-section">
              <PricingSection
                pricingPlans={PRICING_PLANS}
                activeRole={activeRole as any}
                setActiveRole={(r) => setActiveRole(r as any)}
              />
            </div>

            <div id="referral-section">
              <ReferralWalletSection
                user={user}
                setUser={setUser}
              />
            </div>

            <div id="admin-section">
              <AdminEmployerPreviewSection
                jobs={jobs}
                onPostJob={(jobData) => {
                  const newJob: Job = {
                    id: `job-${Date.now()}`,
                    title: jobData.title || 'Untitled Vacancy',
                    companyOrDept: jobData.companyOrDept || 'Private Tech Corp',
                    category: jobData.category || 'Private',
                    location: jobData.location || 'Bengaluru',
                    district: jobData.district || 'Bengaluru Urban',
                    vacancyCount: jobData.vacancyCount || 10,
                    salary: jobData.salary || '₹6,00,000 / year',
                    qualification: jobData.qualification || 'Graduate',
                    type: jobData.type || 'private',
                    lastDate: jobData.lastDate || '2026-10-30',
                    postedDate: new Date().toISOString().split('T')[0],
                    isBoosted: false,
                    tags: jobData.tags || ['Latest']
                  };
                  setJobs([newJob, ...jobs]);
                  setActiveTab('jobs');
                }}
                onOpenAuth={() => setShowAuthModal(true)}
              />
            </div>
          </>
        )}

      </main>

      {/* Footer & Sitemap */}
      <Footer />

      {/* Modals */}
      <JobDetailModal
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
      />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        user={user}
        setUser={setUser}
      />

      <MockTestModal
        test={selectedMockTest}
        onClose={() => setSelectedMockTest(null)}
      />

      <ExamTrackerSidebar
        isOpen={showExamTrackerSidebar}
        onClose={() => setShowExamTrackerSidebar(false)}
        onOpenMockTest={() => setActiveTab('mocktests')}
      />

    </div>
  );
}
