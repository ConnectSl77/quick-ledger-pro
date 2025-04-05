import { supabase } from './client';
import { User } from '@supabase/supabase-js';

// Get the current user
export const getCurrentUser = async (): Promise<User | null> => {
  const { data, error } = await supabase.auth.getUser();
  
  if (error) {
    throw error;
  }
  
  return data?.user || null;
};

// Get the current supplier ID
export const getCurrentSupplierId = async (): Promise<string> => {
  const user = await getCurrentUser();
  
  if (!user) {
    throw new Error('No authenticated user found');
  }
  
  const { data, error } = await supabase
    .from('suppliers')
    .select('id')
    .eq('id', user.id)
    .single();
  
  if (error) {
    throw error;
  }
  
  return data?.id || '';
};

// Get supplier payments (received or made)
export const getSupplierPayments = async (
  supplierId: string, 
  type: 'received' | 'made'
) => {
  if (!supplierId) {
    return [];
  }

  const query = supabase
    .from('payments')
    .select('*');

  if (type === 'received') {
    // Payments received by this supplier
    query.eq('supplier_id', supplierId)
         .is('vendor_id', null);
  } else {
    // Payments made by this supplier to others
    query.eq('supplier_id', supplierId)
         .not('vendor_id', 'is', null);
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) {
    console.error(`Error fetching ${type} payments:`, error);
    throw error;
  }

  return data || [];
};

// Other query functions...
