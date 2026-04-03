import { Button } from '@/components/ui/button';
import { Share2, MessageSquare, Activity, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function ClientDashboardHome() {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-background border shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold font-heading text-foreground mb-2">Welcome back, Client! 👋</h1>
          <p className="text-muted-foreground">Member since April 2025 | Referred by: NV001</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-4 text-center">
          <div className="bg-card px-4 py-3 rounded-xl border shadow-sm">
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Active Services</p>
            <p className="text-2xl font-bold text-success mt-1">2</p>
          </div>
          <div className="bg-card px-4 py-3 rounded-xl border shadow-sm">
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Pending</p>
            <p className="text-2xl font-bold text-warning mt-1">1</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Active Services Panel */}
        <div className="bg-card rounded-2xl border shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b bg-muted/40">
            <h2 className="text-xl font-bold font-heading">My Active Services</h2>
          </div>
          <div className="p-4 flex-1 space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl border bg-card hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                  <Share2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Social Media Manager</h3>
                  <p className="text-sm text-success font-medium flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-success"></span> Active till May 25
                  </p>
                </div>
              </div>
              <Link href="/dashboard/analytics/social-media">
                <Button variant="outline" size="sm" className="hidden sm:flex">View Analytics</Button>
              </Link>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl border bg-card hover:border-warning/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-warning/10 text-warning rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">ChatBot Installation</h3>
                  <p className="text-sm text-warning font-medium flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-warning animate-pulse"></span> Pending (24hrs)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Available Services Panel */}
        <div className="bg-gradient-to-b from-secondary to-secondary/90 rounded-2xl border border-secondary shadow-sm overflow-hidden text-secondary-foreground flex flex-col">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-bold font-heading text-white">Available Services</h2>
            <p className="text-sm text-secondary-foreground/80 mt-1">Grow your business further</p>
          </div>
          <div className="p-6 flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
              <Activity className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Ready to scale?</h3>
            <p className="text-sm text-secondary-foreground/70 mb-6 max-w-[250px]">
              Browse our catalog of premium digital services and unlock new growth channels.
            </p>
            <Link href="/dashboard/my-services">
              <Button className="bg-primary hover:bg-primary/90 text-white border-0 shadow-lg group">
                Browse Catalog
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
