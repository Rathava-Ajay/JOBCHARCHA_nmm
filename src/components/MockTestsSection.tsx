import React, { useState } from 'react';
import { 
  FileText, 
  Clock, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Download, 
  Play, 
  Sparkles, 
  Lock, 
  BookOpen, 
  Trophy, 
  RotateCcw,
  Star
} from 'lucide-react';
import { MockTest, OldPaper } from '../types';

interface MockTestsSectionProps {
  mockTests: MockTest[];
  oldPapers: OldPaper[];
  onStartFullMockTest: (test: MockTest) => void;
  onSelectTab: (tabId: string) => void;
}

export const MockTestsSection: React.FC<MockTestsSectionProps> = ({
  mockTests,
  oldPapers,
  onStartFullMockTest,
  onSelectTab,
}) => {
  const [activeTab, setActiveTab] = useState<'tests' | 'quiz' | 'papers'>('quiz');

  // Daily Quiz Interactive State (5 High Yield Questions)
  const sampleQuizQuestions = [
    {
      id: 'q1',
      question: 'Which Amendment to the Constitution of India added Fundamental Duties?',
      options: ['42nd Amendment (1976)', '44th Amendment (1978)', '86th Amendment (2002)', '73rd Amendment (1992)'],
      correctIndex: 0,
      explanation: 'The 42nd Amendment Act, 1976 incorporated Article 51A prescribing 10 Fundamental Duties upon Swaran Singh Committee recommendation.'
    },
    {
      id: 'q2',
      question: 'The ratio of speed of boat in still water to current is 5:1. If it takes 4 hours for 60 km downstream, find upstream speed.',
      options: ['10 km/hr', '12 km/hr', '15 km/hr', '8 km/hr'],
      correctIndex: 0,
      explanation: 'Downstream speed = 60/4 = 15 km/h. 5x + 1x = 6x = 15 => x = 2.5. Upstream = 5x - 1x = 4x = 10 km/h.'
    },
    {
      id: 'q3',
      question: 'Where is the headquarters of the International Court of Justice (ICJ) located?',
      options: ['Geneva, Switzerland', 'The Hague, Netherlands', 'New York, USA', 'Vienna, Austria'],
      correctIndex: 1,
      explanation: 'The ICJ seat is at the Peace Palace in The Hague, Netherlands.'
    },
    {
      id: 'q4',
      question: 'A train 180 metres long is running at a speed of 54 km/hr. In how many seconds will it pass a man standing on the platform?',
      options: ['12 seconds', '10 seconds', '15 seconds', '8 seconds'],
      correctIndex: 0,
      explanation: 'Speed in m/s = 54 × (5/18) = 15 m/s. Time required = Distance / Speed = 180 / 15 = 12 seconds.'
    },
    {
      id: 'q5',
      question: 'Which Indian State recently launched the "Mukhyamantri Yuva Udyami Yojana" to boost youth self-employment?',
      options: ['Uttar Pradesh', 'Madhya Pradesh', 'Gujarat', 'Rajasthan'],
      correctIndex: 1,
      explanation: 'Madhya Pradesh government launched the scheme providing subsidized loan guarantees up to ₹50 Lakhs for youth micro-entrepreneurs.'
    }
  ];

  const [quizAnswers, setQuizAnswers] = useState<{ [qId: string]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleSelectOption = (qId: string, optIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers({ ...quizAnswers, [qId]: optIdx });
  };

  const calculateScore = () => {
    let score = 0;
    sampleQuizQuestions.forEach((q) => {
      if (quizAnswers[q.id] === q.correctIndex) score += 2;
    });
    return score;
  };

  const calculateCorrectCount = () => {
    let count = 0;
    sampleQuizQuestions.forEach((q) => {
      if (quizAnswers[q.id] === q.correctIndex) count += 1;
    });
    return count;
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  return (
    <section className="py-12 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-100/80 px-2.5 py-1 rounded-md mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Question Bank & CBT Exam Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 tracking-tight">
              Mock Tests, Daily Quizzes & Solved Archives
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Real CBT pattern test series, daily live speed quizzes, and official PDF question papers with answer keys.
            </p>
          </div>

          <div className="bg-slate-200/80 p-1 rounded-2xl flex items-center gap-1 text-xs font-semibold self-start md:self-auto">
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'quiz' ? 'bg-white text-slate-900 font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Daily Quiz
            </button>
            <button
              onClick={() => setActiveTab('tests')}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'tests' ? 'bg-white text-slate-900 font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              CBT Mock Tests ({mockTests.length})
            </button>
            <button
              onClick={() => setActiveTab('papers')}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'papers' ? 'bg-white text-slate-900 font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Old Solved Papers ({oldPapers.length})
            </button>
          </div>
        </div>

        {/* Tab 1: Daily Quiz Sampler */}
        {activeTab === 'quiz' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 max-w-4xl mx-auto shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 mb-6 gap-3">
              <div>
                <span className="text-[11px] uppercase font-bold text-emerald-700 tracking-wider block">Daily Speed Dispatch</span>
                <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900">3-Minute High Yield Aptitude & Awareness Quiz</h3>
              </div>
              
              {quizSubmitted ? (
                <div className="sm:text-right bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-2xl">
                  <span className="text-[10px] text-emerald-800 block uppercase font-bold tracking-wider">Quiz Score</span>
                  <span className="text-xl font-mono font-black text-emerald-700">{calculateScore()} / 10 Marks ({calculateCorrectCount()}/5 Correct)</span>
                  <span className="text-[10px] text-amber-700 font-bold block mt-0.5">🔥 Daily Streak +20 XP Claimed!</span>
                </div>
              ) : (
                <div className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl self-start sm:self-auto flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>5 Questions • 2 Marks Each</span>
                </div>
              )}
            </div>

            {/* Questions List */}
            <div className="space-y-6">
              {sampleQuizQuestions.map((q, idx) => {
                const selectedOpt = quizAnswers[q.id];
                const isAnswered = selectedOpt !== undefined;

                return (
                  <div key={q.id} className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200">
                    <div className="flex items-start gap-3">
                      <span className="bg-slate-900 text-white text-xs font-mono font-bold px-2.5 py-1 rounded-lg shrink-0">
                        Q{idx + 1}
                      </span>
                      <p className="text-sm font-semibold text-slate-900 leading-snug">{q.question}</p>
                    </div>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {q.options.map((opt, optIdx) => {
                        let btnStyle = "bg-white border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50";
                        if (isAnswered) {
                          if (optIdx === q.correctIndex) {
                            btnStyle = "bg-emerald-600 text-white border-emerald-600 font-bold shadow-sm";
                          } else if (selectedOpt === optIdx) {
                            btnStyle = "bg-slate-200 border-slate-300 text-slate-600 line-through";
                          }
                        } else if (selectedOpt === optIdx) {
                          btnStyle = "bg-slate-900 text-white border-slate-900 font-bold";
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={quizSubmitted}
                            onClick={() => handleSelectOption(q.id, optIdx)}
                            className={`p-3.5 rounded-xl border text-xs font-semibold text-left transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {isAnswered && optIdx === q.correctIndex && (
                              <CheckCircle2 className="w-4 h-4 text-white shrink-0 ml-1" />
                            )}
                            {isAnswered && selectedOpt === optIdx && optIdx !== q.correctIndex && (
                              <XCircle className="w-4 h-4 text-slate-500 shrink-0 ml-1" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {quizSubmitted && (
                      <div className="mt-3 p-3.5 bg-white rounded-xl border border-slate-200 text-xs text-slate-800">
                        <span className="font-bold text-emerald-700 block mb-0.5 uppercase text-[10px] tracking-wider">Explanation:</span>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quiz Action Bottom Bar */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              {quizSubmitted ? (
                <button
                  onClick={resetQuiz}
                  className="bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-emerald-400" /> Reset Quiz
                </button>
              ) : (
                <button
                  onClick={() => setQuizSubmitted(true)}
                  disabled={Object.keys(quizAnswers).length === 0}
                  className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-extrabold text-xs px-6 py-2.5 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Submit & Evaluate
                </button>
              )}

              <button
                onClick={() => onSelectTab('pricing')}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
              >
                Pass Pro Series Access <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Full Mock Tests */}
        {activeTab === 'tests' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockTests.map((test) => (
              <div key={test.id} className="bg-white border border-slate-200/80 rounded-2xl p-6 flex flex-col justify-between hover:shadow-xl transition-all group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-slate-900 text-white px-2.5 py-1 rounded-md">
                      {test.examCategory}
                    </span>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${
                      test.isFree ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-slate-100 border-slate-200 text-slate-700'
                    }`}>
                      {test.isFree ? 'Free Mock' : 'Pass Pro'}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-slate-900 text-lg leading-snug group-hover:text-emerald-700 transition-colors">{test.title}</h3>

                  <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold uppercase">Questions</span>
                      <span className="font-bold text-slate-800">{test.totalQuestions}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold uppercase">Time</span>
                      <span className="font-bold text-slate-800">{test.durationMinutes}m</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold uppercase">Marks</span>
                      <span className="font-bold text-slate-800">{test.totalMarks}</span>
                    </div>
                  </div>

                  <div className="mt-3 text-xs font-medium text-slate-500 flex items-center justify-between">
                    <span>{test.attemptsCount.toLocaleString()} Candidates</span>
                    <span className="text-emerald-700 font-bold">{test.difficulty}</span>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => onStartFullMockTest(test)}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs py-3 rounded-xl transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 text-white fill-white" />
                    <span>Launch CBT Exam Test</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Previous Year Papers */}
        {activeTab === 'papers' && (
          <div className="space-y-4">
            {oldPapers.map((paper) => (
              <div key={paper.id} className="bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-all">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                      {paper.year} Paper
                    </span>
                    {paper.shift && <span className="text-xs text-slate-500">{paper.shift}</span>}
                  </div>
                  <h3 className="font-heading font-bold text-slate-900 text-lg">{paper.title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Official Question Paper PDF with verified Answer Key • {paper.downloadCount.toLocaleString()} Downloads
                  </p>
                </div>

                <a
                  href={paper.downloadUrl}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl inline-flex items-center gap-2 self-start md:self-auto shrink-0 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>Download PDF ({paper.fileSize})</span>
                </a>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
