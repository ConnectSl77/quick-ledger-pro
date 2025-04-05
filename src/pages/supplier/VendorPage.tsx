
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Search, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  lastOrder: string;
  totalOrders: number;
  totalSpent: number;
}

const VendorPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - replace with real data from Supabase
  const vendors: Vendor[] = [
    {
      id: '1',
      name: 'Vendor A',
      email: 'vendor.a@example.com',
      phone: '+232 123 456 789',
      status: 'active',
      lastOrder: '2024-03-15',
      totalOrders: 12,
      totalSpent: 15000
    },
    {
      id: '2',
      name: 'Vendor B',
      email: 'vendor.b@example.com',
      phone: '+232 987 654 321',
      status: 'active',
      lastOrder: '2024-03-14',
      totalOrders: 8,
      totalSpent: 8500
    },
    {
      id: '3',
      name: 'Vendor C',
      email: 'vendor.c@example.com',
      phone: '+232 456 789 123',
      status: 'inactive',
      lastOrder: '2024-02-28',
      totalOrders: 5,
      totalSpent: 6000
    }
  ];

  const filteredVendors = vendors.filter(vendor =>
    vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vendor.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6 text-gray-500" />
          <h1 className="text-2xl font-semibold text-gray-900">Vendors</h1>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Vendor
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search vendors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vendor List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-sm text-muted-foreground">
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Contact</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Last Order</th>
                  <th className="p-4 text-left">Total Orders</th>
                  <th className="p-4 text-left">Total Spent</th>
                </tr>
              </thead>
              <tbody>
                {filteredVendors.map((vendor) => (
                  <tr 
                    key={vendor.id} 
                    className="border-b hover:bg-muted/30 transition-colors"
                  >
                    <td className="p-4 font-medium">{vendor.name}</td>
                    <td className="p-4">
                      <div className="text-sm">{vendor.email}</div>
                      <div className="text-xs text-muted-foreground">{vendor.phone}</div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        vendor.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {vendor.status}
                      </span>
                    </td>
                    <td className="p-4 text-muted-foreground">
                      {new Date(vendor.lastOrder).toLocaleDateString()}
                    </td>
                    <td className="p-4">{vendor.totalOrders}</td>
                    <td className="p-4 font-medium">SLL {vendor.totalSpent.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorPage;
