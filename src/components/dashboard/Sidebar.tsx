import React, { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  FileText,
  ShoppingCart,
  Package,
  Users,
  Settings,
  LogOut,
  CreditCard,
  ChevronRight,
  Menu,
  MessageSquare,
  ShoppingBag,
  BarChart,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import MessagePanel from './messaging/MessagePanel';

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ collapsed, toggleSidebar }: SidebarProps) => {
  const location = useLocation();
  const { userType } = useParams();
  const { toast } = useToast();
  const [messageVisible, setMessageVisible] = useState(false);
  
  const isVendor = userType === 'vendor';
  
  const vendorLinks = [
    { href: `/dashboard/vendor`, label: 'Dashboard', icon: LayoutDashboard },
    { href: `/dashboard/vendor/invoices`, label: 'Invoices', icon: FileText },
    { href: `/dashboard/vendor/sales`, label: 'Sales', icon: ShoppingCart },
    { href: `/dashboard/vendor/inventory`, label: 'Inventory', icon: Package },
    { href: `/dashboard/vendor/suppliers`, label: 'Suppliers', icon: Users },
    { href: `/dashboard/vendor/payments`, label: 'Payments', icon: CreditCard },
    { href: `/dashboard/vendor/settings`, label: 'Settings', icon: Settings },
  ];
  
  const supplierLinks = [
    { href: `/dashboard/supplier`, label: 'Dashboard', icon: LayoutDashboard },
    { href: `/dashboard/supplier/orders`, label: 'Orders', icon: ShoppingCart },
    { href: `/dashboard/supplier/inventory`, label: 'Inventory', icon: Package },
    { href: `/dashboard/supplier/vendors`, label: 'Vendors', icon: Users },
    { href: `/dashboard/supplier/payments`, label: 'Payments', icon: CreditCard },
    { href: `/dashboard/supplier/settings`, label: 'Settings', icon: Settings },
  ];
  
  const links = isVendor ? vendorLinks : supplierLinks;
  const accentColor = isVendor ? 'vendor' : 'supplier';

  const toggleMessages = () => {
    setMessageVisible(!messageVisible);
    if (!messageVisible) {
      toast({
        title: "Messages Panel",
        description: "You can now communicate with your suppliers/vendors",
      });
    }
  };

  return (
    <motion.div 
      className={cn(
        "h-full flex flex-col bg-white border-r border-gray-200 shadow-sm",
        collapsed ? "w-[80px]" : "w-[250px]"
      )}
      initial={false}
      animate={{ width: collapsed ? 80 : 250 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b">
        {!collapsed && (
          <Link 
            to={`/dashboard/${userType}`} 
            className={`text-lg font-semibold text-${accentColor} truncate`}
          >
            {isVendor ? 'Vendor Portal' : 'Supplier Portal'}
          </Link>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar} 
          className="ml-auto"
        >
          <Menu size={20} />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {links.map((link) => {
            const isActive = location.pathname === link.href;
            const LinkIcon = link.icon;
            
            return (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md group",
                  isActive 
                    ? `bg-${accentColor}/10 text-${accentColor}` 
                    : "text-gray-600 hover:bg-gray-100",
                  collapsed && "justify-center"
                )}
              >
                <LinkIcon className={cn("h-5 w-5 flex-shrink-0", isActive && `text-${accentColor}`)} />
                {!collapsed && (
                  <>
                    <span className="ml-3">{link.label}</span>
                    {isActive && (
                      <motion.div 
                        layoutId="activeNav"
                        className={`ml-auto h-4 w-1 rounded-full bg-${accentColor}`} 
                      />
                    )}
                  </>
                )}
              </Link>
            );
          })}
          
          {/* Messages Button */}
          <button
            onClick={toggleMessages}
            className={cn(
              "flex items-center px-3 py-2 rounded-md group w-full",
              messageVisible 
                ? `bg-${accentColor}/10 text-${accentColor}` 
                : "text-gray-600 hover:bg-gray-100",
              collapsed && "justify-center"
            )}
          >
            <MessageSquare className={cn(
              "h-5 w-5 flex-shrink-0", 
              messageVisible && `text-${accentColor}`
            )} />
            {!collapsed && (
              <>
                <span className="ml-3">Messages</span>
                {messageVisible && (
                  <motion.div 
                    layoutId="activeMessage"
                    className={`ml-auto h-4 w-1 rounded-full bg-${accentColor}`} 
                  />
                )}
              </>
            )}
          </button>
        </nav>
      </div>
      
      {/* Message Panel */}
      {messageVisible && !collapsed && (
        <div className="p-3 border-t">
          <MessagePanel userType={userType || 'supplier'} />
        </div>
      )}
      
      <div className="p-4 border-t">
        <Link
          to="/login"
          className={cn(
            "flex items-center px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100",
            collapsed && "justify-center"
          )}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span className="ml-3">Logout</span>}
        </Link>
      </div>
    </motion.div>
  );
};

export default Sidebar;
