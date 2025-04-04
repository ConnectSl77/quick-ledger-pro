import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DollarSign, Package, Users, ShoppingBag, Truck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Order {
  id: string;
  amount: number;
  created_at: string;
  status: string;
  supplier_id: string;
  supplier_name: string;
}

interface Stats {
  totalRevenue: number;
  totalProducts: number;
  totalOrders: number;
  recentOrders: Order[];
}

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
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

const VendorDashboard = () => {
  // Mock data - replace with real data from Supabase
  const stats: Stats = {
    totalRevenue: 50000,
    totalProducts: 150,
    totalOrders: 45,
    recentOrders: [
      {
        id: '1',
        supplier_name: 'Supplier A',
        amount: 1200,
        created_at: '2024-03-15',
        status: 'delivered',
        supplier_id: 'supplier-1'
      },
      {
        id: '2',
        supplier_name: 'Supplier B',
        amount: 800,
        created_at: '2024-03-14',
        status: 'shipped',
        supplier_id: 'supplier-2'
      },
      {
        id: '3',
        supplier_name: 'Supplier C',
        amount: 1500,
        created_at: '2024-03-13',
        status: 'pending',
        supplier_id: 'supplier-3'
      }
    ]
  };

  const statsCards = [
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
      title: 'Suppliers', 
      value: stats.recentOrders.length.toString(), 
      change: '+8%', 
      icon: Users,
      description: 'Active suppliers',
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
  ];

  return (
    <motion.div
      className="p-6 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((card) => (
          <motion.div key={card.title} variants={itemVariants}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                <card.icon className={cn("h-4 w-4", `text-${card.color}-500`)} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className="text-xs text-muted-foreground">
                  {card.description}
                </p>
                <div className={cn("text-xs font-medium", `text-${card.color}-500`)}>
                  {card.change}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest supplier orders</CardDescription>
              </div>
              <Truck className="h-5 w-5 text-gray-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-sm text-muted-foreground">
                    <th className="p-4 text-left">Supplier</th>
                    <th className="p-4 text-left">Amount</th>
                    <th className="p-4 text-left">Date</th>
                    <th className="p-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentOrders.map((order) => (
                    <tr 
                      key={order.id} 
                      className="border-b hover:bg-muted/30 transition-colors"
                    >
                      <td className="p-4">{order.supplier_name}</td>
                      <td className="p-4 font-medium">SLL {order.amount.toLocaleString()}</td>
                      <td className="p-4 text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
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

export default VendorDashboard;
