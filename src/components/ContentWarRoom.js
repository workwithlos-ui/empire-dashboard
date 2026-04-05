'use client';

import { useState, useEffect } from 'react';
import {
  FileText, Filter, Calendar, Clock, Tag, Layers, Users, Video,
  Mic, Image, PenTool, CheckCircle2, AlertCircle, Timer, ArrowRight,
  Globe, Mail, Zap, Hash, Play, Share2
} from 'lucide-react';

const platforms = ['All', 'LinkedIn', 'Twitter/X', 'YouTube', 'Podcast', 'Email', 'Blog', 'Instagram'];

const phases = [
  { name: 'Ideation', color: '#6366f1', count: 8 },
  { name: 'Drafting', color: '#f59e0b', count: 6 },
  { name: 'Production', color: '#3b82f6', count: 12 },
  { name: 'Review', color: '#ec4899', count: 5 },
  { name: 'Scheduled', color: '#10b981', count: 15 },
  { name: 'Published', color: '#22d3ee', count: 42 },
];

const pillars = [
  { name: 'AI Implementation', count: 24, color: '#6366f1', pct: 29 },
  { name: 'Revenue Operations', count: 18, color: '#f59e0b', pct: 22 },
  { name: 'QUORUM Promotion', count: 15, color: '#ec4899', pct: 18 },
  { name: 'Empire Building', count: 13, color: '#10b981', pct: 16 },
  { name: 'Tool Showcases', count: 12, color: '#3b82f6', pct: 15 },
];

const platformIcons = {
  LinkedIn: Share2,
  'Twitter/X': Hash,
  YouTube: Play,
  Podcast: Mic,
  Email: Mail,
  Blog: PenTool,
  Instagram: Image,
};

const statusColors = {
  published: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  scheduled: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'in-progress': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  draft: 'bg-slate-600/20 text-slate-400 border-slate-600/30',
  review: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
};

function generateCalendarData() {
  const items = [];
  const titles = [
    'AI Audit Framework Post', 'QUORUM Speaker Reveal', 'Revenue Leak Calculator Demo',
    'Empire Tools Walkthrough', 'PE Firm Case Study', 'AI Readiness Quiz Promo',
    'LinkedIn Carousel: 5 AI Wins', 'YouTube: Factory Tour', 'Podcast: PE + AI Future',
    'Email: Early Bird Reminder', 'Twitter Thread: AI Myths', 'Blog: QUORUM Preview',
    'Instagram Reel: Behind Scenes', 'LinkedIn Article: Revenue Ops', 'YouTube Short: Tool Demo',
    'Email: Speaker Lineup', 'Twitter Space: AI Q&A', 'Blog: Assessment Results',
    'LinkedIn Post: Client Win', 'YouTube: Full Keynote Prep', 'Podcast: Guest Interview',
    'Email: VIP Package Launch', 'Twitter Thread: Empire Update', 'Blog: Factory Roadmap',
    'Instagram Story: Event Prep', 'LinkedIn Carousel: ROI Data', 'YouTube: Calculator Tutorial',
    'Email: Final Week Push', 'Twitter Thread: QUORUM FAQ', 'Blog: AI Transformation Guide',
  ];
  const platformList = ['LinkedIn', 'Twitter/X', 'YouTube', 'Podcast', 'Email', 'Blog', 'Instagram'];
  const statusList = ['published', 'scheduled', 'in-progress', 'draft', 'review'];
  const pillarList = ['AI Implementation', 'Revenue Operations', 'QUORUM Promotion', 'Empire Building', 'Tool Showcases'];
  const typeList = ['Post', 'Video', 'Article', 'Episode', 'Email', 'Reel', 'Thread', 'Carousel'];

  for (let i = 0; i < 30; i++) {
    const day = i + 1;
    items.push({
      id: i,
      day,
      title: titles[i % titles.length],
      platform: platformList[i % platformList.length],
      status: i < 12 ? 'published' : i < 18 ? 'scheduled' : i < 24 ? 'in-progress' : i < 27 ? 'review' : 'draft',
      pillar: pillarList[i % pillarList.length],
      type: typeList[i % typeList.length],
    });
  }
  return items;
}

