import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FiPlus, FiMinus } from 'react-icons/fi';

const CATEGORIES = ["Food", "Transport", "Shopping", "Entertainment", "Health", "Bills", "Education", "Other"];

const TransactionForm = ({ onAddTransaction }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'Other',
    type: 'expense',
    date: new Date().toISOString().split('T')[0],
    note: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.amount || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        amount: Number(formData.amount)
      };
      await onAddTransaction(payload);

      // Reset form on success, keep date and type
      setFormData(prev => ({
        ...prev,
        title: '',
        amount: '',
        note: ''
      }));
    } catch (error) {
      console.error('Error adding transaction:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#161616] border border-[#2a2a2a] rounded-xl p-6 fade-in">
      <h3 className="text-xl font-heading font-bold mb-6">Add Transaction</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Type Toggle */}
        <div className="flex bg-[#0D0D0D] p-1 rounded-lg border border-[#2a2a2a]">
          <button
            type="button"
            className={`flex-1 py-2 rounded-md font-medium flex justify-center items-center gap-2 transition-colors ${formData.type === 'expense'
              ? 'bg-[#ef4444]/20 text-[#ef4444]'
              : 'text-[#888888] hover:text-[#f0f0f0]'
              }`}
            onClick={() => setFormData(prev => ({ ...prev, type: 'expense' }))}
          >
            <FiMinus /> Expense
          </button>
          <button
            type="button"
            className={`flex-1 py-2 rounded-md font-medium flex justify-center items-center gap-2 transition-colors ${formData.type === 'income'
              ? 'bg-[#22c55e]/20 text-[#22c55e]'
              : 'text-[#888888] hover:text-[#f0f0f0]'
              }`}
            onClick={() => setFormData(prev => ({ ...prev, type: 'income' }))}
          >
            <FiPlus /> Income
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm text-[#888888]">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="E.g. Groceries"
              className="w-full bg-[#161616] border border-[#2a2a2a] rounded-lg px-4 py-2 focus:border-[#00D9A6]"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-[#888888]">Amount *</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              min="0.01"
              step="0.01"
              placeholder="0.00"
              className="w-full bg-[#0D0D0D] border border-[#2a2a2a] rounded-lg px-4 py-2 focus:border-[#00D9A6]"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-[#888888]">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={{ colorScheme: 'dark' }}
              className="w-full bg-[#161616] border border-[#2a2a2a] rounded-lg px-4 py-2 focus:border-[#161616] appearance-none"

            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat} style={{ background: '#161616', color: '#f0f0f0' }}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-[#888888]">Date *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full bg-[#0D0D0D] border border-[#2a2a2a] rounded-lg px-4 py-2 focus:border-[#00D9A6]"
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm text-[#888888]">Note (Optional)</label>
          <input
            type="text"
            name="note"
            value={formData.note}
            onChange={handleChange}
            placeholder="Add details here..."
            className="w-full bg-[#0D0D0D] border border-[#2a2a2a] rounded-lg px-4 py-2 focus:border-[#00D9A6]"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-[#00D9A6] text-[#0D0D0D] font-bold hover:bg-[#00c092] transition-colors disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add Transaction'}
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
