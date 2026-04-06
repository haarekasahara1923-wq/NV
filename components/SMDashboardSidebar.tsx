'use client';
import Link from 'next/link';
import { Home, Users, DollarSign, User as UserIcon, LogOut, Briefcase } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SMDashboardSidebar() {
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
      <div className="mb-8 px-2 text-center">
        <h2 className="text-2xl font-bold font-heading text-primary bg-clip-text">NV Studio</h2>
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] px-1 opacity-60">Sales Manager Portal</p>
      </div>

      <nav className="flex-1 space-y-1.5">
        <Link href="/sm-dashboard" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/10 text-foreground transition-all group">
          <Home className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
          Dashboard
        </Link>
        <Link href="/sm-dashboard/team" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/10 text-foreground transition-all group">
          <Users className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
          My Team
        </Link>
        <Link href="/sm-dashboard/incentives" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/10 text-foreground transition-all group">
          <DollarSign className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
          My Incentives
        </Link>
      </nav>

      <div className="mt-auto border-t pt-4 space-y-1">
        <Link href="/sm-dashboard/profile" className="flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-accent text-foreground transition-all">
          <UserIcon className="w-5 h-5 text-muted-foreground" />
          Profile
        </Link>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-destructive/10 text-destructive transition-all"
        >
          <LogOut className="w-5 h-5" />
          Log out
        </button>
      </div>
    </div>
  );
}
