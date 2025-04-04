import { supabase } from './client';
import type { Database } from './types';

type Vendor = Database['public']['Tables']['vendors']['Row'];
type Supplier = Database['public']['Tables']['suppliers']['Row'];
type Product = Database['public']['Tables']['products']['Row'];
type Order = Database['public']['Tables']['orders']['Row'];

export async function getVendorStats(vendorId: string) {
  const { data: products, error: productsError } = await supabase
    .from('products')
    .select('*')
    .eq('vendor_id', vendorId);

  const { data: orders, error: ordersError } = await supabase
    .from('orders')
    .select('*')
    .eq('vendor_id', vendorId);

  if (productsError || ordersError) {
    throw new Error('Failed to fetch vendor stats');
  }

  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const recentOrders = orders.slice(0, 4);

  return {
    totalRevenue,
    totalProducts,
    totalOrders,
    recentOrders,
  };
}

export async function getSupplierStats(supplierId: string) {
  const { data: products, error: productsError } = await supabase
    .from('products')
    .select('*')
    .eq('supplier_id', supplierId);

  const { data: orders, error: ordersError } = await supabase
    .from('orders')
    .select('*')
    .eq('supplier_id', supplierId);

  if (productsError || ordersError) {
    throw new Error('Failed to fetch supplier stats');
  }

  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const recentOrders = orders.slice(0, 4);

  return {
    totalRevenue,
    totalProducts,
    totalOrders,
    recentOrders,
  };
}

export async function getMonthlyStats(userId: string, isVendor: boolean) {
  const { data: orders, error } = await supabase
    .from('orders')
    .select('*')
    .eq(isVendor ? 'vendor_id' : 'supplier_id', userId);

  if (error) {
    throw new Error('Failed to fetch monthly stats');
  }

  const monthlyData = orders.reduce((acc, order) => {
    const date = new Date(order.created_at);
    const month = date.toLocaleString('default', { month: 'short' });
    acc[month] = (acc[month] || 0) + order.amount;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(monthlyData).map(([name, amount]) => ({
    name,
    amount,
  }));
}

export async function getCustomerDistribution(userId: string, isVendor: boolean) {
  const { data: orders, error } = await supabase
    .from('orders')
    .select('customer_name')
    .eq(isVendor ? 'vendor_id' : 'supplier_id', userId);

  if (error) {
    throw new Error('Failed to fetch customer distribution');
  }

  const customerCounts = orders.reduce((acc, order) => {
    acc[order.customer_name] = (acc[order.customer_name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(customerCounts).map(([name, value]) => ({
    name,
    value,
  }));
} 