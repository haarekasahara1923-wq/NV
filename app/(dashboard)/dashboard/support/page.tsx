import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';
import SupportForm from '@/components/SupportForm';
import { MessageCircle, ShieldAlert, LifeBuoy } from 'lucide-react';

export default async function SupportPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const clientInfo = {
    userId: user.id.slice(-6).toUpperCase(),
    name: user.name,
    phone: user.phone || 'N/A'
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-card p-10 rounded-3xl shadow-sm border border-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 -z-0"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold font-heading text-foreground mb-2 flex items-center gap-3">
             <LifeBuoy className="w-10 h-10 text-primary" /> Support & Grievance
          </h1>
          <p className="text-muted-foreground text-lg">We are here to help you 24/7. Submit your issue below.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <SupportForm clientInfo={clientInfo} />
        </div>

        <div className="space-y-6">
            <div className="bg-success/5 border border-success/20 p-8 rounded-3xl">
                <h3 className="text-xl font-bold font-heading text-success mb-4 flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" /> Quick Support
                </h3>
                <p className="text-sm text-foreground/70 mb-6 leading-relaxed">
                    For faster resolution, describe your issue in detail and attach screenshots if possible on WhatsApp.
                </p>
                <div className="p-4 bg-white rounded-xl shadow-sm border border-success/10 text-center">
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest mb-1">Direct Helpline</p>
                    <p className="text-xl font-black text-foreground font-heading tracking-tighter cursor-copy">+91 9457440300</p>
                </div>
            </div>

            <div className="bg-warning/5 border border-warning/20 p-8 rounded-3xl">
                <h3 className="text-xl font-bold font-heading text-warning mb-4 flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5" /> Escalation
                </h3>
                <p className="text-sm text-foreground/70 leading-relaxed">
                    If your issue is not resolved within 24 hours, you can mark it as urgent in your WhatsApp message.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}
