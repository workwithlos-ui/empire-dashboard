'use client';

import { useState, useEffect } from 'react';
import {
  Brain, ArrowRight, ArrowLeft, CheckCircle2, AlertTriangle, XCircle,
  Zap, Target, BarChart3, Shield, Users, Cpu, Database, TrendingUp,
  Award, Star, ChevronRight, RotateCcw
} from 'lucide-react';

const sections = [
  { id: 'current', name: 'Current State', icon: BarChart3, color: '#6366f1' },
  { id: 'tech', name: 'Tech & Data', icon: Database, color: '#3b82f6' },
  { id: 'ops', name: 'Operations', icon: Cpu, color: '#f59e0b' },
  { id: 'leadership', name: 'Leadership', icon: Users, color: '#10b981' },
];

const questions = [
  // Current State (1-4)
  { id: 1, section: 'current', text: 'How would you describe your current use of AI in business operations?', options: [
    { text: 'No AI usage at all', score: 1 },
    { text: 'Experimenting with basic tools (ChatGPT, etc.)', score: 2 },
    { text: 'Using AI in 1-2 specific workflows', score: 3 },
    { text: 'AI integrated across multiple departments', score: 4 },
  ]},
  { id: 2, section: 'current', text: 'What percentage of your repetitive tasks are currently automated?', options: [
    { text: 'Less than 10%', score: 1 },
    { text: '10-30%', score: 2 },
    { text: '30-60%', score: 3 },
    { text: 'Over 60%', score: 4 },
  ]},
  { id: 3, section: 'current', text: 'How do you currently handle customer inquiries and support?', options: [
    { text: 'Entirely manual, phone and email only', score: 1 },
    { text: 'Basic ticketing system with manual responses', score: 2 },
    { text: 'Some automated responses with human escalation', score: 3 },
    { text: 'AI-powered chatbots with intelligent routing', score: 4 },
  ]},
  { id: 4, section: 'current', text: 'How quickly can you generate a comprehensive business report?', options: [
    { text: 'Days to weeks, mostly manual compilation', score: 1 },
    { text: 'Several hours with spreadsheet tools', score: 2 },
    { text: 'Under an hour with dashboard tools', score: 3 },
    { text: 'Real-time automated reporting', score: 4 },
  ]},
  // Tech & Data (5-8)
  { id: 5, section: 'tech', text: 'How would you rate your data infrastructure?', options: [
    { text: 'Data scattered across spreadsheets and emails', score: 1 },
    { text: 'Basic CRM/database but siloed systems', score: 2 },
    { text: 'Centralized data with some integration', score: 3 },
    { text: 'Unified data lake with real-time pipelines', score: 4 },
  ]},
  { id: 6, section: 'tech', text: 'What is the state of your API and integration capabilities?', options: [
    { text: 'No APIs, everything is manual', score: 1 },
    { text: 'A few basic integrations (Zapier, etc.)', score: 2 },
    { text: 'Custom APIs connecting core systems', score: 3 },
    { text: 'Full API ecosystem with event-driven architecture', score: 4 },
  ]},
  { id: 7, section: 'tech', text: 'How clean and structured is your business data?', options: [
    { text: 'Messy, inconsistent, lots of duplicates', score: 1 },
    { text: 'Somewhat organized but needs cleanup', score: 2 },
    { text: 'Well-structured with regular maintenance', score: 3 },
    { text: 'Production-grade data with governance policies', score: 4 },
  ]},
  { id: 8, section: 'tech', text: 'Do you have the technical talent to implement AI solutions?', options: [
    { text: 'No technical team at all', score: 1 },
    { text: 'Basic IT support only', score: 2 },
    { text: 'Developers who could learn AI tools', score: 3 },
    { text: 'Dedicated AI/ML engineers on staff', score: 4 },
  ]},
  // Operations (9-12)
  { id: 9, section: 'ops', text: 'How standardized are your business processes?', options: [
    { text: 'Ad hoc, different every time', score: 1 },
    { text: 'Some documented SOPs but inconsistent', score: 2 },
    { text: 'Well-documented and mostly followed', score: 3 },
    { text: 'Fully standardized with continuous improvement', score: 4 },
  ]},
  { id: 10, section: 'ops', text: 'How do you handle lead follow-up and sales processes?', options: [
    { text: 'Manual tracking, often leads fall through', score: 1 },
    { text: 'Basic CRM with manual follow-up reminders', score: 2 },
    { text: 'Automated sequences with some personalization', score: 3 },
    { text: 'AI-driven scoring, routing, and personalized outreach', score: 4 },
  ]},
  { id: 11, section: 'ops', text: 'What is your average response time to new leads?', options: [
    { text: 'Over 24 hours', score: 1 },
    { text: '4-24 hours', score: 2 },
    { text: '1-4 hours', score: 3 },
    { text: 'Under 5 minutes (automated)', score: 4 },
  ]},
  { id: 12, section: 'ops', text: 'How do you measure and optimize operational efficiency?', options: [
    { text: 'We do not track efficiency metrics', score: 1 },
    { text: 'Basic revenue and expense tracking', score: 2 },
    { text: 'KPI dashboards with regular reviews', score: 3 },
    { text: 'Real-time analytics with AI-powered optimization', score: 4 },
  ]},
  // Leadership (13-15)
  { id: 13, section: 'leadership', text: 'How committed is leadership to AI transformation?', options: [
    { text: 'Skeptical or unaware of AI potential', score: 1 },
    { text: 'Interested but no budget allocated', score: 2 },
    { text: 'Active champion with dedicated budget', score: 3 },
    { text: 'AI-first strategy with board-level support', score: 4 },
  ]},
  { id: 14, section: 'leadership', text: 'What is your AI implementation budget?', options: [
    { text: 'No dedicated budget', score: 1 },
    { text: 'Under $25K annually', score: 2 },
    { text: '$25K - $100K annually', score: 3 },
    { text: 'Over $100K annually', score: 4 },
  ]},
  { id: 15, section: 'leadership', text: 'How does your team view AI adoption?', options: [
    { text: 'Resistant or fearful of change', score: 1 },
    { text: 'Cautiously curious', score: 2 },
    { text: 'Enthusiastic early adopters', score: 3 },
    { text: 'Already using AI daily and pushing for more', score: 4 },
  ]},
];

