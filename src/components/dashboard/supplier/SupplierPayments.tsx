
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, CreditCard, Download, FileText, PlusCircle } from 'lucide-react';

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

// Sample data for payments received
const paymentsReceived = [
  {
    id: 'PAY-001',
    customer: 'ACME Trading',
    date: '2025-04-02',
    amount: 1250.00,
    method: 'bank_transfer',
    status: 'completed',
    reference: 'INV-0012',
  },
  {
    id: 'PAY-002',
    customer: 'Global Markets Ltd',
    date: '2025-04-01',
    amount: 890.50,
    method: 'mobile_money',
    status: 'completed',
    reference: 'INV-0011',
  },
  {
    id: 'PAY-003',
    customer: 'Local Store Inc',
    date: '2025-03-30',
    amount: 320.75,
    method: 'cash',
    status: 'completed',
    reference: 'INV-0010',
  },
  {
    id: 'PAY-004',
    customer: 'City Mart',
    date: '2025-03-28',
    amount: 1450.00,
    method: 'mobile_money',
    status: 'pending',
    reference: 'INV-0009',
  },
  {
    id: 'PAY-005',
    customer: 'Fresh Foods Market',
    date: '2025-03-25',
    amount: 785.25,
    method: 'bank_transfer',
    status: 'failed',
    reference: 'INV-0008',
  },
];

// Sample data for payments made
const paymentsMade = [
  {
    id: 'EXP-001',
    recipient: 'Rice Supplier Co.',
    date: '2025-04-01',
    amount: 2500.00,
    method: 'bank_transfer',
    status: 'completed',
    category: 'Inventory Purchase',
  },
  {
    id: 'EXP-002',
    recipient: 'Transport Services',
    date: '2025-03-28',
    amount: 450.00,
    method: 'mobile_money',
    status: 'completed',
    category: 'Logistics',
  },
  {
    id: 'EXP-003',
    recipient: 'Packaging Supplies',
    date: '2025-03-25',
    amount: 320.75,
    method: 'cash',
    status: 'completed',
    category: 'Supplies',
  },
  {
    id: 'EXP-004',
    recipient: 'Rent',
    date: '2025-03-20',
    amount: 800.00,
    method: 'bank_transfer',
    status: 'pending',
    category: 'Overhead',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'failed':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getPaymentMethodLabel = (method: string) => {
  switch (method) {
    case 'bank_transfer':
      return 'Bank Transfer';
    case 'mobile_money':
      return 'Mobile Money';
    case 'cash':
      return 'Cash';
    default:
      return method.replace('_', ' ');
  }
};

const SupplierPayments = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <motion.div
      className="p-6 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        variants={itemVariants}
      >
        <h1 className="text-2xl font-semibold">Payment Management</h1>
        <div className="flex items-center gap-2">
          <Button className="bg-supplier">
            <CreditCard className="mr-2 h-4 w-4" />
            Record Payment
          </Button>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-1">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Received</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                SLL {paymentsReceived
                  .filter(p => p.status === 'completed')
                  .reduce((sum, p) => sum + p.amount, 0)
                  .toLocaleString()}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-1">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Spent</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                SLL {paymentsMade
                  .filter(p => p.status === 'completed')
                  .reduce((sum, p) => sum + p.amount, 0)
                  .toLocaleString()}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-1">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                SLL {[...paymentsReceived, ...paymentsMade]
                  .filter(p => p.status === 'pending')
                  .reduce((sum, p) => sum + p.amount, 0)
                  .toLocaleString()}
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Tabs defaultValue="received">
          <TabsList className="mb-4">
            <TabsTrigger value="received">Payments Received</TabsTrigger>
            <TabsTrigger value="made">Payments Made</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
          </TabsList>
          
          <TabsContent value="received">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Payments Received</CardTitle>
                <CardDescription>
                  Track payments received from customers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search payments..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Payment ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Reference</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paymentsReceived.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.id}</TableCell>
                          <TableCell>{payment.customer}</TableCell>
                          <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                          <TableCell>{payment.reference}</TableCell>
                          <TableCell>{getPaymentMethodLabel(payment.method)}</TableCell>
                          <TableCell>SLL {payment.amount.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(payment.status)} variant="outline">
                              {payment.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="made">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Payments Made</CardTitle>
                <CardDescription>
                  Track payments made to suppliers and expenses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search expenses..."
                      className="pl-8"
                    />
                  </div>
                </div>
                
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Payment ID</TableHead>
                        <TableHead>Recipient</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paymentsMade.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.id}</TableCell>
                          <TableCell>{payment.recipient}</TableCell>
                          <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                          <TableCell>{payment.category}</TableCell>
                          <TableCell>{getPaymentMethodLabel(payment.method)}</TableCell>
                          <TableCell>SLL {payment.amount.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(payment.status)} variant="outline">
                              {payment.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="invoices">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div>
                    <CardTitle className="text-lg">Invoices</CardTitle>
                    <CardDescription>
                      Manage and create invoices
                    </CardDescription>
                  </div>
                  <Button className="bg-supplier">
                    <FileText className="mr-2 h-4 w-4" />
                    Create Invoice
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center p-8 text-muted-foreground">
                  <div className="text-center">
                    <PlusCircle className="mx-auto h-12 w-12 opacity-20" />
                    <h3 className="mt-4 text-lg font-medium">No invoices created yet</h3>
                    <p className="mt-2 text-sm">
                      Create your first invoice to start tracking payments
                    </p>
                    <Button className="mt-4 bg-supplier">
                      <FileText className="mr-2 h-4 w-4" />
                      Create Invoice
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

export default SupplierPayments;
