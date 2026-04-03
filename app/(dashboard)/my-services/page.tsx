import { Package, ExternalLink, Calendar, Video, Share2, Activity, MessageSquare, MapPin, MessageCircle, ChevronRight } from 'lucide-react';
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
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-card p-8 rounded-2xl shadow-sm border border-border">
        <div>
          <h1 className="text-3xl font-bold font-heading text-foreground uppercase">My Services</h1>
          <p className="text-muted-foreground mt-1">Manage your active digital marketing services</p>
        </div>
        <Link href="/services" passHref>
          <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
            Book New Service
          </Button>
        </Link>
      </div>

      {myServices.length === 0 ? (
        <div className="bg-card rounded-2xl border border-dashed border-muted-foreground/30 p-20 text-center">
            <Package className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <h2 className="text-xl font-bold font-heading">No Active Services</h2>
            <p className="text-muted-foreground mt-1 mb-6">You haven't booked any services yet.</p>
            <Link href="/services" passHref>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">Explore Services</Button>
            </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {myServices.map((sub, i) => {
                const waMessage = `*NV Studio Support Request*%0A%0A*Service:* ${sub.service.name}%0A*Client Name:* ${user.name}%0A*ID:* ${user.id.slice(-6).toUpperCase()}`;
                const waUrl = `https://wa.me/919457440300?text=${waMessage}`;

                return (
                    <div key={i} className="bg-card rounded-2xl border p-6 hover:shadow-md transition-all group">
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                {getServiceIcon(sub.service.slug)}
                            </div>
                            <span className={`text-[10px] font-bold px-2 py-1 rounded tracking-wider ${
                                sub.status === 'ACTIVE' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                            }`}>
                                {sub.status}
                            </span>
                        </div>
                        <h3 className="text-xl font-bold font-heading mb-1">{sub.service.name}</h3>
                        <p className="text-sm text-muted-foreground mb-6 flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> Started: {sub.startDate ? new Date(sub.startDate).toLocaleDateString('en-IN') : 'Wait for activation'}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link href={getAnalyticsLink(sub.service.slug)} className="flex-1" passHref>
                              <Button className="w-full text-xs font-bold" variant="default">View Dashboard</Button>
                            </Link>
                            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                              <Button variant="outline" className="w-full text-xs font-bold gap-2 border-green-500 text-green-600 hover:bg-green-50 transition-colors">
                                 <MessageCircle className="w-3 h-3" /> WhatsApp Support
                              </Button>
                            </a>
                        </div>
                    </div>
                );
            })}
        </div>
      )}

      {/* Suggested Services */}
      <div className="bg-secondary rounded-2xl p-8 text-white">
          <h2 className="text-xl font-bold font-heading mb-4">Recommended for you</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { name: 'Meta Ads', price: '999', desc: '(Excluding Meta charges)' },
                { name: 'Google My Business', price: '399', desc: '' },
                { name: 'ChatBot Installation', price: '499', desc: '(Excluding platform charges)' }
              ].map((s, i) => (
                  <Link key={i} href="/services">
                    <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/5 hover:bg-white/20 transition-colors cursor-pointer group">
                        <div className="flex justify-between items-center">
                            <p className="font-bold text-sm">{s.name}</p>
                            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                        </div>
                        <p className="text-xs text-white/60 mt-1">Starting from ₹{s.price}</p>
                        {s.desc && <p className="text-[10px] text-white/40 mt-0.5 italic">{s.desc}</p>}
                    </div>
                  </Link>
              ))}
          </div>
      </div>
    </div>
  );
}


