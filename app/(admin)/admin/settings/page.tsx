'use client';
import { Settings, Save, Shield, Key, Mail, DollarSign, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div className="bg-card p-8 rounded-2xl shadow-sm border border-border">
        <h1 className="text-3xl font-bold font-heading text-foreground uppercase tracking-tight">System Configuration</h1>
        <p className="text-muted-foreground mt-1">Manage platform-wide settings and administrative controls.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card p-8 rounded-2xl border shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b pb-4 mb-6">
                  <Shield className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold font-heading">Security Defaults</h2>
              </div>
              <div className="space-y-4">
                  <div className="flex justify-between items-center bg-muted/30 p-4 rounded-xl shadow-sm border border-border transition-all hover:border-primary/20">
                      <div>
                          <p className="text-sm font-bold tracking-wider">Two-Factor Auth</p>
                          <p className="text-xs text-muted-foreground">Mandatory for all Admin accounts</p>
                      </div>
                      <span className="text-[10px] font-bold bg-green-100 text-green-600 px-2 py-1 rounded tracking-widest uppercase shadow-sm">Active</span>
                  </div>
                  <div className="space-y-2">
                       <Label>Default ME Commission (%)</Label>
                       <Input type="number" defaultValue="15" className="bg-white/50" />
                  </div>
                  <div className="space-y-2">
                       <Label>Admin Notification Email</Label>
                       <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input defaultValue="support@nvstudio.wapiflow.site" className="pl-10" />
                       </div>
                  </div>
              </div>
          </div>

          <div className="bg-card p-8 rounded-2xl border shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b pb-4 mb-6 text-primary">
                  <Key className="w-5 h-5" />
                  <h2 className="text-xl font-bold font-heading">Global Variables</h2>
              </div>
              <div className="space-y-4">
                  <div className="space-y-2">
                      <Label>Razorpay Success Redirect</Label>
                      <Input defaultValue="https://nv-phi.vercel.app/dashboard" />
                  </div>
                  <div className="space-y-2">
                      <Label>Standard Platform Fee (₹)</Label>
                      <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input type="number" defaultValue="99" className="pl-10" />
                      </div>
                  </div>
                  <div className="space-y-2">
                      <Label>Support Threshold (Days)</Label>
                      <Input type="number" defaultValue="30" />
                  </div>
              </div>
              <Button className="w-full mt-4 gap-2 shadow-lg shadow-primary/20">
                  <Save className="w-4 h-4" /> Finalize System Update
              </Button>
          </div>
      </div>
    </div>
  );
}
