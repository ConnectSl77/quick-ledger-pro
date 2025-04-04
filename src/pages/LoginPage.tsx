
import React from 'react';
import LoginForm from '@/components/auth/LoginForm';
import Navbar from '@/components/landing/Navbar';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-auth-pattern">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-6">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
