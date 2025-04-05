import { supabase } from './client';

// Define types for database operations
type Message = {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
};

// Functions for messages
export async function createMessage(senderId: string, receiverId: string, content: string) {
  try {
    await supabase.rpc('insert_message', {
      p_sender_id: senderId,
      p_receiver_id: receiverId,
      p_content: content
    });
  } catch (error) {
    console.error('Error creating message:', error);
    throw new Error('Failed to send message');
  }
}

export async function getConversations(userId: string) {
  try {
    const { data, error } = await supabase.rpc('get_conversations', { 
      user_id: userId 
    });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error getting conversations:', error);
    throw new Error('Failed to fetch conversations');
  }
}

export async function getMessages(userId: string, otherUserId: string) {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
      .or(`sender_id.eq.${otherUserId},receiver_id.eq.${otherUserId}`)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data as Message[];
  } catch (error) {
    console.error('Error getting messages:', error);
    throw new Error('Failed to fetch messages');
  }
}

// Stats and metrics
export async function getVendorStats(vendorId: string) {
  try {
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
  } catch (error) {
    console.error('Error getting vendor stats:', error);
    throw new Error('Failed to fetch vendor stats');
  }
}

export async function getSupplierStats(supplierId: string) {
  try {
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
  } catch (error) {
    console.error('Error getting supplier stats:', error);
    throw new Error('Failed to fetch supplier stats');
  }
}

export async function getMonthlyStats(userId: string, isVendor: boolean) {
  try {
    const { data: orders, error } = await supabase
      .from('orders')
      .select('*')
      .eq(isVendor ? 'vendor_id' : 'supplier_id', userId);

    if (error) {
      throw error;
    }

    const monthlyData = orders?.reduce((acc, order) => {
      if (order.created_at) {
        const date = new Date(order.created_at);
        const month = date.toLocaleString('default', { month: 'short' });
        acc[month] = (acc[month] || 0) + Number(order.amount);
      }
      return acc;
    }, {} as Record<string, number>) || {};

    return Object.entries(monthlyData).map(([name, amount]) => ({
      name,
      amount,
    }));
  } catch (error) {
    console.error('Error getting monthly stats:', error);
    throw new Error('Failed to fetch monthly stats');
  }
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
