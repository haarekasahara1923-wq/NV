'use client';
import { useState, useEffect } from 'react';
import { Users, DollarSign, ArrowUpRight, Phone, Target, ShoppingBag, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function MEDashboardHome() {
  const [stats, setStats] = useState({ clients: 0, newThisMonth: 0, earnings: 0, meCode: '', name: '' });
  const [metrics, setMetrics] = useState({ calls: 0, leads: 0, orders: 0 });
  const [loading, setLoading] = useState(true);
  const [logging, setLogging] = useState(false);

  useEffect(() => {
    async function fetchData() {
       try {
         const res = await fetch('/api/me/stats');
         const data = await res.json();
         if (res.ok) setStats(data);
       } catch (e) {
         console.error(e);
       } finally {
         setLoading(false);
       }
    }
    fetchData();
  }, []);

  const handleLogMetrics = async (e: React.FormEvent) => {
    e.preventDefault();
    setLogging(true);
    try {
      const res = await fetch('/api/me/metrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metrics)
      });
      if (res.ok) {
        alert('Daily metrics updated successfully!');
      } else {
        const d = await res.json();
        alert(d.error || 'Failed to update');
      }
    } catch (e) {
      alert('Error logging metrics');
    } finally {
      setLogging(false);
    }
  };

  if (loading) return <div className="p-12 text-center text-muted-foreground animate-pulse">Loading dashboard...</div>;

  return (
    <div className="space-y-6">
      <div className="p-8 rounded-2xl bg-secondary text-secondary-foreground shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center border border-secondary">
        <div>
          <h1 className="text-3xl font-bold font-heading text-white mb-2">Hello, {stats.name}!</h1>
          <p className="text-secondary-foreground/80 flex items-center gap-2">
            Your ME Code: <span className="bg-primary/20 text-primary px-3 py-1 rounded-md font-bold text-lg tracking-widest border border-primary/30">{stats.meCode} 🏷️</span>
          </p>
          <p className="mt-2 text-sm text-secondary-foreground/60">Help clients grow their business to earn more incentives.</p>
        </div>
        <div className="mt-6 md:mt-0 bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
           <p className="text-xs uppercase tracking-widest text-white/60 font-bold mb-1">Your Total Earnings</p>
           <p className="text-3xl font-bold text-white">₹{stats.earnings.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card rounded-2xl p-6 border shadow-sm flex items-center gap-4 group hover:border-primary/30 transition-all">
          <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Total Clients</p>
            <p className="text-3xl font-bold mt-1">{stats.clients}</p>
          </div>
        </div>
        <div className="bg-card rounded-2xl p-6 border shadow-sm flex items-center gap-4 group hover:border-emerald-500/30 transition-all">
          <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
            <ArrowUpRight className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">New Signups</p>
            <p className="text-3xl font-bold mt-1">{stats.newThisMonth}</p>
          </div>
        </div>
        <div className="bg-card rounded-2xl p-6 border shadow-sm flex items-center gap-4 group hover:border-amber-500/30 transition-all">
          <div className="w-14 h-14 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Active Services</p>
            <p className="text-3xl font-bold mt-1">Check Clients</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl border shadow-xl p-6 overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <Target size={120} />
            </div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Phone className="text-primary w-5 h-5" /> 
              Daily Performance Log
            </h3>
            <form onSubmit={handleLogMetrics} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">Calls Done Today</label>
                <input 
                  type="number" 
                  value={metrics.calls} 
                  onChange={e => setMetrics({...metrics, calls: parseInt(e.target.value) || 0})}
                  className="w-full bg-slate-50 border rounded-lg px-4 py-3 font-bold focus:ring-2 ring-primary/20 outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">Leads Created</label>
                <input 
                  type="number" 
                  value={metrics.leads} 
                  onChange={e => setMetrics({...metrics, leads: parseInt(e.target.value) || 0})}
                  className="w-full bg-slate-50 border rounded-lg px-4 py-3 font-bold focus:ring-2 ring-primary/20 outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">Successful Orders</label>
                <input 
                  type="number" 
                  value={metrics.orders} 
                  onChange={e => setMetrics({...metrics, orders: parseInt(e.target.value) || 0})}
                  className="w-full bg-slate-50 border rounded-lg px-4 py-3 font-bold focus:ring-2 ring-primary/20 outline-none"
                />
              </div>
              <Button type="submit" disabled={logging} className="w-full py-6 font-bold text-lg flex gap-2">
                {logging ? 'Saving...' : <><Send size={18}/> Log Activity</>}
              </Button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-card rounded-2xl border shadow-sm h-full flex flex-col overflow-hidden">
            <div className="p-6 border-b bg-muted/30 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold font-heading">Recent Incentives</h2>
                <p className="text-sm text-muted-foreground mt-1">Breakdown of your referral earnings</p>
              </div>
              <Link href="/me-dashboard/my-clients">
                <Button variant="ghost" size="sm" className="font-bold">View All Clients</Button>
              </Link>
            </div>
            <div className="flex-1 p-6 flex flex-col items-center justify-center text-center text-muted-foreground">
               <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                 <DollarSign size={32} className="opacity-20" />
               </div>
               <p className="font-medium text-lg">Detailed earnings report coming soon</p>
               <p className="text-sm">New client signups will appear here automatically.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
