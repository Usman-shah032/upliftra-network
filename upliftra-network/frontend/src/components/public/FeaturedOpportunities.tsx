import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OpportunityCategory, Opportunity } from '../../types';
import { VerificationBadge } from '../common/VerificationBadge';
import {
  Briefcase,
  GraduationCap,
  Award,
  BookOpen,
  MapPin,
  Clock,
  ExternalLink,
  Bookmark,
  Share2,
  CheckCircle,
  Building2,
  DollarSign
} from 'lucide-react';

export const FeaturedOpportunities: React.FC = () => {
  const { opportunities, savedOpportunityIds, toggleSaveOpportunity, setActiveView } = useApp();

  const [activeTab, setActiveTab] = useState<OpportunityCategory | 'all'>('all');

  const tabs = [
    { id: 'all', label: 'All Opportunities' },
    { id: 'job', label: 'Jobs' },
    { id: 'internship', label: 'Internships' },
    { id: 'scholarship', label: 'Scholarships' },
    { id: 'fellowship', label: 'Fellowships' },
    { id: 'training', label: 'Training' }
  ];

  const filteredOpps = opportunities
    .filter((opp) => (activeTab === 'all' ? true : opp.category === activeTab))
    .slice(0, 6);

  return (
    <section className="py-20 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-3">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Verified & Authenticated</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Featured Opportunities in Pakistan & Abroad
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Hand-verified positions from premier companies, international foundations, and top universities.
            </p>
          </div>

          <button
            id="btn-view-all-opps"
            onClick={() => setActiveView('opportunities')}
            className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs rounded-lg transition shadow-xs self-start md:self-auto"
          >
            View All ({opportunities.length}) →
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 border-b border-slate-200 dark:border-slate-800 scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              id={`tab-opp-${tab.id}`}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpps.map((opp) => {
            const isSaved = savedOpportunityIds.includes(opp.id);

            return (
              <div
                key={opp.id}
                id={`card-opp-${opp.id}`}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-blue-300 dark:hover:border-slate-700 transition flex flex-col justify-between"
              >
                <div>
                  {/* Top row: Organization logo + Category badge + Bookmark */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      {opp.organizationLogo ? (
                        <img
                          src={opp.organizationLogo}
                          alt={opp.organization}
                          className="w-11 h-11 rounded-xl object-cover border border-slate-100 dark:border-slate-800"
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 font-bold">
                          {opp.organization.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate max-w-[150px]">
                          {opp.organization}
                        </h4>
                        <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                          {opp.category}
                        </span>
                      </div>
                    </div>

                    <button
                      id={`btn-save-${opp.id}`}
                      onClick={() => toggleSaveOpportunity(opp.id)}
                      className={`p-2 rounded-lg transition ${
                        isSaved
                          ? 'text-blue-600 bg-blue-50 dark:bg-blue-950/60'
                          : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                      title={isSaved ? 'Saved' : 'Save Opportunity'}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Title & Verification */}
                  <div className="space-y-1.5 mb-3">
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white line-clamp-2 hover:text-blue-600 transition cursor-pointer" onClick={() => setActiveView('opportunities')}>
                      {opp.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <VerificationBadge size="sm" />
                      {opp.isRemote && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                          Remote / Hybrid
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                    {opp.description}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {opp.requiredSkills.slice(0, 3).map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom details & CTA */}
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
                    <div className="text-xs font-semibold text-slate-900 dark:text-slate-200 flex items-center gap-1">
                      <span className="text-emerald-600 dark:text-emerald-400">💵</span>
                      <span className="truncate">{opp.salaryOrStipend}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      id={`btn-apply-opp-${opp.id}`}
                      onClick={() => setActiveView('opportunities')}
                      className="flex-1 py-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs rounded-lg transition text-center shadow-xs"
                    >
                      View & Apply
                    </button>
                    <a
                      href={opp.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-700 transition"
                      title="Official Source"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
