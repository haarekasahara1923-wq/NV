'use client';
import { useState, useEffect } from 'react';
import { Users, Phone, Target, ShoppingBag, Calendar, Download, ChevronRight, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function SMDashboardHome() {
  const [team, setTeam] = useState<any[]>([]);
  const [selectedMe, setSelectedMe] = useState<any>(null);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(true);
  const [smInfo, setSmInfo] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/sm/stats');
        const data = await res.json();
        if (res.ok) {
          setTeam(data.team || []);
          setSmInfo(data.info);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const downloadReport = (type: 'daily' | 'monthly') => {
    window.open(`/api/sm/report?type=${type}&date=${date}${selectedMe ? `&meId=${selectedMe.id}` : ''}`, '_blank');
  };

  if (loading) return <div className="p-12 text-center animate-pulse">Loading Team Dashboard...</div>;

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-primary p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
           <TrendingUp size={160} />
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold font-heading mb-2">Hello, {smInfo?.name}!</h1>
          <p className="text-primary-foreground/80 flex items-center gap-2 text-lg">
            SM Code: <span className="bg-white/20 px-3 py-1 rounded-lg font-mono font-bold tracking-widest">{smInfo?.smCode}</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column: Team List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="font-bold text-xl flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" /> My Team
            </h3>
            <span className="bg-muted px-2 py-0.5 rounded text-xs font-bold">{team.length} MEs</span>
          </div>
          <div className="space-y-3">
            {team.map((me) => (
              <button
                key={me.id}
                onClick={() => setSelectedMe(me)}
                className={`w-full text-left p-4 rounded-2xl border transition-all ${
                  selectedMe?.id === me.id 
                  ? 'bg-primary border-primary text-white shadow-lg scale-[1.02]' 
                  : 'bg-white hover:border-primary/30 shadow-sm'
                }`}
              >
                <p className="font-bold">{me.displayName}</p>
                <p className={`text-xs ${selectedMe?.id === me.id ? 'text-white/70' : 'text-muted-foreground'}`}>{me.meCode}</p>
                <div className="mt-3 flex gap-4 text-[10px] uppercase font-bold tracking-tighter opacity-80">
                   <span className="flex items-center gap-1"><Phone size={10}/> {me._count.dailyMetrics} Logs</span>
                   <span className="flex items-center gap-1"><Users size={10}/> {me._count.clients} Clients</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Performance & Detail */}
        <div className="lg:col-span-3 space-y-6">
          {selectedMe ? (
            <Card className="p-8 border-none shadow-xl rounded-3xl bg-white overflow-hidden relative">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                  <h2 className="text-3xl font-bold font-heading">{selectedMe.displayName}&apos;s Performance</h2>
                  <p className="text-muted-foreground flex items-center gap-2">
                    Code: <span className="font-mono font-bold text-primary">{selectedMe.meCode}</span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <input 
                    type="date" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)}
                    className="border rounded-xl px-4 py-2 font-bold text-sm bg-slate-50 focus:ring-2 ring-primary/20 outline-none"
                  />
                  <Button onClick={() => downloadReport('daily')} variant="outline" className="rounded-xl font-bold">
                    <Download size={16} className="mr-2"/> Report
                  </Button>
                </div>
              </div>

              {/* Stats Grid for Selected ME */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-center">
                <div className="p-6 rounded-2xl bg-blue-50 border border-blue-100 group">
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">Calls Done</p>
                  <p className="text-4xl font-black text-blue-900">{selectedMe.todayStats?.callsDone || 0}</p>
                </div>
                <div className="p-6 rounded-2xl bg-purple-50 border border-purple-100">
                  <p className="text-xs font-bold text-purple-600 uppercase tracking-widest mb-1">Leads Created</p>
                  <p className="text-4xl font-black text-purple-900">{selectedMe.todayStats?.leadsCreated || 0}</p>
                </div>
                <div className="p-6 rounded-2xl bg-green-50 border border-green-100">
                  <p className="text-xs font-bold text-green-600 uppercase tracking-widest mb-1">Orders Won</p>
                  <p className="text-4xl font-black text-green-900">{selectedMe.todayStats?.successfulOrders || 0}</p>
                </div>
              </div>

              {/* Incentives Table Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center border-t pt-6">
                  <h4 className="font-bold text-lg">Incentive Earnings from {selectedMe.displayName}</h4>
                  <p className="text-sm font-bold text-primary">Monthly Total: ₹{selectedMe.smIncentiveTotal || 0}</p>
                </div>
                <div className="overflow-x-auto">
                   <table className="w-full text-sm">
                      <thead>
                        <tr className="text-muted-foreground border-b uppercase text-[10px] tracking-widest font-black">
                          <th className="pb-4 text-left">Client</th>
                          <th className="pb-4 text-left">Service</th>
                          <th className="pb-4 text-center">Status</th>
                          <th className="pb-4 text-right">SM Incentive</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {selectedMe.clients?.map((cl: any) => (
                          <tr key={cl.id} className="group hover:bg-slate-50 transition-colors">
                            <td className="py-4">
                              <p className="font-bold">{cl.user.name}</p>
                              <p className="text-[10px] text-muted-foreground font-mono">CODE: {cl.user.employeeCode || 'C-'+cl.id.slice(0,5).toUpperCase()}</p>
                            </td>
                            <td className="py-4 font-medium text-slate-600">
                              {cl.activeServices || 'Multiple Services'}
                            </td>
                            <td className="py-4 text-center">
                              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase">Active</span>
                            </td>
                            <td className="py-4 text-right font-black text-emerald-600">₹{cl.incentiveToSM || 0}</td>
                          </tr>
                        ))}
                      </tbody>
                   </table>
                </div>
              </div>
            </Card>
          ) : (
            <div className="h-[500px] bg-white rounded-3xl border border-dashed flex flex-col items-center justify-center text-muted-foreground p-12 text-center">
               <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                 <Users size={48} className="opacity-20" />
               </div>
               <h3 className="text-2xl font-bold text-slate-700 mb-2">Select an Executive</h3>
               <p className="max-w-xs">Click on an ME from the sidebar to view their performance metrics and your incentives.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
