'use client';
import { DollarSign, Wallet, TrendingUp, HelpCircle, ArrowRightCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', amount: 1500 },
  { name: 'Tue', amount: 2200 },
  { name: 'Wed', amount: 1800 },
  { name: 'Thu', amount: 3100 },
  { name: 'Fri', amount: 4500 },
  { name: 'Sat', amount: 5200 },
  { name: 'Sun', amount: 4100 },
];

export default function EarningsPage() {
  return (
    <div className="space-y-6">
      <div className="bg-card p-8 rounded-2xl shadow-sm border border-border">
        <h1 className="text-3xl font-bold font-heading text-foreground uppercase">Commission Earnings</h1>
        <p className="text-muted-foreground mt-1 tracking-tight">Viewing your historical and pending commissions from successful referrals.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-primary p-8 rounded-2xl text-white shadow-xl shadow-primary/20">
              <div className="flex justify-between items-center mb-6">
                  <div className="p-3 bg-white/10 rounded-xl"><Wallet className="w-6 h-6" /></div>
                  <HelpCircle className="w-4 h-4 text-white/50" />
              </div>
              <p className="text-sm text-white/70 uppercase tracking-widest font-bold">Total Payouts</p>
              <h2 className="text-4xl font-bold font-heading mb-6 tracking-tight">₹12,450.00</h2>
              <Button variant="outline" className="w-full bg-white text-primary hover:bg-white/90 border-0 text-xs gap-2">
                  Request Payout <ArrowRightCircle className="w-4 h-4 text-primary" />
              </Button>
          </div>

          <div className="bg-card p-8 rounded-2xl border shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-center mb-6">
                  <div className="p-3 bg-green-100 text-green-600 rounded-xl"><DollarSign className="w-6 h-6" /></div>
                  <span className="text-[10px] text-green-500 font-bold bg-green-50 px-2 py-0.5 rounded tracking-widest">+12% vs LY</span>
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Pending Approval</p>
              <h2 className="text-3xl font-bold font-heading tracking-tight">₹2,100.00</h2>
              <p className="text-[10px] text-muted-foreground mt-2">Next payout available: Apr 15, 2024</p>
          </div>

          <div className="bg-card p-8 rounded-2xl border shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-center mb-6">
                  <div className="p-3 bg-orange-100 text-orange-600 rounded-xl"><TrendingUp className="w-6 h-6" /></div>
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Referral Conversions</p>
              <h2 className="text-3xl font-bold font-heading tracking-tight">4.2%</h2>
              <p className="text-[10px] text-muted-foreground mt-2">You ranked in the top 10% this month!</p>
          </div>
      </div>

      <div className="bg-card p-8 rounded-2xl border shadow-sm h-[400px]">
          <h3 className="text-lg font-bold font-heading mb-6">Weekly Commission Trends</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" fontSize={12} stroke="#888" />
              <YAxis fontSize={12} stroke="#888" />
              <Tooltip cursor={{fill: 'transparent'}} />
              <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
      </div>
    </div>
  );
}
