import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const success = await login(email, password);
    setIsSubmitting(false);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 fade-in relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00D9A6] opacity-5 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#00D9A6] opacity-5 blur-[100px] rounded-full"></div>
      </div>
      
      <div className="w-full max-w-md bg-[#161616] border border-[#2a2a2a] rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#00D9A6]/20 text-[#00D9A6] text-2xl font-bold mb-4 font-heading">
            E
          </div>
          <h2 className="text-3xl font-heading font-bold mb-2">Welcome Back</h2>
          <p className="text-[#888888]">Sign in to continue tracking your expenses</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-sm font-medium text-[#888888]">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#0D0D0D] border border-[#2a2a2a] rounded-xl focus:border-[#00D9A6] transition-colors"
              placeholder="you@example.com"
              required
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-[#888888]">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#0D0D0D] border border-[#2a2a2a] rounded-xl focus:border-[#00D9A6] transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-3 mt-4 bg-[#00D9A6] text-[#0D0D0D] font-bold rounded-xl hover:bg-[#00c092] transition-colors disabled:opacity-70 font-heading text-lg"
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center mt-6 text-[#888888]">
          Don't have an account?{' '}
          <Link to="/signup" className="text-[#00D9A6] hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
