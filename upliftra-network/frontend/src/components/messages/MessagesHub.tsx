import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Send, User as UserIcon, MessageSquare } from 'lucide-react';

export const MessagesHub: React.FC = () => {
  const { messages, sendMessage, currentUser, mentors } = useApp();
  const [activePartnerId, setActivePartnerId] = useState<string>(mentors[0]?.id || 'user_mentor_1');
  const [msgText, setMsgText] = useState('');

  const activePartner = mentors.find((m) => m.id === activePartnerId) || {
    id: activePartnerId,
    name: 'Dr. Shahbaz Alam',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    title: 'Lead AI Engineer'
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgText.trim()) return;
    sendMessage(activePartnerId, msgText);
    setMsgText('');
  };

  const currentUserId = currentUser?.id || 'guest_user';

  const threadMessages = messages.filter(
    (m) =>
      (m.senderId === currentUserId && m.receiverId === activePartnerId) ||
      (m.senderId === activePartnerId && m.receiverId === currentUserId) ||
      m.receiverId === currentUserId
  );

  return (
    <div className="py-10 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden h-[75vh] flex flex-col md:flex-row">
          {/* Left: Chat Contacts */}
          <div className="w-full md:w-80 border-r border-slate-200 dark:border-slate-800 flex flex-col">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 font-bold text-sm text-slate-900 dark:text-white">
              Direct Messages
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
              {mentors.slice(0, 4).map((m) => (
                <div
                  key={m.id}
                  onClick={() => setActivePartnerId(m.id)}
                  className={`p-3.5 flex items-center gap-3 cursor-pointer transition ${
                    activePartnerId === m.id
                      ? 'bg-blue-50 dark:bg-blue-950/60'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <img src={m.avatar} alt={m.name} className="w-10 h-10 rounded-full object-cover" />
                  <div className="overflow-hidden">
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white truncate">{m.name}</h4>
                    <p className="text-[11px] text-slate-500 truncate">{m.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Active Message Thread */}
          <div className="flex-1 flex flex-col justify-between">
            {/* Header */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3 bg-slate-50/50 dark:bg-slate-850">
              <img src={activePartner.avatar} alt={activePartner.name} className="w-9 h-9 rounded-full object-cover" />
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">{activePartner.name}</h3>
                <span className="text-[10px] text-emerald-600 font-semibold">● Active on Upliftra</span>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-3 bg-slate-50/30 dark:bg-slate-950/30">
              {threadMessages.map((msg) => {
                const isMe = msg.senderId === currentUserId;
                return (
                  <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[75%] p-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        isMe
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 shadow-xs'
                      }`}
                    >
                      <p>{msg.content}</p>
                      <span className={`text-[10px] mt-1 block ${isMe ? 'text-blue-200' : 'text-slate-400'}`}>
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input form */}
            <form onSubmit={handleSend} className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={msgText}
                onChange={(e) => setMsgText(e.target.value)}
                className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
              />
              <button
                type="submit"
                className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
