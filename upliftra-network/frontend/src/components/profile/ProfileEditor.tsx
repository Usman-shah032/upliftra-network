import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RoleBadge } from '../common/RoleBadge';
import { VerificationBadge } from '../common/VerificationBadge';
import {
  User as UserIcon,
  Save,
  MapPin,
  Building,
  School,
  Link as LinkIcon,
  CheckCircle,
  Sparkles,
  Camera,
  Upload
} from 'lucide-react';

export const ProfileEditor: React.FC = () => {
  const { currentUser, updateCurrentUser, setActiveView } = useApp();

  const user = currentUser || {
    id: 'guest_user',
    name: 'New Member',
    headline: 'Upliftra Member',
    bio: '',
    location: 'Islamabad, Pakistan',
    universityName: '',
    degree: '',
    companyName: '',
    skills: ['Communication', 'Problem Solving'],
    role: 'student' as const,
    profileCompletion: 50,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    email: '',
    isVerified: false,
    joinedDate: 'Today'
  };

  const [name, setName] = useState(user.name);
  const [headline, setHeadline] = useState(user.headline);
  const [bio, setBio] = useState(user.bio || '');
  const [location, setLocation] = useState(user.location);
  const [university, setUniversity] = useState(user.universityName || '');
  const [degree, setDegree] = useState(user.degree || '');
  const [company, setCompany] = useState(user.companyName || '');
  const [skills, setSkills] = useState((user.skills || []).join(', '));
  const [avatar, setAvatar] = useState(user.avatar);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUser({
      name,
      headline,
      bio,
      location,
      universityName: university,
      degree,
      companyName: company,
      avatar,
      skills: skills.split(',').map((s) => s.trim()).filter(Boolean),
      profileCompletion: 95
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="py-10 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Edit {user.name}’s Profile
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <RoleBadge role={user.role} size="sm" />
              <span className="text-xs text-slate-400">Profile Completion: {user.profileCompletion}%</span>
            </div>
          </div>

          {savedSuccess && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold animate-fadeIn">
              <CheckCircle className="w-4 h-4" />
              <span>Profile Updated!</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSave} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6 text-xs sm:text-sm">
          {/* Avatar and basic info */}
          <div className="flex items-center gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
            <img
              src={avatar || user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-blue-500/40 shadow-xs"
            />
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">{user.name}</h3>
              <p className="text-xs text-slate-400">{user.email}</p>
              <label className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-xs font-semibold text-blue-700 dark:text-blue-300 hover:bg-blue-100 cursor-pointer transition">
                <Camera className="w-3.5 h-3.5" />
                <span>Change Avatar Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        if (typeof reader.result === 'string') {
                          setAvatar(reader.result);
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Location (City, Country)
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Headline / Title
            </label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                University / Higher Ed Institution
              </label>
              <input
                type="text"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                placeholder="e.g. FAST NUCES, LUMS, NUST, UET"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Company / Organization
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                placeholder="e.g. Systems Ltd, Careem, TechStart"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Technical & Professional Skills (Comma separated)
            </label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              placeholder="Python, React, Machine Learning, Cloud Architecture"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Professional Biography & Goals
            </label>
            <textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              placeholder="Tell your story, projects built, and what you aim to achieve on Upliftra Network..."
            />
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center gap-2 shadow-xs"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
