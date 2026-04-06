'use client';
import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IndianRupee, Download, TrendingUp, Users, DollarSign } from 'lucide-react';

export default function SMIncentivesPage() {
  const [team, setTeam] = useState<any[]>([]);
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

  const totalIncentive = team.reduce((sum, me) => sum + (me.smIncentiveTotal || 0), 0);

  if (loading) return <div className="p-12 text-center animate-pulse">Loading Incentive Data...</div>;

  return (
    <div className="space-y-8">
      <div className="p-10 bg-indigo-900 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 p-10 opacity-10">
            <DollarSign size={180} />
         </div>
         <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
               <h1 className="text-4xl font-black font-heading mb-3">SM Incentives Overview</h1>
               <p className="text-indigo-200 text-lg max-w-xl">Breakdown of earnings generated from the performance of all Marketing Executives in your team.</p>
            </div>
            <div className="mt-8 md:mt-0 p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
               <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-60 mb-2">Total Monthly Earnings</p>
               <p className="text-5xl font-black flex items-center justify-center"><IndianRupee size={28}/> {totalIncentive.toLocaleString()}</p>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         {team.map((me) => (
           <Card key={me.id} className="rounded-[2rem] border-none shadow-xl overflow-hidden hover:shadow-2xl transition-all group">
              <div className="p-8 border-b bg-slate-50 flex justify-between items-center">
                 <div>
                    <h3 className="text-xl font-bold font-heading text-indigo-900">{me.displayName}</h3>
                    <p className="text-xs font-mono font-bold text-slate-400">{me.meCode}</p>
                 </div>
                 <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold group-hover:scale-110 transition-transform">
                    {me.clients.length}
                 </div>
              </div>
              <div className="p-6 space-y-4">
                 <div className="flex justify-between items-center text-sm font-bold text-slate-500 uppercase tracking-widest px-2">
                    <span>Performance</span>
                    <span>Incentives</span>
                 </div>
                 <div className="space-y-2">
                    {me.clients.length > 0 ? me.clients.slice(0, 3).map((cl: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-center p-4 rounded-xl bg-slate-50/50 group-hover:bg-slate-50 transition-colors border border-transparent">
                         <div className="truncate pr-4">
                            <p className="font-bold text-slate-700 truncate">{cl.user.name}</p>
                            <p className="text-[10px] text-muted-foreground uppercase truncate">{cl.activeServices}</p>
                         </div>
                         <p className="font-black text-emerald-600 whitespace-nowrap">₹{cl.incentiveToSM}</p>
                      </div>
                    )) : (
                      <div className="p-8 text-center text-muted-foreground italic text-sm">
                        No client signups for this executive yet.
                      </div>
                    )}
                 </div>
                 {me.clients.length > 3 && (
                   <p className="text-center text-xs font-bold text-primary py-2 cursor-pointer hover:underline">
                     + {me.clients.length - 3} more clients
                   </p>
                 )}
                 <div className="pt-4 border-t flex justify-between items-center px-2">
                    <span className="text-xs font-black uppercase text-slate-400">Total Contribution</span>
                    <span className="text-2xl font-black text-indigo-600">₹{me.smIncentiveTotal}</span>
                 </div>
              </div>
           </Card>
         ))}
      </div>
    </div>
  );
}
