'use client';

import { useState, useEffect } from 'react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import {
  Users, TrendingUp, DollarSign, Clock, Mail, Target, Globe, Building2,
  ArrowUpRight, ArrowDownRight, CheckCircle2, AlertCircle, Zap, Ticket
} from 'lucide-react';

const velocityData = [
  { week: 'W1', tickets: 8, revenue: 18000 },
  { week: 'W2', tickets: 12, revenue: 27000 },
  { week: 'W3', tickets: 18, revenue: 40500 },
  { week: 'W4', tickets: 15, revenue: 33750 },
  { week: 'W5', tickets: 22, revenue: 49500 },
  { week: 'W6', tickets: 19, revenue: 42750 },
  { week: 'W7', tickets: 14, revenue: 31500 },
  { week: 'W8', tickets: 19, revenue: 42750 },
];

const funnelStages = [
  { stage: 'Website Visitors', count: 12400, color: '#6366f1', width: 100 },
  { stage: 'Landing Page Views', count: 4800, color: '#818cf8', width: 82 },
  { stage: 'Email Captured', count: 1920, color: '#a78bfa', width: 64 },
  { stage: 'Sales Page Views', count: 680, color: '#c4b5fd', width: 46 },
  { stage: 'Cart Started', count: 310, color: '#f59e0b', width: 32 },
  { stage: 'Tickets Purchased', count: 127, color: '#10b981', width: 20 },
];

const emailSequences = [
  { name: 'Welcome Sequence', sent: 1920, opened: 1248, clicked: 576, converted: 42, status: 'active' },
  { name: 'Early Bird Offer', sent: 1500, opened: 1050, clicked: 420, converted: 35, status: 'active' },
  { name: 'Speaker Spotlight', sent: 1200, opened: 840, clicked: 336, converted: 18, status: 'active' },
  { name: 'Urgency Campaign', sent: 800, opened: 480, clicked: 192, converted: 12, status: 'scheduled' },
  { name: 'Last Chance', sent: 0, opened: 0, clicked: 0, converted: 0, status: 'draft' },
  { name: 'VIP Upsell', sent: 500, opened: 375, clicked: 150, converted: 20, status: 'active' },
];

const trafficSources = [
  { source: 'Organic Social', visitors: 4200, tickets: 38, color: '#6366f1' },
  { source: 'Email Marketing', visitors: 3100, tickets: 42, color: '#f59e0b' },
  { source: 'Paid Ads', visitors: 2800, tickets: 22, color: '#3b82f6' },
  { source: 'Direct / Referral', visitors: 1500, tickets: 18, color: '#10b981' },
  { source: 'Podcast / PR', visitors: 800, tickets: 7, color: '#ec4899' },
];

const buyerIndustries = [
  { industry: 'Private Equity', count: 32, pct: 25 },
  { industry: 'SaaS / Tech', count: 28, pct: 22 },
  { industry: 'Real Estate', count: 22, pct: 17 },
  { industry: 'Healthcare', count: 18, pct: 14 },
  { industry: 'E-Commerce', count: 15, pct: 12 },
  { industry: 'Other', count: 12, pct: 10 },
];

const buyerRevenue = [
  { range: '$1M - $5M', count: 45, pct: 35 },
  { range: '$5M - $20M', count: 38, pct: 30 },
  { range: '$20M - $50M', count: 25, pct: 20 },
  { range: '$50M+', count: 19, pct: 15 },
];

