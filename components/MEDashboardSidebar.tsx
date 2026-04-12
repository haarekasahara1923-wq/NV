'use client';
import Link from 'next/link';
import { Home, Users, DollarSign, User as UserIcon, LogOut, Phone } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function MEDashboardSidebar() {
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
    <div className="w-64 border-r bg-card min-h-screen p-4 flex flex-col shadow-[2px_0_10px_rgba(0,0,0,0.02)]">
      <div className="mb-8 px-2">
        <h2 className="text-2xl font-bold font-heading text-primary">NV Studio</h2>
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1 opacity-50">ME Portal</p>
      </div>

      <nav className="flex-1 space-y-2">
        <Link href="/me-dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-accent text-foreground transition-all">
          <Home className="w-5 h-5 text-primary" />
          Dashboard Home
        </Link>
        <Link href="/me-dashboard/my-clients" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-accent text-foreground transition-all">
          <Users className="w-5 h-5 text-primary" />
          My Clients
        </Link>
        <Link href="/me-dashboard/daily-calls" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-accent text-foreground transition-all">
          <Phone className="w-5 h-5 text-primary" />
          Daily Calls List
        </Link>
        <Link href="/me-dashboard/earnings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-accent text-foreground transition-all">
          <DollarSign className="w-5 h-5 text-primary" />
          My Earnings
        </Link>
      </nav>

      <div className="mt-auto border-t pt-4 space-y-1">
        <Link href="/me-dashboard/profile" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium hover:bg-accent text-foreground transition-all">
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
