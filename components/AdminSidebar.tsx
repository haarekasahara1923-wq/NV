'use client';
import Link from 'next/link';
import { LayoutDashboard, Users, PackageOpen, Briefcase, TrendingUp, Settings, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminSidebar() {
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
    <div className="w-64 border-r bg-secondary text-secondary-foreground min-h-screen p-4 flex flex-col shadow-xl">
      <div className="mb-8 px-2 border-b border-secondary-foreground/10 pb-4">
        <h2 className="text-2xl font-bold font-heading text-primary">NV Studio</h2>
        <p className="text-[10px] font-bold text-secondary-foreground/60 flex items-center gap-2 mt-2 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
          Live Admin
        </p>
      </div>

      <nav className="flex-1 space-y-1">
        <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-white/5 text-white transition-all">
          <LayoutDashboard className="w-5 h-5 text-primary" />
          Overview
        </Link>
        <Link href="/admin/users" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-white/5 text-white transition-all">
          <Users className="w-5 h-5 text-primary" />
          All Users
        </Link>
        <Link href="/admin/orders" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-white/5 text-white transition-all">
          <PackageOpen className="w-5 h-5 text-primary" />
          All Orders
        </Link>
        <Link href="/admin/marketing-executives" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-white/5 text-white transition-all">
          <Briefcase className="w-5 h-5 text-primary" />
          Marketing Execs
        </Link>
        <Link href="/admin/analytics" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-white/5 text-white transition-all">
          <TrendingUp className="w-5 h-5 text-primary" />
          Update Analytics
        </Link>
        <div className="pt-4 mt-4 border-t border-white/5">
            <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium hover:bg-white/5 text-white/70 hover:text-white transition-all">
              <Settings className="w-5 h-5" />
              Settings
            </Link>
        </div>
      </nav>

      <div className="mt-auto border-t border-secondary-foreground/10 pt-4 space-y-1">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-500/10 text-red-400 transition-all"
        >
          <LogOut className="w-5 h-5" />
          Log out
        </button>
      </div>
    </div>
  );
}
