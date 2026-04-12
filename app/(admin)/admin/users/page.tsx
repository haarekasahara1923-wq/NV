'use client';
import { useState, useEffect } from 'react';
import { Users, Search, MoreVertical, Shield, User as UserIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function UsersManagementPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users');
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-card p-8 rounded-2xl shadow-sm border border-border">
        <div>
          <h1 className="text-3xl font-bold font-heading text-foreground uppercase">User Management</h1>
          <p className="text-muted-foreground mt-1">Viewing all registered users, clients and marketing executives.</p>
        </div>
        <Button>Add New User</Button>
      </div>

      <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-muted/20 flex gap-4">
              <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search users by name, email or role..." className="pl-10" />
              </div>
          </div>
          
          <div className="overflow-x-auto">
              {loading ? (
                 <div className="p-12 flex justify-center text-primary"><Loader2 className="animate-spin w-8 h-8" /></div>
              ) : (
                <table className="w-full text-left text-sm">
                    <thead className="bg-muted text-muted-foreground font-medium uppercase text-[10px] tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Full Identity</th>
                            <th className="px-6 py-4">Access Role</th>
                            <th className="px-6 py-4">Registration</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {users.map((user, i) => (
                            <tr key={i} className="hover:bg-muted/30 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"><UserIcon className="w-4 h-4 text-muted-foreground" /></div>
                                        <div>
                                            <div className="font-bold">{user.name}</div>
                                            <div className="text-xs text-muted-foreground">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded tracking-widest ${
                                        user.role === 'ADMIN' ? 'bg-red-100 text-red-600' : 
                                        user.role === 'MARKETING_EXECUTIVE' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'
                                    }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-muted-foreground">{new Date(user.createdAt).toLocaleDateString()}</td>
                                <td className="px-6 py-4 text-right">
                                    <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                          <tr><td colSpan={4} className="text-center p-8 text-muted-foreground">No users found.</td></tr>
                        )}
                    </tbody>
                </table>
              )}
          </div>
      </div>
    </div>
  );
}
