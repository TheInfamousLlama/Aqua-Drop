
import React from 'react';

const ShopInfo = () => {
  return (
    <div className="mt-8 p-6 rounded-3xl bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-400/20">
      <h4 className="font-light text-lg mb-3 text-blue-400">
        💰 How to Earn More Aqua Coins
      </h4>
      <ul className="space-y-2 text-white/70 font-light">
        <li>• Log water intake: +1 coin per 100ml</li>
        <li>• Complete daily goals: +10 bonus coins</li>
        <li>• Unlock achievements: 75-1500 coins each</li>
        <li>• Elite achievements: 15x higher rewards</li>
      </ul>
    </div>
  );
};

export default ShopInfo;
