import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsSubmitting(true);
    const success = await register(formData.name, formData.email, formData.password);
    setIsSubmitting(false);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 fade-in relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#00D9A6] opacity-5 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00D9A6] opacity-5 blur-[100px] rounded-full"></div>
      </div>
      
      <div className="w-full max-w-md bg-[#161616] border border-[#2a2a2a] rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#00D9A6]/20 text-[#00D9A6] text-2xl font-bold mb-4 font-heading">
            E
          </div>
          <h2 className="text-3xl font-heading font-bold mb-2">Create Account</h2>
          <p className="text-[#888888]">Join us to start managing your expenses</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-sm font-medium text-[#888888]">Full Name</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#0D0D0D] border border-[#2a2a2a] rounded-xl focus:border-[#00D9A6] transition-colors"
              placeholder="John Doe"
              required
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-[#888888]">Email Address</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#0D0D0D] border border-[#2a2a2a] rounded-xl focus:border-[#00D9A6] transition-colors"
              placeholder="you@example.com"
              required
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-[#888888]">Password</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#0D0D0D] border border-[#2a2a2a] rounded-xl focus:border-[#00D9A6] transition-colors"
              placeholder="Min 6 characters"
              required
              minLength="6"
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-3 mt-4 bg-[#00D9A6] text-[#0D0D0D] font-bold rounded-xl hover:bg-[#00c092] transition-colors disabled:opacity-70 font-heading text-lg"
          >
            {isSubmitting ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center mt-6 text-[#888888]">
          Already have an account?{' '}
          <Link to="/login" className="text-[#00D9A6] hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
