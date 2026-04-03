'use client';
import { Package, Search, ExternalLink, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MyServicesPage() {
  const myServices = [
    { name: "Professional Video Shoot", status: "ACTIVE", type: "One-time", date: "Mar 25, 2024", icon: "🎬" },
    { name: "Social Media Manager", status: "SUBSCRIPTION", type: "Monthly", date: "Apr 01, 2024", icon: "📱" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-card p-8 rounded-2xl shadow-sm border border-border">
        <div>
          <h1 className="text-3xl font-bold font-heading text-foreground uppercase">My Services</h1>
          <p className="text-muted-foreground mt-1">Manage your active digital marketing services</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
          Book New Service
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myServices.map((service, i) => (
              <div key={i} className="bg-card rounded-2xl border p-6 hover:shadow-md transition-all group">
                  <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-2xl">
                          {service.icon}
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded tracking-wider ${
                          service.status === 'ACTIVE' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                          {service.status}
                      </span>
                  </div>
                  <h3 className="text-xl font-bold font-heading mb-1">{service.name}</h3>
                  <p className="text-sm text-muted-foreground mb-6 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> Started: {service.date}
                  </p>
                  <div className="flex gap-3">
                      <Button className="flex-1 text-xs">View Dashboard</Button>
                      <Button variant="outline" className="flex-1 text-xs gap-2">
                         <ExternalLink className="w-3 h-3" /> Support
                      </Button>
                  </div>
              </div>
          ))}
      </div>

      {/* Suggested Services */}
      <div className="bg-secondary rounded-2xl p-8 text-white">
          <h2 className="text-xl font-bold font-heading mb-4">Recommended for you</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {['Meta Ads', 'Google My Business', 'ChatBot Installation'].map((s, i) => (
                  <div key={i} className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/5 hover:bg-white/20 transition-colors cursor-pointer text-white">
                      <p className="font-bold text-sm">{s}</p>
                      <p className="text-xs text-white/60 mt-1">Starting from ₹399</p>
                  </div>
              ))}
          </div>
      </div>
    </div>
  );
}
