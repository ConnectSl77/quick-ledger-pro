
import React, { useEffect, useState } from 'react';
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
import { getCurrentSupplierId, getSupplierPayments } from '@/integrations/supabase/queries';
import { useQuery } from '@tanstack/react-query';
import type { Database } from '@/integrations/supabase/types';

type Payment = Database['public']['Tables']['payments']['Row'];

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
  const [supplierId, setSupplierId] = useState<string>('');
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
  const [activeTab, setActiveTab] = useState('received');

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

  // Only fetch payments once we have the supplier ID
  const { data: paymentsReceived = [], isLoading: receivedLoading } = useQuery({
    queryKey: ['supplierPaymentsReceived', supplierId],
    queryFn: () => getSupplierPayments(supplierId, 'received'),
    enabled: !!supplierId
  });

  const { data: paymentsMade = [], isLoading: madeLoading } = useQuery({
    queryKey: ['supplierPaymentsMade', supplierId],
    queryFn: () => getSupplierPayments(supplierId, 'made'),
    enabled: !!supplierId
  });

  const isLoading = receivedLoading || madeLoading || !supplierId;

  // Filter payments based on search query and active tab
  useEffect(() => {
    const payments = activeTab === 'received' ? paymentsReceived : paymentsMade;
    if (payments) {
      setFilteredPayments(
        payments.filter(payment => 
          payment.customer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          payment.recipient_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          payment.method.toLowerCase().includes(searchQuery.toLowerCase()) ||
          payment.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
          payment.reference?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [paymentsReceived, paymentsMade, searchQuery, activeTab]);

  // Calculate payment stats
  const totalReceived = paymentsReceived
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + Number(p.amount), 0);
  
  const totalSpent = paymentsMade
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + Number(p.amount), 0);
  
  const pendingPayments = [...paymentsReceived, ...paymentsMade]
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + Number(p.amount), 0);

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
                SLL {totalReceived.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-1">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Spent</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                SLL {totalSpent.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-1">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                SLL {pendingPayments.toLocaleString()}
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Tabs defaultValue="received" onValueChange={setActiveTab}>
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
                      {activeTab === 'received' && filteredPayments.length > 0 ? (
                        filteredPayments.map((payment) => (
                          <TableRow key={payment.id}>
                            <TableCell className="font-medium">{payment.id.substring(0, 8)}</TableCell>
                            <TableCell>{payment.customer_name || 'N/A'}</TableCell>
                            <TableCell>{new Date(payment.payment_date || payment.created_at).toLocaleDateString()}</TableCell>
                            <TableCell>{payment.reference || 'N/A'}</TableCell>
                            <TableCell>{getPaymentMethodLabel(payment.method)}</TableCell>
                            <TableCell>SLL {Number(payment.amount).toLocaleString()}</TableCell>
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
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-4">No payment records found</TableCell>
                        </TableRow>
                      )}
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
                      {activeTab === 'made' && filteredPayments.length > 0 ? (
                        filteredPayments.map((payment) => (
                          <TableRow key={payment.id}>
                            <TableCell className="font-medium">{payment.id.substring(0, 8)}</TableCell>
                            <TableCell>{payment.recipient_name || 'N/A'}</TableCell>
                            <TableCell>{new Date(payment.payment_date || payment.created_at).toLocaleDateString()}</TableCell>
                            <TableCell>{payment.category || 'N/A'}</TableCell>
                            <TableCell>{getPaymentMethodLabel(payment.method)}</TableCell>
                            <TableCell>SLL {Number(payment.amount).toLocaleString()}</TableCell>
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
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-4">No payment records found</TableCell>
                        </TableRow>
                      )}
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
