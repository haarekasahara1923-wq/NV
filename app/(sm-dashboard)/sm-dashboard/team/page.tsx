'use client';
import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Phone, Target, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function SMTeamPage() {
  const [team, setTeam] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
       try {
         const res = await fetch('/api/sm/stats');
         const data = await res.json();
         if (res.ok) setTeam(data.team || []);
       } catch (e) {
         console.error(e);
       } finally {
         setLoading(false);
       }
    }
    fetchData();
  }, []);

  if (loading) return <div className="p-12 text-center animate-pulse">Loading Team Data...</div>;

  return (
    <div className="space-y-8">
      <div className="p-10 bg-slate-900 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 p-10 opacity-10">
            <Users size={180} />
         </div>
         <div className="relative z-10">
            <h1 className="text-4xl font-black font-heading mb-3">Marketing Team Overview</h1>
            <p className="text-slate-400 text-lg max-w-xl">Monitor and manage the performance of all Marketing Executives under your leadership. View their client growth and conversion metrics.</p>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <Card className="rounded-3xl p-6 border-none shadow-xl bg-blue-600 text-white">
            <div className="flex justify-between items-start">
               <div>
                  <p className="text-xs font-bold uppercase opacity-60 tracking-widest">Active Executives</p>
                  <p className="text-4xl font-black mt-2">{team.length}</p>
               </div>
               <Users className="opacity-20" size={40} />
            </div>
         </Card>
      </div>

      <Card className="rounded-[2rem] border-none shadow-2xl overflow-hidden bg-white">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow className="hover:bg-transparent border-none text-[10px] uppercase font-black tracking-[0.2em] text-slate-400">
              <TableHead className="py-6 px-8">Executive</TableHead>
              <TableHead className="text-center">Total Clients</TableHead>
              <TableHead className="text-center">Today&apos;s Calls</TableHead>
              <TableHead className="text-center">Today&apos;s Leads</TableHead>
              <TableHead className="text-center">Today&apos;s Orders</TableHead>
              <TableHead className="text-right px-8">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {team.map((me) => (
              <TableRow key={me.id} className="group hover:bg-slate-50/50 transition-colors border-slate-100">
                <TableCell className="py-6 px-8">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-lg group-hover:scale-110 transition-transform">
                        {me.displayName[0]}
                     </div>
                     <div>
                        <p className="font-bold text-lg text-slate-800">{me.displayName}</p>
                        <p className="text-xs font-mono font-bold text-primary">{me.meCode}</p>
                     </div>
                  </div>
                </TableCell>
                <TableCell className="text-center font-bold text-slate-600">{me._count.clients}</TableCell>
                <TableCell className="text-center">
                   <span className={`px-3 py-1 rounded-full text-xs font-bold ${me.todayStats?.callsDone > 0 ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-400'}`}>
                      {me.todayStats?.callsDone || 0} Calls
                   </span>
                </TableCell>
                <TableCell className="text-center">
                   <span className={`px-3 py-1 rounded-full text-xs font-bold ${me.todayStats?.leadsCreated > 0 ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-400'}`}>
                      {me.todayStats?.leadsCreated || 0} Leads
                   </span>
                </TableCell>
                <TableCell className="text-center">
                   <span className={`px-3 py-1 rounded-full text-xs font-bold ${me.todayStats?.successfulOrders > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>
                      {me.todayStats?.successfulOrders || 0} Orders
                   </span>
                </TableCell>
                <TableCell className="text-right px-8">
                   <Link href={`/sm-dashboard/team/${me.id}`}>
                      <Button variant="ghost" size="sm" className="rounded-xl font-bold hover:bg-primary hover:text-white group-hover:pr-6 transition-all">
                        Details <ArrowRight size={14} className="ml-2"/>
                      </Button>
                   </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
