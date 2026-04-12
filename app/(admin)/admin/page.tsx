'use client';
import { useState, useEffect } from 'react';
import { Users, Briefcase, IndianRupee, Clock, Activity, Zap, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AdminDashboardHome() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
       try {
         const res = await fetch('/api/admin/dashboard-stats');
         if (res.ok) {
           const json = await res.json();
           setData(json);
         }
       } catch(e) {
         console.error(e);
       } finally {
         setLoading(false);
       }
    }
    fetchData();
  }, []);

  if (loading) return <div className="flex h-96 items-center justify-center text-primary"><Loader2 className="w-8 h-8 animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-card p-6 rounded-2xl shadow-sm border border-border">
        <div>
          <h1 className="text-3xl font-bold font-heading text-foreground">Admin Overview</h1>
          <p className="text-muted-foreground mt-1 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
            Real-time feed active
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-muted-foreground">System Status</p>
          <p className="text-green-600 font-bold flex items-center gap-1 justify-end">
            <Zap className="w-4 h-4" /> All Operational
          </p>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Clients", val: data?.stats?.totalClients || 0, icon: <Users className="w-6 h-6" />, color: "bg-blue-500/10 text-blue-500" },
          { title: "Total MEs", val: data?.stats?.totalMEs || 0, icon: <Briefcase className="w-6 h-6" />, color: "bg-purple-500/10 text-purple-500" },
          { title: "Total Revenue", val: `₹${(data?.stats?.totalRevenue || 0).toLocaleString('en-IN')}`, icon: <IndianRupee className="w-6 h-6" />, color: "bg-green-500/10 text-green-500" },
          { title: "Pending Orders", val: data?.stats?.pendingOrdersCount || 0, icon: <Clock className="w-6 h-6" />, color: "bg-orange-500/10 text-orange-500" }
        ].map((stat, i) => (
          <div key={i} className="bg-card p-6 rounded-2xl border shadow-sm flex items-center justify-between hover:-translate-y-1 transition-transform">
            <div>
              <p className="text-sm font-semibold text-muted-foreground uppercase">{stat.title}</p>
              <h2 className="text-3xl font-bold mt-1">{stat.val}</h2>
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.color}`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity Feed */}
        <div className="bg-card rounded-2xl border shadow-sm flex flex-col h-[500px]">
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold font-heading flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" /> Live Feed
            </h2>
            <span className="text-xs font-bold px-2 py-1 bg-red-100 text-red-600 rounded uppercase animate-pulse">Live</span>
          </div>
          <div className="p-6 flex-1 overflow-y-auto space-y-4">
            {data?.recentActivity?.length > 0 ? data.recentActivity.map((act: any) => (
              <div key={act.id} className={`p-4 rounded-xl border relative overflow-hidden ${act.status === 'PAID' ? 'bg-muted/40 border-green-500/20' : 'bg-muted/40 border-primary/20'}`}>
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${act.status === 'PAID' ? 'bg-green-500' : 'bg-primary'}`}></div>
                <p className="text-sm text-muted-foreground mb-1">{new Date(act.createdAt).toLocaleString()}</p>
                <p className="font-semibold text-foreground">
                  Order <span className="font-bold">{act.id.slice(0, 6).toUpperCase()}</span> for <span className="text-primary">{act.service.name}</span> by {act.user.name}
                  {act.status === 'PAID' && <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">PAID</span>}
                </p>
              </div>
            )) : (
              <p className="text-muted-foreground text-center py-8">No recent activity found.</p>
            )}
          </div>
        </div>

        {/* Pending Actions */}
        <div className="bg-card rounded-2xl border shadow-sm flex flex-col h-[500px]">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold font-heading">Action Required</h2>
          </div>
          <div className="p-0 flex-1 overflow-y-auto divide-y">
            {data?.pendingActions?.length > 0 ? data.pendingActions.map((act: any) => (
              <div key={act.id} className="p-6 flex justify-between items-center hover:bg-muted/20 transition-colors">
                <div>
                  <p className="font-bold text-lg">{act.user.name}</p>
                  <p className="text-sm text-muted-foreground">{act.service.name} {act.planType ? `- ${act.planType}` : ''}</p>
                  <p className="text-sm font-semibold text-amber-600 mt-1">₹{act.amount / 100} Pending</p>
                  {act.razorpayPaymentId && act.razorpayPaymentId !== 'manual_admin_cash_upi' && (
                    <p className="text-xs font-bold text-blue-600 mt-1 uppercase">UTR: {act.razorpayPaymentId}</p>
                  )}
                </div>
                <Button asChild className="bg-success hover:bg-success/90 text-white shadow shadow-success/20">
                  <Link href="/admin/orders">Verify</Link>
                </Button>
              </div>
            )) : (
              <p className="text-muted-foreground text-center py-12">No pending actions!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
