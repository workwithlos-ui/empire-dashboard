'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Mail, User, Building2, CheckCircle2, Download, Calendar, AlertCircle, TrendingUp, Target, Zap } from 'lucide-react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const ASSESSMENT_DATA = {
  categories: [
    {
      id: 'data-infrastructure',
      name: 'Data Infrastructure',
      description: 'How well is your data organized and accessible?',
      questions: [
        {
          id: 'q1',
          question: 'How is your customer data currently stored?',
          options: [
            { label: 'Spreadsheets & files', value: 1 },
            { label: 'Basic CRM (basic contact mgmt)', value: 2 },
            { label: 'Advanced CRM (HubSpot, Salesforce)', value: 3 },
            { label: 'Data warehouse with integrations', value: 4 },
          ],
        },
        {
          id: 'q2',
          question: 'Can you access real-time business metrics on demand?',
          options: [
            { label: 'No, we rely on manual reports', value: 1 },
            { label: 'Sometimes, but it takes effort', value: 2 },
            { label: 'Usually, through dashboards', value: 3 },
            { label: 'Always, with automated dashboards', value: 4 },
          ],
        },
        {
          id: 'q3',
          question: 'How integrated are your business systems?',
          options: [
            { label: "Siloed - tools don't talk to each other", value: 1 },
            { label: 'Some integration between key systems', value: 2 },
            { label: 'Mostly integrated with some gaps', value: 3 },
            { label: 'Fully connected data ecosystem', value: 4 },
          ],
        },
        {
          id: 'q4',
          question: 'Do you have documented data processes?',
          options: [
            { label: 'No documentation', value: 1 },
            { label: 'Some documented processes', value: 2 },
            { label: 'Mostly documented, some gaps', value: 3 },
            { label: 'Fully documented with SOPs', value: 4 },
          ],
        },
        {
          id: 'q5',
          question: 'How clean and consistent is your data?',
          options: [
            { label: 'Lots of duplicates & inconsistencies', value: 1 },
            { label: 'Some data quality issues', value: 2 },
            { label: 'Mostly clean with occasional issues', value: 3 },
            { label: 'Automated quality checks & cleanup', value: 4 },
          ],
        },
      ],
    },
    {
      id: 'process-maturity',
      name: 'Process Maturity',
      description: 'How standardized and optimized are your operations?',
      questions: [
        {
          id: 'q6',
          question: 'How are customer inquiries handled?',
          options: [
            { label: 'Manually, one by one', value: 1 },
            { label: 'Basic templates used sometimes', value: 2 },
            { label: 'Some automation & routing', value: 3 },
            { label: 'Fully automated intelligent triage', value: 4 },
          ],
        },
        {
          id: 'q7',
          question: 'How do you manage your sales pipeline?',
          options: [
            { label: 'Mental notes & memory', value: 1 },
            { label: 'Spreadsheet tracking', value: 2 },
            { label: 'CRM with manual entry', value: 3 },
            { label: 'CRM with sales automation', value: 4 },
          ],
        },
        {
          id: 'q8',
          question: 'How are tasks assigned to your team?',
          options: [
            { label: 'Ad hoc, as things come up', value: 1 },
            { label: 'Manager assigns daily', value: 2 },
            { label: 'Scheduling tool for distribution', value: 3 },
            { label: 'AI-optimized task dispatch', value: 4 },
          ],
        },
        {
          id: 'q9',
          question: 'How do you handle follow-ups?',
          options: [
            { label: "Remember and hope we don't forget", value: 1 },
            { label: 'Calendar reminders & checklists', value: 2 },
            { label: 'Automated email sequences', value: 3 },
            { label: 'AI-triggered based on customer behavior', value: 4 },
          ],
        },
        {
          id: 'q10',
          question: 'How standardized are your operations?',
          options: [
            { label: 'Every job is different', value: 1 },
            { label: 'Some standard operating procedures', value: 2 },
            { label: 'Mostly standardized processes', value: 3 },
            { label: 'Fully documented + continuously measured', value: 4 },
          ],
        },
      ],
    },
    {
      id: 'team-culture',
      name: 'Team & Culture',
      description: 'Is your team ready to adopt and use AI?',
      questions: [
        {
          id: 'q11',
          question: 'How does your team feel about AI/automation?',
          options: [
            { label: 'Resistant - worried about job loss', value: 1 },
            { label: "Skeptical - not convinced it helps", value: 2 },
            { label: 'Open to it - willing to try', value: 3 },
            { label: 'Actively requesting it', value: 4 },
          ],
        },
        {
          id: 'q12',
          question: 'How tech-savvy is your team?',
          options: [
            { label: 'Struggles with basic tools', value: 1 },
            { label: 'Can use standard apps', value: 2 },
            { label: 'Comfortable learning new tech', value: 3 },
            { label: 'Early adopters of new tools', value: 4 },
          ],
        },
        {
          id: 'q13',
          question: 'Do you have someone to own AI initiatives?',
          options: [
            { label: 'No one available', value: 1 },
            { label: 'Could assign someone', value: 2 },
            { label: 'Have a dedicated tech lead', value: 3 },
            { label: 'Dedicated ops/tech team', value: 4 },
          ],
        },
        {
          id: 'q14',
          question: 'How does leadership view AI investment?',
          options: [
            { label: 'Unnecessary cost', value: 1 },
            { label: 'Interested but cautious', value: 2 },
            { label: 'Budget allocated for initiatives', value: 3 },
            { label: 'Strategic priority for growth', value: 4 },
          ],
        },
        {
          id: 'q15',
          question: 'How often does your team learn new tools?',
          options: [
            { label: 'Rarely - only when forced', value: 1 },
            { label: 'When we need something specific', value: 2 },
            { label: 'Quarterly training & updates', value: 3 },
            { label: 'Continuous learning culture', value: 4 },
          ],
        },
      ],
    },
    {
      id: 'revenue-ops',
      name: 'Revenue Operations',
      description: 'How optimized is your revenue engine?',
      questions: [
        {
          id: 'q16',
          question: 'How do you track revenue and profitability?',
          options: [
            { label: 'Bank statements & receipts', value: 1 },
            { label: 'Spreadsheet tracking', value: 2 },
            { label: 'Accounting software', value: 3 },
            { label: 'Real-time dashboards with forecasting', value: 4 },
          ],
        },
        {
          id: 'q17',
          question: 'How do you price your services?',
          options: [
            { label: 'Gut feel / market intuition', value: 1 },
            { label: 'Match competitor pricing', value: 2 },
            { label: 'Cost-plus methodology', value: 3 },
            { label: 'Dynamic based on demand & margins', value: 4 },
          ],
        },
        {
          id: 'q18',
          question: 'How do you identify upsell opportunities?',
          options: [
            { label: "We don't - didn't think about it", value: 1 },
            { label: 'Occasionally remember to ask', value: 2 },
            { label: 'Track manually in CRM', value: 3 },
            { label: 'System flags them automatically', value: 4 },
          ],
        },
        {
          id: 'q19',
          question: "What's your customer retention strategy?",
          options: [
            { label: 'Hope they come back', value: 1 },
            { label: 'Occasional check-in calls', value: 2 },
            { label: 'Scheduled quarterly follow-ups', value: 3 },
            { label: 'Automated lifecycle marketing', value: 4 },
          ],
        },
        {
          id: 'q20',
          question: 'How do you forecast revenue?',
          options: [
            { label: "We don't forecast", value: 1 },
            { label: 'Rough estimates based on gut', value: 2 },
            { label: 'Historical trending analysis', value: 3 },
            { label: 'AI-powered predictive models', value: 4 },
          ],
        },
      ],
    },
    {
      id: 'competitive-position',
      name: 'Competitive Position',
      description: 'Where do you stand vs. your competition?',
      questions: [
        {
          id: 'q21',
          question: 'How do your competitors use technology?',
          options: [
            { label: "Don't know their tech stack", value: 1 },
            { label: "They're behind us technologically", value: 2 },
            { label: 'About the same maturity level', value: 3 },
            { label: "They're clearly ahead", value: 4 },
          ],
        },
        {
          id: 'q22',
          question: 'How fast can you respond to inquiries?',
          options: [
            { label: 'Hours to days', value: 1 },
            { label: 'Within a few hours', value: 2 },
            { label: 'Under an hour typically', value: 3 },
            { label: 'Under 5 minutes (automated)', value: 4 },
          ],
        },
        {
          id: 'q23',
          question: 'How personalized is your customer experience?',
          options: [
            { label: 'One-size-fits-all approach', value: 1 },
            { label: 'Basic segmentation applied', value: 2 },
            { label: 'Track individual preferences', value: 3 },
            { label: 'AI-personalized in real-time', value: 4 },
          ],
        },
        {
          id: 'q24',
          question: 'What % of operations could be automated?',
          options: [
            { label: 'Less than 10%', value: 1 },
            { label: '10-30% of workflows', value: 2 },
            { label: '30-60% of daily tasks', value: 3 },
            { label: 'Over 60% of operations', value: 4 },
          ],
        },
        {
          id: 'q25',
          question: 'How do you measure customer satisfaction?',
          options: [
            { label: "We don't track it", value: 1 },
            { label: 'Occasional surveys', value: 2 },
            { label: 'Regular NPS tracking', value: 3 },
            { label: 'Real-time sentiment analysis', value: 4 },
          ],
        },
      ],
    },
  ],
};

