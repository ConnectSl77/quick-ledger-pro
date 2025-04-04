
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Building2, 
  MapPin, 
  Bell, 
  CreditCard, 
  Shield, 
  Globe, 
  Upload, 
  Check, 
  X 
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const SupplierSettings = () => {
  return (
    <motion.div
      className="p-6 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="flex items-center justify-between"
        variants={itemVariants}
      >
        <h1 className="text-2xl font-semibold">Account Settings</h1>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="business">Business</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg" alt="Profile picture" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm" className="mb-2">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Photo
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      JPG, GIF or PNG. Max size: 2MB
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" defaultValue="Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone-number">Phone Number</Label>
                    <Input id="phone-number" defaultValue="+232 76 123 4567" />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button className="bg-supplier">Save Changes</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>
                  Manage your application preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="kri">Krio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="gmt">
                      <SelectTrigger>
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                        <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                        <SelectItem value="cet">Central European Time (CET)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select defaultValue="sll">
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sll">Sierra Leonean Leone (SLL)</SelectItem>
                        <SelectItem value="usd">US Dollar (USD)</SelectItem>
                        <SelectItem value="eur">Euro (EUR)</SelectItem>
                        <SelectItem value="gbp">British Pound (GBP)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date-format">Date Format</Label>
                    <Select defaultValue="dd-mm-yyyy">
                      <SelectTrigger>
                        <SelectValue placeholder="Select date format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="yyyy-mm-dd">YYYY/MM/DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button className="bg-supplier">Save Preferences</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="business" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
                <CardDescription>
                  Update your business details, location and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="business-name">Business Name</Label>
                    <Input id="business-name" defaultValue="Sierra Fresh Produce" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-type">Business Type</Label>
                    <Select defaultValue="wholesaler">
                      <SelectTrigger>
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wholesaler">Wholesaler</SelectItem>
                        <SelectItem value="manufacturer">Manufacturer</SelectItem>
                        <SelectItem value="distributor">Distributor</SelectItem>
                        <SelectItem value="farmer">Farmer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-email">Business Email</Label>
                    <Input id="business-email" type="email" defaultValue="info@sierrafresh.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-phone">Business Phone</Label>
                    <Input id="business-phone" defaultValue="+232 76 987 6543" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tax-id">Tax ID / Business Registration Number</Label>
                    <Input id="tax-id" defaultValue="SL12345678" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year-established">Year Established</Label>
                    <Input id="year-established" defaultValue="2018" />
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <h3 className="text-lg font-medium mb-2">Business Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="address-line1">Address Line 1</Label>
                    <Input id="address-line1" defaultValue="123 Main Street" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address-line2">Address Line 2 (Optional)</Label>
                    <Input id="address-line2" defaultValue="Building A" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" defaultValue="Freetown" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="region">Region/State</Label>
                    <Input id="region" defaultValue="Western Area" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postal-code">Postal Code</Label>
                    <Input id="postal-code" defaultValue="" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" defaultValue="Sierra Leone" />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button className="bg-supplier">Update Business Info</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Business Profile</CardTitle>
                <CardDescription>
                  Optimize your business profile for better visibility
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="business-description">Business Description</Label>
                  <textarea 
                    id="business-description"
                    className="flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    defaultValue="Sierra Fresh Produce is a leading supplier of high-quality fresh produce to vendors across Sierra Leone. We specialize in locally sourced fruits and vegetables from sustainable farming practices."
                  ></textarea>
                </div>
                
                <div className="space-y-2">
                  <Label>Business Categories</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline" className="bg-gray-100">Fresh Produce</Badge>
                    <Badge variant="outline" className="bg-gray-100">Agriculture</Badge>
                    <Badge variant="outline" className="bg-gray-100">Wholesale</Badge>
                    <Badge variant="outline" className="bg-gray-100 hover:bg-gray-200 cursor-pointer">+ Add Category</Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Logo</Label>
                  <div className="flex items-center space-x-4 mt-2">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/placeholder.svg" alt="Business logo" />
                      <AvatarFallback>SF</AvatarFallback>
                    </Avatar>
                    <div>
                      <Button variant="outline" size="sm" className="mb-2">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Logo
                      </Button>
                      <p className="text-sm text-muted-foreground">
                        Recommended size: 512x512 pixels
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Social Media Links</Label>
                  <div className="grid grid-cols-1 gap-3 mt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium w-24">Website</span>
                      <Input placeholder="https://..." defaultValue="https://sierrafresh.com" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium w-24">Facebook</span>
                      <Input placeholder="https://facebook.com/..." defaultValue="" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium w-24">Instagram</span>
                      <Input placeholder="https://instagram.com/..." defaultValue="" />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button className="bg-supplier">Save Profile</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="billing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
                <CardDescription>
                  Update your billing details and view subscription plan
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-50 border rounded-md p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium">Current Plan: <span className="font-semibold">Free</span></h3>
                      <p className="text-sm text-muted-foreground mt-1">Basic features for small suppliers</p>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Features included:</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        Up to 50 products
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        Basic analytics
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        5 user accounts
                      </li>
                      <li className="flex items-center">
                        <X className="h-4 w-4 text-red-500 mr-2" />
                        Advanced reporting
                      </li>
                      <li className="flex items-center">
                        <X className="h-4 w-4 text-red-500 mr-2" />
                        API access
                      </li>
                    </ul>
                  </div>
                  <Button className="mt-4 bg-supplier">Upgrade Plan</Button>
                </div>
                
                <Separator className="my-4" />
                
                <h3 className="text-lg font-medium">Payment Methods</h3>
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center">
                    <CreditCard className="h-6 w-6 mr-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">No payment methods added</p>
                      <p className="text-sm text-muted-foreground">Add a payment method to upgrade your plan</p>
                    </div>
                  </div>
                  <Button variant="outline">Add Payment Method</Button>
                </div>
                
                <Separator className="my-4" />
                
                <h3 className="text-lg font-medium">Billing Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="space-y-2">
                    <Label htmlFor="billing-name">Name on Invoice</Label>
                    <Input id="billing-name" defaultValue="Sierra Fresh Produce" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="billing-email">Billing Email</Label>
                    <Input id="billing-email" type="email" defaultValue="billing@sierrafresh.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="billing-address">Billing Address</Label>
                    <Input id="billing-address" defaultValue="123 Main Street" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="billing-city">City</Label>
                    <Input id="billing-city" defaultValue="Freetown" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="billing-country">Country</Label>
                    <Input id="billing-country" defaultValue="Sierra Leone" />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button className="bg-supplier">Save Billing Information</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Configure what notifications you receive and how
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Email Notifications</h3>
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="space-y-0.5">
                      <Label className="text-base">Order Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications for new orders and changes
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="space-y-0.5">
                      <Label className="text-base">Inventory Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications for low stock and inventory issues
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="space-y-0.5">
                      <Label className="text-base">Payment Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications for payments and invoices
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="space-y-0.5">
                      <Label className="text-base">System Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about system updates and new features
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="space-y-0.5">
                      <Label className="text-base">Marketing & Promotions</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive occasional promotional content and offers
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">SMS Notifications</h3>
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="space-y-0.5">
                      <Label className="text-base">Order Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive SMS for critical order updates
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="space-y-0.5">
                      <Label className="text-base">Payment Confirmations</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive SMS confirmations for payments
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button className="bg-supplier">Save Notification Preferences</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your account security and login options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Change Password</h3>
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <Button className="bg-supplier">Change Password</Button>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Two-factor authentication is disabled</p>
                      <p className="text-sm text-muted-foreground">
                        Enable to improve your account security
                      </p>
                    </div>
                    <Button variant="outline">Enable</Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Device Management</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage devices that are currently logged into your account
                  </p>
                  <div className="border rounded-md p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Current Device</p>
                        <p className="text-sm text-muted-foreground">
                          Chrome on Windows • Freetown, Sierra Leone
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Last active: Today at 3:24 PM
                        </p>
                      </div>
                      <Badge>Current</Badge>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Account Actions</h3>
                  <div className="border rounded-md p-4 bg-gray-50">
                    <div className="space-y-2">
                      <p className="font-medium">Export Account Data</p>
                      <p className="text-sm text-muted-foreground">
                        Download a copy of your account data and history
                      </p>
                      <Button variant="outline">Request Export</Button>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="space-y-2">
                      <p className="font-medium text-red-600">Delete Account</p>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete your account and all associated data
                      </p>
                      <Button variant="destructive">Delete Account</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

export default SupplierSettings;
