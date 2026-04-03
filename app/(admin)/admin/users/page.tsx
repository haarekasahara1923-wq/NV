'use client';
import { Users, Search, MoreVertical, Shield, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const users = [
  { name: 'Admin User', email: 'admin@nvstudio.in', role: 'ADMIN', joined: 'Jan 01, 2024' },
  { name: 'Rahul Sharma', email: 'rahul@example.com', role: 'CLIENT', joined: 'Mar 15, 2024' },
  { name: 'Priya Me', email: 'priya@nvstudio.in', role: 'MARKETING_EXECUTIVE', joined: 'Mar 28, 2024' },
];

export default function UsersManagementPage() {
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
                              <td className="px-6 py-4 text-muted-foreground">{user.joined}</td>
                              <td className="px-6 py-4 text-right">
                                  <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </div>
    </div>
  );
}