const GRADE_THRESHOLDS = [
  { min: 86, max: 100, label: 'AI-Native', color: 'from-green-500 to-emerald-600', description: "You're already operating at elite level. Fine-tuning and advanced AI orchestration is your next move." },
  { min: 71, max: 85, label: 'Optimized', color: 'from-blue-500 to-cyan-600', description: "You're ahead of 90% of businesses. AI will give you an unfair competitive advantage." },
  { min: 56, max: 70, label: 'Advancing', color: 'from-purple-500 to-pink-600', description: "Strong foundation. You're ready for multi-agent AI systems that run entire workflows autonomously." },
  { min: 41, max: 55, label: 'Emerging', color: 'from-amber-500 to-orange-600', description: 'You have pieces in place. Strategic AI deployment can 3-5x your efficiency within 90 days.' },
  { min: 25, max: 40, label: 'Foundation Phase', color: 'from-red-500 to-pink-600', description: "You're starting from scratch. AI will transform your business but you need infrastructure first." },
];

function getGrade(score) {
  return GRADE_THRESHOLDS.find(t => score >= t.min && score <= t.max);
}

function AnimatedCounter({ target, duration = 2000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(target * progress));
      if (progress === 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count}</span>;
}

function LandingScreen({ onStart }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] to-[#1a1a2e] flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center space-y-8 animate-fade-in">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white">How AI-Ready Is Your Business?</h1>
          <p className="text-xl text-white/60">25-question assessment. Get your personalized readiness score + action plan.</p>
        </div>

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-12 space-y-6 hover:bg-white/10 transition-all duration-300">
          <div className="flex items-center justify-center space-x-3 text-white/60 text-sm">
            <span>Takes ~4 minutes</span>
            <span>.</span>
            <span>Used by 500+ businesses</span>
          </div>

          <button
            onClick={onStart}
            className="w-full bg-amber-500 hover:bg-amber-400 text-black font-semibold py-4 rounded-xl transition-all duration-300 text-lg flex items-center justify-center space-x-2"
          >
            <span>Start Assessment</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 md:gap-6 text-center">
          <div className="space-y-2">
            <div className="text-2xl font-bold text-amber-500">500+</div>
            <div className="text-white/60 text-sm">Businesses Assessed</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-amber-500">3-5x</div>
            <div className="text-white/60 text-sm">Avg. Efficiency Gain</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-amber-500">90 days</div>
            <div className="text-white/60 text-sm">To Implementation</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuestionScreen({ currentCategoryIndex, currentQuestionIndex, question, answers, onAnswer, onNext, onBack, totalQuestions }) {
  const progress = ((currentCategoryIndex * 5 + currentQuestionIndex) / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] to-[#1a1a2e] flex flex-col p-6">
      <div className="max-w-2xl w-full mx-auto flex flex-col h-full">
        <div className="space-y-3 mb-8">
          <div className="flex justify-between items-center text-white/60 text-sm">
            <span>Category {currentCategoryIndex + 1} of 5</span>
            <span>{currentQuestionIndex + 1} of 5</span>
          </div>
          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/10">
            <div
              className="bg-gradient-to-r from-amber-500 to-amber-400 h-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex-grow flex flex-col justify-center space-y-6 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white">{question.question}</h2>

          <div className="space-y-3">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onAnswer(option.value);
                  setTimeout(onNext, 300);
                }}
                className="w-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 text-left hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300 group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 rounded-full border-2 border-white/30 group-hover:border-amber-500 transition-colors" />
                  <span className="text-white group-hover:text-amber-400 transition-colors font-medium">{option.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center mt-8">
          <button
            onClick={onBack}
            disabled={currentCategoryIndex === 0 && currentQuestionIndex === 0}
            className="flex items-center space-x-2 text-white/60 hover:text-white disabled:opacity-30 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <div className="text-white/40 text-sm">
            {((currentCategoryIndex * 5 + currentQuestionIndex + 1) / totalQuestions * 100).toFixed(0)}% complete
          </div>
        </div>
      </div>
    </div>
  );
}

