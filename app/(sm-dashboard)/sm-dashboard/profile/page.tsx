'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { User, Phone, Mail, FileText } from 'lucide-react';

export default function SMProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch('/api/sm/profile'); // TODO: Create this if missing
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  if (loading) return <div className="p-8 text-muted-foreground animate-pulse">Loading profile...</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-card rounded-2xl p-8 border shadow-sm flex flex-col items-center">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4 relative grid place-items-center">
           <User size={48} className="text-primary/50" />
        </div>
        <h1 className="text-2xl font-bold font-heading">{profile?.name || 'SM User'}</h1>
        <p className="text-muted-foreground mt-1 text-sm bg-muted px-3 py-1 rounded-full uppercase tracking-widest font-bold">SM Code: {profile?.smCode || 'N/A'}</p>
      </div>

      <div className="bg-card border rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold mb-4 border-b pb-2">Profile Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="space-y-1">
             <label className="text-xs uppercase font-bold text-muted-foreground flex items-center gap-1"><Mail size={12}/> Email Address</label>
             <p className="font-semibold">{profile?.email || 'N/A'}</p>
           </div>
           <div className="space-y-1">
             <label className="text-xs uppercase font-bold text-muted-foreground flex items-center gap-1"><Phone size={12}/> Phone Number</label>
             <p className="font-semibold">{profile?.phone || 'N/A'}</p>
           </div>
           <div className="space-y-1">
             <label className="text-xs uppercase font-bold text-muted-foreground flex items-center gap-1"><FileText size={12}/> Role</label>
             <p className="font-semibold">Sales Manager</p>
           </div>
        </div>
      </div>
    </div>
  );
}
