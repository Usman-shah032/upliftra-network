import React, { useState, useEffect } from 'react';
import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HeroSection } from './components/public/HeroSection';
import { HowItWorksSection } from './components/public/HowItWorksSection';
import { AIMentorHighlight } from './components/public/AIMentorHighlight';
import { FeaturedOpportunities } from './components/public/FeaturedOpportunities';
import { PortalsOverview } from './components/public/PortalsOverview';
import { OpportunitiesExplorer } from './components/opportunities/OpportunitiesExplorer';
import { MentorshipHub } from './components/mentorship/MentorshipHub';
import { LearningHub } from './components/learning/LearningHub';
import { EventsHub } from './components/events/EventsHub';
import { CommunityForum } from './components/community/CommunityForum';
import { StartupsHub } from './components/startups/StartupsHub';
import { RoleDashboardRouter } from './components/portals/RoleDashboardRouter';
import { ProfileEditor } from './components/profile/ProfileEditor';
import { MessagesHub } from './components/messages/MessagesHub';
import { NotificationsHub } from './components/notifications/NotificationsHub';
import {
  AboutPage,
  VisionPage,
  FAQPage,
  ContactPage,
  PrivacyPage
} from './components/public/PublicStaticPages';
import { AICareerAdvisorModal } from './components/ai/AICareerAdvisorModal';
import { AuthModal } from './components/auth/AuthModal';
import { JoinRegistrationPage } from './components/auth/JoinRegistrationPage';
import { LoginPage } from './components/auth/LoginPage';

const MainLayout: React.FC = () => {
  const { activeView, setActiveView } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isAICoachOpen, setIsAICoachOpen] = useState(false);

  // Sync URL path to activeView
  useEffect(() => {
    const rawPath = location.pathname.replace(/^\//, '').toLowerCase();
    const path = rawPath.split('/')[0];
    if (!path || path === '') {
      if (activeView !== 'home') setActiveView('home');
    } else if (path !== activeView) {
      setActiveView(path as any);
    }
  }, [location.pathname]);

  // Keep browser URL updated when activeView changes
  useEffect(() => {
    const targetPath = activeView === 'home' ? '/' : `/${activeView}`;
    if (location.pathname !== targetPath && !location.pathname.startsWith(`/${activeView}/`)) {
      navigate(targetPath, { replace: false });
    }
  }, [activeView]);

  const handleOpenAuth = (mode: 'login' | 'register' = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'home':
        return (
          <main className="space-y-0">
            <HeroSection
              onOpenAuth={handleOpenAuth}
              onOpenAICoach={() => setIsAICoachOpen(true)}
            />
            <FeaturedOpportunities />
            <AIMentorHighlight onOpenAuth={handleOpenAuth} />
            <HowItWorksSection />
            <PortalsOverview />
          </main>
        );

      case 'opportunities':
        return <OpportunitiesExplorer onOpenAuth={handleOpenAuth} />;

      case 'mentorship':
        return <MentorshipHub onOpenAuth={handleOpenAuth} />;

      case 'learning':
        return <LearningHub />;

      case 'events':
        return <EventsHub />;

      case 'community':
        return <CommunityForum />;

      case 'startups':
        return <StartupsHub />;

      case 'dashboard':
        return <RoleDashboardRouter onOpenAICoach={() => setIsAICoachOpen(true)} />;

      case 'register':
      case 'join':
        return <JoinRegistrationPage onNavigate={(view) => setActiveView(view)} />;

      case 'login':
      case 'signin':
        return <LoginPage onNavigate={(view) => setActiveView(view)} />;

      case 'profile':
        return <ProfileEditor />;

      case 'messages':
        return <MessagesHub />;

      case 'notifications':
        return <NotificationsHub />;

      case 'about':
        return <AboutPage />;

      case 'vision':
        return <VisionPage />;

      case 'how-it-works':
        return <HowItWorksSection />;

      case 'faq':
        return <FAQPage />;

      case 'contact':
        return <ContactPage />;

      case 'privacy':
      case 'terms':
        return <PrivacyPage />;

      case 'for-companies':
      case 'for-universities':
        return <PortalsOverview />;

      default:
        return (
          <main className="space-y-0">
            <HeroSection
              onOpenAuth={handleOpenAuth}
              onOpenAICoach={() => setIsAICoachOpen(true)}
            />
            <FeaturedOpportunities />
            <AIMentorHighlight onOpenAuth={handleOpenAuth} />
            <HowItWorksSection />
            <PortalsOverview />
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        onOpenAuth={handleOpenAuth}
        onOpenAICoach={() => setIsAICoachOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1">{renderActiveView()}</div>

      {/* Footer */}
      <Footer />

      {/* Global Modals */}
      <AICareerAdvisorModal
        isOpen={isAICoachOpen}
        onClose={() => setIsAICoachOpen(false)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <MainLayout />
      </AppProvider>
    </BrowserRouter>
  );
}
