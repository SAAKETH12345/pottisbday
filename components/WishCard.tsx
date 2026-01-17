
import React from 'react';
import { BirthdayWish } from '../types';

interface WishCardProps {
  wish: BirthdayWish;
}

const WishCard: React.FC<WishCardProps> = ({ wish }) => {
  return (
    <div className={`p-6 rounded-2xl shadow-sm border transition-all hover:shadow-md ${
      wish.type === 'ai' 
      ? 'bg-gradient-to-br from-rose-100 to-pink-50 border-rose-200' 
      : 'bg-white border-slate-100'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          wish.type === 'ai' ? 'bg-rose-500 text-white' : 'bg-slate-200 text-slate-600'
        }`}>
          {wish.type === 'ai' ? '✨ AI Special' : '💌 Guest Wish'}
        </span>
        <span className="text-slate-400 text-xs">
          {new Date(wish.timestamp).toLocaleTimeString()}
        </span>
      </div>
      <p className="text-slate-700 leading-relaxed italic mb-4">"{wish.message}"</p>
      <p className="text-right font-semibold text-rose-600">— {wish.sender}</p>
    </div>
  );
};

export default WishCard;
