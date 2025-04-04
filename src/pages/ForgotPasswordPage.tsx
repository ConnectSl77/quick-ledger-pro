import React from 'react';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import Navbar from '@/components/landing/Navbar';

const ForgotPasswordPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">Forgot Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage; 