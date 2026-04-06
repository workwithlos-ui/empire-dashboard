'use client';

import React, { useState, useMemo } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DollarSign, Clock, Users, TrendingUp, Target, Cog, ChevronRight, ChevronLeft, Mail, Download } from 'lucide-react';

const RevenueLeakCalculator = () => {
  const [screen, setScreen] = useState('landing');
  const [currentCategory, setCurrentCategory] = useState(1);

  const [monthlyLeads, setMonthlyLeads] = useState(50);
  const [responseTimeHours, setResponseTimeHours] = useState(4);
  const [avgDealValue, setAvgDealValue] = useState(2500);

  const [proposalsSent, setProposalsSent] = useState(20);
  const [followUpAttempts, setFollowUpAttempts] = useState(2);
  const [quoteCloseRate, setQuoteCloseRate] = useState(25);

  const [appointmentsPerDay, setAppointmentsPerDay] = useState(4);
  const [noShowRate, setNoShowRate] = useState(15);
  const [schedulingTimeMinutes, setSchedulingTimeMinutes] = useState(45);

  const [totalCustomers, setTotalCustomers] = useState(200);
  const [customerLifespanMonths, setCustomerLifespanMonths] = useState(12);
  const [proactiveOutreachPct, setProactiveOutreachPct] = useState(15);

  const [monthlyRevenue, setMonthlyRevenue] = useState(50000);
  const [upsellOfferPct, setUpsellOfferPct] = useState(10);
  const [avgUpsellValue, setAvgUpsellValue] = useState(500);

  const [teamSize, setTeamSize] = useState(5);
  const [dataEntryHours, setDataEntryHours] = useState(6);
  const [reportingHours, setReportingHours] = useState(4);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const calculateLeaks = useMemo(() => {
    let responseLeakPct = 0;
    if (responseTimeHours <= 5 / 60) responseLeakPct = 0;
    else if (responseTimeHours <= 0.5) responseLeakPct = 0.1;
    else if (responseTimeHours <= 1) responseLeakPct = 0.25;
    else if (responseTimeHours <= 4) responseLeakPct = 0.4;
    else if (responseTimeHours <= 12) responseLeakPct = 0.55;
    else if (responseTimeHours <= 24) responseLeakPct = 0.7;
    else responseLeakPct = 0.85;

    const leakCategory1 = monthlyLeads * responseLeakPct * avgDealValue * 12;

    const followUpGap = Math.max(0, 5 - followUpAttempts);
    const conversionLoss = followUpGap * 0.08;
    const leakCategory2 = proposalsSent * 12 * avgDealValue * conversionLoss;

    const noShowSavings = (noShowRate / 100 - 0.05) * appointmentsPerDay * avgDealValue * 250;
    const schedulingTimeCost = (schedulingTimeMinutes / 60) * 75 * 250;
    const leakCategory3 = noShowSavings + schedulingTimeCost * 0.8;

    const unengaged = totalCustomers * (1 - proactiveOutreachPct / 100);
    const earlyChurnRisk = unengaged * 0.35;
    const remainingValuePerCustomer = avgDealValue * (customerLifespanMonths / 12);
    const leakCategory4 = earlyChurnRisk * remainingValuePerCustomer * 0.4;

    const customersPerMonth = monthlyRevenue / avgDealValue;
    const missedUpsellOpportunities = customersPerMonth * (1 - upsellOfferPct / 100);
    const leakCategory5 = missedUpsellOpportunities * 0.25 * avgUpsellValue * 12;

    const manualHours = (dataEntryHours + reportingHours) * teamSize;
    const automationSavings = manualHours * 0.75;
    const leakCategory6 = automationSavings * 35 * 52;

    const totalLeak =
      Math.max(0, leakCategory1) +
      Math.max(0, leakCategory2) +
      Math.max(0, leakCategory3) +
      Math.max(0, leakCategory4) +
      Math.max(0, leakCategory5) +
      Math.max(0, leakCategory6);

    return {
      category1: Math.max(0, leakCategory1),
      category2: Math.max(0, leakCategory2),
      category3: Math.max(0, leakCategory3),
      category4: Math.max(0, leakCategory4),
      category5: Math.max(0, leakCategory5),
      category6: Math.max(0, leakCategory6),
      total: totalLeak,
    };
  }, [
    monthlyLeads, responseTimeHours, avgDealValue,
    proposalsSent, followUpAttempts, quoteCloseRate,
    appointmentsPerDay, noShowRate, schedulingTimeMinutes,
    totalCustomers, customerLifespanMonths, proactiveOutreachPct,
    monthlyRevenue, upsellOfferPct, avgUpsellValue,
    teamSize, dataEntryHours, reportingHours,
  ]);

  const recoveryData = useMemo(() => {
    const recoveryRates = {
      category1: 0.9,
      category2: 0.85,
      category3: 0.8,
      category4: 0.6,
      category5: 0.7,
      category6: 0.75,
    };

    const recoverable = {
      category1: calculateLeaks.category1 * recoveryRates.category1,
      category2: calculateLeaks.category2 * recoveryRates.category2,
      category3: calculateLeaks.category3 * recoveryRates.category3,
      category4: calculateLeaks.category4 * recoveryRates.category4,
      category5: calculateLeaks.category5 * recoveryRates.category5,
      category6: calculateLeaks.category6 * recoveryRates.category6,
    };

    const totalRecoverable = Object.values(recoverable).reduce((a, b) => a + b, 0);
    const nonRecoverable = calculateLeaks.total - totalRecoverable;

    return { recoverable, totalRecoverable, nonRecoverable, recoveryRates };
  }, [calculateLeaks]);

  const chartData = useMemo(() => {
    const categories = [
      { name: 'Lead Response', value: calculateLeaks.category1, icon: Clock },
      { name: 'Follow-up Failure', value: calculateLeaks.category2, icon: TrendingUp },
      { name: 'Scheduling', value: calculateLeaks.category3, icon: Users },
      { name: 'Customer Value', value: calculateLeaks.category4, icon: Target },
      { name: 'Pricing & Upsell', value: calculateLeaks.category5, icon: DollarSign },
      { name: 'Operational Waste', value: calculateLeaks.category6, icon: Cog },
    ];
    return categories.sort((a, b) => b.value - a.value);
  }, [calculateLeaks]);

  const pieData = useMemo(() => [
    { name: 'Recoverable', value: Math.round(recoveryData.totalRecoverable) },
    { name: 'Non-Recoverable', value: Math.round(recoveryData.nonRecoverable) },
  ], [recoveryData]);

  const topActions = useMemo(() => {
    const actions = [
      {
        category: 'Lead Response',
        leak: calculateLeaks.category1,
        recoverable: recoveryData.recoverable.category1,
        action: 'Implement AI-powered instant response system for leads',
      },
      {
        category: 'Follow-up Failure',
        leak: calculateLeaks.category2,
        recoverable: recoveryData.recoverable.category2,
        action: 'Automate follow-up sequences with AI timing optimization',
      },
      {
        category: 'Scheduling',
        leak: calculateLeaks.category3,
        recoverable: recoveryData.recoverable.category3,
        action: 'Deploy AI scheduling assistant with automated reminders',
      },
      {
        category: 'Customer Value',
        leak: calculateLeaks.category4,
        recoverable: recoveryData.recoverable.category4,
        action: 'Enable proactive AI outreach to all customers monthly',
      },
      {
        category: 'Pricing & Upsell',
        leak: calculateLeaks.category5,
        recoverable: recoveryData.recoverable.category5,
        action: 'Implement AI-driven personalized upsell recommendations',
      },
      {
        category: 'Operational Waste',
        leak: calculateLeaks.category6,
        recoverable: recoveryData.recoverable.category6,
        action: 'Automate data entry and reporting with AI tools',
      },
    ];
    return actions.sort((a, b) => b.recoverable - a.recoverable).slice(0, 3);
  }, [calculateLeaks, recoveryData]);

  const handleDownloadReport = () => {
    const reportContent = `
REVENUE LEAK CALCULATOR - CONFIDENTIAL REPORT
Generated: ${new Date().toLocaleDateString()}

YOUR REVENUE LEAK ANALYSIS
========================

Total Annual Revenue Leak: ${formatCurrency(calculateLeaks.total)}

BREAKDOWN BY CATEGORY:
${chartData.map(cat => `${cat.name}: ${formatCurrency(cat.value)}`).join('\n')}

RECOVERY POTENTIAL: ${formatCurrency(recoveryData.totalRecoverable)} (${Math.round((recoveryData.totalRecoverable / calculateLeaks.total) * 100)}%)

TOP 3 REVENUE RECOVERY ACTIONS:
${topActions.map((action, i) => `${i + 1}. ${action.action} - Potential: ${formatCurrency(action.recoverable)}`).join('\n')}

This report was generated for ${fullName} at ${company}.
For a personalized recovery plan, book a consultation at eliosaiconsulting.com
    `;

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(reportContent));
    element.setAttribute('download', `revenue-leak-report-${new Date().getTime()}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const navigateToCategory = (categoryNum) => {
    setCurrentCategory(categoryNum);
    setScreen(`category${categoryNum}`);
  };

  const handleNextCategory = () => {
    if (currentCategory < 6) {
      navigateToCategory(currentCategory + 1);
    } else {
      setScreen('email');
    }
  };

  const handlePrevCategory = () => {
    if (currentCategory > 1) {
      navigateToCategory(currentCategory - 1);
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (fullName.trim() && email.trim() && company.trim()) {
      setScreen('results');
    }
  };

  if (screen === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] to-[#1a1a2e] flex items-center justify-center p-4">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap');
          body { font-family: 'Inter', sans-serif; }
          .font-mono { font-family: 'JetBrains Mono', monospace; }
        `}</style>
        <div className="max-w-2xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            How Much Revenue Is Leaking From Your Business?
          </h1>
          <p className="text-xl text-white/60 mb-8 leading-relaxed">
            Most businesses lose $50K-$500K annually to fixable operational gaps. Find your number in 3 minutes.
          </p>
          <button
            onClick={() => navigateToCategory(1)}
            className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-black font-semibold px-8 py-4 rounded-xl transition-all duration-300 text-lg group"
          >
            Calculate My Revenue Leak
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-white/40 text-sm mt-8">
            Trusted by agencies and product studios. Takes ~3 minutes
          </p>
        </div>
      </div>
    );
  }

  const categoryScreens = {
    1: {
      icon: Clock,
      title: 'Lead Response Time Leak',
      description: 'How quickly are you responding to inbound leads?',
      inputs: (
        <div className="space-y-6">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Monthly Inbound Leads</label>
            <input type="number" value={monthlyLeads} onChange={(e) => setMonthlyLeads(Math.max(1, parseInt(e.target.value) || 0))} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:border-amber-500" placeholder="50" />
            <p className="text-white/40 text-xs mt-2">Industry average: 50/month</p>
          </div>
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Average Response Time: <span className="text-amber-400 font-mono">{responseTimeHours.toFixed(1)}h</span></label>
            <input type="range" min="0.5" max="48" step="0.5" value={responseTimeHours} onChange={(e) => setResponseTimeHours(parseFloat(e.target.value))} className="w-full" />
            <div className="flex justify-between text-xs text-white/40 mt-1"><span>5 min</span><span>24+ hours</span></div>
          </div>
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Average Deal Value</label>
            <input type="number" value={avgDealValue} onChange={(e) => setAvgDealValue(Math.max(100, parseInt(e.target.value) || 0))} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:border-amber-500" placeholder="$2,500" />
            <p className="text-white/40 text-xs mt-2">Average contract value</p>
          </div>
        </div>
      ),
    },
    2: {
      icon: TrendingUp,
      title: 'Follow-up Failure Leak',
      description: 'Are you following up enough with prospects?',
      inputs: (
        <div className="space-y-6">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Proposals/Quotes Sent Per Month</label>
            <input type="number" value={proposalsSent} onChange={(e) => setProposalsSent(Math.max(1, parseInt(e.target.value) || 0))} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:border-amber-500" placeholder="20" />
          </div>
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Follow-up Attempts Before Giving Up: <span className="text-amber-400 font-mono">{followUpAttempts}</span></label>
            <input type="range" min="0" max="10" value={followUpAttempts} onChange={(e) => setFollowUpAttempts(parseInt(e.target.value))} className="w-full" />
            <p className="text-white/40 text-xs mt-2">Optimal: 5-7 attempts. Yours: {followUpAttempts < 5 ? 'Below average' : followUpAttempts > 7 ? 'Above average' : 'Optimal'}</p>
          </div>
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Quote Close Rate: <span className="text-amber-400 font-mono">{quoteCloseRate}%</span></label>
            <input type="range" min="5" max="80" value={quoteCloseRate} onChange={(e) => setQuoteCloseRate(parseInt(e.target.value))} className="w-full" />
          </div>
        </div>
      ),
    },
    3: {
      icon: Users,
      title: 'Scheduling Inefficiency Leak',
      description: 'How much time and revenue are you losing to scheduling friction?',
      inputs: (
        <div className="space-y-6">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Revenue-Generating Appointments Per Day</label>
            <input type="number" value={appointmentsPerDay} onChange={(e) => setAppointmentsPerDay(Math.max(1, parseInt(e.target.value) || 0))} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:border-amber-500" placeholder="4" />
          </div>
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Average No-Show Rate: <span className="text-amber-400 font-mono">{noShowRate}%</span></label>
            <input type="range" min="5" max="50" value={noShowRate} onChange={(e) => setNoShowRate(parseInt(e.target.value))} className="w-full" />
            <p className="text-white/40 text-xs mt-2">With AI reminders: ~5%</p>
          </div>
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Time Spent Scheduling Per Day: <span className="text-amber-400 font-mono">{schedulingTimeMinutes}min</span></label>
            <input type="range" min="0" max="120" value={schedulingTimeMinutes} onChange={(e) => setSchedulingTimeMinutes(parseInt(e.target.value))} className="w-full" />
          </div>
        </div>
      ),
    },
    4: {
      icon: Target,
      title: 'Untracked Customer Value Leak',
      description: 'Are your existing customers getting the attention they deserve?',
      inputs: (
        <div className="space-y-6">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Total Active Customers</label>
            <input type="number" value={totalCustomers} onChange={(e) => setTotalCustomers(Math.max(1, parseInt(e.target.value) || 0))} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:border-amber-500" placeholder="200" />
          </div>
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Average Customer Lifespan: <span className="text-amber-400 font-mono">{customerLifespanMonths}m</span></label>
            <input type="range" min="1" max="60" value={customerLifespanMonths} onChange={(e) => setCustomerLifespanMonths(parseInt(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">% Getting Proactive Outreach: <span className="text-amber-400 font-mono">{proactiveOutreachPct}%</span></label>
            <input type="range" min="0" max="100" value={proactiveOutreachPct} onChange={(e) => setProactiveOutreachPct(parseInt(e.target.value))} className="w-full" />
            <p className="text-white/40 text-xs mt-2">Best-in-class: 100%</p>
          </div>
        </div>
      ),
    },
    5: {
      icon: DollarSign,
      title: 'Pricing & Upsell Leak',
      description: 'How many upsell opportunities are you missing?',
      inputs: (
        <div className="space-y-6">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Monthly Revenue</label>
            <input type="number" value={monthlyRevenue} onChange={(e) => setMonthlyRevenue(Math.max(1000, parseInt(e.target.value) || 0))} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:border-amber-500" placeholder="$50,000" />
          </div>
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">% of Customers Offered Upsells: <span className="text-amber-400 font-mono">{upsellOfferPct}%</span></label>
            <input type="range" min="0" max="100" value={upsellOfferPct} onChange={(e) => setUpsellOfferPct(parseInt(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Average Upsell Value When Accepted</label>
            <input type="number" value={avgUpsellValue} onChange={(e) => setAvgUpsellValue(Math.max(50, parseInt(e.target.value) || 0))} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:border-amber-500" placeholder="$500" />
          </div>
        </div>
      ),
    },
    6: {
      icon: Cog,
      title: 'Operational Waste Leak',
      description: 'How much time is your team spending on manual tasks?',
      inputs: (
        <div className="space-y-6">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Team Size</label>
            <input type="number" value={teamSize} onChange={(e) => setTeamSize(Math.max(1, parseInt(e.target.value) || 0))} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:border-amber-500" placeholder="5" />
          </div>
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Hours Per Week on Data Entry: <span className="text-amber-400 font-mono">{dataEntryHours}h</span></label>
            <input type="range" min="0" max="20" value={dataEntryHours} onChange={(e) => setDataEntryHours(parseInt(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Hours Per Week on Manual Reporting: <span className="text-amber-400 font-mono">{reportingHours}h</span></label>
            <input type="range" min="0" max="15" value={reportingHours} onChange={(e) => setReportingHours(parseInt(e.target.value))} className="w-full" />
          </div>
        </div>
      ),
    },
  };

  const currentScreen = categoryScreens[currentCategory];
  const CurrentIcon = currentScreen.icon;

  if (screen.startsWith('category')) {
    const cumulativeLeak = [
      calculateLeaks.category1,
      calculateLeaks.category1 + calculateLeaks.category2,
      calculateLeaks.category1 + calculateLeaks.category2 + calculateLeaks.category3,
      calculateLeaks.category1 + calculateLeaks.category2 + calculateLeaks.category3 + calculateLeaks.category4,
      calculateLeaks.category1 + calculateLeaks.category2 + calculateLeaks.category3 + calculateLeaks.category4 + calculateLeaks.category5,
      calculateLeaks.total,
    ][currentCategory - 1];

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] to-[#1a1a2e] p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                <CurrentIcon className="w-8 h-8 text-amber-500" />
                {currentScreen.title}
              </h1>
              <p className="text-white/60">{currentScreen.description}</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg px-4 py-3">
              <p className="text-xs text-white/60 mb-1">Current Leak</p>
              <p className="font-mono font-bold text-amber-400 text-lg">{formatCurrency(cumulativeLeak)}</p>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-white/60">Progress</p>
              <p className="text-sm font-mono text-amber-400">{currentCategory} of 6</p>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-300" style={{ width: `${(currentCategory / 6) * 100}%` }} />
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 mb-8">
            {currentScreen.inputs}
          </div>

          <div className="flex justify-between gap-4">
            <button onClick={handlePrevCategory} disabled={currentCategory === 1} className="flex items-center gap-2 px-6 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all border border-white/10">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <button onClick={handleNextCategory} className="flex-1 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-semibold px-6 py-3 rounded-xl transition-all duration-300">
              {currentCategory === 6 ? 'Continue to Email' : 'Next'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'email') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] to-[#1a1a2e] flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              You&apos;re leaking{' '}
              <span className="text-amber-400 font-mono block text-5xl mt-2">
                {formatCurrency(calculateLeaks.total)}
              </span>
              annually
            </h1>
            <p className="text-white/60">Get your full breakdown + recovery plan</p>
          </div>

          <form onSubmit={handleEmailSubmit} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Full Name</label>
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your name" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:border-amber-500" />
            </div>
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:border-amber-500" />
            </div>
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Company</label>
              <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Your company" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:border-amber-500" />
            </div>
            <button type="submit" className="w-full bg-amber-500 hover:bg-amber-400 text-black font-semibold px-6 py-3 rounded-xl transition-all duration-300 mt-6 flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" /> Get My Revenue Recovery Plan
            </button>
          </form>
          <p className="text-white/40 text-xs text-center mt-4">We&apos;ll send your personalized recovery plan to this email.</p>
        </div>
      </div>
    );
  }

  if (screen === 'results') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] to-[#1a1a2e] p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-white/60 text-lg mb-2">Total Annual Revenue Leak</p>
            <p className="font-mono font-bold text-6xl md:text-7xl text-amber-400">{formatCurrency(calculateLeaks.total)}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Leak Breakdown by Category</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" angle={-45} textAnchor="end" height={100} />
                  <YAxis stroke="rgba(255,255,255,0.4)" />
                  <Tooltip formatter={(value) => formatCurrency(value)} contentStyle={{ backgroundColor: 'rgba(15,15,25,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
                  <Bar dataKey="value" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4">
              {chartData.map((cat, idx) => (
                <div key={idx} className="backdrop-blur-xl bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 transition-all duration-300">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-white">{cat.name}</h3>
                    <p className="font-mono text-amber-400 font-bold">{formatCurrency(cat.value)}</p>
                  </div>
                  <div className="flex justify-between items-center text-sm text-white/60">
                    <span>{((cat.value / calculateLeaks.total) * 100).toFixed(1)}% of total</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Recovery Potential</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={80} outerRadius={120} paddingAngle={2} dataKey="value">
                    <Cell fill="#f59e0b" />
                    <Cell fill="rgba(255,255,255,0.1)" />
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} contentStyle={{ backgroundColor: 'rgba(15,15,25,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4">
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-white/60 text-sm mb-1">Recoverable Revenue</p>
                <p className="font-mono font-bold text-amber-400 text-2xl">{formatCurrency(recoveryData.totalRecoverable)}</p>
                <p className="text-white/60 text-sm mt-2">{((recoveryData.totalRecoverable / calculateLeaks.total) * 100).toFixed(0)}% of total leak</p>
              </div>
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-white/60 text-sm mb-1">Non-Recoverable</p>
                <p className="font-mono font-bold text-white text-2xl">{formatCurrency(recoveryData.nonRecoverable)}</p>
                <p className="text-white/60 text-sm mt-2">{((recoveryData.nonRecoverable / calculateLeaks.total) * 100).toFixed(0)}% of total leak</p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Your Top 3 Revenue Recovery Actions</h2>
            <div className="space-y-4">
              {topActions.map((action, idx) => (
                <div key={idx} className="backdrop-blur-xl bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-6 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                      <span className="font-bold text-amber-400">{idx + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-2">{action.action}</h3>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div>
                          <p className="text-white/60">Current Leak</p>
                          <p className="font-mono font-bold text-white">{formatCurrency(action.leak)}</p>
                        </div>
                        <div>
                          <p className="text-white/60">Recoverable</p>
                          <p className="font-mono font-bold text-amber-400">{formatCurrency(action.recoverable)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <a href="https://calendly.com/elios-ai" target="_blank" rel="noopener noreferrer" className="bg-amber-500 hover:bg-amber-400 text-black font-semibold px-8 py-4 rounded-xl transition-all duration-300 text-center flex items-center justify-center gap-2">
              <TrendingUp className="w-5 h-5" /> Book a Free Revenue Recovery Call
            </a>
            <button onClick={handleDownloadReport} className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 border border-white/20 flex items-center justify-center gap-2">
              <Download className="w-5 h-5" /> Download Full Report
            </button>
          </div>

          <p className="text-center text-white/40 text-sm">Report generated for {fullName}. {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    );
  }

  return null;
};

export default RevenueLeakCalculator;
