'use client';
import { useState, useEffect } from 'react';
import { DollarSign, Wallet, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function EarningsPage() {
  const [clients, setClients] = useState<any[]>([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
       try {
         const res = await fetch('/api/me/clients');
         const data = await res.json();
         if (res.ok) {
           setClients(data.clients);
           const total = data.clients.reduce((acc: number, curr: any) => acc + curr.totalIncentive, 0);
           setTotalEarnings(total);
         }
       } catch (e) {
         console.error(e);
       } finally {
         setLoading(false);
       }
    }
    fetchData();
  }, []);

  if (loading) return <div className="p-12 text-center animate-pulse">Loading Earnings...</div>;

  return (
    <div className="space-y-6">
      <div className="bg-card p-8 rounded-2xl shadow-sm border border-border flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-heading text-foreground uppercase">Commission & Incentives</h1>
          <p className="text-muted-foreground mt-1 tracking-tight">Viewing your earnings from active client subscriptions.</p>
        </div>
        <div className="bg-primary/10 text-primary p-6 rounded-2xl">
          <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Total Incentives</p>
          <h2 className="text-4xl font-black flex items-center"><IndianRupee size={28}/> {totalEarnings}</h2>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Earnings Breakdown by Client</h2>
        {clients.length === 0 ? (
           <div className="p-8 text-center bg-card rounded-2xl border">No clients to show earnings for.</div>
        ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {clients.map(client => (
                <Card key={client.id} className="p-6 rounded-2xl shadow-sm flex flex-col justify-between">
                  <div className="mb-4">
                    <h3 className="font-bold text-lg">{client.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">Services: {client.services.length}</p>
                    <div className="mt-3 space-y-2">
                       {client.services.map((svc: any, i: number) => (
                          <div key={i} className="flex justify-between items-center text-sm border-b pb-1">
                             <span>{svc.serviceName}</span>
                             <span className="font-bold text-emerald-600">₹{svc.incentive}</span>
                          </div>
                       ))}
                    </div>
                  </div>
                  <div className="pt-4 border-t flex justify-between items-center">
                     <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Total from Client</span>
                     <span className="text-xl font-black text-primary">₹{client.totalIncentive}</span>
                  </div>
                </Card>
             ))}
           </div>
        )}
      </div>
    </div>
  );
}
