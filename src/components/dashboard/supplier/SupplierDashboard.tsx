
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ArrowUpRight, DollarSign, Package, Users, ShoppingBag, Truck } from 'lucide-react';
import { getSupplierStats, getMonthlyStats, getCustomerDistribution, getCurrentSupplierId } from '@/integrations/supabase/queries';
import { useQuery } from '@tanstack/react-query';
import type { Database } from '@/integrations/supabase/types';

type Order = Database['public']['Tables']['orders']['Row'];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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
  const [supplierId, setSupplierId] = useState<string>('');

  // Fetch supplier ID first
  useEffect(() => {
    async function fetchSupplierId() {
      try {
        const id = await getCurrentSupplierId();
        setSupplierId(id);
      } catch (error) {
        console.error('Error fetching supplier ID:', error);
      }
    }
    
    fetchSupplierId();
  }, []);

  // Only fetch data once we have the supplier ID
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['supplierStats', supplierId],
    queryFn: () => getSupplierStats(supplierId),
    enabled: !!supplierId
  });

  const { data: orderData, isLoading: orderDataLoading } = useQuery({
    queryKey: ['monthlyStats', supplierId],
    queryFn: () => getMonthlyStats(supplierId, false),
    enabled: !!supplierId
  });

  const { data: customerData, isLoading: customerDataLoading } = useQuery({
    queryKey: ['customerDistribution', supplierId],
    queryFn: () => getCustomerDistribution(supplierId, false),
    enabled: !!supplierId
  });

  const isLoading = statsLoading || orderDataLoading || customerDataLoading || !supplierId;

  const statsCards = stats ? [
    { 
      title: 'Total Revenue', 
      value: `SLL ${stats.totalRevenue.toLocaleString()}`, 
      change: '+10%', 
      icon: DollarSign,
      description: 'Compared to last month',
      color: 'green',
    },
    { 
      title: 'Products', 
      value: stats.totalProducts.toString(), 
      change: '+5%', 
      icon: Package,
      description: 'Active products',
      color: 'blue',
    },
    { 
<<<<<<< HEAD
      title: 'Vendors', 
      value: stats.recentOrders.length.toString(), 
=======
      title: 'Customers', 
      value: (customerData?.length || 0).toString(), 
>>>>>>> 1ff5c04f743c5bfe28dba5e5e584652c5b0c4729
      change: '+8%', 
      icon: Users,
      description: 'Active vendors',
      color: 'indigo',
    },
    { 
      title: 'Orders', 
      value: stats.totalOrders.toString(), 
      change: '+14%', 
      icon: ShoppingBag,
      description: 'Total orders',
      color: 'amber',
    },
  ] : [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

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
          <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
        </motion.div>
      </div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        variants={itemVariants}
      >
        {statsCards.map((card) => (
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
                    data={customerData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {customerData?.map((entry, index) => (
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
                <CardDescription>Latest vendor orders</CardDescription>
              </div>
              <Truck className="h-5 w-5 text-gray-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-sm text-muted-foreground">
                    <th className="p-4 text-left">Vendor</th>
                    <th className="p-4 text-left">Amount</th>
                    <th className="p-4 text-left">Date</th>
                    <th className="p-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stats?.recentOrders.map((order: Order) => (
                    <tr 
                      key={order.id} 
                      className="border-b hover:bg-muted/30 transition-colors"
                    >
<<<<<<< HEAD
                      <td className="p-4">{order.vendor_name}</td>
                      <td className="p-4 font-medium">SLL {order.amount.toLocaleString()}</td>
=======
                      <td className="p-4">{order.customer_name}</td>
                      <td className="p-4 font-medium">SLL {Number(order.amount).toLocaleString()}</td>
>>>>>>> 1ff5c04f743c5bfe28dba5e5e584652c5b0c4729
                      <td className="p-4 text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                          order.status === 'shipped' ? 'bg-blue-100 text-blue-800' : 
                          order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
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
