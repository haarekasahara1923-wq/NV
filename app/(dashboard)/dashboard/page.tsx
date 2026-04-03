import { Button } from '@/components/ui/button';
import { Share2, MessageSquare, Activity, ChevronRight, Video, MapPin } from 'lucide-react';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';

export default async function ClientDashboardHome() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  const activeSubscriptions = user.subscriptions.filter(s => s.status === 'ACTIVE');
  const pendingSubscriptions = user.subscriptions.filter(s => s.status === 'PENDING_ACTIVATION');

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
      default: return '/dashboard';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
      {/* Systematic Welcome Banner */}
      <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-primary via-primary/80 to-secondary text-white shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:scale-110 transition-transform duration-1000"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black font-heading tracking-tight mb-2">Welcome back, {user.name.split(' ')[0]}! 🚀</h1>
            <p className="inline-block px-4 py-1.5 bg-white/15 rounded-full text-sm font-bold backdrop-blur-md border border-white/10">
               {new Date(user.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })} Member | Code: {user.meCode || 'NV001'}
            </p>
          </div>
          <div className="flex gap-4">
              <Button asChild className="bg-white text-primary hover:bg-white/90 h-14 px-8 rounded-2xl font-black text-lg shadow-xl hover:-translate-y-1 transition-all">
                <Link href="/services">Book New Service</Link>
              </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
            {/* Real-time Status Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="bg-success text-white p-6 rounded-3xl shadow-lg hover:shadow-success/20 transition-all cursor-default">
                  <p className="text-xs font-black uppercase opacity-60">Active Services</p>
                  <p className="text-5xl font-black mt-2 tracking-tighter">{activeSubscriptions.length}</p>
               </div>
               <div className="bg-warning text-white p-6 rounded-3xl shadow-lg hover:shadow-warning/20 transition-all cursor-default">
                  <p className="text-xs font-black uppercase opacity-60">Processing Requests</p>
                  <p className="text-5xl font-black mt-2 tracking-tighter">{pendingSubscriptions.length}</p>
               </div>
            </div>

            {/* Systematic Active Services Panel */}
            <div className="bg-card rounded-[2rem] border shadow-sm overflow-hidden flex flex-col min-h-[400px]">
              <div className="p-8 border-b bg-muted/20">
                <h2 className="text-2xl font-black font-heading border-l-4 border-primary pl-4 tracking-tight">MY ACTIVE ASSETS</h2>
              </div>
              <div className="p-6 flex-1 space-y-4">
                {activeSubscriptions.length > 0 ? (
                  activeSubscriptions.map((sub) => (
                    <div key={sub.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 rounded-2xl border-2 border-transparent bg-white shadow-sm hover:border-primary/20 hover:shadow-md transition-all group">
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-16 bg-primary/5 text-primary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          {getServiceIcon(sub.service.slug)}
                        </div>
                        <div>
                          <h3 className="text-lg font-black text-foreground uppercase tracking-tight">{sub.service.name}</h3>
                          <p className="text-sm font-bold text-success flex items-center gap-1.5 mt-1">
                            <span className="w-2.5 h-2.5 rounded-full bg-success animate-pulse"></span> {sub.status} Since {sub.startDate ? new Date(sub.startDate).toLocaleDateString('en-IN') : 'N/A'}
                          </p>
                        </div>
                      </div>
                      <Button asChild variant="outline" className="mt-4 sm:mt-0 px-8 h-12 rounded-xl font-black uppercase text-xs tracking-widest border-2 hover:bg-primary hover:text-white hover:border-primary transition-all">
                        <Link href={getAnalyticsLink(sub.service.slug)}>Open Analytics</Link>
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-20 flex flex-col items-center justify-center opacity-30 grayscale saturate-0 space-y-6">
                    <Activity className="w-20 h-20" />
                    <p className="text-xl font-black uppercase tracking-widest">No Active Digital Assets</p>
                  </div>
                )}
              </div>
            </div>
        </div>

        {/* Sidebar Systematic Panel */}
        <div className="space-y-6">
            <div className="bg-white rounded-[2rem] border-2 border-primary/10 p-8 shadow-sm">
                <div className="p-6 bg-primary/5 rounded-2xl mb-6">
                   <ChevronRight className="w-10 h-10 text-primary mb-2" />
                   <h3 className="text-xl font-black font-heading text-primary">GROWTH ENGINE</h3>
                   <p className="text-sm text-foreground/60 font-bold">Recommended digital expansion for you</p>
                </div>
                <div className="space-y-3">
                   {['Meta Ads Strategy', 'GMB Authority', 'AI ChatBot'].map((s, i) => (
                       <Link key={i} href="/services">
                         <div className="flex items-center justify-between p-4 rounded-xl border-dashed border-2 hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer group">
                            <p className="font-black text-sm text-foreground/80">{s}</p>
                            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                         </div>
                       </Link>
                   ))}
                </div>
                <Button asChild className="w-full mt-8 bg-secondary hover:bg-primary text-white h-14 rounded-2xl font-black uppercase tracking-widest group shadow-xl shadow-secondary/10 hover:shadow-primary/20">
                    <Link href="/services">
                       Upgrade Catalog 
                       <Activity className="w-4 h-4 ml-3 group-hover:rotate-12 transition-transform" />
                    </Link>
                </Button>
            </div>

            <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden">
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>
                <h3 className="text-lg font-black border-b border-white/10 pb-4 mb-4 uppercase tracking-tighter">System Support</h3>
                <p className="text-xs text-white/50 leading-relaxed mb-6 font-bold uppercase tracking-widest">Real-time assistance for your digital marketing dashboard.</p>
                <Button asChild className="w-full bg-white text-black hover:bg-white/80 h-12 rounded-xl font-black uppercase tracking-widest text-xs">
                    <Link href="/dashboard/support">Contact Executive</Link>
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
}


