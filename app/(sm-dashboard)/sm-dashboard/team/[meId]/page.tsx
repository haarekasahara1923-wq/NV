'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Calendar as CalendarIcon, Phone, MapPin, CheckCircle2, Users, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function MEDetailsPage() {
  const params = useParams();
  const meId = params.meId as string;
  
  const [activeTab, setActiveTab] = useState<'calls' | 'clients'>('calls');
  
  const [records, setRecords] = useState([]);
  const [clients, setClients] = useState([]);
  const [meDetails, setMeDetails] = useState<any>(null);
  
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  useEffect(() => {
    if (meId) {
      if (activeTab === 'calls') {
        fetchRecords(selectedDate);
      } else {
        fetchClients();
      }
    }
  }, [meId, selectedDate, activeTab]);

  const fetchRecords = async (dateStr: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/sm/me-calls?meId=${meId}&date=${dateStr}`);
      const data = await res.json();
      if (res.ok) {
        setRecords(data.records);
        setMeDetails(data.meDetails);
      } else {
        alert(data.error || 'Failed to fetch records');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchClients = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/sm/me-clients?meId=${meId}`);
      const data = await res.json();
      if (res.ok) {
        setClients(data.clients);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/sm-dashboard/team">
          <Button variant="outline" size="icon" className="rounded-xl"><ArrowLeft size={16} /></Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold font-heading">{meDetails?.name || 'ME Details'}</h1>
          <p className="text-muted-foreground text-sm flex items-center gap-2">
            ME Code: <span className="font-bold text-primary">{meDetails?.code || 'Loading...'}</span>
          </p>
        </div>
      </div>

      <div className="flex bg-muted/50 p-1 rounded-xl w-fit">
        <button 
          className={`px-6 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'calls' ? 'bg-white shadow text-primary' : 'text-muted-foreground hover:text-foreground'}`}
          onClick={() => setActiveTab('calls')}
        >
          <Phone size={16} /> Daily Calls Record
        </button>
        <button 
          className={`px-6 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'clients' ? 'bg-white shadow text-primary' : 'text-muted-foreground hover:text-foreground'}`}
          onClick={() => setActiveTab('clients')}
        >
          <Users size={16} /> Onboarded Clients
        </button>
      </div>

      {activeTab === 'calls' && (
        <>
          <div className="bg-card p-6 rounded-2xl border shadow-sm flex flex-wrap items-center gap-4 justify-between">
             <div className="flex items-center gap-3 w-full md:w-auto">
                <CalendarIcon className="text-primary w-5 h-5" />
                <span className="font-bold">Select Date:</span>
                <input 
                  type="date" 
                  value={selectedDate} 
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="border p-2 rounded-md bg-muted/50 focus:bg-background outline-none focus:ring-2 focus:ring-primary/20 font-bold"
                />
             </div>
          </div>

          <div className="bg-card border rounded-2xl overflow-hidden shadow-sm">
             <div className="p-4 border-b bg-muted/30">
                <h2 className="text-lg font-bold flex items-center gap-2">
                   <Phone className="w-5 h-5 text-primary" /> Tracking Record for {new Date(selectedDate).toLocaleDateString()}
                </h2>
             </div>
             {loading ? (
                 <div className="p-8 text-center text-muted-foreground animate-pulse">Loading records...</div>
             ) : records.length === 0 ? (
                 <div className="p-12 flex flex-col items-center justify-center text-muted-foreground">
                    <Phone className="w-12 h-12 opacity-20 mb-4" />
                    <p className="font-medium text-lg">No calls found for this date.</p>
                 </div>
             ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-muted/50 uppercase text-xs">
                      <tr>
                        <th className="px-4 py-3 font-semibold text-muted-foreground">Time</th>
                        <th className="px-4 py-3 font-semibold text-muted-foreground">Client Details</th>
                        <th className="px-4 py-3 font-semibold text-muted-foreground">Services/Remarks</th>
                        <th className="px-4 py-3 font-semibold text-muted-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {records.map((call: any) => (
                         <tr key={call.id} className="hover:bg-muted/30 transition-colors">
                            <td className="px-4 py-3 align-top whitespace-nowrap text-muted-foreground">
                              {new Date(call.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </td>
                            <td className="px-4 py-3 align-top">
                              <p className="font-bold">{call.clientName}</p>
                              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><Phone size={10} /> {call.mobileNo}</p>
                              {call.address && <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1 break-all"><MapPin size={10}/> {call.address}</p>}
                            </td>
                            <td className="px-4 py-3 align-top">
                               {call.servicesInterest && <p className="text-primary font-medium text-xs mb-1 px-2 py-0.5 bg-primary/10 rounded-md inline-block">{call.servicesInterest}</p>}
                               <p className="text-xs text-muted-foreground line-clamp-3">{call.remarks || 'No remarks.'}</p>
                            </td>
                            <td className="px-4 py-3 align-top">
                               {call.isOnboarded ? (
                                 <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-600 px-2 py-1 rounded-md text-xs font-bold w-max">
                                    <CheckCircle2 size={12} /> Onboarded
                                 </span>
                               ) : (
                                 <span className="inline-block bg-amber-500/10 text-amber-600 px-2 py-1 rounded-md text-xs font-bold w-max">
                                    Pending
                                 </span>
                               )}
                            </td>
                         </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
             )}
          </div>
        </>
      )}

      {activeTab === 'clients' && (
        <Card className="rounded-[2rem] border-none shadow-2xl overflow-hidden bg-white mt-6">
          <div className="p-6 border-b">
             <h2 className="text-xl font-bold flex items-center gap-2">
               <Users className="text-primary" /> Onboarded Clients via this ME
             </h2>
          </div>
          {loading ? (
             <div className="p-12 text-center text-muted-foreground animate-pulse">Loading Clients...</div>
          ) : clients.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground bg-slate-50">
              <Users size={48} className="mx-auto mb-4 opacity-20" />
              <h3 className="text-xl font-bold">No Onboarded Clients found</h3>
              <p className="mt-2">Clients who have successfully paid for services using this ME code will appear here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                 <thead className="bg-slate-50 border-b">
                   <tr>
                     <th className="px-6 py-4 text-xs font-black uppercase text-slate-400 tracking-wider">Date Joined</th>
                     <th className="px-6 py-4 text-xs font-black uppercase text-slate-400 tracking-wider">Client Details</th>
                     <th className="px-6 py-4 text-xs font-black uppercase text-slate-400 tracking-wider">Services Provided & Duration</th>
                     <th className="px-6 py-4 text-xs font-black uppercase text-slate-400 tracking-wider text-right">My Share (SM Incentive)</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y">
                   {clients.map((client: any) => (
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
                                 <div key={i} className="bg-primary/5 rounded-md px-3 py-2 border border-primary/10">
                                    <p className="font-bold text-sm text-primary">{svc.serviceName}</p>
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mt-1">Duration: {svc.duration || 'N/A'}</p>
                                 </div>
                              ))}
                            </div>
                         )}
                       </td>
                       <td className="px-6 py-4 align-top text-right">
                         <p className="text-xl font-black text-emerald-600 flex items-center justify-end"><IndianRupee size={16}/> {client.totalIncentiveToSM}</p>
                         <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Total</p>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
