import { Users, Briefcase, IndianRupee, Clock, Activity, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminDashboardHome() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-card p-6 rounded-2xl shadow-sm border border-border">
        <div>
          <h1 className="text-3xl font-bold font-heading text-foreground">Admin Overview</h1>
          <p className="text-muted-foreground mt-1 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
            Real-time feed active
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-muted-foreground">System Status</p>
          <p className="text-green-600 font-bold flex items-center gap-1 justify-end">
            <Zap className="w-4 h-4" /> All Operational
          </p>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Clients", val: "48", icon: <Users className="w-6 h-6" />, color: "bg-blue-500/10 text-blue-500" },
          { title: "Total MEs", val: "5", icon: <Briefcase className="w-6 h-6" />, color: "bg-purple-500/10 text-purple-500" },
          { title: "Total Revenue", val: "₹72,450", icon: <IndianRupee className="w-6 h-6" />, color: "bg-green-500/10 text-green-500" },
          { title: "Pending Orders", val: "3", icon: <Clock className="w-6 h-6" />, color: "bg-orange-500/10 text-orange-500" }
        ].map((stat, i) => (
          <div key={i} className="bg-card p-6 rounded-2xl border shadow-sm flex items-center justify-between hover:-translate-y-1 transition-transform">
            <div>
              <p className="text-sm font-semibold text-muted-foreground uppercase">{stat.title}</p>
              <h2 className="text-3xl font-bold mt-1">{stat.val}</h2>
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.color}`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity Feed */}
        <div className="bg-card rounded-2xl border shadow-sm flex flex-col h-[500px]">
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold font-heading flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" /> Live Feed
            </h2>
            <span className="text-xs font-bold px-2 py-1 bg-red-100 text-red-600 rounded uppercase animate-pulse">Live</span>
          </div>
          <div className="p-6 flex-1 overflow-y-auto space-y-4">
            {/* Dummy SSE Data */}
            <div className="p-4 rounded-xl border bg-muted/40 border-primary/20 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
              <p className="text-sm text-muted-foreground mb-1">A minute ago</p>
              <p className="font-semibold text-foreground">Priya Sharma signed up via <span className="text-primary">ME002</span></p>
            </div>
            <div className="p-4 rounded-xl border bg-muted/40 border-green-500/20 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500"></div>
              <p className="text-sm text-muted-foreground mb-1">5 minutes ago</p>
              <p className="font-semibold text-foreground">New Order: <span className="text-green-600 font-bold">₹7,200</span> for Meta Ads (6M) by Rahul</p>
            </div>
          </div>
        </div>

        {/* Pending Actions */}
        <div className="bg-card rounded-2xl border shadow-sm flex flex-col h-[500px]">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold font-heading">Action Required</h2>
          </div>
          <div className="p-0 flex-1 overflow-y-auto divide-y">
            <div className="p-6 flex justify-between items-center hover:bg-muted/20 transition-colors">
              <div>
                <p className="font-bold text-lg">Mohan Verma</p>
                <p className="text-sm text-muted-foreground">Meta Ads - 6 Months</p>
                <p className="text-sm font-semibold text-green-600 mt-1">₹7,200 PAID</p>
              </div>
              <Button className="bg-success hover:bg-success/90 text-white shadow shadow-success/20">
                Activate
              </Button>
            </div>
            <div className="p-6 flex justify-between items-center hover:bg-muted/20 transition-colors">
              <div>
                <p className="font-bold text-lg">Aisha Kapoor</p>
                <p className="text-sm text-muted-foreground">ChatBot Installation</p>
                <p className="text-sm font-semibold text-green-600 mt-1">₹499 PAID</p>
              </div>
              <Button className="bg-success hover:bg-success/90 text-white shadow shadow-success/20">
                Activate
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
