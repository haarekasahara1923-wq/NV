'use client';
import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Users, Briefcase, IndianRupee } from 'lucide-react';

export default function MEClientsPage() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
       try {
         const res = await fetch('/api/me/clients');
         const data = await res.json();
         if (res.ok) setClients(data.clients);
       } catch (e) {
         console.error(e);
       } finally {
         setLoading(false);
       }
    }
    fetchData();
  }, []);

  const downloadReport = () => {
    window.open('/api/me/report', '_blank');
  };

  if (loading) return <div className="p-12 text-center animate-pulse">Loading Clients...</div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-8 bg-gradient-to-r from-primary to-indigo-900 rounded-3xl text-white shadow-xl">
        <div>
          <h1 className="text-4xl font-black font-heading mb-2">My Client Network</h1>
          <p className="text-indigo-100 flex items-center gap-2 text-lg">
            <Users className="w-5 h-5"/> {clients.length} Active Clients
          </p>
        </div>
        <Button onClick={downloadReport} className="mt-4 md:mt-0 bg-white text-primary hover:bg-indigo-50 font-bold px-8 py-6 rounded-2xl shadow-lg border-none flex gap-2">
          <Download size={20}/> Download Performance Report
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {clients.map((client) => (
          <Card key={client.id} className="rounded-3xl border-none shadow-xl overflow-hidden hover:shadow-2xl transition-all group">
            <div className="flex flex-col md:flex-row">
              {/* Client Info Block */}
              <div className="p-8 bg-slate-50 md:w-1/3 flex flex-col justify-center border-r">
                 <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                   <Users size={32} />
                 </div>
                 <h3 className="text-2xl font-bold font-heading">{client.name}</h3>
                 <p className="text-muted-foreground font-mono font-bold text-xs mt-1 uppercase tracking-widest">
                   ID: {client.employeeCode}
                 </p>
                 <p className="text-xs text-muted-foreground mt-4">Joined {new Date(client.joinedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
              </div>

              {/* Service Details Block */}
              <div className="p-8 flex-1 bg-white">
                 <div className="flex items-center gap-2 mb-6">
                    <Briefcase className="w-5 h-5 text-primary" />
                    <h4 className="font-bold text-lg">Service Subscriptions</h4>
                 </div>
                 
                 <div className="space-y-4 mb-8">
                   {client.services.map((svc: any, idx: number) => (
                     <div key={idx} className="flex justify-between items-center p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100 group-hover:border-indigo-300 transition-colors">
                        <div>
                           <p className="font-bold text-slate-800">{svc.serviceName}</p>
                           <p className="text-xs text-muted-foreground">Monthly recurrence active</p>
                        </div>
                        <div className="text-right">
                           <p className="text-sm font-bold text-indigo-600 flex items-center justify-end"><IndianRupee size={12}/> {svc.incentive}</p>
                           <p className="text-[10px] uppercase font-black tracking-widest opacity-40">Monthly Share</p>
                        </div>
                     </div>
                   ))}
                   {client.services.length === 0 && (
                     <div className="p-6 text-center text-muted-foreground italic bg-slate-50 rounded-2xl border border-dashed">
                        No active service legacy found.
                     </div>
                   )}
                 </div>

                 <div className="pt-6 border-t flex justify-between items-center">
                    <div>
                       <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Client Contribution</p>
                       <p className="text-xs text-muted-foreground">Total incentives from this client</p>
                    </div>
                    <div className="text-right">
                       <p className="text-3xl font-black text-emerald-600">₹{client.totalIncentive}</p>
                    </div>
                 </div>
              </div>
            </div>
          </Card>
        ))}

        {clients.length === 0 && (
          <div className="h-96 flex flex-col items-center justify-center text-muted-foreground bg-white rounded-3xl border-2 border-dashed p-12">
             <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6">
                <Users size={40} className="opacity-10"/>
             </div>
             <h3 className="text-xl font-bold">No Clients Linked Yet</h3>
             <p className="max-w-xs mt-2 text-center">Ask clients to use your code during signup to see them here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
