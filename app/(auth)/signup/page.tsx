'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import MECodeInput from '@/components/MECodeInput';

export default function SignupPage() {
  const [type, setType] = useState<'CLIENT' | 'ME'>('CLIENT');
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: '', meCode: ''
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
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, signupType: type })
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error);

      if (type === 'ME') {
        setSuccess(data.message);
        setFormData({ name: '', email: '', phone: '', password: '', confirmPassword: '', meCode: '' });
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
            <h1 className="text-3xl font-bold font-heading text-primary bg-clip-text">Create Account</h1>
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
                onClick={() => setType('ME')}
                className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${type === 'ME' ? 'bg-white shadow text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Marketing Executive
              </button>
            </div>

            {success ? (
              <div className="bg-success/10 text-success p-4 rounded-lg text-center mb-6 border border-success/20">
                <p className="font-bold mb-2">🎉 Registration Submitted!</p>
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
                  <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
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

                {type === 'ME' && (
                  <div className="bg-warning/10 border border-warning/20 p-3 rounded-lg text-xs text-warning-foreground font-medium">
                    Note: Your ME account will be reviewed. An active ME code will be assigned by the NV Studio admin within 24 hours.
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
