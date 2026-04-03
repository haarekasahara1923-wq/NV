import { Package, Calendar, Video, Share2, Activity, MessageSquare, MapPin, MessageCircle, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';

export default async function MyServicesPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  const myServices = user.subscriptions;

  const getServiceIcon = (slug: string) => {
    switch (slug) {
      case 'video-shoot-editing': return <Video className="w-6 h-6" />;
      case 'social-media-manager': return <Share2 className="w-6 h-6" />;
      case 'meta-ads': return <Activity className="w-6 h-6" />;
      case 'chatbot-installation': return <MessageSquare className="w-6 h-6" />;
      case 'google-my-business': return <MapPin className="w-6 h-6" />;
      default: return <Activity className="w-6 h-6" />;
    }
  };

  const getAnalyticsLink = (slug: string) => {
    switch (slug) {
      case 'social-media-manager': return '/dashboard/analytics/social-media';
      case 'meta-ads': return '/dashboard/analytics/meta-ads';
      case 'google-my-business': return '/dashboard/analytics/gmb';
      case 'video-shoot-editing': return '/dashboard/analytics/video';
      case 'chatbot-installation': return '/dashboard/analytics/chatbot';
      default: return '/dashboard/dashboard';
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-center bg-card p-8 rounded-2xl shadow-sm border border-border">
        <div>
          <h1 className="text-3xl font-bold font-heading text-foreground uppercase">My Services</h1>
          <p className="text-muted-foreground mt-1">Manage your active digital marketing services</p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 h-12 px-6 font-bold">
          <Link href="/services">Book New Service</Link>
        </Button>
      </div>

      {myServices.length === 0 ? (
        <div className="bg-card rounded-2xl border border-dashed border-muted-foreground/30 p-20 text-center">
            <Package className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <h2 className="text-xl font-bold font-heading text-2xl uppercase">No Active Services</h2>
            <p className="text-muted-foreground mt-2 mb-8 text-lg">You haven't booked any premium services yet.</p>
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/5 h-12 px-10 font-bold uppercase tracking-widest">
              <Link href="/services">Explore Services Catalogue</Link>
            </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {myServices.map((sub, i) => {
                const waMessage = `*NV Studio Support Request*%0A%0A*Service:* ${sub.service.name}%0A*Client Name:* ${user.name}%0A*ID:* ${user.id.slice(-6).toUpperCase()}`;
                const waUrl = `https://wa.me/919457440300?text=${waMessage}`;

                return (
                    <div key={i} className="bg-card rounded-2xl border p-8 hover:shadow-xl transition-all group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -z-0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="flex justify-between items-start mb-8 relative z-10">
                            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                {getServiceIcon(sub.service.slug)}
                            </div>
                            <span className={`text-[11px] font-black px-3 py-1 rounded-full tracking-widest uppercase shadow-sm ${
                                sub.status === 'ACTIVE' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
                            }`}>
                                {sub.status}
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold font-heading mb-2">{sub.service.name}</h3>
                        <p className="text-sm text-muted-foreground mb-10 flex items-center gap-2 font-medium">
                            <Calendar className="w-4 h-4 text-primary" /> 
                            <span>Started: {sub.startDate ? new Date(sub.startDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Wait for activation'}</span>
                        </p>
                        <div className="flex flex-col xl:flex-row gap-4 relative z-10">
                            <Button asChild className="flex-1 h-12 text-sm font-black uppercase tracking-wider shadow-lg" variant="default">
                              <Link href={getAnalyticsLink(sub.service.slug)}>View Dashboard</Link>
                            </Button>
                            <Button asChild variant="outline" className="flex-1 h-12 text-sm font-black uppercase tracking-wider gap-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white transition-all shadow-sm">
                              <a href={waUrl} target="_blank" rel="noopener noreferrer">
                                 <MessageCircle className="w-4 h-4" /> Support
                              </a>
                            </Button>
                        </div>
                    </div>
                );
            })}
        </div>
      )}

      {/* Suggested Services */}
      <div className="bg-gradient-to-r from-secondary to-secondary/90 rounded-2xl p-10 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <h2 className="text-2xl font-bold font-heading mb-6 relative z-10">Recommended Upscale</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
              {[
                { name: 'Meta Ads', price: '999', desc: '(Excluding Meta charges)' },
                { name: 'Google My Business', price: '399', desc: 'Local Ranking Boost' },
                { name: 'ChatBot Installation', price: '499', desc: '24/7 Automation' }
              ].map((s, i) => (
                  <Link key={i} href="/services">
                    <div className="bg-white/5 hover:bg-white/10 p-5 rounded-2xl backdrop-blur-md border border-white/10 transition-all cursor-pointer group flex flex-col items-center text-center">
                        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                            <ChevronRight className="w-5 h-5 text-white/50 group-hover:text-white" />
                        </div>
                        <p className="font-bold text-lg">{s.name}</p>
                        <p className="text-sm text-white/70 mt-1">Starting ₹{s.price}</p>
                        {s.desc && <p className="text-[10px] text-white/40 mt-1 uppercase font-bold tracking-tighter">{s.desc}</p>}
                    </div>
                  </Link>
              ))}
          </div>
      </div>
    </div>
  );
}
