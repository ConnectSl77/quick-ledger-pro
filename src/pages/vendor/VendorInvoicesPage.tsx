
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const VendorInvoicesPage = () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Invoices</h1>
        <FileText className="h-6 w-6 text-gray-500" />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 py-8">
            No invoices found. Invoices will appear here when they are generated.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorInvoicesPage;
