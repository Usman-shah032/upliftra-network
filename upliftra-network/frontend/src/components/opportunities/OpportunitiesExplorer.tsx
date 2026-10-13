import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Opportunity, OpportunityCategory } from '../../types';
import { VerificationBadge } from '../common/VerificationBadge';
import {
  Search,
  Filter,
  Briefcase,
  GraduationCap,
  MapPin,
  Clock,
  Bookmark,
  ExternalLink,
  Plus,
  Share2,
  CheckCircle,
  Building2,
  DollarSign,
  X,
  Send,
  UploadCloud,
  FileText,
  Check,
  User,
  Mail,
  Phone
} from 'lucide-react';

interface OpportunitiesExplorerProps {
  onOpenAuth: (mode?: 'login' | 'register') => void;
}

export const OpportunitiesExplorer: React.FC<OpportunitiesExplorerProps> = ({ onOpenAuth }) => {
  const {
    opportunities,
    savedOpportunityIds,
    toggleSaveOpportunity,
    addOpportunity,
    currentUser,
    isAuthenticated,
    searchQuery,
    setSearchQuery
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [appliedSuccessId, setAppliedSuccessId] = useState<string | null>(null);

  // New Opportunity Form State
  const [newTitle, setNewTitle] = useState('');
  const [newOrg, setNewOrg] = useState(currentUser?.companyName || currentUser?.universityName || currentUser?.name || 'My Organization');
  const [newCat, setNewCat] = useState<OpportunityCategory>('job');
  const [newLocation, setNewLocation] = useState('Islamabad, Pakistan');
  const [newCity, setNewCity] = useState('Islamabad');
  const [newType, setNewType] = useState<'full_time' | 'part_time' | 'internship' | 'contract'>('full_time');
  const [newSalary, setNewSalary] = useState('PKR 120,000 - 180,000 / month');
  const [newDeadline, setNewDeadline] = useState('2026-05-30');
  const [newDesc, setNewDesc] = useState('');
  const [newSkills, setNewSkills] = useState('React, TypeScript, Node.js');
  const [newApplyUrl, setNewApplyUrl] = useState('https://careers.upliftra.pk');

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'job', label: 'Tech & Corporate Jobs' },
    { id: 'internship', label: 'Internships' },
    { id: 'scholarship', label: 'Scholarships (Fulbright/Global)' },
    { id: 'fellowship', label: 'Fellowships' },
    { id: 'training', label: 'Bootcamps & Training' },
    { id: 'volunteering', label: 'Volunteering' }
  ];

  const cities = ['all', 'Islamabad', 'Lahore', 'Karachi', 'Peshawar', 'Quetta', 'Faisalabad', 'Rawalpindi', 'Multan', 'Remote', 'Global'];
  const employmentTypes = ['all', 'full_time', 'internship', 'contract', 'part_time'];

  const filtered = opportunities.filter((opp) => {
    const matchesSearch =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.requiredSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      opp.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat = selectedCategory === 'all' || opp.category === selectedCategory;
    const matchesCity =
      selectedCity === 'all' ||
      (opp.city && opp.city.toLowerCase() === selectedCity.toLowerCase()) ||
      (selectedCity === 'Remote' && opp.isRemote) ||
      opp.location.toLowerCase().includes(selectedCity.toLowerCase());

    const matchesType = selectedType === 'all' || opp.type === selectedType;

    return matchesSearch && matchesCat && matchesCity && matchesType;
  });

  const handlePostOpportunity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newOrg || !newDesc) return;

    addOpportunity({
      title: newTitle,
      organization: newOrg,
      organizationLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80',
      category: newCat,
      type: newType,
      location: newLocation,
      city: newCity,
      isRemote: newLocation.toLowerCase().includes('remote'),
      deadline: newDeadline,
      salaryOrStipend: newSalary,
      description: newDesc,
      requirements: ['Relevant Degree in Computing/Engineering', 'Strong problem solving skills', 'Team collaboration experience'],
      responsibilities: ['Execute high quality deliverables', 'Collaborate with cross-functional team'],
      requiredSkills: newSkills.split(',').map((s) => s.trim()),
      applyUrl: newApplyUrl,
      postedByUserId: currentUser?.id || 'guest_user',
      postedByRole: currentUser?.role || 'student'
    });

    setIsPostModalOpen(false);
    setNewTitle('');
    setNewDesc('');
  };

  // Application Modal state
  const [selectedOpportunityToApply, setSelectedOpportunityToApply] = useState<Opportunity | null>(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('+92 300 1234567');
  const [applicantPortfolio, setApplicantPortfolio] = useState('');
  const [applicantCoverNote, setApplicantCoverNote] = useState('');
  const [applicantResumeFileName, setApplicantResumeFileName] = useState('');
  const [isApplicationSubmitted, setIsApplicationSubmitted] = useState(false);

  const handleOpenApplyModal = (opp: Opportunity) => {
    if (!isAuthenticated) {
      onOpenAuth('login');
      return;
    }
    setApplicantName(currentUser?.name || 'Applicant');
    setApplicantEmail(currentUser?.email || 'applicant@upliftra.pk');
    setApplicantPhone('+92 300 1234567');
    setApplicantPortfolio(currentUser?.website || 'https://github.com/portfolio');
    setApplicantResumeFileName(currentUser?.name ? `${currentUser.name.replace(/\s+/g, '_')}_CV.pdf` : 'CV_Verified.pdf');
    setSelectedOpportunityToApply(opp);
    setIsApplicationSubmitted(false);
    if (selectedOpportunity) setSelectedOpportunity(null);
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOpportunityToApply) return;
    
    // Increment applicant count on the opportunity locally
    selectedOpportunityToApply.applicantCount = (selectedOpportunityToApply.applicantCount || 0) + 1;
    setAppliedSuccessId(selectedOpportunityToApply.id);
    setIsApplicationSubmitted(true);

    setTimeout(() => {
      setSelectedOpportunityToApply(null);
      setIsApplicationSubmitted(false);
    }, 2000);
  };


  return (
    <div className="py-10 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Title & Post CTA */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Opportunities Hub
              </h1>
              <VerificationBadge size="sm" label="100% Verified" />
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Explore verified Jobs, Internships, Scholarships (Fulbright, Chevening, Erasmus), Fellowships, and Training across Pakistan.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="btn-open-post-opportunity"
              onClick={() => {
                if (!isAuthenticated) {
                  onOpenAuth('login');
                } else {
                  setIsPostModalOpen(true);
                }
              }}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition shadow-xs flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Post Opportunity</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                id="input-search-opportunities"
                placeholder="Search by title, company, skill (e.g., Python, React, Systems Ltd, Fulbright, AI)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
              />
            </div>

            {/* City Dropdown */}
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-400" />
              <select
                id="select-filter-city"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="px-3 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Locations (Pakistan & Global)</option>
                {cities.filter((c) => c !== 'all').map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Dropdown */}
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <select
                id="select-filter-type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Employment Types</option>
                <option value="full_time">Full Time</option>
                <option value="internship">Internship</option>
                <option value="contract">Contract</option>
                <option value="part_time">Part Time</option>
              </select>
            </div>
          </div>

          {/* Categories Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 scrollbar-none border-t border-slate-100 dark:border-slate-800">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`btn-filter-cat-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Showing <strong>{filtered.length}</strong> verified opportunities</span>
          {savedOpportunityIds.length > 0 && (
            <span className="text-blue-600 font-medium">
              ★ {savedOpportunityIds.length} Saved Opportunities
            </span>
          )}
        </div>

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((opp) => {
            const isSaved = savedOpportunityIds.includes(opp.id);
            const isApplied = appliedSuccessId === opp.id;

            return (
              <div
                key={opp.id}
                id={`opp-card-${opp.id}`}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-blue-300 dark:hover:border-slate-700 transition flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      {opp.organizationLogo ? (
                        <img
                          src={opp.organizationLogo}
                          alt={opp.organization}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-100 dark:border-slate-800 shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 font-bold text-sm shrink-0">
                          {opp.organization.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate max-w-[170px]">
                          {opp.organization}
                        </h4>
                        <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                          {opp.category}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleSaveOpportunity(opp.id)}
                      className={`p-2 rounded-lg transition ${
                        isSaved
                          ? 'text-blue-600 bg-blue-50 dark:bg-blue-950/60'
                          : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <h3
                    onClick={() => setSelectedOpportunity(opp)}
                    className="font-bold text-base text-slate-900 dark:text-white line-clamp-2 hover:text-blue-600 transition cursor-pointer mb-2"
                  >
                    {opp.title}
                  </h3>

                  <div className="flex items-center gap-2 mb-3">
                    <VerificationBadge size="sm" />
                    {opp.isRemote && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                        Remote / Hybrid
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                    {opp.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {opp.requiredSkills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{opp.city || opp.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-rose-600 dark:text-rose-400 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Due {opp.deadline}</span>
                    </div>
                  </div>

                  {opp.salaryOrStipend && (
                    <div className="text-xs font-semibold text-slate-900 dark:text-slate-200">
                      💵 {opp.salaryOrStipend}
                    </div>
                  )}

                  {isApplied && (
                    <div className="p-2 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs rounded-lg text-center font-bold animate-fadeIn">
                      ✓ Application Submitted to {opp.organization}!
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      id={`btn-view-details-${opp.id}`}
                      onClick={() => setSelectedOpportunity(opp)}
                      className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl transition text-center"
                    >
                      View Details
                    </button>
                    <button
                      id={`btn-quick-apply-${opp.id}`}
                      onClick={() => handleOpenApplyModal(opp)}
                      className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition text-center"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Opportunity Detail Modal */}
      {selectedOpportunity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between bg-slate-50 dark:bg-slate-850">
              <div className="flex items-center gap-3">
                {selectedOpportunity.organizationLogo && (
                  <img
                    src={selectedOpportunity.organizationLogo}
                    alt={selectedOpportunity.organization}
                    className="w-14 h-14 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                  />
                )}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {selectedOpportunity.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                      {selectedOpportunity.organization}
                    </span>
                    <VerificationBadge size="sm" />
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedOpportunity(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 text-sm">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs">
                <div>
                  <span className="text-slate-400 block">Category</span>
                  <strong className="text-slate-900 dark:text-white uppercase font-bold">
                    {selectedOpportunity.category}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Location</span>
                  <strong className="text-slate-900 dark:text-white font-bold">
                    {selectedOpportunity.location}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Compensation</span>
                  <strong className="text-emerald-600 dark:text-emerald-400 font-bold">
                    {selectedOpportunity.salaryOrStipend || 'Competitive'}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Deadline</span>
                  <strong className="text-rose-600 dark:text-rose-400 font-bold">
                    {selectedOpportunity.deadline}
                  </strong>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">Description</h4>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {selectedOpportunity.description}
                </p>
              </div>

              {selectedOpportunity.requirements && selectedOpportunity.requirements.length > 0 && (
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">Requirements & Eligibility</h4>
                  <ul className="space-y-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 list-disc pl-5">
                    {selectedOpportunity.requirements.map((req, rIdx) => (
                      <li key={rIdx}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedOpportunity.responsibilities && selectedOpportunity.responsibilities.length > 0 && (
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">Key Responsibilities</h4>
                  <ul className="space-y-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 list-disc pl-5">
                    {selectedOpportunity.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx}>{resp}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedOpportunity.requiredSkills.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-lg"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center justify-between">
              <button
                onClick={() => toggleSaveOpportunity(selectedOpportunity.id)}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300"
              >
                <Bookmark className="w-4 h-4" />
                <span>
                  {savedOpportunityIds.includes(selectedOpportunity.id) ? 'Saved' : 'Save'}
                </span>
              </button>

              <div className="flex items-center gap-3">
                <a
                  href={selectedOpportunity.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl flex items-center gap-1.5"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => handleOpenApplyModal(selectedOpportunity)}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  Submit Application via Upliftra
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Post Opportunity Modal */}
      {isPostModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Post an Opportunity to Upliftra Network
              </h3>
              <button onClick={() => setIsPostModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handlePostOpportunity} className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Opportunity Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Associate Software Engineer, Summer AI Fellowship"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Organization / Company *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Systems Ltd, HEC Pakistan, TechStart"
                    value={newOrg}
                    onChange={(e) => setNewOrg(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Category
                  </label>
                  <select
                    value={newCat}
                    onChange={(e) => setNewCat(e.target.value as any)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  >
                    <option value="job">Job</option>
                    <option value="internship">Internship</option>
                    <option value="scholarship">Scholarship</option>
                    <option value="fellowship">Fellowship</option>
                    <option value="training">Training / Bootcamp</option>
                    <option value="volunteering">Volunteering</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    City / Region
                  </label>
                  <input
                    type="text"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    placeholder="Islamabad / Remote"
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Application Deadline
                  </label>
                  <input
                    type="date"
                    value={newDeadline}
                    onChange={(e) => setNewDeadline(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Salary / Stipend / Grant
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. PKR 150,000 / month or Fully Funded"
                    value={newSalary}
                    onChange={(e) => setNewSalary(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Required Skills (Comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="React, Python, Machine Learning"
                    value={newSkills}
                    onChange={(e) => setNewSkills(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Description & Requirements *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Provide comprehensive details about the role, qualifications, and selection criteria..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsPostModalOpen(false)}
                  className="px-4 py-2 text-slate-600 dark:text-slate-400 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl"
                >
                  Publish Verified Opportunity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Application Submission Modal */}
      {selectedOpportunityToApply && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white flex items-start justify-between border-b border-slate-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                  Application Submission • {selectedOpportunityToApply.category}
                </span>
                <h3 className="font-bold text-lg text-white mt-0.5">
                  {selectedOpportunityToApply.title}
                </h3>
                <p className="text-xs text-slate-300">
                  {selectedOpportunityToApply.organization} • {selectedOpportunityToApply.location}
                </p>
              </div>
              <button
                onClick={() => setSelectedOpportunityToApply(null)}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isApplicationSubmitted ? (
              <div className="p-8 text-center space-y-3 animate-fadeIn">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-base text-slate-900 dark:text-white">
                  Application Submitted Successfully!
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                  Your application, resume, and profile credentials have been delivered directly to {selectedOpportunityToApply.organization}. You can track status in your dashboard.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitApplication} className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={applicantEmail}
                        onChange={(e) => setApplicantEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type="text"
                        value={applicantPhone}
                        onChange={(e) => setApplicantPhone(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Portfolio / GitHub / LinkedIn
                    </label>
                    <input
                      type="url"
                      value={applicantPortfolio}
                      onChange={(e) => setApplicantPortfolio(e.target.value)}
                      placeholder="https://github.com/..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* CV Upload */}
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Attach Resume / CV (PDF or DOCX) *
                  </label>
                  <div className="p-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl bg-slate-50 dark:bg-slate-800/40 text-center space-y-2">
                    <UploadCloud className="w-7 h-7 text-blue-600 dark:text-cyan-400 mx-auto" />
                    <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {applicantResumeFileName ? (
                        <span className="text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>{applicantResumeFileName} (Attached)</span>
                        </span>
                      ) : (
                        <span>Upload your latest resume</span>
                      )}
                    </div>
                    <label className="inline-block px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 cursor-pointer shadow-xs">
                      Choose File
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setApplicantResumeFileName(file.name);
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Cover Note */}
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Cover Note to Hiring Manager
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Briefly explain your key qualifications, relevant projects, and interest in this role..."
                    value={applicantCoverNote}
                    onChange={(e) => setApplicantCoverNote(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedOpportunityToApply(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-md transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Verified Application</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
