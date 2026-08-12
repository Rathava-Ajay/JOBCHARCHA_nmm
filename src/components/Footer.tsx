import React, { useState } from 'react';
import { 
  Send, 
  MapPin, 
  ShieldCheck, 
  Mail, 
  Phone, 
  CheckCircle2, 
  Lock, 
  HelpCircle,
  Sparkles
} from 'lucide-react';

export const Footer: React.FC = () => {
  // Math CAPTCHA state
  const [captchaNum1] = useState(7);
  const [captchaNum2] = useState(5);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactError, setContactError] = useState('');

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(captchaAnswer) !== captchaNum1 + captchaNum2) {
      setContactError('Math CAPTCHA answer is incorrect. Try again.');
      return;
    }
    setContactError('');
    setContactSubmitted(true);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
    }
  };

  const popularDistricts = [
    'New Delhi', 'Mumbai', 'Bengaluru Urban', 'Lucknow', 'Patna', 
    'Kolkata', 'Chennai', 'Hyderabad', 'Jaipur', 'Ahmedabad',
    'Chandigarh', 'Bhopal', 'Ranchi', 'Dehradun', 'Guwahati'
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter Sub Box */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded">
              Direct In-App & Email Push Notifications
            </span>
            <h3 className="text-xl font-black text-white mt-2">Get Instant Daily Job & Exam Notification Alerts</h3>
            <p className="text-xs text-slate-400 mt-1">
              Join over 2.4 million candidates receiving verified central and state vacancy updates directly to their inbox.
            </p>
          </div>

          <div className="w-full md:w-auto">
            {newsletterSubscribed ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1.5 text-xs bg-emerald-500/20 px-4 py-2.5 rounded-xl border border-emerald-500/30">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Subscription Active for {newsletterEmail}
              </span>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 w-full sm:w-64"
                />
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-5 py-2.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" /> Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* District & Location Links Grid */}
        <div className="mb-10 pb-8 border-b border-slate-800/80">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-3">
            District-wise & Location Based Job Search Directory:
          </span>
          <div className="flex flex-wrap gap-2 text-[11px]">
            {popularDistricts.map((dist) => (
              <a
                key={dist}
                href="#"
                className="bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white px-2.5 py-1 rounded-lg border border-slate-800 transition-colors"
              >
                Jobs in {dist}
              </a>
            ))}
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 font-black text-lg flex items-center justify-center">
                N
              </div>
              <span className="text-lg font-black text-white tracking-tight">NaukriExams</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              India's comprehensive portal for public & private recruitment, CBT mock test series, official admit card downloads, and cutoff analytics.
            </p>
            <div className="text-[11px] text-slate-500 space-y-1">
              <div>Email: support@naukriexams.gov</div>
              <div>Phone: 1800-110-GOV (Toll Free)</div>
            </div>
          </div>

          {/* Col 2: Exam Categories & Syllabus */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">Exams & Syllabus</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-white transition-colors">SSC CGL / CHSL Syllabus 2026</a></li>
              <li><a href="#" className="hover:text-white transition-colors">UPSC Civil Services Prelims GS-1</a></li>
              <li><a href="#" className="hover:text-white transition-colors">IBPS PO & Clerk Question Bank</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Railway RRB NTPC Exam Calendar</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Defense CDS / NDA Entrance Papers</a></li>
            </ul>
          </div>

          {/* Col 3: Useful Links & Info Pages */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">Information Pages</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-white transition-colors">About NaukriExams Portal</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy & Cloudflare R2 Storage</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Employer Job Posting Rules</a></li>
              <li><a href="#" className="hover:text-white transition-colors">XML Sitemap & SEO Index</a></li>
            </ul>
          </div>

          {/* Col 4: Anti-Bot Contact Form with Math CAPTCHA */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-emerald-400" /> Support Contact & CAPTCHA
            </h4>

            {contactSubmitted ? (
              <div className="bg-emerald-500/20 text-emerald-300 p-3 rounded-xl text-[11px] text-center border border-emerald-500/30">
                Ticket submitted! Support will contact you within 2 hours.
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-2.5">
                <input
                  type="text"
                  required
                  placeholder="Your Name / Roll No"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                />
                <input
                  type="email"
                  required
                  placeholder="Your Email Address"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                />

                {/* Math CAPTCHA */}
                <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-300 font-semibold">
                    Solve Math CAPTCHA: <span className="font-bold text-emerald-400">{captchaNum1} + {captchaNum2} = ?</span>
                  </span>
                  <input
                    type="number"
                    required
                    value={captchaAnswer}
                    onChange={(e) => setCaptchaAnswer(e.target.value)}
                    className="w-16 bg-slate-900 border border-slate-700 text-white text-center rounded text-xs py-1 focus:outline-none font-bold"
                  />
                </div>

                {contactError && <div className="text-rose-400 text-[10px]">{contactError}</div>}

                <button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs py-2 rounded-lg transition-colors cursor-pointer"
                >
                  Send Support Ticket
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <div>© 2026 NaukriExams Portal. All rights reserved. Non-government independent education platform.</div>
          <div className="flex gap-4">
            <span>Secure SSL Encrypted</span>
            <span>Cloudflare R2 Storage</span>
            <span>Razorpay Verified</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
