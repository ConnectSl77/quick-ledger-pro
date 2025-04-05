
import { useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from '@/components/dashboard/Sidebar';

const DashboardLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { userType } = useParams();
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        toggleSidebar={toggleSidebar}
      />
      
      <motion.div 
        className="flex-1 overflow-auto"
        initial={false}
        animate={{ 
          marginLeft: sidebarCollapsed ? 80 : 250
        }}
        transition={{ duration: 0.2 }}
      >
        <Outlet />
      </motion.div>
    </div>
  );
};

export default DashboardLayout;
