'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';

interface SupportFormProps {
  clientInfo: {
    userId: string;
    name: string;
    phone: string;
  };
}

export default function SupportForm({ clientInfo }: SupportFormProps) {
  const [grievance, setGrievance] = useState('');

  const sendToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!grievance) return;

    const message = `*NV STUDIO - SYSTEMATIC SUPPORT*%0A%0A🪪 *Client ID:* ${clientInfo.userId}%0A👤 *Client Name:* ${clientInfo.name}%0A🛠️ *Grievance:* ${grievance}%0A%0A----------------%0A✅ Sent from NV Studio Dashboard`;
    
    const whatsappUrl = `https://wa.me/919457440300?text=${message}`;
    
    const win = window.open(whatsappUrl, '_blank');
    if (!win) {
      window.location.href = whatsappUrl; // Use same window if popup is blocked
    }
  };

  return (
    <form onSubmit={sendToWhatsApp} className="bg-card p-10 rounded-2xl shadow-sm border border-border space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <Label htmlFor="clientId" className="text-sm font-bold uppercase tracking-wider text-muted-foreground opacity-70">Client ID (Prefilled)</Label>
          <Input id="clientId" value={clientInfo.userId} disabled className="bg-muted border-muted-foreground/10 text-foreground font-bold" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="clientName" className="text-sm font-bold uppercase tracking-wider text-muted-foreground opacity-70">Client Name (Prefilled)</Label>
          <Input id="clientName" value={clientInfo.name} disabled className="bg-muted border-muted-foreground/10 text-foreground font-bold" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="grievance" className="text-sm font-bold uppercase tracking-wider text-muted-foreground opacity-70">Submit your grievance</Label>
        <Textarea 
          id="grievance" 
          placeholder="Please describe your issue or concern..." 
          className="min-h-[150px] border-border focus:border-primary/50 transition-all resize-none text-lg"
          required
          value={grievance}
          onChange={(e) => setGrievance(e.target.value)}
        />
      </div>

      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white h-14 shadow-xl shadow-primary/20 text-lg font-bold gap-3 group">
        Send to Admin on WhatsApp
        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
      </Button>
    </form>
  );
}