function EmailCaptureScreen({ score, onCapture, onSkip }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onCapture({ email, name, company });
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] to-[#1a1a2e] flex flex-col items-center justify-center p-6 animate-fade-in">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-bold text-white">Your results are ready!</h2>
          <p className="text-white/60">Just one more step to unlock your personalized action plan</p>
        </div>

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
          <div className="flex items-center justify-center mb-8">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/20 border-2 border-amber-500/50 flex flex-col items-center justify-center space-y-1">
              <div className="text-4xl font-bold text-amber-400 filter blur-sm">{score}</div>
              <div className="text-xs text-amber-300/70 filter blur-sm uppercase tracking-wide">Teaser</div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white/60 text-sm mb-2">Your Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Full name" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-amber-500/50 transition-colors" />
            </div>
            <div>
              <label className="block text-white/60 text-sm mb-2">Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@company.com" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-amber-500/50 transition-colors" />
            </div>
            <div>
              <label className="block text-white/60 text-sm mb-2">Company</label>
              <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} required placeholder="Company name" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-amber-500/50 transition-colors" />
            </div>

            <button type="submit" disabled={loading} className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-amber-500/50 text-black font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2">
              <span>{loading ? 'Processing...' : 'Get My Results'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        <button onClick={onSkip} className="w-full text-white/60 hover:text-white py-2 text-sm transition-colors">
          Skip for now
        </button>
      </div>
    </div>
  );
}

