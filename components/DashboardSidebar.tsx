'use client';
import Link from 'next/link';
import { Home, Package, Activity, Share2, MapPin, Video, MessageSquare, User as UserIcon, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DashboardSidebar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="w-64 border-r bg-card min-h-screen p-4 flex flex-col shadow-[2px_0_10px_rgba(0,0,0,0.02)] transition-all">
      <div className="mb-8 px-2">
        <h2 className="text-2xl font-bold font-heading text-primary">NV Studio</h2>
        <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold opacity-50 px-1">Client Portal</p>
      </div>

      <nav className="flex-1 space-y-1">
        <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-accent text-foreground transition-all">
          <Home className="w-5 h-5 text-primary" />
          Dashboard Home
        </Link>
        <Link href="/dashboard/my-services" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-accent text-foreground transition-all">
          <Package className="w-5 h-5 text-primary" />
          My Services
        </Link>

        <div className="py-4">
          <p className="px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 opacity-60">Analytics</p>
          <Link href="/dashboard/analytics/social-media" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium hover:bg-accent text-foreground/80 hover:text-foreground transition-all">
            <Share2 className="w-4 h-4" /> Social Media
          </Link>
          <Link href="/dashboard/analytics/meta-ads" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium hover:bg-accent text-foreground/80 hover:text-foreground transition-all">
            <Activity className="w-4 h-4" /> Meta Ads
          </Link>
          <Link href="/dashboard/analytics/gmb" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium hover:bg-accent text-foreground/80 hover:text-foreground transition-all">
            <MapPin className="w-4 h-4" /> GMB Profile
          </Link>
          <Link href="/dashboard/analytics/video" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium hover:bg-accent text-foreground/80 hover:text-foreground transition-all">
            <Video className="w-4 h-4" /> Video Project
          </Link>
          <Link href="/dashboard/analytics/chatbot" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium hover:bg-accent text-foreground/80 hover:text-foreground transition-all">
            <MessageSquare className="w-4 h-4" /> ChatBot
          </Link>
        </div>
      </nav>

      <div className="mt-auto border-t pt-4 space-y-1">
        <Link href="/dashboard/profile" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium hover:bg-accent text-foreground transition-all">
          <UserIcon className="w-5 h-5 text-muted-foreground" />
          Profile
        </Link>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium hover:bg-destructive/10 text-destructive transition-all"
        >
          <LogOut className="w-5 h-5" />
          Log out
        </button>
      </div>
    </div>
  );
}

