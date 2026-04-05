'use client';

import { useState } from 'react';
import {
  Wrench, Search, Filter, DollarSign, Zap, Clock, CheckCircle2, AlertCircle,
  ArrowRight, Tag, Layers, TrendingUp, Box, GitBranch, Star
} from 'lucide-react';

const categories = ['All', 'Sales', 'Marketing', 'Operations', 'Analytics', 'AI/ML', 'Finance', 'HR'];
const statuses = ['All', 'Deployed', 'In Progress', 'Planned'];

const tools = [
  { id: 1, name: 'Revenue Leak Calculator', category: 'Sales', status: 'Deployed', priority: 'High', revenue: 45000, deps: ['CRM Integration'], description: 'Identifies and quantifies revenue leakage across operations' },
  { id: 2, name: 'AI Readiness Assessment', category: 'AI/ML', status: 'Deployed', priority: 'High', revenue: 38000, deps: ['Scoring Engine'], description: 'Evaluates organizational AI readiness with tier classification' },
  { id: 3, name: 'QUORUM Event Manager', category: 'Sales', status: 'Deployed', priority: 'Critical', revenue: 285000, deps: ['Payment Gateway', 'Email Engine'], description: 'Full event management and ticket sales platform' },
  { id: 4, name: 'Content Calendar Engine', category: 'Marketing', status: 'Deployed', priority: 'High', revenue: 22000, deps: ['Social API'], description: 'Multi-platform content scheduling and tracking' },
  { id: 5, name: 'Deal Pipeline Tracker', category: 'Sales', status: 'Deployed', priority: 'High', revenue: 55000, deps: ['CRM Integration'], description: 'Visual deal pipeline with probability scoring' },
  { id: 6, name: 'Brand Revenue Analyzer', category: 'Analytics', status: 'Deployed', priority: 'Medium', revenue: 18000, deps: ['Data Warehouse'], description: 'Cross-brand revenue analysis and forecasting' },
  { id: 7, name: 'Email Sequence Builder', category: 'Marketing', status: 'Deployed', priority: 'High', revenue: 32000, deps: ['Email Engine'], description: 'Automated email sequence creation and optimization' },
  { id: 8, name: 'Client Onboarding Flow', category: 'Operations', status: 'Deployed', priority: 'High', revenue: 28000, deps: ['CRM Integration', 'Doc Generator'], description: 'Streamlined client onboarding automation' },
  { id: 9, name: 'Proposal Generator', category: 'Sales', status: 'Deployed', priority: 'High', revenue: 42000, deps: ['Doc Generator', 'Pricing Engine'], description: 'AI-powered proposal creation from templates' },
  { id: 10, name: 'Invoice Automation', category: 'Finance', status: 'Deployed', priority: 'Medium', revenue: 15000, deps: ['Payment Gateway'], description: 'Automated invoicing and payment tracking' },
  { id: 11, name: 'Social Listening Dashboard', category: 'Marketing', status: 'Deployed', priority: 'Medium', revenue: 12000, deps: ['Social API'], description: 'Real-time brand mention and sentiment tracking' },
  { id: 12, name: 'KPI Dashboard Builder', category: 'Analytics', status: 'Deployed', priority: 'High', revenue: 25000, deps: ['Data Warehouse'], description: 'Custom KPI dashboard creation tool' },
  { id: 13, name: 'Meeting Scheduler', category: 'Operations', status: 'Deployed', priority: 'Medium', revenue: 8000, deps: ['Calendar API'], description: 'AI-powered meeting scheduling and prep' },
  { id: 14, name: 'Lead Scoring Engine', category: 'AI/ML', status: 'Deployed', priority: 'High', revenue: 48000, deps: ['CRM Integration', 'ML Pipeline'], description: 'Machine learning lead qualification scoring' },
  { id: 15, name: 'Chatbot Framework', category: 'AI/ML', status: 'Deployed', priority: 'High', revenue: 35000, deps: ['LLM API'], description: 'Custom AI chatbot builder for client sites' },
  { id: 16, name: 'Document Analyzer', category: 'AI/ML', status: 'Deployed', priority: 'Medium', revenue: 20000, deps: ['LLM API', 'OCR Engine'], description: 'AI document parsing and data extraction' },
  { id: 17, name: 'Competitive Intel Tool', category: 'Analytics', status: 'Deployed', priority: 'Medium', revenue: 16000, deps: ['Web Scraper'], description: 'Automated competitive landscape analysis' },
  { id: 18, name: 'ROI Calculator Suite', category: 'Sales', status: 'Deployed', priority: 'High', revenue: 30000, deps: ['Pricing Engine'], description: 'Multi-scenario ROI calculation tools' },
  { id: 19, name: 'Team Performance Tracker', category: 'HR', status: 'Deployed', priority: 'Medium', revenue: 14000, deps: ['HR System'], description: 'Employee performance metrics and reviews' },
  { id: 20, name: 'Workflow Automator', category: 'Operations', status: 'In Progress', priority: 'High', revenue: 40000, deps: ['Integration Hub'], description: 'No-code workflow automation builder' },
  { id: 21, name: 'Predictive Analytics Engine', category: 'AI/ML', status: 'In Progress', priority: 'High', revenue: 55000, deps: ['ML Pipeline', 'Data Warehouse'], description: 'Revenue and churn prediction models' },
  { id: 22, name: 'Video Content Repurposer', category: 'Marketing', status: 'In Progress', priority: 'Medium', revenue: 18000, deps: ['Media API', 'LLM API'], description: 'Auto-repurpose long-form video into clips' },
  { id: 23, name: 'Contract Analyzer', category: 'Finance', status: 'In Progress', priority: 'High', revenue: 35000, deps: ['LLM API', 'Doc Generator'], description: 'AI contract review and risk assessment' },
  { id: 24, name: 'Customer Health Score', category: 'Analytics', status: 'In Progress', priority: 'High', revenue: 42000, deps: ['CRM Integration', 'ML Pipeline'], description: 'Predictive customer health monitoring' },
  { id: 25, name: 'Talent Acquisition Bot', category: 'HR', status: 'In Progress', priority: 'Medium', revenue: 22000, deps: ['LLM API', 'HR System'], description: 'AI-powered candidate screening and outreach' },
  { id: 26, name: 'Pricing Optimizer', category: 'Sales', status: 'In Progress', priority: 'High', revenue: 50000, deps: ['Pricing Engine', 'ML Pipeline'], description: 'Dynamic pricing optimization using ML' },
  { id: 27, name: 'Compliance Monitor', category: 'Operations', status: 'In Progress', priority: 'Medium', revenue: 25000, deps: ['Doc Generator', 'LLM API'], description: 'Automated regulatory compliance tracking' },
  { id: 28, name: 'Data Lake Connector', category: 'Analytics', status: 'Planned', priority: 'High', revenue: 30000, deps: ['Data Warehouse', 'Integration Hub'], description: 'Universal data source integration layer' },
  { id: 29, name: 'AI Training Platform', category: 'AI/ML', status: 'Planned', priority: 'Medium', revenue: 45000, deps: ['LLM API', 'ML Pipeline'], description: 'Custom model fine-tuning platform' },
  { id: 30, name: 'Revenue Forecaster', category: 'Finance', status: 'Planned', priority: 'High', revenue: 38000, deps: ['ML Pipeline', 'Data Warehouse'], description: 'AI-powered revenue forecasting tool' },
  { id: 31, name: 'Partner Portal', category: 'Sales', status: 'Planned', priority: 'Medium', revenue: 28000, deps: ['CRM Integration', 'Payment Gateway'], description: 'White-label partner management portal' },
  { id: 32, name: 'Knowledge Base Builder', category: 'Operations', status: 'Planned', priority: 'Medium', revenue: 20000, deps: ['LLM API', 'Doc Generator'], description: 'AI-powered knowledge base creation' },
  { id: 33, name: 'Sentiment Dashboard', category: 'Marketing', status: 'Planned', priority: 'Low', revenue: 15000, deps: ['Social API', 'ML Pipeline'], description: 'Real-time customer sentiment analysis' },
];

