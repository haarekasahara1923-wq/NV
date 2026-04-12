'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Calendar as CalendarIcon, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function MEDetailsPage() {
  const params = useParams();
  const meId = params.meId as string;
  const [records, setRecords] = useState([]);
  const [meDetails, setMeDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  useEffect(() => {
    if (meId) {
      fetchRecords(selectedDate);
    }
  }, [meId, selectedDate]);

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
               <Phone className="w-5 h-5 text-primary" /> Daily Calls Record for {new Date(selectedDate).toLocaleDateString()}
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
         )}
      </div>
    </div>
  );
}
