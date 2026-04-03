'use client';
import { Users, Search, Mail, Phone, Calendar, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const clients = [
  { name: 'Rahul Sharma', email: 'rahul@example.com', joined: 'Mar 15, 2024', services: 2, status: 'ACTIVE' },
  { name: 'Priya Verma', email: 'priya@example.com', joined: 'Mar 28, 2024', services: 1, status: 'PENDING' },
];

export default function MyClientsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-card p-8 rounded-2xl shadow-sm border border-border">
        <div>
          <h1 className="text-3xl font-bold font-heading text-foreground uppercase">My Managed Clients</h1>
          <p className="text-muted-foreground mt-1 tracking-tight">Viewing your network and their active subscriptions.</p>
        </div>
      </div>

      <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-muted/20 flex gap-4">
              <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search your clients by name or email..." className="pl-10" />
              </div>
              <Button>Search</Button>
          </div>
          
          <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                  <thead className="bg-muted text-muted-foreground font-medium uppercase text-[10px] tracking-wider">
                      <tr>
                          <th className="px-6 py-4">Client Name</th>
                          <th className="px-6 py-4">Joined Date</th>
                          <th className="px-6 py-4">Services</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4 text-right">Action</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y">
                      {clients.map((client, i) => (
                          <tr key={i} className="hover:bg-muted/30 transition-colors">
                              <td className="px-6 py-4">
                                  <div className="font-bold">{client.name}</div>
                                  <div className="text-xs text-muted-foreground">{client.email}</div>
                              </td>
                              <td className="px-6 py-4 text-muted-foreground">{client.joined}</td>
                              <td className="px-6 py-4">
                                  <span className="font-medium bg-muted px-2 py-0.5 rounded">{client.services} Services</span>
                              </td>
                              <td className="px-6 py-4">
                                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded tracking-widest ${
                                      client.status === 'ACTIVE' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                                  }`}>
                                      {client.status}
                                  </span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary-foreground hover:bg-primary">
                                      <ExternalLink className="w-4 h-4" />
                                  </Button>
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
