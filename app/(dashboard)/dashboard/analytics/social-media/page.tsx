'use client';
import { Share2, Users, Heart, MessageCircle, BarChart2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', followers: 120, engagement: 45 },
  { name: 'Tue', followers: 135, engagement: 52 },
  { name: 'Wed', followers: 128, engagement: 48 },
  { name: 'Thu', followers: 142, engagement: 61 },
  { name: 'Fri', followers: 156, engagement: 74 },
  { name: 'Sat', followers: 168, engagement: 82 },
  { name: 'Sun', followers: 175, engagement: 89 },
];

export default function SocialMediaPage() {
  return (
    <div className="space-y-6">
      <div className="bg-card p-8 rounded-2xl shadow-sm border border-border">
        <h1 className="text-3xl font-bold font-heading text-foreground uppercase">Social Media Control</h1>
        <p className="text-muted-foreground mt-1">Analytics for Facebook, Instagram and YouTube</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
              { label: 'Followers', value: '1,240', icon: <Users className="w-5 h-5 text-blue-500" /> },
              { label: 'Likes', value: '8,902', icon: <Heart className="w-5 h-5 text-pink-500" /> },
              { label: 'Comments', value: '456', icon: <MessageCircle className="w-5 h-5 text-green-500" /> }
          ].map((s, i) => (
              <div key={i} className="bg-card p-6 rounded-2xl border shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-muted/20 flex items-center justify-center">
                      {s.icon}
                  </div>
                  <div>
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                      <h4 className="text-2xl font-bold font-heading">{s.value}</h4>
                  </div>
              </div>
          ))}
      </div>

      <div className="bg-card p-8 rounded-2xl border shadow-sm h-[400px]">
          <h3 className="text-lg font-bold font-heading mb-6 flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-primary" /> Growth Trend
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" fontSize={12} stroke="#888" />
              <YAxis fontSize={12} stroke="#888" />
              <Tooltip />
              <Line type="monotone" dataKey="followers" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="engagement" stroke="#ec4899" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
      </div>
    </div>
  );
}
