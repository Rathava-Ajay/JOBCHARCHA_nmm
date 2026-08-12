import React, { useState } from 'react';
import { 
  Wallet, 
  Gift, 
  Share2, 
  Users, 
  Copy, 
  Check, 
  Sparkles, 
  ArrowRight, 
  Unlock, 
  Award,
  DollarSign
} from 'lucide-react';
import { UserProfile } from '../types';

interface ReferralWalletSectionProps {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
}

export const ReferralWalletSection: React.FC<ReferralWalletSectionProps> = ({
  user,
  setUser,
}) => {
  const [invitedFriendsCount, setInvitedFriendsCount] = useState(5);
  const [copiedCode, setCopiedCode] = useState(false);

  const earningsCalculation = invitedFriendsCount * 200;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(`Join NaukriExams using my code ${user.referralCode} and get ₹200 free wallet bonus credits! https://naukriexams.gov/ref/${user.referralCode}`);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSimulateClaimReward = () => {
    setUser({
      ...user,
      walletBalance: user.walletBalance + 200,
      referralsCount: user.referralsCount + 1
    });
    alert('Congratulations! ₹200 Wallet Bonus Credit added successfully!');
  };

  return (
    <section className="py-12 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-md mb-2">
            <Wallet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Wallet Credits & Referral Rewards Hub</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Earn Wallet Credits for Free Test Pass & Resume Unlocks
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Invite fellow aspirants or recruiters. Get ₹200 added to your wallet for every successful signup.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Card 1: User Wallet Balance Overview */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 flex flex-col justify-between border border-slate-800 shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">Your Active Wallet</span>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded">
                  Verified Balance
                </span>
              </div>

              <div className="text-3xl sm:text-4xl font-black text-white flex items-baseline gap-1">
                <span>₹{user.walletBalance}</span>
                <span className="text-xs font-normal text-slate-400">Credits</span>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Referrals Done:</span>
                  <span className="font-bold text-white">{user.referralsCount} Candidates</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Unlocked Candidate Resumes:</span>
                  <span className="font-bold text-white">{user.unlockedResumesCount} Resumes</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800">
              <button
                onClick={handleSimulateClaimReward}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Simulate Referral Reward (+₹200)</span>
              </button>
            </div>
          </div>

          {/* Card 2: Interactive Referral Earnings Calculator */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded">
                Earnings Estimator
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-2">Calculate Your Free Credits</h3>
              
              <div className="mt-4 space-y-3">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-600">Friends / Aspirants Invited:</span>
                  <span className="text-slate-900 font-bold">{invitedFriendsCount} Friends</span>
                </div>

                <input
                  type="range"
                  min="1"
                  max="25"
                  value={invitedFriendsCount}
                  onChange={(e) => setInvitedFriendsCount(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Wallet Bonus Earned</span>
                  <span className="text-3xl font-black text-emerald-700">₹{earningsCalculation}</span>
                  <span className="text-[11px] text-slate-500 block mt-1">
                    = 100% Free Aspirant Pass Pro Annual Access
                  </span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 mt-4">
              Wallet credits never expire and can be redeemed for Pass Pro subscriptions or resume downloads.
            </p>
          </div>

          {/* Card 3: Referral Code & Social Sharing */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded">
                Your Share Link
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-2">Unique Referral Code</h3>

              <div className="mt-4 space-y-3">
                <div className="bg-slate-900 text-emerald-400 p-3 rounded-2xl text-center font-mono font-bold text-lg tracking-wider border border-slate-800">
                  {user.referralCode}
                </div>

                <button
                  onClick={handleCopyCode}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-2.5 rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Copied Share Message!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-600" />
                      <span>Copy Invitation Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1"><Share2 className="w-3.5 h-3.5" /> Telegram / WhatsApp Ready</span>
              <span className="font-bold text-slate-800">Instant Credit</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