const tiers = [
  { name: 'CRITICAL', range: [15, 25], color: '#ef4444', bg: 'bg-red-500/10 border-red-500/30', icon: XCircle, description: 'Your organization is at serious risk of falling behind. Immediate action is needed to begin your AI journey.' },
  { name: 'BEHIND', range: [26, 38], color: '#f59e0b', bg: 'bg-amber-500/10 border-amber-500/30', icon: AlertTriangle, description: 'You have some foundations but significant gaps remain. A structured AI roadmap will accelerate your progress.' },
  { name: 'READY', range: [39, 50], color: '#3b82f6', bg: 'bg-blue-500/10 border-blue-500/30', icon: CheckCircle2, description: 'Strong foundations are in place. Focus on scaling AI across departments and optimizing existing implementations.' },
  { name: 'ADVANCED', range: [51, 60], color: '#10b981', bg: 'bg-emerald-500/10 border-emerald-500/30', icon: Award, description: 'You are an AI leader. Continue innovating and consider licensing your AI capabilities to others.' },
];

const industryBenchmarks = [
  { industry: 'Private Equity', avg: 32, top: 52 },
  { industry: 'SaaS / Technology', avg: 41, top: 56 },
  { industry: 'Healthcare', avg: 28, top: 48 },
  { industry: 'Real Estate', avg: 25, top: 44 },
  { industry: 'E-Commerce', avg: 38, top: 54 },
  { industry: 'Manufacturing', avg: 30, top: 46 },
];

