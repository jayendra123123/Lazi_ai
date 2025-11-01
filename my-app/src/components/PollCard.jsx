import React, { useState } from 'react';
import { Heart, Users, Clock, Award } from 'lucide-react';

const PollCard = ({ poll, userId, vote, toggleLike, getTimeAgo }) => {
  const hasVoted = poll.votedBy?.includes(userId) || false;
  const isLiked = poll.likedBy?.includes(userId) || false;
  const maxVotes = Math.max(...poll.options.map(opt => opt.votes));

  return (
    <div className="group relative">
      <div className="relative bg-white backdrop-blur-xl rounded-2xl border border-zinc-200 overflow-hidden group-hover:border-zinc-900 transition-all duration-500 shadow-lg p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 bg-zinc-900 text-white rounded-md text-xs font-semibold">{poll.author}</span>
              <span className="text-zinc-400"></span>
              <span className="text-zinc-500 text-xs">{getTimeAgo(poll.timestamp)}</span>
            </div>
            <h3 className="text-lg font-bold text-zinc-900">{poll.question}</h3>
          </div>
          <button onClick={() => toggleLike(poll._id)} className={`p-2.5 rounded-xl transition-all ${isLiked ? 'bg-zinc-900' : 'bg-zinc-100 hover:bg-zinc-200'}`}>
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-white text-white' : 'text-zinc-600'}`} />
          </button>
        </div>
        <div className="flex items-center gap-3 mb-4 p-2 bg-zinc-50 rounded-lg border border-zinc-200">
          <div className="flex items-center gap-1.5 text-xs">
            <Users className="w-3.5 h-3.5 text-zinc-600" />
            <span className="font-bold text-zinc-900">{poll.totalVotes}</span>
            <span className="text-zinc-500">votes</span>
          </div>
        </div>
        <div className="space-y-2.5">
          {poll.options.map((option, index) => {
            const percentage = poll.totalVotes > 0 ? ((option.votes / poll.totalVotes) * 100).toFixed(1) : 0;
            const isWinning = option.votes === maxVotes && maxVotes > 0;
            return (
              <button key={option._id} onClick={() => !hasVoted && vote(poll._id, option._id)} disabled={hasVoted} className="relative w-full overflow-hidden rounded-xl transition-all">
                <div className={`absolute inset-0 transition-all duration-700 ${hasVoted ? (isWinning ? 'bg-zinc-900/20' : 'bg-zinc-100') : 'bg-zinc-50'}`} style={{ width: hasVoted ? percentage + '%' : '100%' }}></div>
                <div className={`absolute inset-0 rounded-xl border ${hasVoted && isWinning ? 'border-zinc-900' : 'border-zinc-200'}`}></div>
                <div className="relative flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${hasVoted && isWinning ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600'}`}>
                      {hasVoted && isWinning ? <Award className="w-4 h-4" /> : index + 1}
                    </div>
                    <span className={`text-sm font-semibold ${hasVoted ? 'text-zinc-900' : 'text-zinc-700'}`}>{option.text}</span>
                  </div>
                  {hasVoted && (
                    <div className={`px-3 py-1 rounded-lg font-bold text-sm ${isWinning ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-700'}`}>{percentage}%</div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PollCard;