export default function QuorumSalesTracker() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date('2026-05-07T09:00:00-04:00');
    const update = () => {
      const now = new Date();
      const diff = target - now;
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const kpis = [
    { label: 'Tickets Sold', value: 127, target: 200, icon: Ticket, color: 'indigo' },
    { label: 'Revenue', value: '$285K', raw: 285000, target: 450000, icon: DollarSign, color: 'amber' },
    { label: 'Avg Ticket Price', value: '$2,244', icon: TrendingUp, color: 'emerald' },
    { label: 'Conversion Rate', value: '1.02%', icon: Target, color: 'blue' },
  ];

  const ticketProgress = (127 / 200) * 100;
  const revenueProgress = (285000 / 450000) * 100;
  const daysTotal = 90;
  const daysElapsed = daysTotal - timeLeft.days;
  const expectedTickets = Math.round((daysElapsed / daysTotal) * 200);
  const onTrack = 127 >= expectedTickets;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 md:p-6 space-y-6">
      {/* Header with Countdown */}
      <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-xl p-6 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Users className="w-8 h-8 text-indigo-400" />
              QUORUM Sales Tracker
            </h1>
            <p className="text-slate-400 mt-1">May 7-8, 2026 | Orlando, FL | 200 Seats</p>
          </div>
          <div className="flex items-center gap-6 bg-slate-900/50 rounded-xl px-6 py-3 border border-slate-700/50">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hrs', value: timeLeft.hours },
              { label: 'Min', value: timeLeft.minutes },
              { label: 'Sec', value: timeLeft.seconds },
            ].map((t, i) => (
              <div key={t.label} className="text-center">
                <div className="text-2xl font-bold text-indigo-400 font-mono">{String(t.value).padStart(2, '0')}</div>
                <div className="text-xs text-slate-500">{t.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          const colorMap = {
            indigo: 'from-indigo-500/10 border-indigo-500/20 text-indigo-400',
            amber: 'from-amber-500/10 border-amber-500/20 text-amber-400',
            emerald: 'from-emerald-500/10 border-emerald-500/20 text-emerald-400',
            blue: 'from-blue-500/10 border-blue-500/20 text-blue-400',
          };
          return (
            <div key={kpi.label} className={`bg-gradient-to-br ${colorMap[kpi.color]} to-slate-800/50 border rounded-xl p-5 backdrop-blur-sm`}>
              <div className="flex items-center justify-between mb-3">
                <Icon className="w-5 h-5" />
                {kpi.target && (
                  <span className="text-xs text-slate-400">
                    Target: {typeof kpi.target === 'number' && kpi.target > 1000 ? `$${(kpi.target/1000).toFixed(0)}K` : kpi.target}
                  </span>
                )}
              </div>
              <div className="text-2xl font-bold text-white">{kpi.value}</div>
              <div className="text-sm text-slate-400 mt-1">{kpi.label}</div>
              {kpi.target && (
                <div className="mt-3">
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="h-2 rounded-full bg-current transition-all duration-700"
                      style={{ width: `${typeof kpi.value === 'number' ? (kpi.value / kpi.target) * 100 : (285000 / kpi.target) * 100}%` }} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Sales Velocity Chart */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-indigo-400" />
          Sales Velocity
        </h2>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={velocityData}>
            <defs>
              <linearGradient id="velGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="week" stroke="#64748b" fontSize={12} />
            <YAxis stroke="#64748b" fontSize={12} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
              labelStyle={{ color: '#94a3b8' }}
            />
            <Area type="monotone" dataKey="tickets" stroke="#6366f1" fill="url(#velGrad)" strokeWidth={2} name="Tickets" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Sales Funnel + Traffic Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-400" />
            Sales Funnel
          </h2>
          <div className="space-y-3">
            {funnelStages.map((stage, i) => (
              <div key={stage.stage} className="flex items-center gap-3">
                <div className="w-40 text-sm text-slate-300 text-right">{stage.stage}</div>
                <div className="flex-1 flex justify-center">
                  <div
                    className="h-8 rounded-lg flex items-center justify-center transition-all duration-700"
                    style={{ width: `${stage.width}%`, backgroundColor: stage.color + '30', border: `1px solid ${stage.color}50` }}
                  >
                    <span className="text-xs font-bold text-white">{stage.count.toLocaleString()}</span>
                  </div>
                </div>
                {i > 0 && (
                  <span className="text-xs text-slate-500 w-12 text-right">
                    {((stage.count / funnelStages[i - 1].count) * 100).toFixed(1)}%
                  </span>
                )}
                {i === 0 && <span className="w-12" />}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-indigo-400" />
            Traffic Sources
          </h2>
          <div className="space-y-4">
            {trafficSources.map((src) => (
              <div key={src.source}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-slate-300">{src.source}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500">{src.visitors.toLocaleString()} visits</span>
                    <span className="text-sm font-bold text-white">{src.tickets} tickets</span>
                  </div>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all duration-700"
                    style={{ width: `${(src.visitors / 4200) * 100}%`, backgroundColor: src.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Email Sequences Table */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm overflow-x-auto">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Mail className="w-5 h-5 text-indigo-400" />
          Email Sequences
        </h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700/50">
              <th className="text-left py-3 px-4 text-slate-400 font-medium">Sequence</th>
              <th className="text-right py-3 px-4 text-slate-400 font-medium">Sent</th>
              <th className="text-right py-3 px-4 text-slate-400 font-medium">Open Rate</th>
              <th className="text-right py-3 px-4 text-slate-400 font-medium">Click Rate</th>
              <th className="text-right py-3 px-4 text-slate-400 font-medium">Conversions</th>
              <th className="text-right py-3 px-4 text-slate-400 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {emailSequences.map((seq) => (
              <tr key={seq.name} className="border-b border-slate-700/20 hover:bg-slate-700/20 transition-colors">
                <td className="py-3 px-4 text-white font-medium">{seq.name}</td>
                <td className="py-3 px-4 text-right text-slate-300">{seq.sent.toLocaleString()}</td>
                <td className="py-3 px-4 text-right text-slate-300">
                  {seq.sent > 0 ? `${((seq.opened / seq.sent) * 100).toFixed(1)}%` : '-'}
                </td>
                <td className="py-3 px-4 text-right text-slate-300">
                  {seq.sent > 0 ? `${((seq.clicked / seq.sent) * 100).toFixed(1)}%` : '-'}
                </td>
                <td className="py-3 px-4 text-right text-indigo-400 font-bold">{seq.converted}</td>
                <td className="py-3 px-4 text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    seq.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' :
                    seq.status === 'scheduled' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-slate-600/20 text-slate-400'
                  }`}>{seq.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Buyer Profiles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-indigo-400" />
            Buyers by Industry
          </h2>
          <div className="space-y-3">
            {buyerIndustries.map((item) => (
              <div key={item.industry} className="flex items-center gap-3">
                <div className="w-28 text-sm text-slate-300">{item.industry}</div>
                <div className="flex-1 bg-slate-700/50 rounded-full h-4">
                  <div className="h-4 bg-indigo-500/60 rounded-full flex items-center justify-end pr-2 transition-all duration-700"
                    style={{ width: `${item.pct}%` }}>
                    <span className="text-xs font-bold text-white">{item.count}</span>
                  </div>
                </div>
                <span className="text-xs text-slate-500 w-10 text-right">{item.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-indigo-400" />
            Buyers by Revenue Size
          </h2>
          <div className="space-y-4">
            {buyerRevenue.map((item) => (
              <div key={item.range}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-slate-300">{item.range}</span>
                  <span className="text-sm font-bold text-white">{item.count} buyers</span>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-3">
                  <div className="h-3 bg-amber-500/60 rounded-full transition-all duration-700"
                    style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Projections Panel */}
      <div className="bg-gradient-to-r from-indigo-600/10 to-purple-600/10 border border-indigo-500/20 rounded-xl p-6 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-indigo-400" />
          Projections
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">200</div>
            <div className="text-sm text-slate-400 mt-1">Target Seats</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-400">127</div>
            <div className="text-sm text-slate-400 mt-1">Current Sales</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-400">$450K</div>
            <div className="text-sm text-slate-400 mt-1">Revenue Target</div>
          </div>
          <div className="text-center">
            <div className={`flex items-center justify-center gap-2 text-lg font-bold ${onTrack ? 'text-emerald-400' : 'text-amber-400'}`}>
              {onTrack ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              {onTrack ? 'On Track' : 'Needs Acceleration'}
            </div>
            <div className="text-sm text-slate-400 mt-1">
              Expected: {expectedTickets} tickets by now
            </div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900/50 rounded-lg p-3 text-center border border-slate-700/30">
            <div className="text-sm text-slate-400">Avg Weekly Sales</div>
            <div className="text-xl font-bold text-white">15.9</div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-3 text-center border border-slate-700/30">
            <div className="text-sm text-slate-400">Weeks Remaining</div>
            <div className="text-xl font-bold text-white">{Math.ceil(timeLeft.days / 7)}</div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-3 text-center border border-slate-700/30">
            <div className="text-sm text-slate-400">Needed Per Week</div>
            <div className="text-xl font-bold text-amber-400">
              {Math.ceil(timeLeft.days / 7) > 0 ? Math.ceil(73 / Math.ceil(timeLeft.days / 7)) : 0}
            </div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-3 text-center border border-slate-700/30">
            <div className="text-sm text-slate-400">Projected Final</div>
            <div className="text-xl font-bold text-emerald-400">189</div>
          </div>
        </div>
      </div>
    </div>
  );
}
