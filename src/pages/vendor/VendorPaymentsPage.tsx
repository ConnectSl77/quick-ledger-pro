
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard } from 'lucide-react';

const VendorPaymentsPage = () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Payments</h1>
        <CreditCard className="h-6 w-6 text-gray-500" />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 py-8">
            No payment history available. Payment records will appear here when transactions are processed.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorPaymentsPage;
