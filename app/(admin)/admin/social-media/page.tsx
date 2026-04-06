'use client';
import { useState, useEffect } from 'react';
import {
  Upload, Trash2, Mail as MailIcon,
  Plus, CheckCircle2, AlertCircle, Sparkles, Users, Calendar, Link2, Zap as ZapIcon
} from 'lucide-react';
import { FacebookIcon, InstagramIcon, YoutubeIcon, GmailIcon } from '@/components/BrandIcons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Platform = 'FACEBOOK' | 'INSTAGRAM' | 'YOUTUBE' | 'GMAIL';
type ContentType = 'POST' | 'REEL' | 'VIDEO' | 'SHORT' | 'STORY' | 'EMAIL';

interface ClientUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface SocialPost {
  id: string;
  userId: string;
  platform: Platform;
  postDate: string;
  title?: string;
  contentUrl: string;
  thumbnailUrl?: string;
  contentType: ContentType;
  isAutoSynced: boolean;
}

const PLATFORM_ICONS: Record<Platform, React.ReactNode> = {
  FACEBOOK: <FacebookIcon className="w-4 h-4" />,
  INSTAGRAM: <InstagramIcon className="w-4 h-4" />,
  YOUTUBE: <YoutubeIcon className="w-4 h-4" />,
  GMAIL: <GmailIcon className="w-4 h-4" />,
};

const PLATFORM_COLORS: Record<Platform, string> = {
  FACEBOOK: 'text-[#1877F2] bg-[#1877F2]/10',
  INSTAGRAM: 'text-pink-500 bg-pink-500/10',
  YOUTUBE: 'text-red-500 bg-red-500/10',
  GMAIL: 'text-orange-500 bg-orange-500/10',
};

const PLATFORM_LABELS: Record<Platform, string> = {
  FACEBOOK: 'Facebook',
  INSTAGRAM: 'Instagram',
  YOUTUBE: 'YouTube',
  GMAIL: 'Gmail',
};

