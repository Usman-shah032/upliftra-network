import React from 'react';
import UpliftraLogo from './UpliftraLogo';
import { useApp } from '../../context/AppContext';
import {
  Globe,
  Mail,
  MapPin,
  ShieldCheck,
  GraduationCap,
  Briefcase,
  Users,
  Calendar,
  MessageSquare,
  Rocket
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView } = useApp();

  return (
    <footer id="main-footer" className="bg-slate-950 text-slate-400 border-t border-slate-800/80 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 pb-12 border-b border-slate-800/80">
          {/* Col 1: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="inline-block">
              <UpliftraLogo size="md" />
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Upliftra Network is Pakistan’s unified ecosystem for professional development, mentorship, verified opportunities, learning roadmaps, and career advancement connecting students, universities, mentors, and employers.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>Verified Ecosystem</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Nationwide Pakistan</span>
              </div>
            </div>
          </div>

          {/* Col 2: Opportunities & Jobs */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
              Opportunities
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => setActiveView('opportunities')}
                  className="hover:text-white transition"
                >
                  Jobs in Pakistan
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('opportunities')}
                  className="hover:text-white transition"
                >
                  Internships & Traineeships
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('opportunities')}
                  className="hover:text-white transition"
                >
                  Global Scholarships (Fulbright)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('opportunities')}
                  className="hover:text-white transition"
                >
                  Tech Fellowships & Grants
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('opportunities')}
                  className="hover:text-white transition"
                >
                  Volunteering Outreach
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Mentorship & Learning */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
              Programs & Hubs
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => setActiveView('mentorship')}
                  className="hover:text-white transition"
                >
                  Find a Mentor (AI Match)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('learning')}
                  className="hover:text-white transition"
                >
                  Learning Hub & Tracks
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('events')}
                  className="hover:text-white transition"
                >
                  Events & Hackathons
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('community')}
                  className="hover:text-white transition"
                >
                  Community Forum
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('startups')}
                  className="hover:text-white transition"
                >
                  Startup & Founder Hub
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Portals & Navigation */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
              Portals (15 Roles)
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => setActiveView('dashboard')} className="hover:text-white transition">
                  Student Portal
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('dashboard')} className="hover:text-white transition">
                  Professional Portal
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('dashboard')} className="hover:text-white transition">
                  Mentor Workspace
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('dashboard')} className="hover:text-white transition">
                  Recruiter & Company Hub
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('dashboard')} className="hover:text-white transition">
                  University & NGO Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Platform & Legal */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
              About & Support
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => setActiveView('about')} className="hover:text-white transition">
                  About Upliftra
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('vision')} className="hover:text-white transition">
                  Long-Term Vision
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('how-it-works')} className="hover:text-white transition">
                  How Upliftra Works
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('faq')} className="hover:text-white transition">
                  FAQ & Help Center
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('contact')} className="hover:text-white transition">
                  Contact Support
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Legal & Socials */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} <strong className="text-slate-200">Upliftra Network</strong>. All rights reserved. Dedicated to Pakistan’s career ecosystem.
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <button onClick={() => setActiveView('privacy')} className="hover:text-white transition">
              Privacy Policy
            </button>
            <span className="text-slate-700">|</span>
            <button onClick={() => setActiveView('terms')} className="hover:text-white transition">
              Terms of Service
            </button>
            <span className="text-slate-700">|</span>
            <button onClick={() => setActiveView('contact')} className="hover:text-white transition">
              Contact Us
            </button>
            <span className="text-slate-700">|</span>
            <div className="flex items-center gap-3 text-slate-300">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition"
                aria-label="X Twitter"
              >
                X (Twitter)
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition"
                aria-label="GitHub"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
