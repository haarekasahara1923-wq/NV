'use client';
import MetaAdsAnalytics from '@/components/analytics/MetaAdsAnalytics';

export default function MetaAdsPage() {
  return (
    <div className="space-y-6">
      <div className="bg-card p-8 rounded-2xl shadow-sm border border-border">
        <h1 className="text-3xl font-bold font-heading text-foreground uppercase">Meta Ads Performance</h1>
        <p className="text-muted-foreground mt-1 tracking-tight">Real-time tracking of your Facebook and Instagram ad campaigns.</p>
      </div>

      <MetaAdsAnalytics />
    </div>
  );
}
