import React from 'react';

const StatCard = ({ title, amount, icon, type }) => {
  // Determine colors based on type
  let colorClass = 'text-[#00D9A6]'; // Primary
  let bgClass = 'bg-[#00D9A6]/10';
  
  if (type === 'income') {
    colorClass = 'text-[#22c55e]'; // Green
    bgClass = 'bg-[#22c55e]/10';
  } else if (type === 'expense') {
    colorClass = 'text-[#ef4444]'; // Red
    bgClass = 'bg-[#ef4444]/10';
  }

  // Format currency
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount || 0);

  return (
    <div className="bg-[#161616] border border-[#2a2a2a] rounded-xl p-6 flex items-center justify-between hover:border-[#3a3a3a] transition-colors fade-in">
      <div>
        <p className="text-[#888888] text-sm mb-1">{title}</p>
        <h3 className="text-3xl font-bold font-heading">{formattedAmount}</h3>
      </div>
      <div className={`p-4 rounded-full ${bgClass} ${colorClass}`}>
        {icon}
      </div>
    </div>
  );
};

export default StatCard;
