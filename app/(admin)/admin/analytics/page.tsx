'use client';
import { TrendingUp, BarChart2, Save, Search, Settings, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function UpdateAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="bg-card p-8 rounded-2xl shadow-sm border border-border">
        <h1 className="text-3xl font-bold font-heading text-foreground uppercase tracking-tight">Update Performance</h1>
        <p className="text-muted-foreground mt-1">Direct control over the analytics data displayed to your clients.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 bg-card p-6 rounded-2xl border shadow-sm space-y-4">
              <h3 className="font-bold text-lg font-heading">Select Client</h3>
              <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search client name..." className="pl-10" />
              </div>
              <div className="space-y-2 mt-4 pt-4 border-t">
                  <div className="p-3 bg-muted/30 rounded-xl flex justify-between items-center cursor-pointer border border-primary text-xs">
                      <span className="font-bold">Rahul Sharma</span>
                      <span className="text-primary font-bold">#ORD-9402</span>
                  </div>
                  <div className="p-3 bg-muted/10 rounded-xl flex justify-between items-center cursor-not-allowed text-xs">
                      <span>Priya Verma</span>
                      <span className="text-muted-foreground">#ORD-9415</span>
                  </div>
              </div>
          </div>

          <div className="lg:col-span-3 bg-card p-8 rounded-2xl border shadow-sm space-y-8">
              <div className="flex justify-between items-center border-b pb-4">
                  <div className="flex items-center gap-3">
                      <BarChart2 className="w-5 h-5 text-primary" />
                      <h2 className="text-xl font-bold font-heading">Performance Data: Social Media</h2>
                  </div>
                  <Button size="sm" className="gap-2"><Save className="w-4 h-4" /> Save Data</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                      <Label>Total Followers</Label>
                      <Input type="number" defaultValue="1240" />
                  </div>
                  <div className="space-y-2">
                      <Label>Total Likes</Label>
                      <Input type="number" defaultValue="8902" />
                  </div>
                  <div className="space-y-2">
                      <Label>Search Reach (%)</Label>
                      <Input type="number" defaultValue="42" />
                  </div>
              </div>

              <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200 flex gap-4 text-yellow-800">
                  <AlertCircle className="w-6 h-6 flex-shrink-0" />
                  <p className="text-sm">These values represent the raw data that feeds the visual charts in the client portal. Ensuring accuracy is critical for maintaining client trust.</p>
              </div>

              <div className="space-y-4">
                  <h3 className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Historical Data Points</h3>
                  <div className="p-2 border rounded-xl overflow-hidden bg-muted/5">
                      <div className="grid grid-cols-7 gap-1">
                          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                              <div key={i} className="text-center p-2">
                                  <p className="text-[10px] font-bold mb-2">{d}</p>
                                  <Input className="h-8 text-xs text-center border-none bg-white p-0" defaultValue={Math.floor(Math.random() * 100) + 1} />
                              </div>
                          ))}
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}
