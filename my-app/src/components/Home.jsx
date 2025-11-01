import React, { useState, useEffect } from 'react';
import PollHeader from './PollHeader';
import PollCard from './PollCard';
import CreatePollModal from './CreatePollModal';
import socketService from '../services/socketService';
import { pollAPI } from '../services/api';
import { Sparkles, BarChart3, Users, Heart, TrendingUp, Plus } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, iconBg }) => (
  <div className="group relative bg-white backdrop-blur-xl rounded-2xl p-6 border border-zinc-200 hover:border-zinc-900 hover:shadow-2xl transition-all duration-300 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <div className="relative flex items-center space-x-4">
      <div className={`p-3 ${iconBg} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="text-sm text-zinc-500">{label}</p>
        <p className="text-3xl font-bold text-zinc-900 mt-1">{value}</p>
      </div>
    </div>
  </div>
);

const Home = () => {
  const [polls, setPolls] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState('trending');
  const [userId] = useState(`user_${Math.random().toString(36).substr(2, 9)}`);
  const [connectionStatus, setConnectionStatus] = useState('connecting');

  useEffect(() => {
    loadInitialPolls();
    setupSocketConnection();
    return () => socketService.disconnect();
  }, []);

  const loadInitialPolls = async () => {
    try {
      const data = await pollAPI.getAllPolls();
      setPolls(data);
      setConnectionStatus('connected');
    } catch (error) {
      console.error('Error loading polls:', error);
      setConnectionStatus('disconnected');
    }
  };

  const setupSocketConnection = () => {
    socketService.connect();
    socketService.on('pollCreated', (poll) => setPolls((prevPolls) => [poll, ...prevPolls]));
    socketService.on('pollUpdated', (updatedPoll) => setPolls((prevPolls) => prevPolls.map((poll) => (poll._id === updatedPoll._id ? updatedPoll : poll))));
    socketService.on('connect', () => setConnectionStatus('connected'));
    socketService.on('disconnect', () => setConnectionStatus('disconnected'));
  };

  const handleCreatePoll = async (pollData) => {
    try {
      const newPoll = await pollAPI.createPoll(pollData);
      console.log('✅ Poll created:', newPoll);
      setShowCreateModal(false);
    } catch (error) {
      console.error('❌ Error creating poll:', error);
      alert('Failed to create poll. Please check console for details.');
    }
  };

  const handleVote = async (pollId, optionId) => {
    try {
      await pollAPI.vote(pollId, optionId, userId);
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  const handleLike = async (pollId) => {
    try {
      await pollAPI.toggleLike(pollId, userId);
    } catch (error) {
      console.error('Error liking poll:', error);
    }
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const pollTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now - pollTime) / 1000);
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  const dashboardStats = {
    totalVoters: polls.reduce((sum, poll) => sum + (poll.votedBy?.length || 0), 0),
    totalLikes: polls.reduce((sum, poll) => sum + (poll.likes || 0), 0),
    activePolls: polls.length
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-zinc-200/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-zinc-200/30 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-zinc-200/30 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>
      <PollHeader 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setShowCreateModal={setShowCreateModal}
        connectionStatus={connectionStatus}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard icon={Users} label="Total Voters" value={dashboardStats.totalVoters} iconBg="bg-zinc-900" />
          <StatCard icon={TrendingUp} label="Active Polls" value={dashboardStats.activePolls} iconBg="bg-zinc-800" />
          <StatCard icon={Heart} label="Total Reactions" value={dashboardStats.totalLikes} iconBg="bg-zinc-700" />
        </div>
        {polls.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-zinc-900 backdrop-blur-xl rounded-full mb-6 border border-zinc-700">
              <BarChart3 className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-zinc-900 mb-3">No polls yet</h3>
            <p className="text-zinc-600 mb-6 max-w-md mx-auto">Be the first to create a poll and start gathering opinions from the community!</p>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white rounded-xl font-semibold hover:bg-zinc-800 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              Create Your First Poll
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {polls.map((poll) => (
              <PollCard 
                key={poll._id}
                poll={poll}
                userId={userId}
                vote={handleVote}
                toggleLike={handleLike}
                getTimeAgo={getTimeAgo}
              />
            ))}
          </div>
        )}
      </div>
      {showCreateModal && (
        <CreatePollModal 
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreatePoll}
        />
      )}
    </div>
  );
};

export default Home;
