
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ArrowUpRight, DollarSign, Package, Users, ShoppingBag, Truck } from 'lucide-react';

const orderData = [
  { name: 'Jan', amount: 830 },
  { name: 'Feb', amount: 1200 },
  { name: 'Mar', amount: 1100 },
  { name: 'Apr', amount: 1450 },
  { name: 'May', amount: 1900 },
  { name: 'Jun', amount: 2100 },
  { name: 'Jul', amount: 1800 },
];

const customerDistributionData = [
  { name: 'Retail Stores', value: 40 },
  { name: 'Supermarkets', value: 30 },
  { name: 'Online Retailers', value: 20 },
  { name: 'Others', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const statsCards = [
  { 
    title: 'Total Revenue', 
    value: '$32,800', 
    change: '+10%', 
    icon: DollarSign,
    description: 'Compared to last month',
    color: 'green',
  },
  { 
    title: 'Products', 
    value: '78', 
    change: '+5%', 
    icon: Package,
    description: '3 products added today',
    color: 'blue',
  },
  { 
    title: 'Customers', 
    value: '24', 
    change: '+8%', 
    icon: Users,
    description: '2 new customers this month',
    color: 'indigo',
  },
  { 
    title: 'Orders', 
    value: '156', 
    change: '+14%', 
    icon: ShoppingBag,
    description: '12 orders today',
    color: 'amber',
  },
];

const recentOrders = [
  { id: 1, customer: 'SuperMart Inc.', amount: '$2,450.00', date: '2 hours ago', status: 'delivered' },
  { id: 2, customer: 'QuickShop LLC', amount: '$1,800.50', date: 'Yesterday', status: 'shipped' },
  { id: 3, customer: 'Metro Retail', amount: '$3,200.75', date: '2 days ago', status: 'processing' },
  { id: 4, customer: 'City Stores', amount: '$980.00', date: '3 days ago', status: 'delivered' },
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

const SupplierDashboard = () => {
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
          Supplier Dashboard
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
            <CardTitle>Orders Overview</CardTitle>
            <CardDescription>Monthly order volume for the current year</CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={orderData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                  <YAxis stroke="#888888" fontSize={12} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#43A047"
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
            <CardTitle>Customer Distribution</CardTitle>
            <CardDescription>Breakdown of customer segments</CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customerDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {customerDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
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
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest customer orders</CardDescription>
              </div>
              <Truck className="h-5 w-5 text-gray-500" />
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
                  {recentOrders.map(order => (
                    <tr 
                      key={order.id} 
                      className="border-b hover:bg-muted/30 transition-colors"
                    >
                      <td className="p-4">{order.customer}</td>
                      <td className="p-4 font-medium">{order.amount}</td>
                      <td className="p-4 text-muted-foreground">{order.date}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                          order.status === 'shipped' ? 'bg-blue-100 text-blue-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
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

export default SupplierDashboard;
