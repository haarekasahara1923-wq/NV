'use client';
import { Briefcase, Search, Shield, Filter, ExternalLink, MoreVertical, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const execs = [
  { code: 'NV001', name: 'NV Studio Admin', referrals: 15, commission: 0, status: 'ACTIVE' },
  { code: 'ME001', name: 'Rahul Sharma', referrals: 8, commission: 15, status: 'ACTIVE' },
  { code: 'ME002', name: 'Priya Me', referrals: 2, commission: 10, status: 'PENDING' },
];

export default function MarketingExecutivesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-card p-8 rounded-2xl shadow-sm border border-border">
        <div>
          <h1 className="text-3xl font-bold font-heading text-foreground uppercase tracking-tight">Marketing Network</h1>
          <p className="text-muted-foreground mt-1">Reviewing your marketing executives, performance, and commission structures.</p>
        </div>
      </div>

      <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-muted/20 flex gap-4">
              <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search execs by name or code..." className="pl-10" />
              </div>
          </div>
          
          <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                  <thead className="bg-muted text-muted-foreground font-medium uppercase text-[10px] tracking-wider">
                      <tr>
                          <th className="px-6 py-4">ME Code</th>
                          <th className="px-6 py-4">Executive Name</th>
                          <th className="px-6 py-4">Commission</th>
                          <th className="px-6 py-4 text-center">Referrals</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y">
                      {execs.map((e, i) => (
                          <tr key={i} className="hover:bg-muted/30 transition-colors">
                              <td className="px-6 py-4 font-bold text-primary tracking-widest">{e.code}</td>
                              <td className="px-6 py-4 font-medium">{e.name}</td>
                              <td className="px-6 py-4 text-muted-foreground uppercase text-[10px] font-bold tracking-widest">
                                <span className="flex items-center gap-1"><DollarSign className="w-3 h-3 text-green-600" /> {e.commission}%</span>
                              </td>
                              <td className="px-6 py-4 text-center">
                                  <span className="font-bold bg-muted px-2 py-0.5 rounded text-xs">{e.referrals}</span>
                              </td>
                              <td className="px-6 py-4 text-[10px] font-bold tracking-widest uppercase">
                                  <span className={`px-2 py-0.5 rounded ${
                                      e.status === 'ACTIVE' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                                  }`}>
                                      {e.status}
                                  </span>
                              </td>
                              <td className="px-6 py-4 text-right flex justify-end gap-2">
                                  <Button variant="ghost" size="icon" className="text-primary hover:text-white hover:bg-primary">
                                      <Shield className="w-4 h-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon"><ExternalLink className="w-4 h-4" /></Button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </div>
    </div>
  );
}
