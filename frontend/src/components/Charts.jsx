import React from 'react';
import { 
  PieChart, Pie, Cell, Tooltip as PieTooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as BarTooltip
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a855f7', '#ec4899', '#f43f5e', '#14b8a6'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#161616] border border-[#2a2a2a] p-3 rounded-lg shadow-lg">
        {label && <p className="text-[#888888] mb-1">{label}</p>}
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }} className="font-bold">
            {entry.name}: ${entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Charts = ({ categoryData, incomeExpenseData }) => {
  
  // Format category data for PieChart
  const pieData = categoryData?.map(item => ({
    name: item._id,
    value: item.total
  })) || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 fade-in">
      
      {/* Category Breakdown Pie Chart */}
      <div className="bg-[#161616] border border-[#2a2a2a] rounded-xl p-6">
        <h3 className="text-xl font-heading font-bold mb-6">Expense Breakdown</h3>
        <div className="h-64">
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <PieTooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
             <div className="h-full flex items-center justify-center text-[#888888]">No expense data available</div>
          )}
        </div>
      </div>

      {/* Income vs Expense Bar Chart */}
      <div className="bg-[#161616] border border-[#2a2a2a] rounded-xl p-6">
        <h3 className="text-xl font-heading font-bold mb-6">Income vs Expense</h3>
        <div className="h-64">
          {incomeExpenseData?.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={incomeExpenseData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
                <XAxis dataKey="name" stroke="#888888" tick={{ fill: '#888888' }} axisLine={false} tickLine={false} />
                <YAxis stroke="#888888" tick={{ fill: '#888888' }} axisLine={false} tickLine={false} tickFormatter={(val) => `$${val}`} />
                <BarTooltip content={<CustomTooltip />} cursor={{ fill: '#2a2a2a', opacity: 0.4 }} />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="income" name="Income" fill="#22c55e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expense" name="Expense" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-[#888888]">No data available</div>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default Charts;
