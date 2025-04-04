import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  ShoppingCart, 
  Package, 
  Users, 
  CreditCard, 
  Lock 
} from 'lucide-react';

const features = [
  {
    name: 'Invoice & Receipt Management',
    description: 'Generate professional invoices with minimal input. Editable templates, discounts, and taxes support.',
    icon: FileText,
  },
  {
    name: 'Sales & Accounting',
    description: 'Log sales and expenses with automated categorization. Get daily, weekly, and monthly profit reports.',
    icon: ShoppingCart,
  },
  {
    name: 'Inventory Management',
    description: 'Scan barcodes to update stock, receive low-stock alerts, and manage multiple pricing options.',
    icon: Package,
  },
  {
    name: 'Supplier Management',
    description: 'Add and manage suppliers, track payments and order history, and leave reliability reviews.',
    icon: Users,
  },
  {
    name: 'Payment Support',
    description: 'Accept various payment methods, generate reminders, and track customer debts and repayments.',
    icon: CreditCard,
  },
  {
    name: 'Security & Backup',
    description: 'Secure PIN login with cloud data backup and multi-user access for businesses with staff.',
    icon: Lock,
  },
];

const Features = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="py-24 bg-white sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Everything You Need</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Powerful Business Management Features
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            <span className="inline-block w-32 h-4 bg-gray-200 rounded animate-pulse"></span> provides all the tools you need to manage your business efficiently, 
            whether you're a vendor or supplier.
          </p>
        </div>
        <motion.div 
          className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <motion.div key={feature.name} className="relative pl-16" variants={itemVariants}>
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </motion.div>
            ))}
          </dl>
        </motion.div>
      </div>
    </div>
  );
};

export default Features;
