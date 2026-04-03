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
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-background border shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold font-heading text-foreground mb-2 whitespace-nowrap">Welcome back, {user.name.split(' ')[0]}! 👋</h1>
          <p className="text-muted-foreground underline decoration-primary font-bold">Member since {new Date(user.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })} | Referred by: {user.meCode || 'NV001'}</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-4 text-center">
          <div className="bg-card px-4 py-3 rounded-xl border shadow-sm">
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Active Services</p>
            <p className="text-2xl font-bold text-success mt-1">{activeSubscriptions.length}</p>
          </div>
          <div className="bg-card px-4 py-3 rounded-xl border shadow-sm">
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Pending</p>
            <p className="text-2xl font-bold text-warning mt-1">{pendingSubscriptions.length}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Active Services Panel */}
        <div className="bg-card rounded-2xl border shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b bg-muted/40">
            <h2 className="text-xl font-bold font-heading">My Active Services</h2>
          </div>
          <div className="p-4 flex-1 space-y-4">
            {activeSubscriptions.length > 0 ? (
              activeSubscriptions.map((sub) => (
                <div key={sub.id} className="flex items-center justify-between p-4 rounded-xl border bg-card hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                      {getServiceIcon(sub.service.slug)}
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{sub.service.name}</h3>
                      <p className="text-sm text-success font-medium flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-success"></span> Active since {sub.startDate ? new Date(sub.startDate).toLocaleDateString('en-IN') : 'N/A'}
                      </p>
                    </div>
                  </div>
                  <Button asChild variant="outline" size="sm" className="hidden sm:flex font-bold">
                    <Link href={getAnalyticsLink(sub.service.slug)}>View Analytics</Link>
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-center py-10 opacity-50">
                <p>No active services yet.</p>
              </div>
            )}

            {pendingSubscriptions.map((sub) => (
              <div key={sub.id} className="flex items-center justify-between p-4 rounded-xl border bg-card hover:border-warning/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-warning/10 text-warning rounded-lg flex items-center justify-center">
                    {getServiceIcon(sub.service.slug)}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{sub.service.name}</h3>
                    <p className="text-sm text-warning font-medium flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-warning animate-pulse"></span> Pending (Processing)
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Available Services Panel */}
        <div className="bg-gradient-to-b from-secondary to-secondary/90 rounded-2xl border border-secondary shadow-sm overflow-hidden text-secondary-foreground flex flex-col">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-bold font-heading text-white">Available Services</h2>
            <p className="text-sm text-secondary-foreground/80 mt-1">Grow your business further</p>
          </div>
          <div className="p-6 flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
              <Activity className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Ready to scale?</h3>
            <p className="text-sm text-secondary-foreground/70 mb-6 max-w-[250px]">
              Browse our catalog of premium digital services and unlock new growth channels.
            </p>
            <Button asChild className="bg-primary hover:bg-primary/90 text-white border-0 shadow-lg group font-bold h-12 px-8">
              <Link href="/services">
                Browse Catalog
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform inline" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}


