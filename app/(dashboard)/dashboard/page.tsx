import { Button } from '@/components/ui/button';
import { Share2, MessageSquare, Activity, ChevronRight, Video, MapPin, Sparkles, TrendingUp, ShieldCheck, Clock, CheckCircle2, Zap, Package } from 'lucide-react';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';
import { cn } from '@/lib/utils';

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

  // Mock Activity Feed for dynamic UI feel
  const mockActivities = [
    { type: 'success', title: 'System login successful', time: 'Just now' },
    { type: 'update', title: 'Analytics data synced', time: '2h ago' },
    { type: 'alert', title: 'New Meta Ad campaign suggested', time: '1d ago' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
      {/* Modern Welcome Header */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-card border shadow-sm group">
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-background to-accent/5 opacity-50"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-[100px] group-hover:bg-primary/30 transition-colors duration-1000"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/20 rounded-full blur-[100px] group-hover:bg-accent/30 transition-colors duration-1000"></div>
        
        <div className="relative z-10 p-10 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Premium Portal</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black font-heading tracking-tight text-foreground">
              Welcome back,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                {user.name.split(' ')[0]}!
              </span>
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-muted-foreground pt-2">
              <span className="flex items-center gap-1.5 bg-muted px-3 py-1 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-success" /> Verified Account
              </span>
              <span className="flex items-center gap-1.5 bg-muted px-3 py-1 rounded-lg">
                ID: {user.meCode || 'NV001'}
              </span>
            </div>
          </div>
          <div>
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 rounded-2xl font-black text-sm shadow-xl shadow-primary/25 hover:-translate-y-1 hover:shadow-primary/40 transition-all">
              <Link href="/services">
                Deploy New Asset <Zap className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-card border rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500">
                <Activity className="w-32 h-32" />
              </div>
              <p className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2 relative z-10">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span> Active Services
              </p>
              <div className="mt-4 flex items-end gap-3 relative z-10">
                <p className="text-6xl font-black tracking-tighter text-foreground">{activeSubscriptions.length}</p>
                <p className="text-sm font-bold text-success pb-1.5 bg-success/10 px-2 py-0.5 rounded-md border border-success/20">+ Optimized</p>
              </div>
            </div>

            <div className="bg-card border rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500">
                <Clock className="w-32 h-32" />
              </div>
              <p className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2 relative z-10">
                <span className="w-2 h-2 rounded-full bg-warning shadow-[0_0_8px_rgba(234,179,8,0.6)]"></span> Processing Deployments
              </p>
              <div className="mt-4 flex items-end gap-3 relative z-10">
                <p className="text-6xl font-black tracking-tighter text-foreground">{pendingSubscriptions.length}</p>
                <p className="text-sm font-bold text-warning pb-1.5 bg-warning/10 px-2 py-0.5 rounded-md border border-warning/20">In Queue</p>
              </div>
            </div>
          </div>

          {/* Active Digital Assets Panel */}
          <div className="bg-card rounded-[2rem] border shadow-sm overflow-hidden min-h-[400px] flex flex-col group/panel">
            <div className="p-8 border-b bg-muted/30 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black font-heading tracking-tight flex items-center gap-3">
                  <Zap className="w-6 h-6 text-primary" /> Active Digital Assets
                </h2>
                <p className="text-sm font-bold text-muted-foreground mt-1">Manage and track your running services</p>
              </div>
            </div>
            <div className="p-6 flex-1 space-y-4 bg-muted/10">
              {activeSubscriptions.length > 0 ? (
                activeSubscriptions.map((sub) => (
                  <div key={sub.id} className="relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 rounded-[1.5rem] bg-background border shadow-sm hover:shadow-md hover:border-primary/30 transition-all group">
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-success group-hover:w-2 transition-all"></div>
                    <div className="flex items-center gap-5 ml-2">
                      <div className="w-16 h-16 bg-primary/5 text-primary rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 shadow-inner">
                        {getServiceIcon(sub.service.slug)}
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-foreground tracking-tight">{sub.service.name}</h3>
                        <div className="flex items-center gap-3 mt-1.5">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-success/10 text-success text-[10px] font-black uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></span> Active
                          </span>
                          <span className="text-xs font-bold text-muted-foreground">
                            Since {sub.startDate ? new Date(sub.startDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button asChild variant="outline" className="mt-5 sm:mt-0 px-6 h-12 rounded-xl font-bold text-sm border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all group/btn bg-background">
                      <Link href={getAnalyticsLink(sub.service.slug)}>
                        View Analytics <TrendingUp className="w-4 h-4 ml-2 text-primary group-hover/btn:text-primary-foreground group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-all" />
                      </Link>
                    </Button>
                  </div>
                ))
              ) : (
                <div className="h-full py-16 flex flex-col items-center justify-center text-center space-y-6 opacity-80 group-hover/panel:opacity-100 transition-opacity">
                  <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-2">
                    <Package className="w-10 h-10 text-muted-foreground/50" />
                  </div>
                  <div>
                    <p className="text-xl font-black text-foreground">No active assets</p>
                    <p className="text-sm font-bold text-muted-foreground mt-2 max-w-[250px] mx-auto">You don't have any running digital campaigns yet.</p>
                  </div>
                  <Button asChild variant="default" className="rounded-xl font-bold h-12 px-8">
                    <Link href="/services">Start a Campaign</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar Elements */}
        <div className="space-y-6">
          {/* Activity Feed (Dynamic Mock) */}
          <div className="bg-card rounded-[2rem] border p-8 shadow-sm">
            <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" /> Live Status Feed
            </h3>
            <div className="space-y-6 relative border-l-2 border-muted ml-3">
              {mockActivities.map((act, i) => (
                <div key={i} className="relative pl-6 group">
                  <span className={cn(
                    "absolute -left-[9px] top-1 w-4 h-4 rounded-full border-4 border-card group-hover:scale-125 transition-transform",
                    act.type === 'success' ? 'bg-success' : act.type === 'alert' ? 'bg-primary' : 'bg-accent'
                  )}></span>
                  <p className="text-sm font-bold text-foreground leading-tight">{act.title}</p>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1.5">{act.time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Growth Engine */}
          <div className="bg-gradient-to-br from-card to-muted/30 border rounded-[2rem] p-8 shadow-sm overflow-hidden relative group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-gradient-to-tr from-primary/20 to-accent/20 text-primary rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-white/10 dark:border-white/5">
                <TrendingUp className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black font-heading text-foreground mb-2">Growth Engine</h3>
              <p className="text-sm font-bold text-muted-foreground mb-8 leading-relaxed">AI-recommended strategies explicitly tailored to scale your brand's digital presence instantly.</p>
              
              <div className="space-y-3">
                {['AI ChatBot Integration', 'Lead Gen Funnel', 'Local SEO Dominance'].map((item, i) => (
                  <Link key={i} href="/services" className="block p-4 rounded-xl bg-background border border-border/50 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 group/item">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-foreground group-hover/item:text-primary transition-colors">{item}</p>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover/item:text-primary group-hover/item:translate-x-1 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>

              <Button asChild className="w-full mt-8 bg-foreground text-background hover:bg-primary hover:text-primary-foreground h-14 rounded-xl font-black uppercase text-xs tracking-widest shadow-xl shadow-foreground/5 hover:shadow-primary/20 transition-all duration-300">
                <Link href="/services">Explore Catalog</Link>
              </Button>
            </div>
          </div>

          {/* Support Card */}
          <div className="bg-gradient-to-tr from-secondary to-secondary/90 rounded-[2rem] p-8 text-secondary-foreground relative overflow-hidden shadow-xl shadow-secondary/10 hover:shadow-secondary/20 transition-shadow">
            <div className="absolute -right-6 -top-6 opacity-10 rotate-12">
              <MessageSquare className="w-40 h-40" />
            </div>
            <h3 className="text-xl font-black mb-2 relative z-10 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-accent" /> Expert Help?
            </h3>
            <p className="text-sm font-bold text-secondary-foreground/70 mb-8 relative z-10 leading-relaxed">Connect with your dedicated account manager for custom strategies and immediate assistance.</p>
            <Button asChild className="w-full bg-white text-secondary hover:bg-zinc-100 hover:scale-[1.02] h-14 rounded-xl font-black uppercase tracking-widest text-xs relative z-10 transition-all duration-300 shadow-xl shadow-white/5">
              <Link href="/dashboard/support">Contact Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}


