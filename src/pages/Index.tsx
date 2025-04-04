import React from 'react';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
