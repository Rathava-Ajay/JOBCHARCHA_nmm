import React, { useState } from 'react';
import { X, Smartphone, Lock, CheckCircle2, User, ShieldCheck, Mail, KeyRound, Building2, UserCheck, ArrowRight } from 'lucide-react';
import { UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, user, setUser }) => {
  if (!isOpen) return null;

  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [selectedRole, setSelectedRole] = useState<'aspirant' | 'employer' | 'admin'>(user.role || 'aspirant');
  const [loginMethod, setLoginMethod] = useState<'otp' | 'email'>('otp');

  // Form Fields
  const [phone, setPhone] = useState(user.phone || '');
  const [email, setEmail] = useState(user.email || '');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState(user.companyName || '');
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState('');
  const [userName, setUserName] = useState(user.name || '');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) return;
    setOtpStep(true);
  };

  const handleVerifyAndLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      ...user,
      role: selectedRole,
      phone: phone || user.phone,
      email: email || user.email,
      name: userName || (selectedRole === 'employer' ? 'Hiring Manager' : selectedRole === 'admin' ? 'Admin Controller' : 'Registered Aspirant'),
      companyName: selectedRole === 'employer' ? (companyName || 'EdTech Pvt Ltd') : undefined,
      isCompanyVerified: selectedRole === 'employer' ? true : undefined,
    });
    
    alert(`Successfully authenticated as ${selectedRole.toUpperCase()}! Welcome back.`);
    onClose();
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Password reset link has been dispatched to ${email || 'your registered email'}. Please verify your inbox.`);
    setAuthMode('login');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white text-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border border-slate-200">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 bg-slate-100 p-2 rounded-full cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-2 font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900">
            {authMode === 'login' ? 'Portal Account Login' : authMode === 'register' ? 'Create Portal Account' : 'Reset Password'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Access customized tools for Job Seekers, Employers & Platform Admins.
          </p>
        </div>

        {/* Role Selector Tabs */}
        {authMode !== 'forgot' && (
          <div className="mb-6">
            <label className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider block mb-1.5 text-center">
              Select Login Role
            </label>
            <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200">
              {[
                { id: 'aspirant', label: 'Aspirant', icon: User },
                { id: 'employer', label: 'Employer', icon: Building2 },
                { id: 'admin', label: 'Admin', icon: UserCheck },
              ].map((r) => {
                const IconComp = r.icon;
                const isSelected = selectedRole === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setSelectedRole(r.id as any)}
                    className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 text-white shadow-md'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    }`}
                  >
                    <IconComp className="w-3.5 h-3.5" />
                    <span>{r.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Auth Method Toggle for Aspirant/Employer */}
        {authMode === 'login' && (
          <div className="flex justify-center gap-4 text-xs font-bold mb-4 border-b border-slate-100 pb-3">
            <button
              onClick={() => { setLoginMethod('otp'); setOtpStep(false); }}
              className={`pb-1 cursor-pointer transition-colors ${loginMethod === 'otp' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Mobile OTP Auth
            </button>
            <button
              onClick={() => setLoginMethod('email')}
              className={`pb-1 cursor-pointer transition-colors ${loginMethod === 'email' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Email & Password
            </button>
          </div>
        )}

        {/* FORGOT PASSWORD FORM */}
        {authMode === 'forgot' ? (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Registered Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs py-3 rounded-xl transition-all shadow-md cursor-pointer"
            >
              Send Password Reset Instructions
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className="text-xs text-slate-500 hover:text-slate-900 font-bold cursor-pointer"
              >
                ← Back to Login
              </button>
            </div>
          </form>
        ) : loginMethod === 'otp' && authMode === 'login' ? (
          /* OTP LOGIN FORM */
          !otpStep ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="e.g. Ajay Rathava"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 font-medium"
                />
              </div>

              {selectedRole === 'employer' && (
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Company / Department Name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. EdTech Solutions India"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 font-medium"
                  />
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">10-Digit Mobile Number</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">+91</span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="9876543210"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-3 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs py-3 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Get 6-Digit Verification OTP</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyAndLogin} className="space-y-4">
              <div className="text-center bg-emerald-50 p-3 rounded-2xl border border-emerald-200 text-xs text-emerald-800 font-medium">
                OTP sent to <span className="font-bold">+91 {phone}</span>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase block mb-1 text-center">Enter Received OTP</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="1 2 3 4 5 6"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-base font-mono font-bold text-center tracking-widest text-slate-900 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs py-3 rounded-xl shadow-md transition-all cursor-pointer"
              >
                Verify OTP & Enter {selectedRole.toUpperCase()} Dashboard
              </button>
            </form>
          )
        ) : (
          /* EMAIL & PASSWORD FORM */
          <form onSubmit={handleVerifyAndLogin} className="space-y-3.5">
            {authMode === 'register' && (
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="e.g. Ajay Rathava"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 font-medium"
                />
              </div>
            )}

            {selectedRole === 'employer' && (
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Company / Organization Name</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. EdTech Solutions"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 font-medium"
                />
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 font-medium"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-700">Password</label>
                {authMode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setAuthMode('forgot')}
                    className="text-[11px] text-emerald-700 font-semibold hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs py-3 rounded-xl shadow-md transition-all cursor-pointer mt-2"
            >
              {authMode === 'login' ? `Sign In as ${selectedRole.toUpperCase()}` : 'Create Account'}
            </button>
          </form>
        )}

        {/* Footer Toggle */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
          {authMode === 'login' ? (
            <>
              <span className="text-slate-500">Don't have an account?</span>
              <button
                type="button"
                onClick={() => setAuthMode('register')}
                className="font-bold text-emerald-700 hover:underline cursor-pointer"
              >
                Register Free
              </button>
            </>
          ) : authMode === 'register' ? (
            <>
              <span className="text-slate-500">Already registered?</span>
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className="font-bold text-emerald-700 hover:underline cursor-pointer"
              >
                Sign In Instead
              </button>
            </>
          ) : null}
        </div>

      </div>
    </div>
  );
};

