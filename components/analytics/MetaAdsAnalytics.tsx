'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Target, MousePointerClick, Activity, Users, DollarSign, TrendingUp } from 'lucide-react';

const mockData = [
  { name: 'Week 1', clicks: 400, leads: 24 },
  { name: 'Week 2', clicks: 300, leads: 18 },
  { name: 'Week 3', clicks: 550, leads: 35 },
  { name: 'Week 4', clicks: 450, leads: 28 },
];

export default function MetaAdsAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-card p-6 rounded-2xl border shadow-sm">
        <div>
          <h2 className="text-2xl font-bold font-heading flex items-center gap-2">
             Meta Ads Performance
          </h2>
          <p className="text-sm text-muted-foreground mt-1">Report Month: <span className="font-semibold text-foreground">April 2025</span></p>
        </div>
        <div className="text-right flex flex-col items-end">
          <span className="px-3 py-1 bg-success/10 text-success text-xs font-bold uppercase rounded-full border border-success/20">Active</span>
          <p className="text-xs text-muted-foreground mt-2">Last updated: Today, 10:00 AM</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Campaigns", value: "3", icon: <Target className="w-5 h-5 text-primary" /> },
          { label: "Total Spend", value: "₹12,450", icon: <DollarSign className="w-5 h-5 text-green-500" /> },
          { label: "Total Leads", value: "105", icon: <Users className="w-5 h-5 text-blue-500" /> },
          { label: "ROAS", value: "3.2x", icon: <TrendingUp className="w-5 h-5 text-purple-500" /> }
        ].map((stat, i) => (
          <div key={i} className="bg-card p-4 rounded-xl border shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <span className="w-10 h-10 rounded-lg bg-secondary/5 flex items-center justify-center">
                {stat.icon}
              </span>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold">{stat.label}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card p-6 rounded-2xl border shadow-sm">
        <h3 className="font-bold font-heading mb-6">Performance Trends (Clicks vs Leads)</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--primary))" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--success))" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <Tooltip 
                cursor={{ fill: 'hsl(var(--muted)/0.5)' }} 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
              />
              <Bar yAxisId="left" dataKey="clicks" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={32} name="Clicks" />
              <Bar yAxisId="right" dataKey="leads" fill="#22C55E" radius={[4, 4, 0, 0]} barSize={32} name="Leads" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
