'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Phone, User, MapPin, Search, PlusCircle, CheckCircle2 } from 'lucide-react';

export default function MEDailyCallsPage() {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    clientName: '',
    address: '',
    mobileNo: '',
    servicesInterest: '',
    remarks: '',
    isOnboarded: false
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCalls();
  }, []);

  const fetchCalls = async () => {
    try {
      const res = await fetch('/api/me/daily-calls');
      const data = await res.json();
      if (res.ok) setCalls(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/me/daily-calls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setFormData({ clientName: '', address: '', mobileNo: '', servicesInterest: '', remarks: '', isOnboarded: false });
        alert('Call log added successfully!');
        fetchCalls();
      } else {
        const d = await res.json();
        alert(d.error || 'Failed to add log');
      }
    } catch (err) {
      alert('Error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-card p-6 rounded-2xl border shadow-sm">
        <div>
          <h1 className="text-2xl font-bold font-heading flex items-center gap-2">
            <Phone className="text-primary w-6 h-6" /> Daily Calls Record
          </h1>
          <p className="text-muted-foreground mt-1">Log your client interactions and track leads</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-card rounded-2xl p-6 border shadow-sm h-fit">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-primary" /> New Call Record
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs uppercase font-bold text-muted-foreground mb-1 block">Client Name *</label>
              <input required value={formData.clientName} onChange={e => setFormData({...formData, clientName: e.target.value})} className="w-full border p-2 rounded-md bg-muted/50 focus:bg-background" />
            </div>
            <div>
              <label className="text-xs uppercase font-bold text-muted-foreground mb-1 block">Mobile Number *</label>
              <input required value={formData.mobileNo} onChange={e => setFormData({...formData, mobileNo: e.target.value})} className="w-full border p-2 rounded-md bg-muted/50 focus:bg-background" />
            </div>
            <div>
              <label className="text-xs uppercase font-bold text-muted-foreground mb-1 block">Address</label>
              <input value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full border p-2 rounded-md bg-muted/50 focus:bg-background" />
            </div>
            <div>
              <label className="text-xs uppercase font-bold text-muted-foreground mb-1 block">Services Interested In</label>
              <input value={formData.servicesInterest} onChange={e => setFormData({...formData, servicesInterest: e.target.value})} className="w-full border p-2 rounded-md bg-muted/50 focus:bg-background" placeholder="e.g. Meta Ads, SEO" />
            </div>
            <div>
              <label className="text-xs uppercase font-bold text-muted-foreground mb-1 block">Remarks / Notes</label>
              <textarea value={formData.remarks} onChange={e => setFormData({...formData, remarks: e.target.value})} className="w-full border p-2 rounded-md bg-muted/50 focus:bg-background h-24" />
            </div>
            <div className="flex items-center gap-2 mt-4 p-3 border rounded-md bg-primary/5">
              <input type="checkbox" id="onboarded" checked={formData.isOnboarded} onChange={e => setFormData({...formData, isOnboarded: e.target.checked})} className="w-4 h-4 cursor-pointer" />
              <label htmlFor="onboarded" className="text-sm font-semibold cursor-pointer select-none">Client Onboarded?</label>
            </div>
            <Button type="submit" disabled={submitting} className="w-full font-bold">
              {submitting ? 'Saving...' : 'Submit Record'}
            </Button>
          </form>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold">Recent Calls</h2>
          {loading ? (
             <div className="text-muted-foreground animate-pulse p-4">Loading calls...</div>
          ) : calls.length === 0 ? (
             <div className="bg-card border border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-muted-foreground">
                <Phone className="w-12 h-12 opacity-20 mb-4" />
                <p>No call records found.</p>
                <p className="text-sm">Start making calls and logging them here.</p>
             </div>
          ) : (
             <div className="bg-card border rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/50 uppercase text-xs">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-muted-foreground">Date</th>
                      <th className="px-4 py-3 font-semibold text-muted-foreground">Client Details</th>
                      <th className="px-4 py-3 font-semibold text-muted-foreground">Services/Remarks</th>
                      <th className="px-4 py-3 font-semibold text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {calls.map((call: any) => (
                       <tr key={call.id} className="hover:bg-muted/30 transition-colors">
                          <td className="px-4 py-3 align-top whitespace-nowrap text-muted-foreground">
                            {new Date(call.date).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3 align-top">
                            <p className="font-bold">{call.clientName}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><Phone size={10} /> {call.mobileNo}</p>
                            {call.address && <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1 break-all"><MapPin size={10}/> {call.address}</p>}
                          </td>
                          <td className="px-4 py-3 align-top">
                             {call.servicesInterest && <p className="text-primary font-medium text-xs mb-1 px-2 py-0.5 bg-primary/10 rounded-md inline-block">{call.servicesInterest}</p>}
                             <p className="text-xs text-muted-foreground line-clamp-2">{call.remarks || 'No remarks.'}</p>
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
      </div>
    </div>
  );
}
