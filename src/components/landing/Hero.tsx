import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-16 sm:py-24">
      <div className="relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            className="mx-auto max-w-2xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Quick Ledger Pro
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              The complete business management solution for vendors and suppliers. 
              Manage invoices, inventory, sales, and suppliers in one powerful platform.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900">
                <Link to="/register" className="flex items-center">
                  Get Started 
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            className="mt-16 flow-root sm:mt-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="relative rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <div className="rounded-md bg-white p-4 shadow-xl ring-1 ring-gray-900/10">
                <div className="flex min-h-[300px] items-center justify-center p-6">
                  <div className="text-center space-y-4">
                    <div className="text-2xl font-semibold">Dashboard Preview</div>
                    <p className="text-muted-foreground">Beautiful, responsive dashboards for vendors and suppliers</p>
                    <div className="flex justify-center gap-4 pt-4">
                      <div className="h-20 w-32 rounded-md bg-vendor/20 flex items-center justify-center text-vendor-dark">
                        Vendor
                      </div>
                      <div className="h-20 w-32 rounded-md bg-supplier/20 flex items-center justify-center text-supplier-dark">
                        Supplier
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