const depNodes = [
  'CRM Integration', 'Email Engine', 'Payment Gateway', 'Social API', 'Data Warehouse',
  'Doc Generator', 'Pricing Engine', 'Calendar API', 'ML Pipeline', 'LLM API',
  'OCR Engine', 'Web Scraper', 'HR System', 'Integration Hub', 'Media API', 'Scoring Engine',
];

export default function FactoryToolBuilder() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeStatus, setActiveStatus] = useState('All');

  const filtered = tools.filter((tool) => {
    const matchSearch = tool.name.toLowerCase().includes(search.toLowerCase()) ||
      tool.description.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === 'All' || tool.category === activeCategory;
    const matchStatus = activeStatus === 'All' || tool.status === activeStatus;
    return matchSearch && matchCategory && matchStatus;
  });

  const deployed = tools.filter((t) => t.status === 'Deployed').length;
  const inProgress = tools.filter((t) => t.status === 'In Progress').length;
  const planned = tools.filter((t) => t.status === 'Planned').length;
  const totalRevenue = tools.reduce((sum, t) => sum + t.revenue, 0);

  const statusBadge = {
    Deployed: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'In Progress': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    Planned: 'bg-slate-600/20 text-slate-400 border-slate-600/30',
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
    Finance: '#22d3ee',
    HR: '#a78bfa',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Wrench className="w-8 h-8 text-amber-400" />
          Factory Tool Builder
        </h1>
        <p className="text-slate-400 mt-1">33 tools powering the Empire ecosystem</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Tools', value: '33', icon: Box, color: 'amber' },
          { label: 'Deployed', value: String(deployed), icon: CheckCircle2, color: 'emerald' },
          { label: 'In Progress', value: String(inProgress), icon: Clock, color: 'amber' },
          { label: 'Total Revenue Impact', value: `$${(totalRevenue / 1000).toFixed(0)}K`, icon: DollarSign, color: 'indigo' },
        ].map((stat) => {
          const Icon = stat.icon;
          const colorMap = {
            amber: 'text-amber-400 border-amber-500/20',
            emerald: 'text-emerald-400 border-emerald-500/20',
            indigo: 'text-indigo-400 border-indigo-500/20',
          };
          return (
            <div key={stat.label} className={`bg-slate-800/50 border rounded-xl p-4 backdrop-blur-sm ${colorMap[stat.color]}`}>
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
        {filtered.map((tool) => (
          <div key={tool.id} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 backdrop-blur-sm hover:border-amber-500/30 transition-all group">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: (categoryColors[tool.category] || '#6366f1') + '20' }}>
                  <Wrench className="w-4 h-4" style={{ color: categoryColors[tool.category] || '#6366f1' }} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors">{tool.name}</h3>
                  <span className="text-xs text-slate-500">#{tool.id}</span>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${priorityBadge[tool.priority]}`}>
                {tool.priority}
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-3 line-clamp-2">{tool.description}</p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              <span className="px-2 py-0.5 rounded text-xs font-medium" style={{ backgroundColor: (categoryColors[tool.category] || '#6366f1') + '20', color: categoryColors[tool.category] || '#6366f1' }}>
                {tool.category}
              </span>
              <span className={`px-2 py-0.5 rounded text-xs font-medium border ${statusBadge[tool.status]}`}>
                {tool.status}
              </span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-slate-700/30">
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <GitBranch className="w-3 h-3" />
                {tool.deps.length} deps
              </div>
              <div className="flex items-center gap-1 text-sm font-bold text-amber-400">
                <DollarSign className="w-3 h-3" />
                {(tool.revenue / 1000).toFixed(0)}K/yr
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No tools match your filters</p>
        </div>
      )}

      {/* Dependency Chain Visualization */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-amber-400" />
          Dependency Map
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {depNodes.map((dep) => {
            const dependentCount = tools.filter((t) => t.deps.includes(dep)).length;
            return (
              <div key={dep} className="bg-slate-900/50 border border-slate-700/30 rounded-lg p-3 text-center hover:border-indigo-500/30 transition-colors">
                <div className="text-xs font-medium text-white mb-1">{dep}</div>
                <div className="text-lg font-bold text-indigo-400">{dependentCount}</div>
                <div className="text-[10px] text-slate-500">tools depend</div>
              </div>
            );
          })}
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
                <span className="text-sm font-bold text-white w-16 text-right">${(rev / 1000).toFixed(0)}K</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
