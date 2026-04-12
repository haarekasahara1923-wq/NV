'use client';
import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Users, Phone, MapPin, IndianRupee } from 'lucide-react';

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
          <h1 className="text-4xl font-black font-heading mb-2">My Onboarded Clients</h1>
          <p className="text-indigo-100 flex items-center gap-2 text-lg">
            <Users className="w-5 h-5"/> {clients.length} Active Clients
          </p>
        </div>
        <Button onClick={downloadReport} className="mt-4 md:mt-0 bg-white text-primary hover:bg-indigo-50 font-bold px-8 py-6 rounded-2xl shadow-lg border-none flex gap-2">
          <Download size={20}/> Download Performance Report
        </Button>
      </div>

      <Card className="rounded-[2rem] border-none shadow-2xl overflow-hidden bg-white">
        {clients.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground bg-slate-50">
            <Users size={48} className="mx-auto mb-4 opacity-20" />
            <h3 className="text-xl font-bold">No Onboarded Clients found</h3>
            <p className="mt-2">Clients who have successfully paid for services will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
             <table className="w-full text-left">
               <thead className="bg-slate-50 border-b">
                 <tr>
                   <th className="px-6 py-4 text-xs font-black uppercase text-slate-400 tracking-wider">Date Joined</th>
                   <th className="px-6 py-4 text-xs font-black uppercase text-slate-400 tracking-wider">Client Details</th>
                   <th className="px-6 py-4 text-xs font-black uppercase text-slate-400 tracking-wider">Services Provided & Duration</th>
                   <th className="px-6 py-4 text-xs font-black uppercase text-slate-400 tracking-wider text-right">My Incentive</th>
                 </tr>
               </thead>
               <tbody className="divide-y">
                 {clients.map((client) => (
                   <tr key={client.id} className="hover:bg-slate-50/50 transition-colors">
                     <td className="px-6 py-4 align-top whitespace-nowrap text-muted-foreground font-medium">
                       {new Date(client.joinedAt).toLocaleDateString()}
                     </td>
                     <td className="px-6 py-4 align-top">
                       <p className="font-bold text-base">{client.name}</p>
                       <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><Phone size={12}/> {client.phone}</p>
                     </td>
                     <td className="px-6 py-4 align-top">
                       {client.services.length === 0 ? (
                          <span className="text-muted-foreground text-sm italic">No active services</span>
                       ) : (
                          <div className="space-y-2">
                            {client.services.map((svc: any, i: number) => (
                               <div key={i} className={`rounded-md px-3 py-2 border ${svc.status === 'PENDING_ACTIVATION' ? 'bg-amber-50 border-amber-200' : 'bg-primary/5 border-primary/10'}`}>
                                  <p className={`font-bold text-sm ${svc.status === 'PENDING_ACTIVATION' ? 'text-amber-700' : 'text-primary'}`}>{svc.serviceName}</p>
                                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mt-1 flex justify-between items-center">
                                    <span>Duration: {svc.duration || 'N/A'}</span>
                                    {svc.status === 'PENDING_ACTIVATION' ? (
                                      <span className="text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded font-black">Verification Pending</span>
                                    ) : (
                                      <span className="text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded font-black">Onboarded Successfully</span>
                                    )}
                                  </p>
                               </div>
                            ))}
                          </div>
                       )}
                     </td>
                     <td className="px-6 py-4 align-top text-right">
                       <p className="text-xl font-black text-emerald-600 flex items-center justify-end"><IndianRupee size={16}/> {client.totalIncentive}</p>
                       <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Total</p>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </div>
        )}
      </Card>
    </div>
  );
}
