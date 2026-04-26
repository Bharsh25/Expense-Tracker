import React, { useState } from 'react';
import { FiTrash2, FiCoffee, FiShoppingBag, FiMonitor, FiActivity, FiFileText, FiBook, FiBriefcase, FiMap } from 'react-icons/fi';

const categoryIcons = {
  Food: <FiCoffee />,
  Transport: <FiMap />,
  Shopping: <FiShoppingBag />,
  Entertainment: <FiMonitor />,
  Health: <FiActivity />,
  Bills: <FiFileText />,
  Education: <FiBook />,
  Other: <FiBriefcase />
};

const TransactionList = ({ transactions, onDeleteTransaction, onFilterChange }) => {
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('');

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setFilterType(type);
    onFilterChange({ type: type === 'all' ? '' : type, category: filterCategory });
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setFilterCategory(category);
    onFilterChange({ type: filterType === 'all' ? '' : filterType, category });
  };

  return (
    <div className="bg-[#161616] border border-[#2a2a2a] rounded-xl p-6 fade-in h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className="text-xl font-heading font-bold">Recent Transactions</h3>

        {/* Filters */}
        <div className="flex gap-2">
          <select
            value={filterType}
            onChange={handleTypeChange}
            style={{ colorScheme: 'dark' }}
            className="bg-[#0D0D0D] border border-[#2a2a2a] rounded-lg px-3 py-1.5 text-sm text-[#f0f0f0] focus:border-[#00D9A6] focus:outline-none cursor-pointer"
          >
            <option style={{ background: '#161616', color: '#f0f0f0' }} value="all">All Types</option>
            <option style={{ background: '#161616', color: '#f0f0f0' }} value="income">Income</option>
            <option style={{ background: '#161616', color: '#f0f0f0' }} value="expense">Expense</option>
          </select>

          <select
            value={filterCategory}
            onChange={handleCategoryChange}
            style={{ colorScheme: 'dark' }}
            className="bg-[#0D0D0D] border border-[#2a2a2a] rounded-lg px-3 py-1.5 text-sm text-[#f0f0f0] focus:border-[#00D9A6] focus:outline-none cursor-pointer"
          >
            <option style={{ background: '#161616', color: '#f0f0f0' }} value="">All Categories</option>
            {Object.keys(categoryIcons).map(cat => (
              <option key={cat} value={cat} style={{ background: '#161616', color: '#f0f0f0' }}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-3">
        {transactions?.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-[#888888] py-10">
            <FiFileText className="text-4xl mb-2 opacity-50" />
            <p>No transactions found</p>
          </div>
        ) : (
          transactions?.map((t) => (
            <div key={t._id} className="flex items-center justify-between p-3 rounded-lg bg-[#0D0D0D] border border-[#2a2a2a] hover:border-[#3a3a3a] transition-colors slide-in group">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full flex items-center justify-center ${t.type === 'income' ? 'bg-[#22c55e]/10 text-[#22c55e]' : 'bg-[#ef4444]/10 text-[#ef4444]'}`}>
                  {categoryIcons[t.category] || categoryIcons.Other}
                </div>
                <div>
                  <h4 className="font-medium text-[#f0f0f0]">{t.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-[#888888]">
                    <span>{new Date(t.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{t.category}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className={`font-bold font-heading ${t.type === 'income' ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
                  {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                </span>
                <button
                  onClick={() => onDeleteTransaction(t._id)}
                  className="p-2 text-[#888888] hover:text-[#ef4444] rounded-md opacity-0 group-hover:opacity-100 transition-all hover:bg-[#ef4444]/10"
                  aria-label="Delete transaction"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionList;