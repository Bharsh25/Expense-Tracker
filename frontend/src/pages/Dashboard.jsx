import React, { useState, useEffect, useContext } from 'react';
import { FiDollarSign, FiTrendingUp, FiTrendingDown, FiLoader } from 'react-icons/fi';
import toast from 'react-hot-toast';

import Navbar from '../components/Navbar';
import StatCard from '../components/StatCard';
import Charts from '../components/Charts';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import ConfirmModal from '../components/ConfirmModal';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    categoryBreakdown: [],
    recentTransactions: []
  });
  
  // Real transaction data fetched from API
  const [transactions, setTransactions] = useState([]);
  // Query parameters for getting transactions
  const [filterParams, setFilterParams] = useState({ type: '', category: '' });
  // Delete confirmation modal state
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const fetchDashboardStats = async () => {
    try {
      const res = await api.get('/dashboard');
      setStats(res.data);
    } catch (error) {
      toast.error('Failed to load dashboard stats');
    }
  };

  const fetchTransactions = async () => {
    try {
      const params = new URLSearchParams();
      if (filterParams.type) params.append('type', filterParams.type);
      if (filterParams.category) params.append('category', filterParams.category);
      const queryStr = params.toString() ? `?${params.toString()}` : '';

      const res = await api.get(`/expenses${queryStr}`);
      setTransactions(res.data);
    } catch (error) {
      toast.error('Failed to load transactions');
    }
  };

  const loadAllData = async () => {
    setLoading(true);
    await Promise.all([fetchDashboardStats(), fetchTransactions()]);
    setLoading(false);
  };

  useEffect(() => {
    loadAllData();
  }, [filterParams]);

  const handleAddTransaction = async (formData) => {
    try {
      await api.post('/expenses', formData);
      toast.success('Transaction added successfully');
      loadAllData();
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Failed to add transaction');
      throw error;
    }
  };

  // Opens the themed confirm modal instead of window.confirm
  const handleDeleteTransaction = (id) => {
    setPendingDeleteId(id);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/expenses/${pendingDeleteId}`);
      toast.success('Transaction deleted');
      loadAllData();
    } catch (error) {
      toast.error('Failed to delete transaction');
    } finally {
      setPendingDeleteId(null);
    }
  };

  const cancelDelete = () => setPendingDeleteId(null);

  const handleFilterChange = (newFilters) => {
    setFilterParams(newFilters);
  };

  if (loading && !stats.recentTransactions.length && !transactions.length) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-center text-[#00D9A6]">
        <FiLoader className="text-4xl animate-spin mb-4" />
        <h2 className="text-xl font-heading font-medium">Loading Dashboard...</h2>
      </div>
    );
  }

  // Format data for BarChart (Income vs Expense)
  // Recharts needs an array of objects
  const incomeExpenseData = [
    {
      name: 'Current Month',
      income: stats.totalIncome || 0,
      expense: stats.totalExpense || 0
    }
  ];

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Header section (optional visual enhancement) */}
        <div className="fade-in">
          <h1 className="text-3xl font-bold font-heading mb-2 text-[#f0f0f0]">Dashboard Overview</h1>
          <p className="text-[#888888]">Track your finances and stay on top of your budget.</p>
        </div>

        {/* 1. Stat Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            title="Total Balance" 
            amount={stats.balance} 
            icon={<FiDollarSign className="text-2xl" />}
            type="balance" 
          />
          <StatCard 
            title="Total Income" 
            amount={stats.totalIncome} 
            icon={<FiTrendingUp className="text-2xl" />}
            type="income" 
          />
          <StatCard 
            title="Total Expenses" 
            amount={stats.totalExpense} 
            icon={<FiTrendingDown className="text-2xl" />}
            type="expense" 
          />
        </div>

        {/* 2. Charts Section */}
        <Charts 
          categoryData={stats.categoryBreakdown} 
          incomeExpenseData={incomeExpenseData} 
        />

        {/* 3. & 4. Form and List Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <TransactionForm onAddTransaction={handleAddTransaction} />
          </div>
          <div className="lg:col-span-2 h-[500px]">
             {/* List needs fixed height for internal scrolling */}
            <TransactionList 
              transactions={transactions} 
              onDeleteTransaction={handleDeleteTransaction}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>

      </main>

      {/* Themed Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!pendingDeleteId}
        title="Delete Transaction"
        message="This transaction will be permanently removed. This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default Dashboard;
