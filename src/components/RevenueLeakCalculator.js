'use client';

import { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import {
  Calculator, ArrowRight, ArrowLeft, DollarSign, Clock, Zap, Users,
  TrendingUp, AlertTriangle, CheckCircle2, RotateCcw, Target, ChevronRight,
  Timer, Cog, UserMinus
} from 'lucide-react';

const industryData = [
  { industry: 'Private Equity', leakPct: 23 },
  { industry: 'SaaS', leakPct: 18 },
  { industry: 'Healthcare', leakPct: 27 },
  { industry: 'Real Estate', leakPct: 31 },
  { industry: 'E-Commerce', leakPct: 21 },
  { industry: 'Manufacturing', leakPct: 25 },
];

function AnimatedCounter({ target, prefix = '', suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
}

export default function RevenueLeakCalculator() {
  const [screen, setScreen] = useState('welcome');
  const [step, setStep] = useState(1);
  const [inputs, setInputs] = useState({
    annualRevenue: '',
    employeeCount: '',
    industry: 'SaaS',
    avgResponseTime: '',
    manualProcessHours: '',
    missedFollowUpPct: '',
    customerChurnPct: '',
    conversionRate: '',
    avgDealSize: '',
  });

  const update = (field, value) => setInputs({ ...inputs, [field]: value });

  const calculate = () => {
    const rev = parseFloat(inputs.annualRevenue) || 1000000;
    const employees = parseInt(inputs.employeeCount) || 10;
    const responseHrs = parseFloat(inputs.avgResponseTime) || 12;
    const manualHrs = parseFloat(inputs.manualProcessHours) || 20;
    const missedPct = parseFloat(inputs.missedFollowUpPct) || 15;
    const churnPct = parseFloat(inputs.customerChurnPct) || 10;
    const convRate = parseFloat(inputs.conversionRate) || 5;
    const dealSize = parseFloat(inputs.avgDealSize) || 10000;

    // W.A.I.T. Formula calculations
    const wastedTime = (responseHrs > 1 ? (responseHrs - 1) / responseHrs : 0) * rev * 0.05;
    const automationGaps = (manualHrs * employees * 52 * 50) * 0.3;
    const inefficientProcesses = (missedPct / 100) * rev * 0.15;
    const turnoverChurn = (churnPct / 100) * rev * 0.4;

    const totalLeak = wastedTime + automationGaps + inefficientProcesses + turnoverChurn;
    const leakPct = (totalLeak / rev) * 100;
    const recoverable = totalLeak * 0.65;
    const optimizedRevenue = rev + recoverable;
    const implementationCost = recoverable * 0.15;
    const paybackMonths = Math.ceil((implementationCost / (recoverable / 12)));
    const threeYearROI = ((recoverable * 3 - implementationCost) / implementationCost) * 100;

    return {
      totalLeak, leakPct, wastedTime, automationGaps, inefficientProcesses,
      turnoverChurn, recoverable, optimizedRevenue, implementationCost,
      paybackMonths, threeYearROI, rev,
    };
  };

  const restart = () => {
    setScreen('welcome');
    setStep(1);
    setInputs({
      annualRevenue: '', employeeCount: '', industry: 'SaaS',
      avgResponseTime: '', manualProcessHours: '', missedFollowUpPct: '',
      customerChurnPct: '', conversionRate: '', avgDealSize: '',
    });
  };

  // Welcome Screen
  if (screen === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 md:p-6 flex items-center justify-center">
        <div className="max-w-2xl w-full text-center space-y-8">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-amber-500/20">
            <Calculator className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white">Revenue Leak Calculator</h1>
          <p className="text-lg text-slate-400 max-w-lg mx-auto">
            Discover how much revenue your business is losing through the W.A.I.T. formula. Most companies leak 15-35% of potential revenue without realizing it.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { letter: 'W', word: 'Wasted Time', icon: Clock, color: '#ef4444' },
              { letter: 'A', word: 'Automation Gaps', icon: Cog, color: '#f59e0b' },
              { letter: 'I', word: 'Inefficient Processes', icon: AlertTriangle, color: '#6366f1' },
              { letter: 'T', word: 'Turnover/Churn', icon: UserMinus, color: '#3b82f6' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.letter} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-2xl font-bold mb-1" style={{ color: item.color }}>{item.letter}</div>
                  <Icon className="w-5 h-5 mx-auto mb-1" style={{ color: item.color }} />
                  <div className="text-xs text-slate-400">{item.word}</div>
                </div>
              );
            })}
          </div>
          <button
            onClick={() => setScreen('calculator')}
            className="px-8 py-4 bg-gradient-to-r from-amber-600 to-red-600 text-white font-semibold rounded-xl hover:from-amber-500 hover:to-red-500 transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 mx-auto"
          >
            Calculate Your Revenue Leak <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-xs text-slate-600">3 simple steps, takes under 2 minutes</p>
        </div>
      </div>
    );
  }

  // Calculator Steps
  if (screen === 'calculator') {
    const stepConfig = [
      {
        title: 'Business Basics',
        subtitle: 'Tell us about your business fundamentals',
        fields: [
          { key: 'annualRevenue', label: 'Annual Revenue ($)', placeholder: 'e.g. 5000000', type: 'number', icon: DollarSign },
          { key: 'employeeCount', label: 'Number of Employees', placeholder: 'e.g. 25', type: 'number', icon: Users },
          { key: 'industry', label: 'Industry', type: 'select', icon: Target, options: industryData.map((i) => i.industry) },
        ],
      },
      {
        title: 'Response & Operations',
        subtitle: 'How efficiently do you operate?',
        fields: [
          { key: 'avgResponseTime', label: 'Avg Lead Response Time (hours)', placeholder: 'e.g. 12', type: 'number', icon: Clock },
          { key: 'manualProcessHours', label: 'Manual Process Hours/Employee/Week', placeholder: 'e.g. 20', type: 'number', icon: Cog },
          { key: 'missedFollowUpPct', label: 'Missed Follow-up Rate (%)', placeholder: 'e.g. 15', type: 'number', icon: AlertTriangle },
        ],
      },
      {
        title: 'Retention & Conversion',
        subtitle: 'Your customer lifecycle metrics',
        fields: [
          { key: 'customerChurnPct', label: 'Annual Customer Churn Rate (%)', placeholder: 'e.g. 10', type: 'number', icon: UserMinus },
          { key: 'conversionRate', label: 'Current Lead Conversion Rate (%)', placeholder: 'e.g. 5', type: 'number', icon: TrendingUp },
          { key: 'avgDealSize', label: 'Average Deal Size ($)', placeholder: 'e.g. 10000', type: 'number', icon: DollarSign },
        ],
      },
    ];

    const currentStep = stepConfig[step - 1];
    const progress = (step / 3) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 md:p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Step {step} of 3</span>
              <span className="text-amber-400 font-medium">{currentStep.title}</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2">
              <div className="h-2 bg-gradient-to-r from-amber-500 to-red-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-white mb-1">{currentStep.title}</h2>
            <p className="text-sm text-slate-400 mb-6">{currentStep.subtitle}</p>
            <div className="space-y-5">
              {currentStep.fields.map((field) => {
                const Icon = field.icon;
                return (
                  <div key={field.key}>
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                      <Icon className="w-4 h-4 text-amber-400" />
                      {field.label}
                    </label>
                    {field.type === 'select' ? (
                      <select
                        value={inputs[field.key]}
                        onChange={(e) => update(field.key, e.target.value)}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                      >
                        {field.options.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="number"
                        value={inputs[field.key]}
                        onChange={(e) => update(field.key, e.target.value)}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 transition-colors"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => step > 1 ? setStep(step - 1) : setScreen('welcome')}
              className="flex items-center gap-2 px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> {step > 1 ? 'Previous' : 'Back'}
            </button>
            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="flex items-center gap-2 px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-500 transition-colors text-sm font-medium"
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setScreen('results')}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-red-600 text-white rounded-xl hover:from-amber-500 hover:to-red-500 transition-all text-sm font-semibold shadow-lg shadow-amber-500/20"
              >
                Calculate Revenue Leak <Zap className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Results Screen
  const results = calculate();
  const waterfallData = [
    { name: 'Current\nRevenue', value: results.rev, fill: '#3b82f6' },
    { name: 'Wasted\nTime', value: -results.wastedTime, fill: '#ef4444' },
    { name: 'Automation\nGaps', value: -results.automationGaps, fill: '#f59e0b' },
    { name: 'Inefficient\nProcesses', value: -results.inefficientProcesses, fill: '#6366f1' },
    { name: 'Turnover\n/Churn', value: -results.turnoverChurn, fill: '#3b82f6' },
    { name: 'Recoverable', value: results.recoverable, fill: '#10b981' },
  ];

  const waitCards = [
    { letter: 'W', title: 'Wasted Time', value: results.wastedTime, icon: Clock, color: '#ef4444', desc: 'Revenue lost from slow lead response and delayed operations' },
    { letter: 'A', title: 'Automation Gaps', value: results.automationGaps, icon: Cog, color: '#f59e0b', desc: 'Cost of manual processes that should be automated' },
    { letter: 'I', title: 'Inefficient Processes', value: results.inefficientProcesses, icon: AlertTriangle, color: '#6366f1', desc: 'Revenue lost from missed follow-ups and broken workflows' },
    { letter: 'T', title: 'Turnover/Churn', value: results.turnoverChurn, icon: UserMinus, color: '#3b82f6', desc: 'Revenue lost from customer churn and employee turnover' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 md:p-6 space-y-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Total Leak Header */}
        <div className="bg-gradient-to-r from-red-600/20 to-amber-600/20 border border-red-500/30 rounded-xl p-8 text-center backdrop-blur-sm">
          <div className="text-sm text-slate-400 mb-2">Your Estimated Annual Revenue Leak</div>
          <div className="text-5xl md:text-6xl font-bold text-red-400 mb-2">
            <AnimatedCounter target={Math.round(results.totalLeak)} prefix="$" />
          </div>
          <div className="text-lg text-slate-400">
            That is <span className="text-red-400 font-bold">{results.leakPct.toFixed(1)}%</span> of your annual revenue
          </div>
        </div>

        {/* W.A.I.T. Breakdown Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {waitCards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.letter} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl font-bold" style={{ backgroundColor: card.color + '20', color: card.color }}>
                    {card.letter}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{card.title}</div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">${Math.round(card.value).toLocaleString()}</div>
                <div className="text-xs text-slate-500">{card.desc}</div>
                <div className="mt-3">
                  <div className="w-full bg-slate-700/50 rounded-full h-2">
                    <div className="h-2 rounded-full transition-all duration-1000" style={{ width: `${(card.value / results.totalLeak) * 100}%`, backgroundColor: card.color }} />
                  </div>
                  <div className="text-xs text-slate-500 mt-1 text-right">{((card.value / results.totalLeak) * 100).toFixed(0)}% of total leak</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Waterfall Chart */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-white mb-4">Revenue Waterfall Analysis</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={waterfallData}>
              <XAxis dataKey="name" stroke="#64748b" fontSize={11} interval={0} tick={{ fill: '#94a3b8' }} />
              <YAxis stroke="#64748b" fontSize={11} tickFormatter={(v) => `$${Math.abs(v / 1000).toFixed(0)}K`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                formatter={(v) => [`$${Math.abs(v).toLocaleString()}`, '']}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {waterfallData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm text-center">
            <div className="text-sm text-slate-400 mb-2">Current Revenue</div>
            <div className="text-3xl font-bold text-white">${(results.rev / 1000000).toFixed(1)}M</div>
            <div className="text-xs text-slate-500 mt-1">Annual</div>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6 backdrop-blur-sm text-center">
            <div className="text-sm text-slate-400 mb-2">Recoverable Revenue</div>
            <div className="text-3xl font-bold text-emerald-400">${Math.round(results.recoverable).toLocaleString()}</div>
            <div className="text-xs text-emerald-500 mt-1">65% of total leak is recoverable</div>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 backdrop-blur-sm text-center">
            <div className="text-sm text-slate-400 mb-2">Optimized Revenue</div>
            <div className="text-3xl font-bold text-blue-400">${(results.optimizedRevenue / 1000000).toFixed(2)}M</div>
            <div className="text-xs text-blue-500 mt-1">With AI implementation</div>
          </div>
        </div>

        {/* Industry Comparison */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-white mb-4">Industry Comparison</h2>
          <div className="space-y-3">
            {industryData.map((ind) => {
              const isSelected = ind.industry === inputs.industry;
              return (
                <div key={ind.industry} className={`flex items-center gap-3 ${isSelected ? 'bg-amber-500/5 rounded-lg p-2 -mx-2' : ''}`}>
                  <div className="w-32 text-sm text-slate-300 flex items-center gap-1">
                    {isSelected && <Target className="w-3 h-3 text-amber-400" />}
                    {ind.industry}
                  </div>
                  <div className="flex-1 bg-slate-700/50 rounded-full h-4">
                    <div className="h-4 rounded-full transition-all duration-700 flex items-center justify-end pr-2"
                      style={{ width: `${ind.leakPct * 3}%`, backgroundColor: isSelected ? '#f59e0b60' : '#64748b40' }}>
                      <span className="text-xs font-bold text-white">{ind.leakPct}%</span>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="text-xs text-amber-400 font-medium">
                      You: {results.leakPct.toFixed(1)}%
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Payback & ROI */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm text-center">
            <Timer className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <div className="text-sm text-slate-400 mb-1">Payback Period</div>
            <div className="text-3xl font-bold text-amber-400">{results.paybackMonths} months</div>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm text-center">
            <TrendingUp className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <div className="text-sm text-slate-400 mb-1">3-Year ROI</div>
            <div className="text-3xl font-bold text-emerald-400">{results.threeYearROI.toFixed(0)}%</div>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm text-center">
            <DollarSign className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-sm text-slate-400 mb-1">Implementation Cost</div>
            <div className="text-3xl font-bold text-blue-400">${Math.round(results.implementationCost).toLocaleString()}</div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-amber-600/20 to-red-600/20 border border-amber-500/30 rounded-xl p-8 text-center backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white mb-2">Stop the Leak. Start Recovering Revenue.</h2>
          <p className="text-slate-400 mb-6">Get a custom AI implementation plan to recover ${Math.round(results.recoverable).toLocaleString()} in annual revenue.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://aisimple.com" target="_blank" rel="noopener noreferrer"
              className="px-6 py-3 bg-gradient-to-r from-amber-600 to-red-600 text-white font-semibold rounded-xl hover:from-amber-500 hover:to-red-500 transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2">
              Get Recovery Plan <ChevronRight className="w-4 h-4" />
            </a>
            <button onClick={restart}
              className="px-6 py-3 bg-slate-800 text-slate-300 font-medium rounded-xl border border-slate-700 hover:bg-slate-700 transition-all flex items-center gap-2">
              <RotateCcw className="w-4 h-4" /> Recalculate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
