import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StartupItem, StartupOpenRole } from '../../types';
import {
  Rocket,
  Plus,
  ExternalLink,
  Users,
  Building,
  DollarSign,
  MapPin,
  CheckCircle,
  Briefcase,
  X,
  Search,
  Check,
  Send,
  Sparkles,
  Share2,
  Filter,
  Flame,
  Award,
  Globe,
  MessageSquare
} from 'lucide-react';

export const StartupsHub: React.FC = () => {
  const { startups, addStartup, applyToStartupRole, sendMessage, currentUser, setActiveView } = useApp();
  const [selectedStartup, setSelectedStartup] = useState<StartupItem | null>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [onlyHiring, setOnlyHiring] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Application Modal state
  const [selectedRoleToApply, setSelectedRoleToApply] = useState<{ startup: StartupItem; role: StartupOpenRole } | null>(null);
  const [applyNote, setApplyNote] = useState('');
  const [applySuccess, setApplySuccess] = useState(false);

  // Message Founder state
  const [messageFounderModal, setMessageFounderModal] = useState<StartupItem | null>(null);
  const [messageContent, setMessageContent] = useState('');
  const [messageSuccess, setMessageSuccess] = useState(false);

  // New Startup Form
  const [newName, setNewName] = useState('');
  const [newTagline, setNewTagline] = useState('');
  const [newProblem, setNewProblem] = useState('');
  const [newSolution, setNewSolution] = useState('');
  const [newIndustry, setNewIndustry] = useState('FinTech & Embedded Banking');
  const [newStage, setNewStage] = useState<'Idea' | 'MVP' | 'Early Traction' | 'Seed' | 'Series A'>('MVP');
  const [newLocation, setNewLocation] = useState('Lahore, Pakistan');
  const [newWebsite, setNewWebsite] = useState('https://');
  const [newIncubator, setNewIncubator] = useState('NIC Islamabad / LUMS LCE');
  const [newFunding, setNewFunding] = useState('Bootstrapped / Pre-Seed');
  const [newIsHiring, setNewIsHiring] = useState(true);
  const [newOpenRoleTitle, setNewOpenRoleTitle] = useState('');
  const [newOpenRoleSkills, setNewOpenRoleSkills] = useState('');

  const industries = [
    'all',
    'AgriTech & Supply Chain',
    'HealthTech & AI',
    'FinTech & Embedded Banking',
    'EdTech & Generative AI',
    'CleanTech & Renewable Energy'
  ];

  const stages = ['all', 'Idea', 'MVP', 'Early Traction', 'Seed', 'Series A'];

  const filtered = startups.filter((s) => {
    const matchesIndustry =
      selectedIndustry === 'all' ||
      s.industry.toLowerCase().includes(selectedIndustry.toLowerCase());
    const matchesStage =
      selectedStage === 'all' ||
      s.stage.toLowerCase() === selectedStage.toLowerCase();
    const matchesHiring = !onlyHiring || (s.isHiring && (s.openRolesCount || 0) > 0);
    const matchesSearch =
      searchQuery.trim() === '' ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.problem && s.problem.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (s.solution && s.solution.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (s.requiredSkills && s.requiredSkills.some((sk) => sk.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesIndustry && matchesStage && matchesHiring && matchesSearch;
  });

  const handleRegisterStartup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newTagline || !newProblem) return;

    const openRoles: StartupOpenRole[] = [];
    if (newIsHiring && newOpenRoleTitle.trim()) {
      openRoles.push({
        id: `role_${Date.now()}`,
        title: newOpenRoleTitle.trim(),
        type: 'Full-time',
        location: newLocation,
        compensation: 'Competitive PKR + Equity Options',
        description: 'Lead engineering and architecture for high-growth Pakistani product features.',
        skills: newOpenRoleSkills
          ? newOpenRoleSkills.split(',').map((s) => s.trim())
          : ['React', 'TypeScript', 'Node.js']
      });
    }

    addStartup({
      name: newName,
      logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150&auto=format&fit=crop&q=80',
      tagline: newTagline,
      problem: newProblem,
      solution: newSolution || newTagline,
      description: `${newProblem} ${newSolution}`,
      industry: newIndustry,
      stage: newStage,
      founderName: currentUser?.name || 'Founding Innovator',
      founders: [
        {
          name: currentUser?.name || 'Founding Innovator',
          role: 'Founder & CEO'
        }
      ],
      coFounders: [currentUser?.name ? `${currentUser.name} (Founder)` : 'Innovator'],
      website: newWebsite.startsWith('http') ? newWebsite : `https://${newWebsite}`,
      location: newLocation,
      incubationPartner: newIncubator,
      fundingStatus: newFunding,
      isHiring: newIsHiring,
      openRolesCount: openRoles.length,
      openRoles: openRoles,
      requiredSkills: newOpenRoleSkills ? newOpenRoleSkills.split(',').map((s) => s.trim()) : ['Product', 'Engineering']
    });

    setIsRegisterModalOpen(false);
    // Reset form
    setNewName('');
    setNewTagline('');
    setNewProblem('');
    setNewSolution('');
    setNewOpenRoleTitle('');
    setNewOpenRoleSkills('');
  };

  const handleApplyToRoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoleToApply) return;
    applyToStartupRole(
      selectedRoleToApply.startup.id,
      selectedRoleToApply.role.id,
      selectedRoleToApply.role.title,
      applyNote
    );
    setApplySuccess(true);
    setTimeout(() => {
      setApplySuccess(false);
      setSelectedRoleToApply(null);
      setApplyNote('');
    }, 1800);
  };

  const handleSendMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageFounderModal || !messageContent.trim()) return;
    sendMessage(
      messageFounderModal.id,
      `[Startup Inquiry: ${messageFounderModal.name}] ${messageContent}`
    );
    setMessageSuccess(true);
    setTimeout(() => {
      setMessageSuccess(false);
      setMessageFounderModal(null);
      setMessageContent('');
    }, 1800);
  };

  return (
    <div className="py-8 sm:py-10 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-amber-950/80 to-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-semibold">
                <Rocket className="w-3.5 h-3.5" />
                <span>Pakistani Innovators & Venture Builders</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Pakistan Startup Ecosystem
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Explore pioneering Pakistani ventures, connect with visionary technical co-founders, discover early-stage career openings with equity, and collaborate on high-impact problem spaces.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                id="btn-register-startup-trigger"
                onClick={() => setIsRegisterModalOpen(true)}
                className="w-full sm:w-auto px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs rounded-2xl transition shadow-lg flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                <Plus className="w-4 h-4" />
                <span>Showcase Your Startup</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Highlights / Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Showcased Startups</div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {startups.length}
            </div>
            <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">
              NIC & LCE Seeded
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Active Open Roles</div>
            <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
              {startups.reduce((acc, s) => acc + (s.openRolesCount || 0), 0)}
            </div>
            <span className="text-[10px] text-slate-400">Engineering & Product</span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Co-Founder Matching</div>
            <div className="text-xl sm:text-2xl font-black text-blue-600 dark:text-cyan-400">
              Active
            </div>
            <span className="text-[10px] text-slate-400">Tech & Business Equity</span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Verified Ecosystem</div>
            <div className="text-xl sm:text-2xl font-black text-purple-600 dark:text-purple-400">
              100%
            </div>
            <span className="text-[10px] text-slate-400">Vetted Founders</span>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                id="search-startups-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search startups, problems, skills, founders..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Stage Filters & Hiring Toggle */}
            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              <button
                onClick={() => setOnlyHiring(!onlyHiring)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
                  onlyHiring
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Hiring Roles Only</span>
              </button>

              <select
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
                className="px-3 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 focus:outline-hidden"
              >
                <option value="all">All Stages</option>
                <option value="Idea">Idea Stage</option>
                <option value="MVP">MVP Stage</option>
                <option value="Early Traction">Early Traction</option>
                <option value="Seed">Seed Stage</option>
                <option value="Series A">Series A</option>
              </select>
            </div>
          </div>

          {/* Industry Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => setSelectedIndustry(ind)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  selectedIndustry === ind
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {ind === 'all' ? 'All Sectors' : ind}
              </button>
            ))}
          </div>
        </div>

        {/* Startups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((startup) => {
            const foundersList = startup.founders
              ? Array.isArray(startup.founders)
                ? startup.founders.map((f: any) => (typeof f === 'string' ? f : f.name)).join(', ')
                : startup.coFounders?.join(', ') || startup.founderName
              : startup.founderName || 'Founding Innovators';

            return (
              <div
                key={startup.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Row: Logo, Stage & Hiring Pill */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={startup.logo}
                        alt={startup.name}
                        className="w-14 h-14 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shadow-xs"
                      />
                      <div>
                        <h3
                          onClick={() => setSelectedStartup(startup)}
                          className="font-bold text-base text-slate-900 dark:text-white line-clamp-1 hover:text-amber-600 transition cursor-pointer"
                        >
                          {startup.name}
                        </h3>
                        <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                          <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                            {startup.stage}
                          </span>
                          <span className="text-slate-300 dark:text-slate-700">•</span>
                          <span className="text-[11px] text-slate-500 truncate max-w-[140px]">
                            {startup.industry}
                          </span>
                        </div>
                      </div>
                    </div>

                    {startup.isHiring && (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold shrink-0">
                        Hiring ({startup.openRolesCount || 1})
                      </span>
                    )}
                  </div>

                  <h4 className="font-semibold text-xs text-slate-800 dark:text-slate-200 mb-2.5 line-clamp-2">
                    {startup.tagline}
                  </h4>

                  {/* Problem & Solution Snippet */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1.5 mb-4 text-xs">
                    <div className="text-slate-600 dark:text-slate-400 line-clamp-2">
                      <strong className="text-slate-900 dark:text-white">Problem: </strong>
                      {startup.problem || startup.description}
                    </div>
                  </div>

                  {/* Skills Needed Chips */}
                  {startup.requiredSkills && startup.requiredSkills.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {startup.requiredSkills.slice(0, 3).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40 text-[10px] font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                      {startup.requiredSkills.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px]">
                          +{startup.requiredSkills.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Metadata rows */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-xs text-slate-500">
                    <div className="flex items-center justify-between">
                      <span>Founders:</span>
                      <strong className="text-slate-800 dark:text-slate-200 truncate max-w-[170px]">
                        {foundersList}
                      </strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Location:</span>
                      <span className="truncate max-w-[170px]">{startup.location}</span>
                    </div>
                    {startup.fundingStatus && (
                      <div className="flex items-center justify-between">
                        <span>Funding:</span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400 truncate max-w-[170px]">
                          {startup.fundingStatus}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedStartup(startup)}
                    className="flex-1 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition text-center"
                  >
                    View Teardown & Openings
                  </button>

                  <a
                    href={startup.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-blue-600 hover:border-blue-300 transition"
                    title="Visit Startup Website"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 space-y-3">
            <Rocket className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              No startups found matching your filter criteria
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Try adjusting your search terms, clearing industry filters, or toggle off the hiring-only switch.
            </p>
            <button
              onClick={() => {
                setSelectedIndustry('all');
                setSelectedStage('all');
                setOnlyHiring(false);
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 text-white hover:bg-amber-700 transition"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Startup Details & Open Roles Modal */}
      {selectedStartup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div
            id="startup-detail-modal"
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 sm:p-6 bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3 sm:gap-4">
                <img
                  src={selectedStartup.logo}
                  alt={selectedStartup.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-white/20 shadow-md"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg sm:text-xl text-white">
                      {selectedStartup.name}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/30 text-amber-300 border border-amber-400/30 text-[10px] font-bold">
                      {selectedStartup.stage}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-1">
                    {selectedStartup.tagline}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedStartup(null)}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
              {/* Problem vs. Solution Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-red-50/50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/40 space-y-2">
                  <span className="text-[11px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wider block">
                    The Problem in Pakistan
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {selectedStartup.problem || selectedStartup.description}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 space-y-2">
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                    Proposed Solution
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {selectedStartup.solution || selectedStartup.tagline}
                  </p>
                </div>
              </div>

              {/* Startup Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Location</span>
                  <strong className="text-slate-800 dark:text-slate-200">{selectedStartup.location}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Incubator / Hub</span>
                  <strong className="text-slate-800 dark:text-slate-200">
                    {selectedStartup.incubationPartner || 'National Incubation Center'}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Funding Round</span>
                  <strong className="text-emerald-600 dark:text-emerald-400">
                    {selectedStartup.fundingStatus || 'Bootstrapped'}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Team Size</span>
                  <strong className="text-slate-800 dark:text-slate-200">
                    {selectedStartup.teamSize || 5} Members
                  </strong>
                </div>
              </div>

              {/* Founders Section */}
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-600" />
                  <span>Founders & Leadership</span>
                </h4>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 space-y-2">
                  {selectedStartup.founders && Array.isArray(selectedStartup.founders) ? (
                    selectedStartup.founders.map((f: any, idx: number) => {
                      const name = typeof f === 'string' ? f : f.name;
                      const role = typeof f === 'object' && f.role ? f.role : 'Founder';
                      return (
                        <div key={idx} className="flex items-center justify-between text-xs py-1">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-amber-500" />
                            <strong className="text-slate-900 dark:text-white">{name}</strong>
                          </div>
                          <span className="text-slate-500">{role}</span>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-xs text-slate-700 dark:text-slate-300">
                      {selectedStartup.coFounders?.join(', ') || selectedStartup.founderName}
                    </div>
                  )}

                  {selectedStartup.collaborationRequirements && (
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400">
                      <strong>Looking For: </strong> {selectedStartup.collaborationRequirements}
                    </div>
                  )}
                </div>
              </div>

              {/* Open Roles Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-emerald-600" />
                    <span>Active Openings ({selectedStartup.openRoles?.length || (selectedStartup.isHiring ? 1 : 0)})</span>
                  </h4>
                  <span className="text-xs text-slate-500">Apply directly to founders</span>
                </div>

                {selectedStartup.openRoles && selectedStartup.openRoles.length > 0 ? (
                  <div className="space-y-3">
                    {selectedStartup.openRoles.map((role) => (
                      <div
                        key={role.id}
                        className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                              {role.title}
                            </h5>
                            <div className="flex items-center gap-2 text-xs text-slate-500 pt-0.5">
                              <span className="font-semibold text-blue-600 dark:text-cyan-400">
                                {role.type}
                              </span>
                              <span>•</span>
                              <span>{role.location}</span>
                              <span>•</span>
                              <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                                {role.compensation}
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() =>
                              setSelectedRoleToApply({
                                startup: selectedStartup,
                                role
                              })
                            }
                            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition"
                          >
                            Apply for Role
                          </button>
                        </div>

                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          {role.description}
                        </p>

                        <div className="flex flex-wrap gap-1 pt-1">
                          {role.skills.map((sk, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px]"
                            >
                              {sk}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 text-xs text-slate-500 text-center">
                    No immediate full-time roles posted. You can still message the founders directly for exploratory collaborations.
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
              <a
                href={selectedStartup.website}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-1.5"
              >
                <span>Visit {selectedStartup.name}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMessageFounderModal(selectedStartup)}
                  className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Message Founders</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Role Application Modal */}
      {selectedRoleToApply && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold text-blue-600 dark:text-cyan-400 uppercase">
                  {selectedRoleToApply.startup.name}
                </span>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Apply: {selectedRoleToApply.role.title}
                </h3>
              </div>
              <button onClick={() => setSelectedRoleToApply(null)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {applySuccess ? (
              <div className="p-6 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  Application Submitted Successfully!
                </h4>
                <p className="text-xs text-slate-500">
                  The founders have received your profile and note.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApplyToRoleSubmit} className="space-y-4 text-xs sm:text-sm">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1 text-xs">
                  <div>
                    <strong>Applicant:</strong> {currentUser?.name || 'Verified Upliftra Member'}
                  </div>
                  <div>
                    <strong>Target Role:</strong> {selectedRoleToApply.role.title} ({selectedRoleToApply.role.compensation})
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Introduction & Why You’re a Fit *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={applyNote}
                    onChange={(e) => setApplyNote(e.target.value)}
                    placeholder="Briefly highlight your experience, GitHub/Portfolio links, and why you are excited to build with this venture..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedRoleToApply(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Application</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Message Founder Modal */}
      {messageFounderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase">
                  Direct Founder Connect
                </span>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Message {messageFounderModal.name}
                </h3>
              </div>
              <button onClick={() => setMessageFounderModal(null)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {messageSuccess ? (
              <div className="p-6 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  Message Dispatched!
                </h4>
                <p className="text-xs text-slate-500">
                  Your message has been delivered to the startup founder portal.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendMessageSubmit} className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Your Message / Collaboration Proposal *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    placeholder="Describe your collaboration idea, co-founder inquiry, or investment inquiry..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setMessageFounderModal(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white transition flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Register / Showcase Startup Modal */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div>
                <h3 className="font-bold text-base sm:text-lg text-white">
                  Showcase Your Startup on Upliftra
                </h3>
                <p className="text-xs text-slate-300">
                  Connect with technical talent, co-founders, and Pakistani incubation partners.
                </p>
              </div>
              <button onClick={() => setIsRegisterModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400 hover:text-white" />
              </button>
            </div>

            <form onSubmit={handleRegisterStartup} className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Venture Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. AgriPak AI, MedQ"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Industry Sector *
                  </label>
                  <select
                    value={newIndustry}
                    onChange={(e) => setNewIndustry(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="FinTech & Embedded Banking">FinTech & Embedded Banking</option>
                    <option value="HealthTech & AI">HealthTech & AI</option>
                    <option value="EdTech & Generative AI">EdTech & Generative AI</option>
                    <option value="AgriTech & Supply Chain">AgriTech & Supply Chain</option>
                    <option value="CleanTech & Renewable Energy">CleanTech & Renewable Energy</option>
                    <option value="E-Commerce & Logistics">E-Commerce & Logistics</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Tagline / One-liner *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Transforming micro-agriculture with localized Urdu computer vision"
                  value={newTagline}
                  onChange={(e) => setNewTagline(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Problem in Pakistan *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="What specific friction or inefficiency are you solving in Pakistan?"
                    value={newProblem}
                    onChange={(e) => setNewProblem(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Proposed Solution *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="How does your technology or business model solve it?"
                    value={newSolution}
                    onChange={(e) => setNewSolution(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Venture Stage
                  </label>
                  <select
                    value={newStage}
                    onChange={(e) => setNewStage(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="Idea">Idea Stage</option>
                    <option value="MVP">MVP Stage</option>
                    <option value="Early Traction">Early Traction</option>
                    <option value="Seed">Seed Stage</option>
                    <option value="Series A">Series A</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    City / Location
                  </label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="e.g. Lahore / Islamabad"
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Website / Deck
                  </label>
                  <input
                    type="text"
                    value={newWebsite}
                    onChange={(e) => setNewWebsite(e.target.value)}
                    placeholder="https://..."
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Hiring Toggle & Open Role */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white text-xs">
                    Are you currently recruiting talent or co-founders?
                  </span>
                  <input
                    type="checkbox"
                    checked={newIsHiring}
                    onChange={(e) => setNewIsHiring(e.target.checked)}
                    className="w-4 h-4 text-amber-600 rounded-sm"
                  />
                </div>

                {newIsHiring && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1 text-xs">
                        Open Position Title
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Founding Full-Stack Engineer"
                        value={newOpenRoleTitle}
                        onChange={(e) => setNewOpenRoleTitle(e.target.value)}
                        className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1 text-xs">
                        Required Skills (Comma separated)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. React, TypeScript, FastAPI"
                        value={newOpenRoleSkills}
                        onChange={(e) => setNewOpenRoleSkills(e.target.value)}
                        className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsRegisterModalOpen(false)}
                  className="px-4 py-2 text-slate-600 dark:text-slate-400 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-md transition"
                >
                  Publish Startup Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
