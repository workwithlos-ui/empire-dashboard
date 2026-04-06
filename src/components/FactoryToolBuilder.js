'use client';

import { useState } from 'react';
import {
  Wrench, Search, Filter, DollarSign, Zap, Clock, CheckCircle2,
  ArrowRight, Tag, Layers, TrendingUp, Box, GitBranch, ExternalLink,
  Globe, AlertCircle, Radio
} from 'lucide-react';

const categories = ['All', 'Sales', 'Marketing', 'Operations', 'Analytics', 'AI/ML', 'Platform'];
const statuses = ['All', 'Live', 'Deploying', 'Planned'];

const tools = [
  {
    id: 1,
    name: 'Content Matrix',
    category: 'Marketing',
    status: 'Live',
    priority: 'High',
    url: 'https://content-matrix-orcin.vercel.app',
    revenue: 42000,
    description: 'Multi-platform content strategy matrix for mapping content pillars, formats, and distribution channels across the Empire.',
    tech: 'Next.js / Vercel',
  },
  {
    id: 2,
    name: 'Hook Engine',
    category: 'Marketing',
    status: 'Live',
    priority: 'High',
    url: 'https://hook-engine.vercel.app',
    revenue: 38000,
    description: 'AI-powered hook generator that creates scroll-stopping openers for social posts, emails, ads, and video scripts.',
    tech: 'Next.js / Vercel',
  },
  {
    id: 3,
    name: 'AI Readiness Assessment',
    category: 'AI/ML',
    status: 'Live',
    priority: 'High',
    url: 'https://ai-readiness-assessment.vercel.app',
    revenue: 55000,
    description: 'Evaluates organizational AI readiness across 15 questions in 4 dimensions, delivering tier classification and actionable recommendations.',
    tech: 'Next.js / Vercel',
  },
  {
    id: 4,
    name: 'Revenue Leak Calculator',
    category: 'Sales',
    status: 'Live',
    priority: 'Critical',
    url: 'https://revenue-leak-calculator.vercel.app',
    revenue: 68000,
    description: 'W.A.I.T. formula calculator that quantifies revenue leakage across Wasted Time, Automation Gaps, Inefficient Processes, and Turnover/Churn.',
    tech: 'Next.js / Vercel',
  },
  {
    id: 5,
    name: 'Competitor Warfare',
    category: 'Analytics',
    status: 'Live',
    priority: 'High',
    url: 'https://competitor-warfare.vercel.app',
    revenue: 35000,
    description: 'Competitive intelligence dashboard for mapping competitor positioning, pricing, messaging, and market gaps in real time.',
    tech: 'Next.js / Vercel',
  },
  {
    id: 6,
    name: 'Growth Engine (PAID)',
    category: 'Sales',
    status: 'Live',
    priority: 'Critical',
    url: 'https://growth-engine-paid.vercel.app',
    revenue: 120000,
    description: 'Paid acquisition and growth strategy engine with funnel modeling, CAC/LTV analysis, and channel optimization for scaling revenue.',
    tech: 'Next.js / Vercel',
  },
  {
    id: 7,
    name: 'RISE Intelligence',
    category: 'AI/ML',
    status: 'Live',
    priority: 'High',
    url: 'https://rise-intelligence.vercel.app',
    revenue: 75000,
    description: 'Revenue Intelligence System Engine that surfaces deal insights, pipeline health signals, and AI-driven next-best-action recommendations.',
    tech: 'Next.js / Vercel',
  },
  {
    id: 8,
    name: 'Tradesbot',
    category: 'AI/ML',
    status: 'Live',
    priority: 'High',
    url: 'https://tradesbot.vercel.app',
    revenue: 90000,
    description: 'Automated trading intelligence bot with market signal detection, pattern recognition, and portfolio optimization workflows.',
    tech: 'Next.js / Vercel',
  },
  {
    id: 9,
    name: 'AWE V2.0',
    category: 'Operations',
    status: 'Deploying',
    priority: 'Critical',
    url: null,
    revenue: 150000,
    description: 'Autonomous Workforce Engine V2.0 - backend deploying to Railway. Orchestrates AI agents across sales, ops, and content workflows with zero human intervention.',
    tech: 'Railway (Backend)',
  },
  {
    id: 10,
    name: 'Empire Dashboard',
    category: 'Platform',
    status: 'Live',
    priority: 'High',
    url: 'https://empire-dashboard-iota.vercel.app',
    revenue: 0,
    description: 'Central command center for the Empire ecosystem. Real-time KPIs, revenue trajectory, QUORUM launch tracker, brand mix, deal pipeline, and all 11 engines.',
    tech: 'Next.js / Vercel',
  },
  {
    id: 11,
    name: 'FundingHub.co',
    category: 'Platform',
    status: 'Live',
    priority: 'High',
    url: 'https://fundinghub.co',
    revenue: 95000,
    description: 'Capital access platform connecting founders and operators with funding sources, grant databases, and investor networks.',
    tech: 'Custom Domain',
  },
  {
    id: 12,
    name: 'SUITE AI Advisory Board',
    category: 'AI/ML',
    status: 'Live',
    priority: 'High',
    url: 'https://suite-tan-nine.vercel.app/landing',
    revenue: 85000,
    description: 'AI-powered advisory board simulation that provides strategic counsel, board-level insights, and scenario planning across business functions.',
    tech: 'Next.js / Vercel',
  },
];

