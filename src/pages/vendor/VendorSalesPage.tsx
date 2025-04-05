
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';

const VendorSalesPage = () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Sales</h1>
        <ShoppingCart className="h-6 w-6 text-gray-500" />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Sales Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 py-8">
            No sales data available. Sales information will appear here when transactions are recorded.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorSalesPage;
