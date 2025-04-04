import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const LoginForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Sign in with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      if (authData.user) {
        // Check if email is verified
        if (!authData.user.email_confirmed_at) {
          toast({
            title: "Email Not Verified",
            description: "Please verify your email before logging in",
            variant: "destructive",
          });
          return;
        }

        // Get user type from the users table
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('user_type')
          .eq('id', authData.user.id)
          .single();

        if (userError) throw userError;

        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });

        // Redirect based on user type
        navigate(`/dashboard/${userData.user_type}`);
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md space-y-8"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight">Sign in to your account</h2>
        <p className="mt-2 text-sm text-gray-600">
          Enter your credentials to access your dashboard
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>

        <div className="flex items-center justify-between">
          <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </Button>

        <div className="text-center">
          <Link to="/register" className="text-sm text-blue-600 hover:text-blue-800">
            Don't have an account? Sign up
          </Link>
        </div>
      </form>
    </motion.div>
  );
};

export default LoginForm;
