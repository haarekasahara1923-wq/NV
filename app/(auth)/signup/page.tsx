'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import MECodeInput from '@/components/MECodeInput';

export default function SignupPage() {
  const [type, setType] = useState<'CLIENT' | 'EMPLOYEE'>('CLIENT');
  const [employeeRole, setEmployeeRole] = useState<'ME' | 'SM'>('ME');
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: '', meCode: '', 
    employeeCode: '', smCode: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setSuccess('');
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }
    setLoading(true);
    
    try {
      const payload = { 
        ...formData, 
        signupType: type === 'CLIENT' ? 'CLIENT' : (employeeRole === 'ME' ? 'ME' : 'SM')
      };
      
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error);

      if (type === 'EMPLOYEE') {
        window.location.href = data.redirect || '/login';
      } else {
        window.location.href = data.redirect;
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="bg-white max-w-md w-full rounded-2xl shadow-xl border overflow-hidden">
          <div className="bg-secondary p-6 text-center text-white">
            <h1 className="text-3xl font-bold font-heading text-primary">Create Account</h1>
            <p className="text-secondary-foreground/70 mt-2 text-sm">Join NV Studio today</p>
          </div>
          
          <div className="p-6">
            <div className="flex p-1 bg-muted rounded-lg mb-6">
              <button 
                onClick={() => setType('CLIENT')} 
                className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${type === 'CLIENT' ? 'bg-white shadow text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Client
              </button>
              <button 
                onClick={() => setType('EMPLOYEE')}
                className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${type === 'EMPLOYEE' ? 'bg-white shadow text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Employee
              </button>
            </div>

            {success ? (
              <div className="bg-success/10 text-success p-4 rounded-lg text-center mb-6 border border-success/20">
                <p className="font-bold mb-2">🎉 Registration Successful!</p>
                <p className="text-sm">{success}</p>
                <Link href="/login">
                  <Button className="mt-4 bg-success hover:bg-success/90">Go to Login</Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                {error && <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg font-medium text-center">{error}</div>}
                
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="John Doe" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="10-digit number" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Password</Label>
                    <Input type="password" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} minLength={6} />
                  </div>
                  <div className="space-y-2">
                    <Label>Confirm Password</Label>
                    <Input type="password" required value={formData.confirmPassword} onChange={e => setFormData({...formData, confirmPassword: e.target.value})} minLength={6} />
                  </div>
                </div>

                {type === 'CLIENT' && (
                  <MECodeInput value={formData.meCode} onChange={v => setFormData({...formData, meCode: v})} />
                )}

                {type === 'EMPLOYEE' && (
                  <div className="space-y-4 border-t pt-4 mt-4">
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" checked={employeeRole === 'ME'} onChange={() => setEmployeeRole('ME')} name="employeeRole" className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">Marketing Executive</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" checked={employeeRole === 'SM'} onChange={() => setEmployeeRole('SM')} name="employeeRole" className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">Sales Manager</span>
                      </label>
                    </div>

                    <div className="space-y-2">
                      <Label>Employee Code (Check Offer Letter)</Label>
                      <Input required value={formData.employeeCode} onChange={e => setFormData({...formData, employeeCode: e.target.value.toUpperCase()})} placeholder={employeeRole === 'ME' ? 'NVME001' : 'NVSM01'} />
                    </div>

                    {employeeRole === 'ME' && (
                      <div className="space-y-2">
                        <Label>Assigned Sales Manager (SM) Code</Label>
                        <Input required value={formData.smCode} onChange={e => setFormData({...formData, smCode: e.target.value.toUpperCase()})} placeholder="NVSM01" />
                      </div>
                    )}
                  </div>
                )}

                <Button type="submit" disabled={loading} className="w-full h-12 text-md font-bold mt-2 shadow-lg shadow-primary/20">
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
                
                <p className="text-center justify-center text-sm text-muted-foreground mt-4 flex gap-1">
                  Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Log In</Link>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
