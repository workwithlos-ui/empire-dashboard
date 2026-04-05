'use client';

import { useState, useEffect } from 'react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import {
  Crown, TrendingUp, DollarSign, Users, Target, Zap, Clock, Building2,
  Rocket, Brain, Cog, Shield, Globe, Megaphone, Database, Layers, Briefcase,
  ArrowUpRight, CheckCircle2, AlertCircle, Timer
} from 'lucide-react';

const revenueData = [
  { month: 'Oct', revenue: 42000, projected: 40000 },
  { month: 'Nov', revenue: 58000, projected: 55000 },
  { month: 'Dec', revenue: 71000, projected: 65000 },
  { month: 'Jan', revenue: 89000, projected: 80000 },
  { month: 'Feb', revenue: 105000, projected: 95000 },
  { month: 'Mar', revenue: 128000, projected: 115000 },
  { month: 'Apr', revenue: 147000, projected: 135000 },
  { month: 'May', revenue: 0, projected: 165000 },
  { month: 'Jun', revenue: 0, projected: 195000 },
];

const brandMix = [
  { name: 'AI Simple', revenue: 420000, growth: 34, color: '#f59e0b', data: [30,35,28,42,38,45,50,55] },
  { name: 'QUORUM', revenue: 285000, growth: 67, color: '#6366f1', data: [10,15,20,28,35,42,55,67] },
  { name: 'Empire Tools', revenue: 195000, growth: 22, color: '#10b981', data: [25,22,28,30,32,35,38,42] },
  { name: 'Consulting', revenue: 148000, growth: 15, color: '#3b82f6', data: [20,22,18,25,28,30,32,35] },
  { name: 'Licensing', revenue: 92000, growth: 45, color: '#ec4899', data: [5,8,12,18,22,28,35,45] },
];

const dealPipeline = [
  { name: 'Enterprise AI Audit', value: 125000, stage: 'Proposal', probability: 85 },
  { name: 'QUORUM VIP Package', value: 75000, stage: 'Negotiation', probability: 72 },
  { name: 'Factory License Deal', value: 250000, stage: 'Discovery', probability: 40 },
  { name: 'Content Engine Setup', value: 45000, stage: 'Closed Won', probability: 100 },
  { name: 'PE Firm Assessment', value: 180000, stage: 'Proposal', probability: 60 },
  { name: 'SaaS Integration', value: 95000, stage: 'Negotiation', probability: 78 },
];

const engines = [
  { name: 'Revenue Engine', icon: DollarSign, status: 'active', metric: '$147K/mo' },
  { name: 'Content Engine', icon: Megaphone, status: 'active', metric: '42 posts/wk' },
  { name: 'Sales Engine', icon: Target, status: 'active', metric: '23 deals' },
  { name: 'AI Engine', icon: Brain, status: 'active', metric: '33 tools' },
  { name: 'Data Engine', icon: Database, status: 'building', metric: '78% ready' },
  { name: 'Ops Engine', icon: Cog, status: 'active', metric: '94% auto' },
  { name: 'Brand Engine', icon: Crown, status: 'active', metric: '5 brands' },
  { name: 'Network Engine', icon: Globe, status: 'active', metric: '2.4K nodes' },
  { name: 'Legal Engine', icon: Shield, status: 'building', metric: '60% ready' },
  { name: 'Scale Engine', icon: Rocket, status: 'planned', metric: 'Q3 2026' },
  { name: 'Stack Engine', icon: Layers, status: 'active', metric: '12 integrations' },
];

