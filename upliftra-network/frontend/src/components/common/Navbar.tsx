import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import UpliftraLogo from './UpliftraLogo';
import { RoleBadge, ROLE_CONFIG } from './RoleBadge';
import { PortalSwitcherModal } from './PortalSwitcherModal';
import { UserAvatar } from './UserAvatar';
import {
  Search,
  Bell,
  MessageSquare,
  Sparkles,
  Menu,
  X,
  Home,
  Compass,
  GraduationCap,
  Briefcase,
  Users,
  Calendar,
  Layers,
  Rocket,
  ShieldCheck,
  ChevronDown,
  User as UserIcon,
  LogOut,
  LayoutDashboard,
  Settings,
  Bookmark,
  CheckCircle2
} from 'lucide-react';

interface NavbarProps {
  onOpenAuth: (mode?: 'login' | 'register') => void;
  onOpenAICoach: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth, onOpenAICoach }) => {
  const {
    currentUser,
    isAuthenticated,
    logout,
    activeView,
    setActiveView,
    notifications,
    searchQuery,
    setSearchQuery
  } = useApp();

  const [isPortalModalOpen, setIsPortalModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const notifDropdownRef = useRef<HTMLDivElement>(null);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(target)
      ) {
        setIsProfileDropdownOpen(false);
      }
      if (
        notifDropdownRef.current &&
        !notifDropdownRef.current.contains(target)
      ) {
        setIsNotifDropdownOpen(false);
      }
      if (
        moreMenuRef.current &&
        !moreMenuRef.current.contains(target)
      ) {
        setIsMoreMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadNotifCount = notifications.filter((n) => !n.isRead).length;

  const primaryNavLinks = [
    { id: 'home', label: 'Home', icon: <Home className="w-3.5 h-3.5" /> },
    { id: 'opportunities', label: 'Opportunities', icon: <Briefcase className="w-3.5 h-3.5" /> },
    { id: 'mentorship', label: 'Mentorship', icon: <Users className="w-3.5 h-3.5" /> },
    { id: 'learning', label: 'Learning Hub', icon: <GraduationCap className="w-3.5 h-3.5" /> },
    { id: 'startups', label: 'Startups', icon: <Rocket className="w-3.5 h-3.5" /> }
  ];

  const secondaryNavLinks = [
    { id: 'events', label: 'Events & Workshops', icon: <Calendar className="w-4 h-4" /> },
    { id: 'community', label: 'Community Forum', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'about', label: 'About Ecosystem', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'vision', label: 'Vision & Impact', icon: <Compass className="w-4 h-4" /> }
  ];

  const allNavLinks = [
    ...primaryNavLinks,
    ...secondaryNavLinks
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full max-w-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
        {/* Top Announcement Bar */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 text-white text-xs py-1.5 px-4 w-full">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0 overflow-hidden">
              <span className="bg-blue-600/90 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shrink-0">
                Ecosystem
              </span>
              <span className="truncate text-slate-300 text-[11px] sm:text-xs">
                Pakistan’s premier career, mentorship, and opportunity ecosystem for 15+ stakeholder roles.
              </span>
            </div>
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                id="btn-nav-switch-role-pill"
                onClick={() => setIsPortalModalOpen(true)}
                className="hidden sm:flex items-center gap-1.5 text-blue-200 hover:text-white transition font-medium text-[11px]"
              >
                <Layers className="w-3.5 h-3.5 text-blue-400" />
                <span>Switch Portal (15 Roles)</span>
              </button>
              <span className="text-slate-600 hidden sm:inline">|</span>
              <button
                id="btn-open-ai-coach-top"
                onClick={onOpenAICoach}
                className="flex items-center gap-1 text-cyan-300 hover:text-cyan-100 font-semibold transition text-[11px]"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>AI Career Coach</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-16 gap-2">
            {/* Left: Logo and Primary Links */}
            <div className="flex items-center gap-2 lg:gap-4 min-w-0">
              <button
                id="btn-nav-logo-home"
                onClick={() => setActiveView('home')}
                className="flex items-center text-left focus:outline-none shrink-0"
              >
                <UpliftraLogo size="md" />
              </button>

              {/* Desktop Nav Links */}
              <nav className="hidden lg:flex items-center gap-1 min-w-0">
                {primaryNavLinks.map((link) => {
                  const isActive = activeView === link.id;
                  return (
                    <button
                      key={link.id}
                      id={`nav-link-${link.id}`}
                      onClick={() => setActiveView(link.id)}
                      className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 font-bold'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-900'
                      }`}
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </button>
                  );
                })}

                {/* More Dropdown for Desktop */}
                <div className="relative" ref={moreMenuRef}>
                  <button
                    id="btn-nav-more-menu"
                    onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      secondaryNavLinks.some((l) => l.id === activeView)
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-900'
                    }`}
                  >
                    <span>More</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isMoreMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isMoreMenuOpen && (
                    <div className="absolute left-0 mt-2 w-52 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-1.5 z-50 animate-fadeIn">
                      {secondaryNavLinks.map((link) => (
                        <button
                          key={link.id}
                          onClick={() => {
                            setActiveView(link.id);
                            setIsMoreMenuOpen(false);
                          }}
                          className={`w-full px-3.5 py-2 text-left text-xs font-medium flex items-center gap-2.5 transition ${
                            activeView === link.id
                              ? 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400 font-bold'
                              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                          }`}
                        >
                          {link.icon}
                          <span>{link.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </nav>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* 15 Portal Switcher Button */}
              <button
                id="btn-active-portal-badge"
                onClick={() => setIsPortalModalOpen(true)}
                className="hidden lg:flex items-center gap-1 px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:border-blue-300 dark:hover:border-blue-800 transition text-xs"
                title="Click to switch among 15 role portals"
              >
                <span className="text-slate-500 dark:text-slate-400 text-[11px]">Portal:</span>
                <RoleBadge role={currentUser?.role || 'student'} size="sm" />
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* AI Career Coach Trigger Button */}
              <button
                id="btn-nav-ai-coach"
                onClick={onOpenAICoach}
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-semibold shadow-xs hover:shadow transition"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
                <span>AI Coach</span>
              </button>

              {isAuthenticated && currentUser ? (
                <>
                  {/* Notifications */}
                  <div className="relative" ref={notifDropdownRef}>
                    <button
                      id="btn-nav-notifications"
                      onClick={() => setIsNotifDropdownOpen(!isNotifDropdownOpen)}
                      className="p-1.5 sm:p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 relative transition"
                      title="Notifications"
                    >
                      <Bell className="w-4.5 h-4.5" />
                      {unreadNotifCount > 0 && (
                        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white dark:ring-slate-950" />
                      )}
                    </button>

                    {isNotifDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-fadeIn">
                        <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                            Notifications ({unreadNotifCount})
                          </h4>
                          <button
                            onClick={() => {
                              setActiveView('notifications');
                              setIsNotifDropdownOpen(false);
                            }}
                            className="text-xs text-blue-600 hover:underline"
                          >
                            View all
                          </button>
                        </div>
                        <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
                          {notifications.slice(0, 4).map((notif) => (
                            <div
                              key={notif.id}
                              className={`p-3 text-xs hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer ${
                                !notif.isRead ? 'bg-blue-50/40 dark:bg-blue-950/20' : ''
                              }`}
                              onClick={() => {
                                setActiveView('notifications');
                                setIsNotifDropdownOpen(false);
                              }}
                            >
                              <div className="font-semibold text-slate-900 dark:text-slate-100">
                                {notif.title}
                              </div>
                              <p className="text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                                {notif.description}
                              </p>
                              <span className="text-[10px] text-slate-400 mt-1 block">
                                {notif.timestamp}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Direct Messages link */}
                  <button
                    id="btn-nav-messages"
                    onClick={() => setActiveView('messages')}
                    className={`p-1.5 sm:p-2 rounded-lg transition ${
                      activeView === 'messages'
                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                    title="Direct Messages"
                  >
                    <MessageSquare className="w-4.5 h-4.5" />
                  </button>

                  {/* Authenticated User Profile Area & Dropdown */}
                  <div className="relative" ref={profileDropdownRef}>
                    <button
                      id="btn-nav-user-menu"
                      onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                      className="flex items-center gap-1.5 sm:gap-2 p-1 sm:px-2 sm:py-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-900/90 hover:bg-white dark:hover:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-600 transition shadow-2xs group shrink-0"
                      aria-label="User profile menu"
                      aria-expanded={isProfileDropdownOpen}
                    >
                      <UserAvatar
                        name={currentUser.name}
                        avatar={currentUser.avatar}
                        role={currentUser.role}
                        size="sm"
                      />
                      <div className="hidden sm:flex flex-col text-left pr-0.5 max-w-[85px] lg:max-w-[110px]">
                        <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                          {currentUser.name}
                        </span>
                        <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 leading-tight truncate">
                          {ROLE_CONFIG[currentUser.role]?.label || currentUser.role}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-transform duration-200 ${
                          isProfileDropdownOpen ? 'rotate-180 text-blue-600' : ''
                        }`}
                      />
                    </button>

                    {isProfileDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-fadeIn divide-y divide-slate-100 dark:divide-slate-800">
                        {/* User Identity Header */}
                        <div className="px-4 py-3.5 flex items-start gap-3 bg-slate-50/70 dark:bg-slate-950/40">
                          <UserAvatar
                            name={currentUser.name}
                            avatar={currentUser.avatar}
                            role={currentUser.role}
                            size="md"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                                {currentUser.name}
                              </p>
                              {currentUser.isVerified && (
                                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                              )}
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                              {currentUser.email}
                            </p>
                            <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
                              <RoleBadge role={currentUser.role} size="xs" />
                              {currentUser.location && (
                                <span className="text-[10px] text-slate-400 truncate">
                                  • {currentUser.location}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Navigation Links */}
                        <div className="py-1.5">
                          <button
                            id="btn-menu-profile"
                            onClick={() => {
                              setActiveView('profile');
                              setIsProfileDropdownOpen(false);
                            }}
                            className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2.5 transition"
                          >
                            <UserIcon className="w-4 h-4 text-slate-400" />
                            <span>View Profile</span>
                          </button>

                          <button
                            id="btn-menu-dashboard"
                            onClick={() => {
                              setActiveView('dashboard');
                              setIsProfileDropdownOpen(false);
                            }}
                            className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2.5 transition"
                          >
                            <LayoutDashboard className="w-4 h-4 text-blue-600" />
                            <span>My {ROLE_CONFIG[currentUser.role]?.label} Dashboard</span>
                          </button>

                          <button
                            id="btn-menu-opportunities"
                            onClick={() => {
                              setActiveView('opportunities');
                              setIsProfileDropdownOpen(false);
                            }}
                            className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2.5 transition"
                          >
                            <Briefcase className="w-4 h-4 text-emerald-600" />
                            <span>My Opportunities</span>
                          </button>

                          <button
                            id="btn-menu-mentorship"
                            onClick={() => {
                              setActiveView('mentorship');
                              setIsProfileDropdownOpen(false);
                            }}
                            className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2.5 transition"
                          >
                            <Users className="w-4 h-4 text-purple-600" />
                            <span>My Mentorship</span>
                          </button>

                          <button
                            id="btn-menu-switch-portals"
                            onClick={() => {
                              setIsPortalModalOpen(true);
                              setIsProfileDropdownOpen(false);
                            }}
                            className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2.5 transition"
                          >
                            <Layers className="w-4 h-4 text-amber-500" />
                            <span>Switch Role Portal (15)</span>
                          </button>

                          <button
                            id="btn-menu-settings"
                            onClick={() => {
                              setActiveView('profile');
                              setIsProfileDropdownOpen(false);
                            }}
                            className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2.5 transition"
                          >
                            <Settings className="w-4 h-4 text-slate-400" />
                            <span>Settings & Account</span>
                          </button>
                        </div>

                        {/* Sign Out Action */}
                        <div className="py-1.5 bg-rose-50/40 dark:bg-rose-950/20">
                          <button
                            id="btn-menu-logout"
                            onClick={() => {
                              logout();
                              setIsProfileDropdownOpen(false);
                            }}
                            className="w-full px-4 py-2 text-left text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-100/60 dark:hover:bg-rose-950/50 flex items-center gap-2.5 transition"
                          >
                            <LogOut className="w-4 h-4 text-rose-600" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    id="btn-nav-login"
                    onClick={() => setActiveView('login')}
                    className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-700 dark:hover:text-blue-400 transition rounded-lg"
                  >
                    Sign In
                  </button>
                  <button
                    id="btn-nav-join"
                    onClick={() => setActiveView('register')}
                    className="px-4 py-1.5 text-xs font-semibold bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition shadow-xs"
                  >
                    Join Upliftra
                  </button>
                </div>
              )}

              {/* Mobile / Tablet Menu Hamburger */}
              <button
                id="btn-mobile-menu-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile / Tablet Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-3 pb-6 animate-fadeIn space-y-3">
            {/* Authenticated User Header Card on Mobile/Tablet */}
            {isAuthenticated && currentUser ? (
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <UserAvatar
                    name={currentUser.name}
                    avatar={currentUser.avatar}
                    role={currentUser.role}
                    size="md"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {currentUser.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {currentUser.email}
                    </p>
                    <div className="mt-1">
                      <RoleBadge role={currentUser.role} size="xs" />
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setActiveView('profile');
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline shrink-0"
                >
                  Edit Profile
                </button>
              </div>
            ) : null}

            {/* Search on mobile */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search jobs, mentors, scholarships..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setActiveView('opportunities');
                    setIsMobileMenuOpen(false);
                  }
                }}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg"
              />
            </div>

            {/* Nav links grid */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              {allNavLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setActiveView(link.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2.5 rounded-lg text-xs font-medium text-left ${
                    activeView === link.id
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400 font-bold'
                      : 'text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900'
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </button>
              ))}
            </div>

            {/* Quick Actions & Auth Controls */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
              {isAuthenticated && currentUser && (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setActiveView('dashboard');
                      setIsMobileMenuOpen(false);
                    }}
                    className="p-2.5 text-left text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 rounded-lg flex items-center gap-2"
                  >
                    <LayoutDashboard className="w-4 h-4 text-blue-600" />
                    <span>Role Dashboard</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveView('profile');
                      setIsMobileMenuOpen(false);
                    }}
                    className="p-2.5 text-left text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg flex items-center gap-2"
                  >
                    <UserIcon className="w-4 h-4 text-slate-500" />
                    <span>View Profile</span>
                  </button>
                </div>
              )}

              <button
                onClick={() => {
                  setIsPortalModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/70 text-slate-800 dark:text-slate-200 text-xs font-semibold"
              >
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-600" />
                  <span>Switch Role Portal (15 Portals)</span>
                </div>
                <span>→</span>
              </button>

              <button
                onClick={() => {
                  onOpenAICoach();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 p-2.5 rounded-lg bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white text-xs font-semibold shadow-xs"
              >
                <Sparkles className="w-4 h-4 text-cyan-200" />
                <span>Open Upliftra AI Career Advisor</span>
              </button>

              {!isAuthenticated ? (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => {
                      setActiveView('login');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full py-2.5 text-center text-xs font-semibold border border-slate-300 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      setActiveView('register');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full py-2.5 text-center text-xs font-semibold bg-blue-700 text-white rounded-lg"
                  >
                    Join Upliftra
                  </button>
                </div>
              ) : (
                <button
                  id="btn-mobile-logout"
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 px-4 text-left text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 rounded-xl flex items-center justify-between transition mt-1"
                >
                  <div className="flex items-center gap-2">
                    <LogOut className="w-4 h-4 text-rose-600" />
                    <span>Sign Out ({currentUser?.name || 'Account'})</span>
                  </div>
                  <span className="text-[11px] font-normal text-rose-500">Exit Session</span>
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* 15 Portals Modal */}
      <PortalSwitcherModal
        isOpen={isPortalModalOpen}
        onClose={() => setIsPortalModalOpen(false)}
      />
    </>
  );
};

