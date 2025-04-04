
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Plus, Edit, Trash, BarChart4 } from 'lucide-react';
import { getCurrentSupplierId, getSupplierProducts } from '@/integrations/supabase/queries';
import { useQuery } from '@tanstack/react-query';
import type { Database } from '@/integrations/supabase/types';

type Product = Database['public']['Tables']['products']['Row'];

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

const getStockStatusColor = (status: string) => {
  switch (status) {
    case 'in_stock':
      return 'bg-green-100 text-green-800';
    case 'low_stock':
      return 'bg-yellow-100 text-yellow-800';
    case 'out_of_stock':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStockStatusLabel = (status: string) => {
  switch (status) {
    case 'in_stock':
      return 'In Stock';
    case 'low_stock':
      return 'Low Stock';
    case 'out_of_stock':
      return 'Out of Stock';
    default:
      return status;
  }
};

const SupplierInventory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [supplierId, setSupplierId] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

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

  // Only fetch products once we have the supplier ID
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['supplierProducts', supplierId],
    queryFn: () => getSupplierProducts(supplierId),
    enabled: !!supplierId
  });

  // Filter products based on search query
  useEffect(() => {
    if (products) {
      setFilteredProducts(
        products.filter(product => 
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.status?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [products, searchQuery]);

  // Calculate inventory stats
  const lowStockCount = products.filter(p => p.status === 'low_stock').length;
  const outOfStockCount = products.filter(p => p.status === 'out_of_stock').length;

  if (isLoading || !supplierId) {
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
        <h1 className="text-2xl font-semibold">Inventory</h1>
        <div className="flex items-center gap-2">
          <Button className="bg-supplier">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-1">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Products</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{products.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-1">
              <CardTitle className="text-sm font-medium text-muted-foreground">Low Stock Items</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{lowStockCount}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-1">
              <CardTitle className="text-sm font-medium text-muted-foreground">Out of Stock</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{outOfStockCount}</p>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Product Inventory</CardTitle>
            <CardDescription>
              Manage your product inventory and stock
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
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
                    <TableHead>Product ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.id.substring(0, 8)}</TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.category || 'N/A'}</TableCell>
                        <TableCell>SLL {Number(product.price).toLocaleString()}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>
                          <Badge className={getStockStatusColor(product.status || '')} variant="outline">
                            {getStockStatusLabel(product.status || '')}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button variant="ghost" size="sm">
                              <BarChart4 className="h-4 w-4" />
                              <span className="sr-only">Analytics</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-500">
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4">No products found</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default SupplierInventory;
