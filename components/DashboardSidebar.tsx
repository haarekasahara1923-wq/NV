'use client';
import Link from 'next/link';
import { Home, Package, Activity, Share2, MapPin, Video, MessageSquare, User as UserIcon, LogOut, LayoutDashboard, Sparkles, Zap, ChevronRight } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function DashboardSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const menuItems = [
    { name: 'Dashboard Home', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Services', href: '/dashboard/my-services', icon: Package },
  ];

  const analyticsItems = [
    { name: 'Social Media Management', href: '/dashboard/analytics/social-media', icon: Share2 },
    { name: 'Meta Ads', href: '/dashboard/analytics/meta-ads', icon: Activity },
    { name: 'GMB Profile', href: '/dashboard/analytics/gmb', icon: MapPin },
    { name: 'Video Project', href: '/dashboard/analytics/video', icon: Video },
    { name: 'ChatBot AI', href: '/dashboard/analytics/chatbot', icon: MessageSquare },
  ];

  return (
    <div className="w-72 border-r border-border/50 bg-card/50 backdrop-blur-3xl min-h-screen flex flex-col shadow-2xl transition-all relative z-20">
      {/* Top Brand Section */}
      <div className="p-8">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black font-heading tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">NV Studio</h2>
            <p className="text-[10px] text-primary uppercase tracking-[0.2em] font-black">Client Portal</p>
          </div>
        </Link>
      </div>

      <div className="px-6 pb-4">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-border to-transparent opacity-50"></div>
      </div>

      <nav className="flex-1 px-4 space-y-8 overflow-y-auto custom-scrollbar">
        {/* Main Menu */}
        <div className="space-y-1.5">
          <p className="px-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-3 opacity-80">Overview</p>
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link key={item.name} href={item.href} className="block relative group">
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-primary rounded-r-full shadow-[0_0_10px_rgba(255,107,0,0.5)]"></span>
                )}
                <div className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-300",
                  isActive 
                    ? "bg-primary/10 text-primary shadow-sm" 
                    : "text-foreground/70 hover:bg-muted/50 hover:text-foreground"
                )}>
                  <Icon className={cn("w-5 h-5 transition-transform duration-300", isActive ? "scale-110" : "group-hover:scale-110")} />
                  {item.name}
                  {isActive && <ChevronRight className="w-4 h-4 ml-auto opacity-50" />}
                </div>
              </Link>
            )
          })}
        </div>

        {/* Analytics Section */}
        <div className="space-y-1.5">
          <p className="px-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-3 opacity-80 flex items-center gap-2">
             <Zap className="w-3 h-3 text-accent" /> Analytics Hub
          </p>
          {analyticsItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link key={item.name} href={item.href} className="block relative group">
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-accent rounded-r-full shadow-[0_0_10px_rgba(255,215,0,0.5)]"></span>
                )}
                <div className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
                  isActive 
                    ? "bg-accent/10 text-foreground font-bold shadow-sm" 
                    : "text-foreground/60 hover:bg-muted/30 hover:text-foreground hover:translate-x-1"
                )}>
                  <Icon className={cn("w-4 h-4", isActive ? "text-accent" : "text-foreground/40 group-hover:text-foreground/80")} />
                  {item.name}
                </div>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Bottom Profile / Logout */}
      <div className="mt-auto p-6 bg-gradient-to-t from-background via-background/80 to-transparent">
        <div className="bg-card border shadow-sm rounded-2xl p-2 flex flex-col gap-1 relative overflow-hidden">
          <Link href="/dashboard/profile" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all group">
            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-105 transition-all">
              <UserIcon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            Settings
          </Link>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-destructive/80 hover:text-destructive hover:bg-destructive/10 transition-all group"
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <LogOut className="w-4 h-4" />
            </div>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