export default function AIReadinessAssessment() {
  const [screen, setScreen] = useState('welcome');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleAnswer = (questionId, score) => {
    const newAnswers = { ...answers, [questionId]: score };
    setAnswers(newAnswers);
    if (currentQ < questions.length - 1) {
      setTimeout(() => setCurrentQ(currentQ + 1), 300);
    } else {
      setTimeout(() => setScreen('results'), 500);
    }
  };

  const totalScore = Object.values(answers).reduce((sum, s) => sum + s, 0);
  const maxScore = 60;

  const getSectionScore = (sectionId) => {
    const sectionQs = questions.filter((q) => q.section === sectionId);
    const sectionAnswers = sectionQs.map((q) => answers[q.id] || 0);
    return sectionAnswers.reduce((sum, s) => sum + s, 0);
  };

  const getTier = () => {
    return tiers.find((t) => totalScore >= t.range[0] && totalScore <= t.range[1]) || tiers[0];
  };

  const getRecommendations = () => {
    const recs = [];
    const sectionScores = sections.map((s) => ({ ...s, score: getSectionScore(s.id) }));
    const weakest = sectionScores.sort((a, b) => a.score - b.score);

    const recMap = {
      current: 'Start with quick-win AI tools like chatbots and automated email responses to build momentum and demonstrate ROI within 30 days.',
      tech: 'Invest in data infrastructure consolidation. Clean, centralized data is the foundation for every successful AI implementation.',
      ops: 'Map and standardize your top 10 business processes. Automation works best on consistent, documented workflows.',
      leadership: 'Schedule an AI strategy workshop for leadership. Alignment at the top is critical for successful transformation.',
    };

    for (let i = 0; i < 3 && i < weakest.length; i++) {
      recs.push({ section: weakest[i].name, text: recMap[weakest[i].id], color: weakest[i].color });
    }
    return recs;
  };

  const restart = () => {
    setScreen('welcome');
    setCurrentQ(0);
    setAnswers({});
  };

  // Welcome Screen
  if (screen === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 md:p-6 flex items-center justify-center">
        <div className="max-w-2xl w-full text-center space-y-8">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/20">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white">AI Readiness Assessment</h1>
          <p className="text-lg text-slate-400 max-w-lg mx-auto">
            Discover where your organization stands on the AI maturity spectrum. 15 questions across 4 critical dimensions will reveal your readiness tier and provide actionable recommendations.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sections.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.id} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 backdrop-blur-sm">
                  <Icon className="w-6 h-6 mx-auto mb-2" style={{ color: s.color }} />
                  <div className="text-sm font-medium text-white">{s.name}</div>
                  <div className="text-xs text-slate-500 mt-1">{questions.filter((q) => q.section === s.id).length} questions</div>
                </div>
              );
            })}
          </div>
          <button
            onClick={() => setScreen('assessment')}
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-indigo-500/20 flex items-center gap-2 mx-auto"
          >
            Start Assessment <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-xs text-slate-600">Takes approximately 3-5 minutes to complete</p>
        </div>
      </div>
    );
  }

  // Assessment Screen
  if (screen === 'assessment') {
    const q = questions[currentQ];
    const currentSection = sections.find((s) => s.id === q.section);
    const progress = ((currentQ + 1) / questions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 md:p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Question {currentQ + 1} of {questions.length}</span>
              <span className="text-slate-400" style={{ color: currentSection.color }}>{currentSection.name}</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2">
              <div className="h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%`, backgroundColor: currentSection.color }} />
            </div>
            <div className="flex gap-1">
              {sections.map((s) => {
                const sectionQs = questions.filter((sq) => sq.section === s.id);
                const firstIdx = questions.indexOf(sectionQs[0]);
                const lastIdx = questions.indexOf(sectionQs[sectionQs.length - 1]);
                const isActive = currentQ >= firstIdx && currentQ <= lastIdx;
                const isComplete = currentQ > lastIdx;
                return (
                  <div key={s.id} className={`flex-1 h-1 rounded-full transition-all ${isComplete ? 'opacity-100' : isActive ? 'opacity-60' : 'opacity-20'}`}
                    style={{ backgroundColor: s.color }} />
                );
              })}
            </div>
          </div>

          {/* Question */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-6">
              {(() => { const Icon = currentSection.icon; return <Icon className="w-5 h-5" style={{ color: currentSection.color }} />; })()}
              <span className="text-sm font-medium" style={{ color: currentSection.color }}>{currentSection.name}</span>
            </div>
            <h2 className="text-xl font-semibold text-white mb-8">{q.text}</h2>
            <div className="space-y-3">
              {q.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(q.id, option.score)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    answers[q.id] === option.score
                      ? 'border-indigo-500/50 bg-indigo-500/10 text-white'
                      : 'border-slate-700/50 bg-slate-900/30 text-slate-300 hover:border-slate-600 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      answers[q.id] === option.score ? 'bg-indigo-500 text-white' : 'bg-slate-700 text-slate-400'
                    }`}>
                      {String.fromCharCode(65 + i)}
                    </div>
                    <span className="text-sm">{option.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => currentQ > 0 && setCurrentQ(currentQ - 1)}
              disabled={currentQ === 0}
              className="flex items-center gap-2 px-4 py-2 text-sm text-slate-400 hover:text-white disabled:opacity-30 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </button>
            {answers[q.id] && currentQ < questions.length - 1 && (
              <button
                onClick={() => setCurrentQ(currentQ + 1)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            )}
            {answers[q.id] && currentQ === questions.length - 1 && (
              <button
                onClick={() => setScreen('results')}
                className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors text-sm font-medium"
              >
                View Results <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Results Screen
  const tier = getTier();
  const TierIcon = tier.icon;
  const recommendations = getRecommendations();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 md:p-6 space-y-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Tier Classification */}
        <div className={`${tier.bg} border rounded-xl p-8 backdrop-blur-sm text-center`}>
          <TierIcon className="w-16 h-16 mx-auto mb-4" style={{ color: tier.color }} />
          <div className="text-sm text-slate-400 mb-2">Your AI Readiness Tier</div>
          <h1 className="text-4xl font-bold mb-2" style={{ color: tier.color }}>{tier.name}</h1>
          <div className="text-5xl font-bold text-white my-4">{totalScore}<span className="text-lg text-slate-500">/{maxScore}</span></div>
          <p className="text-slate-400 max-w-lg mx-auto">{tier.description}</p>
        </div>

        {/* Section Scores */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-white mb-4">Section Breakdown</h2>
          <div className="space-y-4">
            {sections.map((s) => {
              const score = getSectionScore(s.id);
              const maxSectionScore = questions.filter((q) => q.section === s.id).length * 4;
              const pct = (score / maxSectionScore) * 100;
              const Icon = s.icon;
              return (
                <div key={s.id}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4" style={{ color: s.color }} />
                      <span className="text-sm font-medium text-white">{s.name}</span>
                    </div>
                    <span className="text-sm font-bold text-white">{score}/{maxSectionScore}</span>
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-3">
                    <div className="h-3 rounded-full transition-all duration-1000" style={{ width: `${pct}%`, backgroundColor: s.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Industry Benchmarks */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-white mb-4">Industry Benchmark Comparison</h2>
          <div className="space-y-3">
            {industryBenchmarks.map((bench) => (
              <div key={bench.industry} className="flex items-center gap-3">
                <div className="w-32 text-sm text-slate-300">{bench.industry}</div>
                <div className="flex-1 relative bg-slate-700/50 rounded-full h-4">
                  <div className="absolute h-4 bg-slate-600/60 rounded-full" style={{ width: `${(bench.avg / 60) * 100}%` }} />
                  <div className="absolute h-4 bg-blue-500/30 rounded-full" style={{ width: `${(bench.top / 60) * 100}%` }} />
                  <div className="absolute h-6 w-0.5 -top-1 rounded-full" style={{ left: `${(totalScore / 60) * 100}%`, backgroundColor: tier.color }} />
                </div>
                <div className="w-20 text-xs text-slate-500 text-right">
                  Avg: {bench.avg} | Top: {bench.top}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1"><span className="w-3 h-1 bg-slate-600 rounded" /> Industry Avg</span>
            <span className="flex items-center gap-1"><span className="w-3 h-1 bg-blue-500/50 rounded" /> Top Performers</span>
            <span className="flex items-center gap-1"><span className="w-0.5 h-3 rounded" style={{ backgroundColor: tier.color }} /> Your Score</span>
          </div>
        </div>

        {/* Top 3 Recommendations */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-400" />
            Top 3 Recommendations
          </h2>
          <div className="space-y-4">
            {recommendations.map((rec, i) => (
              <div key={i} className="bg-slate-900/50 border border-slate-700/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold">{i + 1}</span>
                  <span className="text-sm font-medium" style={{ color: rec.color }}>{rec.section}</span>
                </div>
                <p className="text-sm text-slate-300">{rec.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-xl p-8 text-center backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white mb-2">Ready to Accelerate Your AI Journey?</h2>
          <p className="text-slate-400 mb-6">Get a personalized AI implementation roadmap tailored to your organization.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://aisimple.com" target="_blank" rel="noopener noreferrer"
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-indigo-500/20 flex items-center gap-2">
              Book Strategy Call <ChevronRight className="w-4 h-4" />
            </a>
            <button onClick={restart}
              className="px-6 py-3 bg-slate-800 text-slate-300 font-medium rounded-xl border border-slate-700 hover:bg-slate-700 transition-all flex items-center gap-2">
              <RotateCcw className="w-4 h-4" /> Retake Assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