export default function FactoryToolBuilder() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeStatus, setActiveStatus] = useState('All');

  const filtered = tools.filter((tool) => {
    const matchSearch =
      tool.name.toLowerCase().includes(search.toLowerCase()) ||
      tool.description.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === 'All' || tool.category === activeCategory;
    const matchStatus = activeStatus === 'All' || tool.status === activeStatus;
    return matchSearch && matchCategory && matchStatus;
  });

  const live = tools.filter((t) => t.status === 'Live').length;
  const deploying = tools.filter((t) => t.status === 'Deploying').length;
  const planned = tools.filter((t) => t.status === 'Planned').length;
  const totalRevenue = tools.reduce((sum, t) => sum + t.revenue, 0);

  const statusConfig = {
    Live: {
      badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      dot: 'bg-emerald-400',
      icon: CheckCircle2,
    },
    Deploying: {
      badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      dot: 'bg-amber-400',
      icon: Radio,
    },
    Planned: {
      badge: 'bg-slate-600/20 text-slate-400 border-slate-600/30',
      dot: 'bg-slate-500',
      icon: Clock,
    },
  };

  const priorityBadge = {
    Critical: 'bg-red-500/20 text-red-400',
    High: 'bg-amber-500/20 text-amber-400',
    Medium: 'bg-blue-500/20 text-blue-400',
    Low: 'bg-slate-600/20 text-slate-400',
  };

  const categoryColors = {
    Sales: '#f59e0b',
    Marketing: '#ec4899',
    Operations: '#10b981',
    Analytics: '#3b82f6',
    'AI/ML': '#6366f1',
    Platform: '#22d3ee',
  };

  const categoryIcons = {
    Sales: DollarSign,
    Marketing: Zap,
    Operations: Layers,
    Analytics: TrendingUp,
    'AI/ML': Box,
    Platform: Globe,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Wrench className="w-8 h-8 text-amber-400" />
            Factory Tool Builder
          </h1>
          <p className="text-slate-400 mt-1">12 live tools powering the Empire ecosystem</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-emerald-400 font-medium">{live} Tools Live</span>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Tools', value: String(tools.length), icon: Box, color: 'amber' },
          { label: 'Live', value: String(live), icon: CheckCircle2, color: 'emerald' },
          { label: 'Deploying', value: String(deploying), icon: Radio, color: 'amber' },
          {
            label: 'Revenue Impact',
            value: `$${(totalRevenue / 1000).toFixed(0)}K`,
            icon: DollarSign,
            color: 'indigo',
          },
        ].map((stat) => {
          const Icon = stat.icon;
          const colorMap = {
            amber: 'text-amber-400 border-amber-500/20',
            emerald: 'text-emerald-400 border-emerald-500/20',
            indigo: 'text-indigo-400 border-indigo-500/20',
          };
          return (
            <div
              key={stat.label}
              className={`bg-slate-800/50 border rounded-xl p-4 backdrop-blur-sm ${colorMap[stat.color]}`}
            >
              <Icon className="w-5 h-5 mb-2" />
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Search and Filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            placeholder="Search tools by name or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-colors"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1 mr-2">
            <Tag className="w-4 h-4 text-slate-500" />
            <span className="text-xs text-slate-500">Category:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1 mr-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <span className="text-xs text-slate-500">Status:</span>
          </div>
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setActiveStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeStatus === status
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((tool) => {
          const CatIcon = categoryIcons[tool.category] || Wrench;
          const cfg = statusConfig[tool.status] || statusConfig.Planned;
          const StatusIcon = cfg.icon;
          return (
            <div
              key={tool.id}
              className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 backdrop-blur-sm hover:border-amber-500/30 transition-all group flex flex-col"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: (categoryColors[tool.category] || '#6366f1') + '20' }}
                  >
                    <CatIcon
                      className="w-4 h-4"
                      style={{ color: categoryColors[tool.category] || '#6366f1' }}
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors leading-tight">
                      {tool.name}
                    </h3>
                    <span className="text-xs text-slate-500">#{tool.id} &middot; {tool.tech}</span>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded text-xs font-medium flex-shrink-0 ${priorityBadge[tool.priority]}`}>
                  {tool.priority}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-400 mb-3 line-clamp-2 flex-1">{tool.description}</p>

              {/* Badges */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                <span
                  className="px-2 py-0.5 rounded text-xs font-medium"
                  style={{
                    backgroundColor: (categoryColors[tool.category] || '#6366f1') + '20',
                    color: categoryColors[tool.category] || '#6366f1',
                  }}
                >
                  {tool.category}
                </span>
                <span className={`px-2 py-0.5 rounded text-xs font-medium border flex items-center gap-1 ${cfg.badge}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} ${tool.status === 'Live' ? 'animate-pulse' : ''}`} />
                  {tool.status}
                </span>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-700/30">
                {tool.url ? (
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium truncate max-w-[60%]"
                  >
                    <ExternalLink className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{tool.url.replace('https://', '')}</span>
                  </a>
                ) : (
                  <div className="flex items-center gap-1 text-xs text-amber-400">
                    <Radio className="w-3 h-3" />
                    <span>Deploying to Railway</span>
                  </div>
                )}
                {tool.revenue > 0 ? (
                  <div className="flex items-center gap-1 text-sm font-bold text-amber-400 flex-shrink-0">
                    <DollarSign className="w-3 h-3" />
                    {(tool.revenue / 1000).toFixed(0)}K/yr
                  </div>
                ) : (
                  <div className="text-xs text-slate-500 flex-shrink-0">Internal</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No tools match your filters</p>
        </div>
      )}

      {/* Live Tools Directory */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-emerald-400" />
          Live Tools Directory
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {tools
            .filter((t) => t.status === 'Live' && t.url)
            .map((tool) => (
              <a
                key={tool.id}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-slate-900/50 border border-slate-700/30 rounded-lg p-3 hover:border-emerald-500/30 hover:bg-slate-900/80 transition-all group"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors truncate">
                    {tool.name}
                  </div>
                  <div className="text-xs text-slate-500 truncate">{tool.url.replace('https://', '')}</div>
                </div>
                <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-emerald-400 transition-colors flex-shrink-0 ml-auto" />
              </a>
            ))}
        </div>
      </div>

      {/* Revenue Impact Summary */}
      <div className="bg-gradient-to-r from-amber-600/10 to-indigo-600/10 border border-amber-500/20 rounded-xl p-6 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-amber-400" />
          Revenue Impact by Category
        </h2>
        <div className="space-y-3">
          {Object.entries(
            tools.reduce((acc, t) => {
              acc[t.category] = (acc[t.category] || 0) + t.revenue;
              return acc;
            }, {})
          )
            .sort((a, b) => b[1] - a[1])
            .map(([cat, rev]) => (
              <div key={cat} className="flex items-center gap-3">
                <div className="w-24 text-sm text-slate-300">{cat}</div>
                <div className="flex-1 bg-slate-700/50 rounded-full h-4">
                  <div
                    className="h-4 rounded-full transition-all duration-700"
                    style={{
                      width: `${(rev / totalRevenue) * 100}%`,
                      backgroundColor: (categoryColors[cat] || '#6366f1') + '80',
                    }}
                  />
                </div>
                <span className="text-sm font-bold text-white w-16 text-right">
                  ${(rev / 1000).toFixed(0)}K
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