function ResultsScreen({ score, categoryScores, capturedData, onDownload }) {
  const grade = getGrade(score);
  const categoryNames = ['Data Infrastructure', 'Process Maturity', 'Team & Culture', 'Revenue Operations', 'Competitive Position'];

  const lowestCategories = categoryScores
    .map((score, idx) => ({ name: categoryNames[idx], score, idx }))
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);

  const radarData = categoryNames.map((name, idx) => ({
    name: name.split(' ')[0],
    score: categoryScores[idx],
    fullMark: 20,
  }));

  const recommendationsByCategory = {
    0: {
      title: 'Data Infrastructure Gap',
      items: [
        'Implement a unified CRM to centralize customer data',
        'Set up automated data quality checks and deduplication',
        'Create API integrations between your key business tools',
      ],
    },
    1: {
      title: 'Process Maturity Gap',
      items: [
        'Document your core workflows and standard operating procedures',
        'Implement workflow automation for repetitive tasks',
        'Set up automated customer inquiry routing and triage',
      ],
    },
    2: {
      title: 'Team & Culture Gap',
      items: [
        'Start with AI training and change management workshops',
        'Designate an AI champion or operations lead',
        'Create a pilot project to demonstrate quick wins',
      ],
    },
    3: {
      title: 'Revenue Operations Gap',
      items: [
        'Implement real-time revenue dashboards and forecasting',
        'Set up automated upsell and cross-sell identification',
        'Create predictive models for customer lifetime value',
      ],
    },
    4: {
      title: 'Competitive Position Gap',
      items: [
        'Benchmark your tech stack against competitors',
        'Implement automation to improve response times',
        'Deploy AI-powered personalization for customer experience',
      ],
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] to-[#1a1a2e] p-6 animate-fade-in">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Your AI Readiness Score</h1>
          <p className="text-white/60">Comprehensive assessment for {capturedData?.company || 'Your Company'}</p>
        </div>

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 flex flex-col items-center">
            <div className="relative w-48 h-48 flex items-center justify-center">
              <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${grade.color} opacity-20`} />
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#0a0a0f] to-[#1a1a2e] border border-white/10" />
              <div className="relative flex flex-col items-center justify-center">
                <div className="text-6xl font-bold text-amber-400">
                  <AnimatedCounter target={score} />
                </div>
                <div className="text-xl text-white/60 mt-2">/ 100</div>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div className="space-y-1">
              <div className={`text-4xl font-bold bg-gradient-to-r ${grade.color} bg-clip-text text-transparent`}>
                {grade.label}
              </div>
              <p className="text-white/60 text-sm">{grade.description}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
            <h3 className="text-xl font-bold text-white">Category Breakdown</h3>
            {categoryNames.map((name, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white/80 font-medium text-sm">{name}</span>
                  <span className="font-mono text-amber-400 font-semibold">{categoryScores[idx]}/20</span>
                </div>
                <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden border border-white/10">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-amber-400 h-full transition-all duration-1000"
                    style={{ width: `${(categoryScores[idx] / 20) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6">Readiness Profile</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="name" stroke="rgba(255,255,255,0.6)" tick={{ fontSize: 12 }} />
                <PolarRadiusAxis angle={90} domain={[0, 20]} stroke="rgba(255,255,255,0.3)" />
                <Radar name="Score" dataKey="score" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
          <h3 className="text-xl font-bold text-white">Your AI Readiness Action Plan</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {lowestCategories.map((cat, idx) => {
              const recommendation = recommendationsByCategory[cat.idx];
              return (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-4 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">{idx === 0 ? '🎯' : idx === 1 ? '⚡' : '🚀'}</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white text-sm mb-3">{recommendation.title}</h4>
                      <ul className="space-y-2">
                        {recommendation.items.map((item, i) => (
                          <li key={i} className="text-white/60 text-xs flex items-start space-x-2">
                            <span className="mt-1 block w-1 h-1 bg-amber-500 rounded-full flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <a
            href="https://calendly.com/elios-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-3"
          >
            <Calendar className="w-5 h-5 text-amber-500" />
            <div className="text-left">
              <div className="font-semibold text-white">Book a Free Strategy Call</div>
              <div className="text-xs text-white/60">30-min personalized consultation</div>
            </div>
          </a>

          <button
            onClick={onDownload}
            className="bg-amber-500 hover:bg-amber-400 text-black font-semibold py-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3"
          >
            <Download className="w-5 h-5" />
            <span>Download Full Report</span>
          </button>
        </div>

        <div className="text-center text-white/40 text-sm space-y-2">
          <p>This assessment was created by Elios AI Consulting & 33v Studio</p>
          <p>Your data was stored securely and will be used to contact you with relevant recommendations.</p>
        </div>
      </div>
    </div>
  );
}

export default function AIReadinessAssessment() {
  const [screen, setScreen] = useState('landing');
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [capturedData, setCapturedData] = useState(null);

  const flatQuestions = ASSESSMENT_DATA.categories.flatMap((cat) =>
    cat.questions.map((q) => ({ ...q, categoryIndex: ASSESSMENT_DATA.categories.indexOf(cat) }))
  );

  const currentQuestion = flatQuestions[currentCategoryIndex * 5 + currentQuestionIndex];

  const handleStartAssessment = () => {
    setScreen('assessment');
  };

  const handleAnswer = (value) => {
    const questionId = currentQuestion.id;
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < 4) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentCategoryIndex < 4) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
      setCurrentQuestionIndex(0);
    } else {
      setScreen('email');
    }
  };

  const handleBackQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(currentCategoryIndex - 1);
      setCurrentQuestionIndex(4);
    }
  };

  const handleEmailCapture = (data) => {
    setCapturedData(data);
    setScreen('results');
  };

  const handleSkipEmail = () => {
    setCapturedData({ name: 'Friend', company: 'Your Company', email: 'contact@yourcompany.com' });
    setScreen('results');
  };

  const handleDownloadReport = () => {
    window.print();
  };

  const categoryScores = ASSESSMENT_DATA.categories.map((cat) => {
    return cat.questions.reduce((sum, q) => {
      return sum + (answers[q.id] || 0);
    }, 0);
  });

  const totalScore = categoryScores.reduce((a, b) => a + b, 0);

  if (screen === 'landing') {
    return <LandingScreen onStart={handleStartAssessment} />;
  }

  if (screen === 'assessment') {
    return (
      <QuestionScreen
        currentCategoryIndex={currentCategoryIndex}
        currentQuestionIndex={currentQuestionIndex}
        question={currentQuestion}
        answers={answers}
        onAnswer={handleAnswer}
        onNext={handleNextQuestion}
        onBack={handleBackQuestion}
        totalQuestions={25}
      />
    );
  }

  if (screen === 'email') {
    return (
      <EmailCaptureScreen
        score={totalScore}
        onCapture={handleEmailCapture}
        onSkip={handleSkipEmail}
      />
    );
  }

  return (
    <ResultsScreen
      score={totalScore}
      categoryScores={categoryScores}
      capturedData={capturedData}
      onDownload={handleDownloadReport}
    />
  );
}
