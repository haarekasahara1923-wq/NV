import { Users, DollarSign, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function MEDashboardHome() {
  return (
    <div className="space-y-6">
      <div className="p-8 rounded-2xl bg-secondary text-secondary-foreground shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center border border-secondary">
        <div>
          <h1 className="text-3xl font-bold font-heading text-white mb-2">Hello, ME Name!</h1>
          <p className="text-secondary-foreground/80 flex items-center gap-2">
            Your Code: <span className="bg-primary/20 text-primary px-3 py-1 rounded-md font-bold text-lg tracking-widest border border-primary/30">ME002 🏷️</span>
          </p>
          <p className="mt-2 text-sm text-secondary-foreground/60">Share this code with clients during field visits to earn commission.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card rounded-2xl p-6 border shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Total Clients</p>
            <p className="text-3xl font-bold mt-1">12</p>
          </div>
        </div>
        <div className="bg-card rounded-2xl p-6 border shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
            <ArrowUpRight className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">This Month</p>
            <p className="text-3xl font-bold mt-1">3 <span className="text-sm font-medium text-emerald-500 ml-1">new</span></p>
          </div>
        </div>
        <div className="bg-card rounded-2xl p-6 border shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center text-yellow-600">
            <DollarSign className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Total Earnings</p>
            <p className="text-3xl font-bold mt-1">₹2,400</p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
        <div className="p-6 border-b bg-muted/30 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold font-heading">Recent Client Signups</h2>
            <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
              Live Tracking
            </p>
          </div>
          <Link href="/me-dashboard/my-clients">
            <Button variant="outline" size="sm">View All</Button>
          </Link>
        </div>
        <div className="divide-y">
          {[
            { name: "Ramesh Gupta", email: "ramesh@gmail.com", service: "Social Media Manager", plan: "1,499/mo", comm: "₹149.90", status: "pending", time: "Today" },
            { name: "Priya Sharma", email: "priya@yahoo.com", service: "Video Shoot", plan: "599/mo", comm: "₹59.90", status: "paid", time: "Yesterday" },
          ].map((client, i) => (
            <div key={i} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-muted/10 transition-colors">
              <div>
                <p className="font-bold text-lg">{client.name}</p>
                <p className="text-sm text-muted-foreground">{client.email} • joined {client.time}</p>
                <p className="text-sm mt-2 font-medium">Service: {client.service} — ₹{client.plan}</p>
              </div>
              <div className="mt-4 md:mt-0 text-right">
                <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold mb-1">Commission</p>
                <p className="text-xl font-bold text-green-600">{client.comm}</p>
                <p className={`text-xs font-semibold uppercase mt-1 ${client.status === 'paid' ? 'text-green-500' : 'text-warning'}`}>
                  ({client.status})
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