const contentPhases = [
  { phase: 'Ideation', count: 8, color: '#6366f1' },
  { phase: 'Production', count: 12, color: '#f59e0b' },
  { phase: 'Review', count: 5, color: '#3b82f6' },
  { phase: 'Scheduled', count: 15, color: '#10b981' },
  { phase: 'Published', count: 42, color: '#22d3ee' },
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

function SparkLine({ data, color, height = 30 }) {
  const sparkData = data.map((v, i) => ({ v, i }));
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={sparkData}>
        <Line type="monotone" dataKey="v" stroke={color} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

function QuorumCountdown() {
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

  const totalSeconds = timeLeft.days * 86400 + timeLeft.hours * 3600 + timeLeft.minutes * 60 + timeLeft.seconds;
  const maxSeconds = 90 * 86400;
  const progress = Math.max(0, 1 - totalSeconds / maxSeconds);
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="flex items-center gap-4">
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#334155" strokeWidth="6" />
          <circle cx="50" cy="50" r="40" fill="none" stroke="#6366f1" strokeWidth="6"
            strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
            strokeLinecap="round" className="transition-all duration-1000" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-indigo-400">{timeLeft.days}d</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'Hours', value: timeLeft.hours },
          { label: 'Minutes', value: timeLeft.minutes },
          { label: 'Seconds', value: timeLeft.seconds },
        ].map((item) => (
          <div key={item.label} className="text-center">
            <div className="text-xl font-bold text-white">{String(item.value).padStart(2, '0')}</div>
            <div className="text-xs text-slate-500">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function EmpireCommandCenter() {
  const kpis = [
    { label: 'Monthly Revenue', value: 147000, prefix: '$', icon: DollarSign, change: '+18%', color: 'amber' },
    { label: 'Active Deals', value: 23, icon: Briefcase, change: '+5', color: 'indigo' },
    { label: 'Tools Deployed', value: 19, suffix: '/33', icon: Zap, change: '58%', color: 'emerald' },
    { label: 'Content Pieces', value: 82, suffix: '/mo', icon: Megaphone, change: '+24%', color: 'blue' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Crown className="w-8 h-8 text-amber-400" />
            Empire Command Center
          </h1>
          <p className="text-slate-400 mt-1">Real-time intelligence across all operations</p>
        </div>
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-emerald-400 text-sm font-medium">All Systems Operational</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          const colorMap = {
            amber: 'from-amber-500/10 border-amber-500/20 text-amber-400',
            indigo: 'from-indigo-500/10 border-indigo-500/20 text-indigo-400',
            emerald: 'from-emerald-500/10 border-emerald-500/20 text-emerald-400',
            blue: 'from-blue-500/10 border-blue-500/20 text-blue-400',
          };
          return (
            <div key={kpi.label} className={`bg-gradient-to-br ${colorMap[kpi.color]} to-slate-800/50 border rounded-xl p-5 backdrop-blur-sm`}>
              <div className="flex items-center justify-between mb-3">
                <Icon className="w-5 h-5" />
                <span className="flex items-center gap-1 text-xs font-medium text-emerald-400">
                  <ArrowUpRight className="w-3 h-3" />{kpi.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-white">
                <AnimatedCounter target={kpi.value} prefix={kpi.prefix || ''} suffix={kpi.suffix || ''} />
              </div>
              <div className="text-sm text-slate-400 mt-1">{kpi.label}</div>
            </div>
          );
        })}
      </div>

      {/* Revenue Chart + QUORUM Countdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-400" />
            Revenue Trajectory
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="projGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} tickFormatter={(v) => `$${v / 1000}K`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                labelStyle={{ color: '#94a3b8' }}
                formatter={(v) => [`$${v.toLocaleString()}`, '']}
              />
              <Area type="monotone" dataKey="projected" stroke="#6366f1" fill="url(#projGrad)" strokeWidth={2} strokeDasharray="5 5" />
              <Area type="monotone" dataKey="revenue" stroke="#f59e0b" fill="url(#revGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Timer className="w-5 h-5 text-indigo-400" />
            QUORUM Launch
          </h2>
          <div className="text-sm text-slate-400 mb-4">May 7-8, 2026 | Orlando, FL</div>
          <QuorumCountdown />
          <div className="mt-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Tickets Sold</span>
              <span className="text-white font-medium">127 / 200</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '63.5%' }} />
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Revenue</span>
              <span className="text-indigo-400 font-medium">$285,000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Revenue Mix */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-amber-400" />
          Brand Revenue Mix
        </h2>
        <div className="space-y-4">
          {brandMix.map((brand) => (
            <div key={brand.name} className="flex items-center gap-4">
              <div className="w-28 text-sm font-medium text-white">{brand.name}</div>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-slate-700/50 rounded-full h-3">
                    <div
                      className="h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${(brand.revenue / 420000) * 100}%`, backgroundColor: brand.color }}
                    />
                  </div>
                  <div className="w-20 text-right text-sm text-slate-300">${(brand.revenue / 1000).toFixed(0)}K</div>
                  <div className="w-16">
                    <SparkLine data={brand.data} color={brand.color} />
                  </div>
                  <span className="text-xs text-emerald-400 w-12 text-right">+{brand.growth}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deal Pipeline + Content Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-400" />
            Deal Pipeline
          </h2>
          <div className="space-y-3">
            {dealPipeline.map((deal) => (
              <div key={deal.name} className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">{deal.name}</span>
                  <span className="text-sm font-bold text-amber-400">${(deal.value / 1000).toFixed(0)}K</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-slate-700 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-700"
                      style={{
                        width: `${deal.probability}%`,
                        backgroundColor: deal.probability >= 80 ? '#10b981' : deal.probability >= 60 ? '#f59e0b' : '#6366f1',
                      }}
                    />
                  </div>
                  <span className="text-xs text-slate-400 w-16 text-right">{deal.probability}% prob</span>
                </div>
                <div className="mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    deal.stage === 'Closed Won' ? 'bg-emerald-500/20 text-emerald-400' :
                    deal.stage === 'Negotiation' ? 'bg-amber-500/20 text-amber-400' :
                    deal.stage === 'Proposal' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-indigo-500/20 text-indigo-400'
                  }`}>{deal.stage}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-700/50 flex justify-between">
            <span className="text-sm text-slate-400">Total Pipeline Value</span>
            <span className="text-lg font-bold text-amber-400">$770K</span>
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-amber-400" />
            Content Pipeline
          </h2>
          <div className="space-y-4">
            {contentPhases.map((phase) => (
              <div key={phase.phase} className="flex items-center gap-4">
                <div className="w-24 text-sm text-slate-300">{phase.phase}</div>
                <div className="flex-1 bg-slate-700/50 rounded-full h-6 relative">
                  <div
                    className="h-6 rounded-full flex items-center justify-end pr-3 transition-all duration-1000"
                    style={{ width: `${(phase.count / 42) * 100}%`, backgroundColor: phase.color + '40' }}
                  >
                    <span className="text-xs font-bold text-white">{phase.count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-slate-700/50">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Total Active Content</span>
              <span className="text-white font-bold">82 pieces</span>
            </div>
          </div>
        </div>
      </div>

      {/* 11 Engines Grid */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Cog className="w-5 h-5 text-amber-400" />
          Empire Engines
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          {engines.map((engine) => {
            const Icon = engine.icon;
            const statusColors = {
              active: 'border-emerald-500/30 bg-emerald-500/5',
              building: 'border-amber-500/30 bg-amber-500/5',
              planned: 'border-slate-600/30 bg-slate-700/20',
            };
            const statusDot = {
              active: 'bg-emerald-400',
              building: 'bg-amber-400',
              planned: 'bg-slate-500',
            };
            return (
              <div key={engine.name} className={`border rounded-xl p-4 text-center ${statusColors[engine.status]} backdrop-blur-sm`}>
                <div className="flex justify-center mb-2">
                  <Icon className="w-6 h-6 text-slate-300" />
                </div>
                <div className="text-xs font-medium text-white mb-1">{engine.name}</div>
                <div className="text-xs text-slate-400 mb-2">{engine.metric}</div>
                <div className="flex items-center justify-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${statusDot[engine.status]} ${engine.status === 'active' ? 'animate-pulse' : ''}`} />
                  <span className="text-xs text-slate-500 capitalize">{engine.status}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Factory Deployment Progress */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Rocket className="w-5 h-5 text-amber-400" />
          Factory Deployment Progress
        </h2>
        <div className="flex items-center gap-4 mb-3">
          <div className="flex-1 bg-slate-700 rounded-full h-4 overflow-hidden">
            <div className="h-4 bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full transition-all duration-1000 relative" style={{ width: '57.6%' }}>
              <div className="absolute inset-0 bg-white/10 animate-pulse rounded-full" />
            </div>
          </div>
          <span className="text-lg font-bold text-white">19/33</span>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-400">19</div>
            <div className="text-xs text-slate-400">Deployed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-400">8</div>
            <div className="text-xs text-slate-400">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-500">6</div>
            <div className="text-xs text-slate-400">Planned</div>
          </div>
        </div>
      </div>
    </div>
  );
}
