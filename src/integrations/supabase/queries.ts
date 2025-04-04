
import { supabase } from './client';
import type { Database } from './types';

type Vendor = Database['public']['Tables']['vendors']['Row'];
type Supplier = Database['public']['Tables']['suppliers']['Row'];
type Product = Database['public']['Tables']['products']['Row'];
type Order = Database['public']['Tables']['orders']['Row'];
type Customer = Database['public']['Tables']['customers']['Row'];
type Payment = Database['public']['Tables']['payments']['Row'];

// Temporary function to get a supplier ID (will be replaced with auth)
export async function getCurrentSupplierId(): Promise<string> {
  // In a real app, this would come from authentication
  const { data } = await supabase.from('suppliers').select('id').limit(1);
  return data?.[0]?.id || '';
}

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

  const totalRevenue = orders?.reduce((sum, order) => sum + Number(order.amount), 0) || 0;
  const totalProducts = products?.length || 0;
  const totalOrders = orders?.length || 0;
  const recentOrders = orders?.slice(0, 4) || [];

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

  const totalRevenue = orders?.reduce((sum, order) => sum + Number(order.amount), 0) || 0;
  const totalProducts = products?.length || 0;
  const totalOrders = orders?.length || 0;
  const recentOrders = orders?.slice(0, 4) || [];

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

  const monthlyData = orders?.reduce((acc, order) => {
    const date = new Date(order.created_at);
    const month = date.toLocaleString('default', { month: 'short' });
    acc[month] = (acc[month] || 0) + Number(order.amount);
    return acc;
  }, {} as Record<string, number>) || {};

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

  const customerCounts = orders?.reduce((acc, order) => {
    acc[order.customer_name] = (acc[order.customer_name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  return Object.entries(customerCounts).map(([name, value]) => ({
    name,
    value,
  }));
}

export async function getSupplierProducts(supplierId: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('supplier_id', supplierId);

  if (error) {
    throw new Error('Failed to fetch supplier products');
  }

  return data || [];
}

export async function getSupplierOrders(supplierId: string) {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('supplier_id', supplierId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error('Failed to fetch supplier orders');
  }

  return data || [];
}

export async function getSupplierCustomers(supplierId: string) {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('supplier_id', supplierId);

  if (error) {
    throw new Error('Failed to fetch supplier customers');
  }

  return data || [];
}

export async function getSupplierPayments(supplierId: string, paymentType?: string) {
  let query = supabase
    .from('payments')
    .select('*')
    .eq('supplier_id', supplierId);

  if (paymentType) {
    query = query.eq('payment_type', paymentType);
  }

  const { data, error } = await query.order('payment_date', { ascending: false });

  if (error) {
    throw new Error('Failed to fetch supplier payments');
  }

  return data || [];
}
