import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient, User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface SupabaseContextType {
  user: User | null;
  userType: 'vendor' | 'supplier' | null;
  signOut: () => Promise<void>;
  supabase: typeof supabase;
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined);

export const SupabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<'vendor' | 'supplier' | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserType(session.user.id);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchUserType(session.user.id);
      } else {
        setUserType(null);
        navigate('/login');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const fetchUserType = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('user_type')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setUserType(data.user_type);
    } catch (error) {
      console.error('Error fetching user type:', error);
      setUserType(null);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setUserType(null);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <SupabaseContext.Provider value={{ user, userType, signOut, supabase }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
}; 