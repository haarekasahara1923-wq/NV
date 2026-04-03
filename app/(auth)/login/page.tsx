'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error);

      window.location.href = data.redirect;
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white max-w-[400px] w-full rounded-2xl shadow-xl border overflow-hidden">
          <div className="bg-secondary p-8 text-center text-white">
            <h1 className="text-3xl font-bold font-heading text-primary">Welcome Back</h1>
            <p className="text-secondary-foreground/70 mt-2">Log in to your NV Studio portal</p>
          </div>
          
          <div className="p-8">
            <form onSubmit={submit} className="space-y-6">
              {error && <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg font-medium text-center border border-destructive/20">{error}</div>}
              
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="you@example.com" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Password</Label>
                  <Link href="#" className="text-xs text-primary font-bold hover:underline">Forgot password?</Link>
                </div>
                <Input type="password" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
              </div>

              <Button type="submit" disabled={loading} className="w-full h-12 text-md font-bold mt-2 shadow-lg shadow-primary/20">
                {loading ? 'Logging in...' : 'Log In'}
              </Button>
              
              <p className="text-center text-sm text-muted-foreground mt-6 flex justify-center gap-1">
                Don't have an account? <Link href="/signup" className="text-primary font-bold hover:underline">Sign up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
