'use client';
import { User, Mail, Phone, Shield, Pencil, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div className="bg-card p-8 rounded-2xl shadow-sm border border-border">
        <h1 className="text-3xl font-bold font-heading text-foreground uppercase">User Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Basic Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-2xl border p-8 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold font-heading">Account Information</h2>
              <Button variant="outline" size="sm" className="gap-2">
                <Pencil className="w-4 h-4" /> Edit
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input defaultValue="Rahul Sharma" className="pl-10 bg-muted/30" readOnly />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input defaultValue="rahul@example.com" className="pl-10 bg-muted/30" readOnly />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input defaultValue="+91 98765 43210" className="pl-10 bg-muted/30" readOnly />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Member ID</Label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input defaultValue="NV-USER-9402" className="pl-10 bg-muted/30" readOnly />
                </div>
              </div>
            </div>
            
            <Button className="mt-8 gap-2">
               <Save className="w-4 h-4" /> Save Changes
            </Button>
          </div>
        </div>

        {/* Action Sidebar */}
        <div className="space-y-6">
          <div className="bg-card rounded-2xl border p-6 text-center">
            <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
              RS
            </div>
            <h3 className="text-xl font-bold font-heading">Rahul Sharma</h3>
            <p className="text-sm text-muted-foreground">Premium Client</p>
            <div className="mt-6 border-t pt-4">
              <Button variant="outline" className="w-full text-xs">Upload Photo</Button>
            </div>
          </div>

          <div className="bg-destructive/5 rounded-2xl border border-destructive/20 p-6 space-y-4">
            <h3 className="font-bold text-destructive">Advanced Space</h3>
            <p className="text-xs text-muted-foreground">Permanent actions relating to the security of your account and its data.</p>
            <Button variant="destructive" className="w-full text-xs">Delete Account</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
