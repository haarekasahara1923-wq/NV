'use client';
import { User, Mail, Phone, Shield, Pencil, Save, CreditCard, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function MEProfilePage() {
  return (
    <div className="space-y-6">
      <div className="bg-card p-8 rounded-2xl shadow-sm border border-border">
        <h1 className="text-3xl font-bold font-heading text-foreground uppercase">Executive Account</h1>
        <p className="text-muted-foreground mt-1">Manage your marketing executive profile and payout settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Account Details */}
          <div className="bg-card rounded-2xl border p-8 shadow-sm">
            <h2 className="text-xl font-bold font-heading mb-6">Account Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>ME Display Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input defaultValue="Rahul Sharma" className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Unique ME Code</Label>
                <div className="relative text-primary font-bold uppercase tracking-widest text-xs">
                  <Input defaultValue="ME001" className="bg-muted text-primary cursor-not-allowed" readOnly />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Business Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input defaultValue="rahul@nvstudio.in" className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Business Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input defaultValue="+91 98765 43210" className="pl-10" />
                </div>
              </div>
            </div>
            
            <Button className="mt-8 gap-2">
               <Save className="w-4 h-4" /> Update Info
            </Button>
          </div>

          {/* Payout Methods */}
          <div className="bg-card rounded-2xl border p-8 shadow-sm">
            <h2 className="text-xl font-bold font-heading mb-6">Payout Configuration</h2>
            <div className="space-y-4">
               <div className="p-4 rounded-xl border border-dashed flex justify-between items-center bg-muted/5">
                   <div className="flex items-center gap-3">
                       <CreditCard className="w-5 h-5 text-muted-foreground" />
                       <span className="text-sm font-medium">Bank Account (Ending in 4052)</span>
                   </div>
                   <Button variant="ghost" className="text-xs text-primary">Manage</Button>
               </div>
               <div className="p-4 rounded-xl border border-dashed flex justify-between items-center bg-muted/5">
                   <div className="flex items-center gap-3 opacity-50">
                       <CreditCard className="w-5 h-5" />
                       <span className="text-sm font-medium">UPI / GPay / PhonePe</span>
                   </div>
                   <Button variant="outline" className="text-xs">Connect</Button>
               </div>
            </div>
          </div>
        </div>

        {/* Sidebar stats */}
        <div className="space-y-6">
            <div className="bg-primary p-6 rounded-2xl shadow-xl text-white text-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 backdrop-blur-md">
                    ME
                </div>
                <h3 className="text-xl font-bold font-heading tracking-tight">ME001</h3>
                <p className="text-sm text-white/70">Level: Senior Executive</p>
                <div className="mt-8 pt-6 border-t border-white/20">
                    <p className="text-xs uppercase font-bold tracking-widest text-white/50 mb-1">Current Commission</p>
                    <p className="text-4xl font-bold font-heading mb-4">15%</p>
                </div>
            </div>
            
            <div className="bg-card p-6 rounded-2xl border shadow-sm space-y-4">
                <h3 className="font-bold text-lg font-heading">Marketing Assets</h3>
                <p className="text-xs text-muted-foreground">Download brand banners, logos, and promo material to help you convert leads.</p>
                <Button variant="outline" className="w-full text-xs gap-2">
                    <ExternalLink className="w-4 h-4" /> Download Kit
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
}