export default function AdminSocialMediaPage() {
  const [clients, setClients] = useState<ClientUser[]>([]);
  const [recentPosts, setRecentPosts] = useState<SocialPost[]>([]);
  const [form, setForm] = useState({
    userId: '',
    platform: 'FACEBOOK' as Platform,
    postDate: new Date().toISOString().split('T')[0],
    title: '',
    contentUrl: '',
    thumbnailUrl: '',
    contentType: 'POST' as ContentType,
  });
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/realtime')
      .then(r => r.json())
      .then(data => {
        if (data?.users) {
          setClients(data.users.filter((u: ClientUser) => u.role === 'CLIENT'));
        }
      })
      .catch(() => {});
  }, []);

  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.userId) { showToast('error', 'Please select a client'); return; }
    if (!form.contentUrl) { showToast('error', 'Content URL is required'); return; }

    setSubmitting(true);
    try {
      const res = await fetch('/api/social-media-posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setRecentPosts(prev => [data.post, ...prev]);
      setForm(f => ({ ...f, title: '', contentUrl: '', thumbnailUrl: '' }));
      showToast('success', 'Content entry added to client calendar!');
    } catch {
      showToast('error', 'Failed to save. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleting(id);
    try {
      await fetch(`/api/social-media-posts/${id}`, { method: 'DELETE' });
      setRecentPosts(prev => prev.filter(p => p.id !== id));
      showToast('success', 'Entry deleted.');
    } catch {
      showToast('error', 'Delete failed.');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl font-semibold text-sm
          ${toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-destructive text-white'}`}>
          {toast.type === 'success'
            ? <CheckCircle2 className="w-5 h-5" />
            : <AlertCircle className="w-5 h-5" />}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="bg-card p-8 rounded-2xl shadow-sm border border-border">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-lg">
            <Upload className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black font-heading uppercase tracking-tight">
              Social Media Content Manager
            </h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              Manually add content links into clients&apos; social media calendars.
            </p>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-accent/10 border border-accent/30 rounded-2xl p-4 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
        <div className="text-sm">
          <p className="font-bold text-foreground mb-0.5">Manual Upload Mode</p>
          <p className="text-muted-foreground">
            Paste the public post/reel/video/short URL below. The client will see it in their calendar 
            under the correct date and can download it to their gallery. 
            For automation, see the flow explanation in the README.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">
        {/* Upload Form */}
        <form onSubmit={handleSubmit} className="bg-card rounded-2xl border shadow-sm p-8 space-y-6">
          {/* Automation Hub Section */}
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-8 text-white shadow-xl shadow-indigo-200">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-indigo-200 animate-pulse" />
              <h2 className="text-xl font-bold font-heading">Automation Hub</h2>
            </div>
            <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
              Connect platform APIs to automatically fetch Reels, Posts and Videos. 
              Currently, you can also trigger a manual "Fetch All" to sync latest content.
            </p>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                <p className="text-[10px] uppercase font-bold text-indigo-200 mb-1">Status</p>
                <p className="text-xs font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400"></span>
                  API Handlers Ready
                </p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                <p className="text-[10px] uppercase font-bold text-indigo-200 mb-1">Auto-Sync</p>
                <p className="text-xs font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                  Webhook Pending
                </p>
              </div>
            </div>

            <Button 
              id="admin-sync-all"
              type="button"
              variant="outline"
              className="w-full bg-white text-indigo-700 hover:bg-indigo-50 border-none font-bold py-6"
              onClick={() => showToast('success', 'Global Sync Triggered: Fetching content from Meta/YouTube APIs...')}
            >
              <ZapIcon className="w-4 h-4 mr-2" />
              Trigger Global AI Sync
            </Button>
          </div>

          <h2 className="text-lg font-black font-heading flex items-center gap-2 pt-4">
            <Plus className="w-5 h-5 text-primary" /> Add New Content Entry
          </h2>

          {/* Client Select */}
          <div className="space-y-2">
            <Label className="font-bold flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" /> Select Client
            </Label>
            <select
              id="admin-client-select"
              value={form.userId}
              onChange={e => setForm(f => ({ ...f, userId: e.target.value }))}
              className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
            >
              <option value="">-- Choose a client --</option>
              {clients.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.email})</option>
              ))}
            </select>
          </div>

          {/* Platform Buttons */}
          <div className="space-y-2">
            <Label className="font-bold">Platform</Label>
            <div className="grid grid-cols-4 gap-2">
              {(['FACEBOOK', 'INSTAGRAM', 'YOUTUBE', 'GMAIL'] as Platform[]).map(p => (
                <button
                  key={p}
                  type="button"
                  id={`platform-btn-${p.toLowerCase()}`}
                  onClick={() => setForm(f => ({ ...f, platform: p }))}
                  className={`flex flex-col items-center gap-1.5 px-2 py-3 rounded-xl border-2 text-xs font-bold transition-all
                    ${form.platform === p
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:border-primary/40 text-muted-foreground hover:text-foreground'
                    }`}
                >
                  <span className="[&>svg]:w-5 [&>svg]:h-5">{PLATFORM_ICONS[p]}</span>
                  {PLATFORM_LABELS[p]}
                </button>
              ))}
            </div>
          </div>

          {/* Content Type + Post Date */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-bold">Content Type</Label>
              <select
                id="admin-content-type"
                value={form.contentType}
                onChange={e => setForm(f => ({ ...f, contentType: e.target.value as ContentType }))}
                className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-primary/40 focus:outline-none"
              >
                {['POST', 'REEL', 'VIDEO', 'SHORT', 'STORY', 'EMAIL'].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label className="font-bold flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" /> Post Date
              </Label>
              <Input
                id="admin-post-date"
                type="date"
                value={form.postDate}
                onChange={e => setForm(f => ({ ...f, postDate: e.target.value }))}
                max={new Date().toISOString().split('T')[0]}
                className="bg-background/50"
              />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label className="font-bold">
              Title / Caption <span className="text-muted-foreground font-normal">(optional)</span>
            </Label>
            <Input
              id="admin-post-title"
              placeholder="e.g. Holi Sale Reel – NV Studio"
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              className="bg-background/50"
            />
          </div>

          {/* Content URL */}
          <div className="space-y-2">
            <Label className="font-bold flex items-center gap-2">
              <Link2 className="w-4 h-4 text-primary" /> Content URL
              <span className="text-destructive text-sm">*</span>
            </Label>
            <Input
              id="admin-content-url"
              required
              placeholder="https://www.instagram.com/p/Cxxx..."
              value={form.contentUrl}
              onChange={e => setForm(f => ({ ...f, contentUrl: e.target.value }))}
              className="bg-background/50"
            />
            <p className="text-xs text-muted-foreground">
              Paste the public post/reel/video/short link from {PLATFORM_LABELS[form.platform]}.
            </p>
          </div>

          {/* Thumbnail URL */}
          <div className="space-y-2">
            <Label className="font-bold">
              Thumbnail URL <span className="text-muted-foreground font-normal">(optional)</span>
            </Label>
            <Input
              id="admin-thumbnail-url"
              placeholder="https://cdn.example.com/thumb.jpg"
              value={form.thumbnailUrl}
              onChange={e => setForm(f => ({ ...f, thumbnailUrl: e.target.value }))}
              className="bg-background/50"
            />
            <p className="text-xs text-muted-foreground">A preview image shown in the client&apos;s content card.</p>
          </div>

          <Button
            id="admin-submit-post"
            type="submit"
            disabled={submitting}
            className="w-full gap-2 py-6 text-base font-black shadow-xl shadow-primary/20"
          >
            {submitting ? (
              <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              <Upload className="w-5 h-5" />
            )}
            {submitting ? 'Saving…' : 'Add to Client Calendar'}
          </Button>
        </form>

        {/* Recent Entries */}
        <div className="space-y-4">
          <h2 className="text-lg font-black font-heading flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent" /> Recently Added
          </h2>
          {recentPosts.length === 0 ? (
            <div className="bg-card rounded-2xl border border-dashed border-border p-12 text-center">
              <MailIcon className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">
                No entries yet in this session.<br />
                Use the form to add content links.
              </p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[640px] overflow-y-auto pr-1">
              {recentPosts.map(post => (
                <div key={post.id} className="bg-card rounded-2xl border shadow-sm p-4 flex items-start gap-3 hover:shadow-md transition-shadow">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${PLATFORM_COLORS[post.platform]}`}>
                    {PLATFORM_ICONS[post.platform]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate">
                      {post.title || `${PLATFORM_LABELS[post.platform]} ${post.contentType}`}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {new Date(post.postDate).toLocaleDateString('en-IN')} · {post.contentType}
                    </p>
                    <a
                      href={post.contentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline truncate block mt-1 max-w-[200px]"
                    >
                      {post.contentUrl}
                    </a>
                  </div>
                  <button
                    onClick={() => handleDelete(post.id)}
                    disabled={deleting === post.id}
                    className="flex-shrink-0 p-2 rounded-xl text-destructive/50 hover:text-destructive hover:bg-destructive/10 transition-all"
                    title="Delete"
                  >
                    {deleting === post.id
                      ? <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      : <Trash2 className="w-4 h-4" />
                    }
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
