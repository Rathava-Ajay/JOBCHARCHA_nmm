import React, { useState, useEffect } from 'react';
import { X, Clock, CheckCircle2, AlertTriangle, Trophy, Play, ArrowRight, RotateCcw } from 'lucide-react';
import { MockTest } from '../types';

interface MockTestModalProps {
  test: MockTest | null;
  onClose: () => void;
}

export const MockTestModal: React.FC<MockTestModalProps> = ({ test, onClose }) => {
  if (!test) return null;

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: string]: number }>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(test.durationMinutes * 60);
  const [testFinished, setTestFinished] = useState(false);

  useEffect(() => {
    if (testFinished || timeLeftSeconds <= 0) return;
    const interval = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          setTestFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [testFinished, timeLeftSeconds]);

  const questions = test.questions && test.questions.length > 0 ? test.questions : [
    {
      id: 'mock-q1',
      questionText: 'Which constitutional body conducts recruitment for Indian Administrative Service (IAS)?',
      options: ['Staff Selection Commission', 'Union Public Service Commission', 'NITI Aayog', 'Central Vigilance Commission'],
      correctIndex: 1,
      explanation: 'Article 315 of the Constitution establishes the UPSC for conducting exams for appointments to Union services.'
    },
    {
      id: 'mock-q2',
      questionText: 'Simplify: (25% of 400) + (12.5% of 800)',
      options: ['150', '200', '180', '220'],
      correctIndex: 1,
      explanation: '100 + 100 = 200.'
    }
  ];

  const currentQ = questions[currentQuestionIdx];

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSelectAnswer = (optIdx: number) => {
    if (testFinished) return;
    setSelectedAnswers({ ...selectedAnswers, [currentQ.id]: optIdx });
  };

  const calculateFinalScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score += test.totalMarks / questions.length;
      }
    });
    return Math.round(score);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 text-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 relative border border-slate-800 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div>
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">Live CBT Examination Mode</span>
            <h3 className="text-lg font-black text-white">{test.title}</h3>
          </div>

          <div className="flex items-center gap-4">
            {!testFinished && (
              <div className="bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>{formatTime(timeLeftSeconds)}</span>
              </div>
            )}
            <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-xl">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {!testFinished ? (
          <div>
            {/* Question Counter Header */}
            <div className="flex justify-between items-center text-xs font-semibold text-slate-400 mb-4">
              <span>Question {currentQuestionIdx + 1} of {questions.length}</span>
              <span className="text-emerald-400 font-bold">Marks: +{Math.round(test.totalMarks / questions.length)}</span>
            </div>

            {/* Question Text */}
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 mb-6">
              <p className="text-sm font-semibold text-white leading-relaxed">{currentQ.questionText}</p>
            </div>

            {/* Options Grid */}
            <div className="space-y-3">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = selectedAnswers[currentQ.id] === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectAnswer(optIdx)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                        : 'bg-slate-800/60 border-slate-700 hover:bg-slate-800 text-slate-200'
                    }`}
                  >
                    <span>{opt}</span>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                      isSelected ? 'border-emerald-400 bg-emerald-500 text-slate-950 font-bold' : 'border-slate-600'
                    }`}>
                      {isSelected && '✓'}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Controls */}
            <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                disabled={currentQuestionIdx === 0}
                onClick={() => setCurrentQuestionIdx(currentQuestionIdx - 1)}
                className="bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold px-4 py-2 rounded-xl transition-colors"
              >
                Previous
              </button>

              <button
                onClick={() => setTestFinished(true)}
                className="bg-rose-600/80 hover:bg-rose-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors"
              >
                Finish Test Now
              </button>

              {currentQuestionIdx < questions.length - 1 ? (
                <button
                  onClick={() => setCurrentQuestionIdx(currentQuestionIdx + 1)}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-5 py-2 rounded-xl transition-transform active:scale-95"
                >
                  Next Question
                </button>
              ) : (
                <button
                  onClick={() => setTestFinished(true)}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs px-5 py-2 rounded-xl shadow-lg"
                >
                  Submit & View Rank
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <Trophy className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs uppercase font-bold text-slate-400">Scorecard Generated</span>
              <h3 className="text-3xl font-black text-white mt-1">{calculateFinalScore()} / {test.totalMarks} Marks</h3>
              <p className="text-xs text-slate-400 mt-1">Accuracy Rate: {Math.round((calculateFinalScore() / test.totalMarks) * 100)}%</p>
            </div>

            <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 max-w-md mx-auto text-xs text-slate-300">
              <span className="font-bold text-emerald-400 block mb-1">Performance Insight:</span>
              Your performance matches the top 5% candidate percentile for {test.examCategory} exams.
            </div>

            <button
              onClick={onClose}
              className="bg-slate-100 hover:bg-white text-slate-950 font-black text-xs px-8 py-3 rounded-xl transition-transform active:scale-95 cursor-pointer"
            >
              Close & Return to Dashboard
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
