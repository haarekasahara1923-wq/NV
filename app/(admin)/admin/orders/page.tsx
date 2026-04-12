'use client';
import { useState, useEffect } from 'react';
import { Search, Filter, CheckCircle2, IndianRupee, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function OrdersManagementPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/admin/orders');
      const data = await res.json();
      if (res.ok) {
        setOrders(data.orders);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const markPaid = async (orderId: string) => {
    if (!confirm('Are you sure you want to manually mark this order as PAID? This will instantly activate their subscription.')) return;
    
    setActing(orderId);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/mark-paid`, {
        method: 'POST'
      });
      const data = await res.json();
      if (res.ok) {
        alert('Order updated successfully!');
        fetchOrders();
      } else {
        alert(data.error || 'Failed to update order');
      }
    } catch (e) {
      console.error(e);
      alert('Network Error');
    } finally {
      setActing(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-card p-8 rounded-2xl shadow-sm border border-border">
        <div>
          <h1 className="text-3xl font-bold font-heading text-foreground uppercase">Order Management</h1>
          <p className="text-muted-foreground mt-1">Reviewing all client service orders. Mark PENDING orders as PAID manually for Cash/UPI transactions.</p>
        </div>
      </div>

      <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-muted/20 flex gap-4">
              <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search orders..." className="pl-10" />
              </div>
              <Button variant="outline" className="gap-2"><Filter className="w-4 h-4" /> Filter</Button>
          </div>
          
          <div className="overflow-x-auto">
              {loading ? (
                <div className="p-12 flex justify-center text-primary"><Loader2 className="animate-spin w-8 h-8" /></div>
              ) : (
                <table className="w-full text-left text-sm">
                    <thead className="bg-muted text-muted-foreground font-medium uppercase text-[10px] tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Order Details</th>
                            <th className="px-6 py-4">Client Detail</th>
                            <th className="px-6 py-4">Service</th>
                            <th className="px-6 py-4">Revenue</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {orders.map((order: any, i: number) => (
                            <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                                <td className="px-6 py-4">
                                  <span className="font-bold text-primary">{order.razorpayOrderId?.slice(0, 14) || `ORD-${order.id.slice(0,5).toUpperCase()}`}</span>
                                  <p className="text-xs text-muted-foreground mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-bold">{order.user.name}</div>
                                    <div className="text-xs text-muted-foreground">{order.user.email}</div>
                                </td>
                                <td className="px-6 py-4">
                                  <span className="uppercase text-[10px] font-bold tracking-widest bg-primary/10 text-primary px-2 py-1 rounded inline-block mb-1">{order.service.name}</span>
                                  <p className="text-xs text-muted-foreground font-semibold">{order.planType}</p>
                                </td>
                                <td className="px-6 py-4 font-bold flex items-center h-full mt-2"><IndianRupee size={14}/> {order.amount / 100}</td>
                                <td className="px-6 py-4">
                                    <span className={`text-[10px] font-bold px-2 py-1 rounded-sm tracking-widest uppercase ${
                                        order.status === 'PAID' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                                    }`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {order.status !== 'PAID' ? (
                                      <Button 
                                        onClick={() => markPaid(order.id)} 
                                        disabled={acting === order.id}
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white shadow shadow-emerald-500/20 px-3 h-8 text-xs font-bold gap-1"
                                      >
                                        {acting === order.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle2 className="w-3 h-3" />}
                                        Mark Paid
                                      </Button>
                                    ) : (
                                       <span className="text-muted-foreground text-xs font-bold px-3 py-1 bg-muted rounded-full">Activated</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {orders.length === 0 && (
                          <tr>
                            <td colSpan={6} className="text-center p-8 text-muted-foreground">No orders found.</td>
                          </tr>
                        )}
                    </tbody>
                </table>
              )}
          </div>
      </div>
    </div>
  );
}
