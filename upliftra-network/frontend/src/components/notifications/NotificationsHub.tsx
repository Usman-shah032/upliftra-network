import React from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, CheckCheck, Clock } from 'lucide-react';

export const NotificationsHub: React.FC = () => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead, setActiveView } = useApp();

  return (
    <div className="py-10 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">Notifications Center</h1>
              <p className="text-xs text-slate-500">Stay updated on your mentorships, jobs, and community interactions</p>
            </div>
          </div>

          <button
            onClick={markAllNotificationsAsRead}
            className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Mark all as read</span>
          </button>
        </div>

        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                markNotificationAsRead(n.id);
                if (n.type === 'mentorship') setActiveView('mentorship');
                if (n.type === 'opportunity') setActiveView('opportunities');
              }}
              className={`p-4 rounded-xl border transition cursor-pointer flex items-start justify-between gap-4 ${
                !n.isRead
                  ? 'bg-blue-50/50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/80'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">{n.title}</h3>
                  {!n.isRead && (
                    <span className="h-2 w-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{n.description}</p>
                <div className="flex items-center gap-1 text-[11px] text-slate-400 pt-1">
                  <Clock className="w-3 h-3" />
                  <span>{n.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
