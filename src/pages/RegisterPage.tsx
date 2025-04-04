
import React from 'react';
import RegisterForm from '@/components/auth/RegisterForm';
import Navbar from '@/components/landing/Navbar';

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-auth-pattern">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-6">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
