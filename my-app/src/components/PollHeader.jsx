import React from 'react';
import { BarChart3, TrendingUp, Clock, Users, Plus, Wifi, WifiOff, Sparkles, Zap, Trophy } from 'lucide-react';

const PollHeader = ({ activeTab, setActiveTab, setShowCreateModal, connectionStatus }) => {
  const tabs = [
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'recent', label: 'Recent', icon: Clock },
    { id: 'popular', label: 'Popular', icon: Trophy }
  ];

  return (
    <header className="border-b border-zinc-200 bg-white/90 backdrop-blur-2xl sticky top-0 z-50 shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-50 via-white to-zinc-50"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-zinc-900 rounded-2xl blur-md group-hover:blur-lg transition-all opacity-20"></div>
              <div className="relative w-12 h-12 bg-gradient-to-br from-zinc-900 to-zinc-700 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-all shadow-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-black text-zinc-900">QuickPoll</h1>
              <p className="text-xs text-zinc-500 font-medium">Real-time Opinion Platform</p>
            </div>
          </div>
          <button onClick={() => setShowCreateModal(true)} className="relative group overflow-hidden">
            <div className="relative flex items-center gap-2 px-6 py-3 bg-zinc-900 rounded-xl font-bold text-white shadow-lg transform group-hover:scale-105 transition-all">
              <Plus className="w-5 h-5" />
              <span>Create Poll</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default PollHeader;
