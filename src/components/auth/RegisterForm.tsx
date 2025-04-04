import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  userType: 'vendor' | 'supplier';
  fullName: string;
  phone: string;
  city: string;
  address: string;
  businessName: string;
}

const RegisterForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'vendor',
    fullName: '',
    phone: '',
    city: '',
    address: '',
    businessName: '',
  });

  const cities = ['Freetown', 'Kenema', 'Bo', 'Kailahun', 'Makeni'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate passwords match
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Error",
          description: "Passwords do not match",
          variant: "destructive",
        });
        return;
      }

      // Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard/${formData.userType}`,
          data: {
            user_type: formData.userType,
            full_name: formData.fullName,
            phone: formData.phone,
            city: formData.city,
            address: formData.address,
            business_name: formData.businessName,
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        // Create user profile in the database
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user.id,
            full_name: formData.fullName,
            phone: formData.phone,
            city: formData.city,
            address: formData.address,
            business_name: formData.businessName,
          });

        if (profileError) throw profileError;

        // Create user record with user type
        const { error: userError } = await supabase
          .from('users')
          .insert({
            id: authData.user.id,
            email: formData.email,
            user_type: formData.userType,
          });

        if (userError) throw userError;

        setVerificationSent(true);
        toast({
          title: "Registration Successful",
          description: "Please check your email to verify your account",
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "An error occurred during registration",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md space-y-8"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight">Create an account</h2>
        <p className="mt-2 text-sm text-gray-600">
          {step === 1 ? "Choose your account type" : "Complete your profile"}
        </p>
      </div>

      {verificationSent ? (
        <div className="text-center space-y-4">
          <p className="text-green-600">
            Please check your email to verify your account before logging in.
          </p>
          <Button
            onClick={() => navigate('/login')}
            className="w-full"
          >
            Return to Login
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 ? (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>

              <div className="space-y-2">
                <Label>Account Type</Label>
                <RadioGroup
                  value={formData.userType}
                  onValueChange={(value: 'vendor' | 'supplier') =>
                    setFormData(prev => ({ ...prev, userType: value }))
                  }
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="vendor" id="vendor" />
                    <Label htmlFor="vendor">Vendor</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="supplier" id="supplier" />
                    <Label htmlFor="supplier">Supplier</Label>
                  </div>
                </RadioGroup>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  name="businessName"
                  required
                  value={formData.businessName}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="city">City</Label>
                <Select
                  value={formData.city}
                  onValueChange={(value) =>
                    setFormData(prev => ({ ...prev, city: value }))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select your city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
            </motion.div>
          )}

          <div className="flex justify-between">
            {step === 2 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(1)}
                disabled={loading}
              >
                Back
              </Button>
            )}
            {step === 1 ? (
              <Button
                type="button"
                onClick={() => setStep(2)}
                className="ml-auto"
                disabled={loading}
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                className="ml-auto"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            )}
          </div>
        </form>
      )}
    </motion.div>
  );
};

export default RegisterForm;