export default function ContentWarRoom() {
  const [activePlatform, setActivePlatform] = useState('All');
  const [calendarData] = useState(generateCalendarData);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0 });

  useEffect(() => {
    const target = new Date('2026-05-07T09:00:00-04:00');
    const update = () => {
      const now = new Date();
      const diff = target - now;
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredData = activePlatform === 'All'
    ? calendarData
    : calendarData.filter((item) => item.platform === activePlatform);

  const weeks = [];
  for (let i = 0; i < filteredData.length; i += 7) {
    weeks.push(filteredData.slice(i, i + 7));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 md:p-6 space-y-6">
      {/* QUORUM Countdown Banner */}
      <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-xl p-4 flex items-center justify-between backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Timer className="w-5 h-5 text-indigo-400" />
          <span className="text-sm font-medium text-white">QUORUM Launch in {timeLeft.days} days {timeLeft.hours} hours</span>
        </div>
        <span className="text-xs text-indigo-400 font-medium">All content aligned to launch</span>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <FileText className="w-8 h-8 text-amber-400" />
          Content War Room
        </h1>
        <p className="text-slate-400 mt-1">30-day content operations command center</p>
      </div>

      {/* Platform Filters */}
      <div className="flex flex-wrap gap-2">
        {platforms.map((platform) => (
          <button
            key={platform}
            onClick={() => setActivePlatform(platform)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activePlatform === platform
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            {platform}
          </button>
        ))}
      </div>

      {/* Phase Timeline */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-amber-400" />
          Content Pipeline Phases
        </h2>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {phases.map((phase, i) => (
            <div key={phase.name} className="flex items-center gap-2 flex-shrink-0">
              <div className="flex flex-col items-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm border-2"
                  style={{ borderColor: phase.color, backgroundColor: phase.color + '20' }}
                >
                  {phase.count}
                </div>
                <span className="text-xs text-slate-400 mt-1 whitespace-nowrap">{phase.name}</span>
              </div>
              {i < phases.length - 1 && (
                <ArrowRight className="w-4 h-4 text-slate-600 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm text-slate-400">
          <span>Total: <strong className="text-white">88 pieces</strong></span>
          <span className="text-slate-600">|</span>
          <span>This Month: <strong className="text-white">30 scheduled</strong></span>
        </div>
      </div>

      {/* Weekly Calendar Grid */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-amber-400" />
          30-Day Content Calendar
        </h2>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div key={day} className="text-center text-xs text-slate-500 font-medium py-1">{day}</div>
          ))}
        </div>
        {weeks.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7 gap-1 mb-1">
            {week.map((item) => {
              const PlatformIcon = platformIcons[item.platform] || Globe;
              return (
                <div
                  key={item.id}
                  className="bg-slate-900/50 border border-slate-700/30 rounded-lg p-2 min-h-[80px] hover:border-amber-500/30 transition-colors group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-500">Day {item.day}</span>
                    <PlatformIcon className="w-3 h-3 text-slate-500 group-hover:text-amber-400 transition-colors" />
                  </div>
                  <div className="text-xs text-white font-medium leading-tight mb-1 line-clamp-2">{item.title}</div>
                  <div className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium border ${statusColors[item.status]}`}>
                    {item.status}
                  </div>
                </div>
              );
            })}
            {week.length < 7 && Array.from({ length: 7 - week.length }).map((_, i) => (
              <div key={`empty-${i}`} className="bg-slate-900/20 border border-slate-800/30 rounded-lg p-2 min-h-[80px]" />
            ))}
          </div>
        ))}
      </div>

      {/* Content Pillar Distribution */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Tag className="w-5 h-5 text-amber-400" />
          Content Pillar Distribution
        </h2>
        <div className="space-y-4">
          {pillars.map((pillar) => (
            <div key={pillar.name}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-slate-300">{pillar.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">{pillar.count} pieces</span>
                  <span className="text-xs text-slate-500">{pillar.pct}%</span>
                </div>
              </div>
              <div className="w-full bg-slate-700/50 rounded-full h-4">
                <div
                  className="h-4 rounded-full transition-all duration-700 flex items-center justify-end pr-2"
                  style={{ width: `${pillar.pct}%`, backgroundColor: pillar.color + '60' }}
                >
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Pieces', value: '82', icon: FileText, color: 'amber' },
          { label: 'Platforms Active', value: '7', icon: Globe, color: 'indigo' },
          { label: 'Published Rate', value: '51%', icon: CheckCircle2, color: 'emerald' },
          { label: 'Engagement Rate', value: '4.8%', icon: Zap, color: 'blue' },
        ].map((stat) => {
          const Icon = stat.icon;
          const colorMap = {
            amber: 'text-amber-400 border-amber-500/20',
            indigo: 'text-indigo-400 border-indigo-500/20',
            emerald: 'text-emerald-400 border-emerald-500/20',
            blue: 'text-blue-400 border-blue-500/20',
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
    </div>
  );
}
