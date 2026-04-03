'use client';
import { PackageOpen, Search, Filter, ExternalLink, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const orders = [
  { id: 'ORD-9402', client: 'Rahul Sharma', service: 'Social Media Management', amount: '₹1,499.00', date: 'Mar 15, 2024', status: 'PAID' },
  { id: 'ORD-9415', client: 'Priya Me', service: 'Video Shoot & Editing', amount: '₹599.00', date: 'Mar 28, 2024', status: 'PENDING' },
];

export default function OrdersManagementPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-card p-8 rounded-2xl shadow-sm border border-border">
        <div>
          <h1 className="text-3xl font-bold font-heading text-foreground uppercase">Order Management</h1>
          <p className="text-muted-foreground mt-1">Reviewing all client service orders and platform revenue.</p>
        </div>
      </div>

      <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-muted/20 flex gap-4">
              <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search orders by client, ID or service..." className="pl-10" />
              </div>
              <Button variant="outline" className="gap-2"><Filter className="w-4 h-4" /> Filter</Button>
          </div>
          
          <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                  <thead className="bg-muted text-muted-foreground font-medium uppercase text-[10px] tracking-wider">
                      <tr>
                          <th className="px-6 py-4">Order ID</th>
                          <th className="px-6 py-4">Client Detail</th>
                          <th className="px-6 py-4">Service</th>
                          <th className="px-6 py-4">Revenue</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y">
                      {orders.map((order, i) => (
                          <tr key={i} className="hover:bg-muted/30 transition-colors">
                              <td className="px-6 py-4 font-bold text-primary">{order.id}</td>
                              <td className="px-6 py-4">
                                  <div className="font-medium">{order.client}</div>
                                  <div className="text-xs text-muted-foreground">{order.date}</div>
                              </td>
                              <td className="px-6 py-4 text-muted-foreground uppercase text-[10px] font-bold tracking-widest">{order.service}</td>
                              <td className="px-6 py-4 font-bold">{order.amount}</td>
                              <td className="px-6 py-4">
                                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded tracking-widest ${
                                      order.status === 'PAID' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                                  }`}>
                                      {order.status}
                                  </span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                  <Button variant="ghost" size="icon"><ExternalLink className="w-4 h-4" /></Button>
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
