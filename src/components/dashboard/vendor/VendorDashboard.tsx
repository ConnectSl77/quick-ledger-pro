
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ArrowUpRight, DollarSign, Package, Users, ShoppingCart, FileText } from 'lucide-react';

const salesData = [
  { name: 'Jan', amount: 1200 },
  { name: 'Feb', amount: 1900 },
  { name: 'Mar', amount: 1500 },
  { name: 'Apr', amount: 2400 },
  { name: 'May', amount: 2700 },
  { name: 'Jun', amount: 3100 },
  { name: 'Jul', amount: 3500 },
];

const inventoryData = [
  { name: 'Electronics', count: 45 },
  { name: 'Clothing', count: 30 },
  { name: 'Books', count: 25 },
  { name: 'Food', count: 18 },
  { name: 'Toys', count: 15 },
];

const statsCards = [
  { 
    title: 'Total Revenue', 
    value: '$12,500', 
    change: '+15%', 
    icon: DollarSign,
    description: 'Compared to last month',
    color: 'blue',
  },
  { 
    title: 'Products', 
    value: '145', 
    change: '+4%', 
    icon: Package,
    description: '5 products added today',
    color: 'green',
  },
  { 
    title: 'Suppliers', 
    value: '12', 
    change: '+2%', 
    icon: Users,
    description: '2 new suppliers this month',
    color: 'purple',
  },
  { 
    title: 'Sales', 
    value: '352', 
    change: '+12%', 
    icon: ShoppingCart,
    description: '42 sales today',
    color: 'amber',
  },
];

const recentTransactions = [
  { id: 1, customer: 'John Smith', amount: '$124.00', date: '2 minutes ago', status: 'completed' },
  { id: 2, customer: 'Lisa Johnson', amount: '$530.50', date: '2 hours ago', status: 'processing' },
  { id: 3, customer: 'Michael Brown', amount: '$80.25', date: '5 hours ago', status: 'completed' },
  { id: 4, customer: 'Sarah Davis', amount: '$250.00', date: 'Yesterday', status: 'completed' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const VendorDashboard = () => {
  return (
    <motion.div
      className="p-6 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center justify-between">
        <motion.h1 
          className="text-2xl font-semibold text-gray-900"
          variants={itemVariants}
        >
          Vendor Dashboard
        </motion.h1>
        <motion.div variants={itemVariants}>
          <p className="text-sm text-gray-500">Last updated: April 4, 2025</p>
        </motion.div>
      </div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        variants={itemVariants}
      >
        {statsCards.map((card, index) => (
          <Card key={card.title} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className={`h-4 w-4 text-${card.color}-500`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <span className={`flex items-center text-${card.color}-600 mr-1`}>
                  <ArrowUpRight className="h-3 w-3 mr-1" /> {card.change}
                </span>
                {card.description}
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>
      
      <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6" variants={itemVariants}>
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue for the current year</CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                  <YAxis stroke="#888888" fontSize={12} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#1E88E5"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Product Categories</CardTitle>
            <CardDescription>Inventory distribution by category</CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={inventoryData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                  <YAxis stroke="#888888" fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#1E88E5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Latest sales and orders</CardDescription>
              </div>
              <FileText className="h-5 w-5 text-gray-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-sm text-muted-foreground">
                    <th className="p-4 text-left">Customer</th>
                    <th className="p-4 text-left">Amount</th>
                    <th className="p-4 text-left">Date</th>
                    <th className="p-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map(transaction => (
                    <tr 
                      key={transaction.id} 
                      className="border-b hover:bg-muted/30 transition-colors"
                    >
                      <td className="p-4">{transaction.customer}</td>
                      <td className="p-4 font-medium">{transaction.amount}</td>
                      <td className="p-4 text-muted-foreground">{transaction.date}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default VendorDashboard;
