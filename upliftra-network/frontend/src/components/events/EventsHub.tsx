import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EventItem } from '../../types';
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  CheckCircle,
  Video,
  Building,
  Plus
} from 'lucide-react';

export const EventsHub: React.FC = () => {
  const { events, toggleRegisterEvent } = useApp();
  const [selectedFormat, setSelectedFormat] = useState<string>('all');

  const filteredEvents = events.filter((e) => {
    if (selectedFormat === 'all') return true;
    return e.format.toLowerCase() === selectedFormat.toLowerCase();
  });

  return (
    <div className="py-10 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white p-8 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold">
              <Calendar className="w-3.5 h-3.5" />
              <span>Conferences, Hackathons & Masterclasses</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Pakistan Tech & Career Events
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Explore premier university hackathons, national developer conferences, and virtual mentorship webinars hosted across Islamabad, Lahore, Karachi, and global virtual spaces.
            </p>
          </div>
        </div>

        {/* Format Filter */}
        <div className="flex items-center gap-2">
          {['all', 'in_person', 'virtual', 'hybrid'].map((fmt) => (
            <button
              key={fmt}
              onClick={() => setSelectedFormat(fmt)}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition ${
                selectedFormat === fmt
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100'
              }`}
            >
              {fmt === 'all' ? 'All Event Formats' : fmt.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44">
                  <img
                    src={event.coverImage}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold uppercase">
                      {event.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-md bg-blue-600 text-white text-[10px] font-bold uppercase">
                      {event.format.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{event.time}</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 dark:text-white line-clamp-2">
                    {event.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>{event.registeredCount} Registered Attendees</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  id={`btn-register-event-${event.id}`}
                  onClick={() => toggleRegisterEvent(event.id)}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 ${
                    event.isRegistered
                      ? 'bg-emerald-600 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {event.isRegistered ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Registered (Pass Confirmed)</span>
                    </>
                  ) : (
                    <span>Register for Free</span>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
