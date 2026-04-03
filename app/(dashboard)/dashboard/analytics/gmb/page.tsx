'use client';
import { MapPin, Star, Eye, MousePointer2, TrendingUp, BarChart } from 'lucide-react';
import { BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Jan', views: 2400 },
  { name: 'Feb', views: 3200 },
  { name: 'Mar', views: 2800 },
  { name: 'Apr', views: 4500 },
  { name: 'May', views: 5100 },
];

export default function GMBPage() {
  return (
    <div className="space-y-6">
      <div className="bg-card p-8 rounded-2xl shadow-sm border border-border">
        <h1 className="text-3xl font-bold font-heading text-foreground uppercase">Google My Business</h1>
        <p className="text-muted-foreground mt-1">Manage local search visibility and reviews tracking.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
              { label: 'Avg Rating', value: '4.8', icon: <Star className="w-5 h-5 text-yellow-500" /> },
              { label: 'Total Views', value: '18.2K', icon: <Eye className="w-5 h-5 text-blue-500" /> },
              { label: 'Action Clicks', value: '342', icon: <MousePointer2 className="w-5 h-5 text-green-500" /> },
              { label: 'Local Rank', value: '#3', icon: <TrendingUp className="w-5 h-5 text-primary" /> }
          ].map((s, i) => (
              <div key={i} className="bg-card p-6 rounded-2xl border shadow-sm flex items-center justify-between">
                  <div>
                      <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
                      <h4 className="text-2xl font-bold font-heading">{s.value}</h4>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-muted/20 flex items-center justify-center">
                      {s.icon}
                  </div>
              </div>
          ))}
      </div>

      <div className="bg-card p-8 rounded-2xl border shadow-sm h-[400px]">
          <h3 className="text-lg font-bold font-heading mb-6 flex items-center gap-2">
              <BarChart className="w-5 h-5 text-primary" /> Profile Interactions
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <ReBarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" fontSize={12} stroke="#888" />
              <YAxis fontSize={12} stroke="#888" />
              <Tooltip cursor={{fill: 'transparent'}} />
              <Bar dataKey="views" fill="#a855f7" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 4 ? '#7c3aed' : '#a855f7'} />
                ))}
              </Bar>
            </ReBarChart>
          </ResponsiveContainer>
      </div>
    </div>
  );
}
