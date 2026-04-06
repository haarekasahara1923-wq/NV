'use client';
import { useState, useEffect, useCallback } from 'react';
import {
  ChevronLeft, ChevronRight, Download, ExternalLink,
  ImageIcon, Video, Film, Mail as MailIcon, Sparkles, Calendar
} from 'lucide-react';
import { FacebookIcon, InstagramIcon, YoutubeIcon, GmailIcon } from '@/components/BrandIcons';

// ─── Types ───────────────────────────────────────────────
type Platform = 'FACEBOOK' | 'INSTAGRAM' | 'YOUTUBE' | 'GMAIL';
interface SocialPost {
  id: string;
  platform: Platform;
  postDate: string;
  title?: string;
  contentUrl: string;
  thumbnailUrl?: string;
  contentType: 'POST' | 'REEL' | 'VIDEO' | 'SHORT' | 'STORY' | 'EMAIL';
  isAutoSynced: boolean;
}

// ─── Platform Config ──────────────────────────────────────
const PLATFORMS: {
  key: Platform;
  label: string;
  gradient: string;
  icon: React.ReactNode;
  iconLg: React.ReactNode;
}[] = [
  {
    key: 'FACEBOOK',
    label: 'Facebook',
    gradient: 'from-[#1877F2] to-[#0d5cbf]',
    icon: <FacebookIcon className="w-5 h-5" />,
    iconLg: <FacebookIcon className="w-8 h-8" />,
  },
  {
    key: 'INSTAGRAM',
    label: 'Instagram',
    gradient: 'from-[#f09433] via-[#dc2743] to-[#bc1888]',
    icon: <InstagramIcon className="w-5 h-5" />,
    iconLg: <InstagramIcon className="w-8 h-8" />,
  },
  {
    key: 'YOUTUBE',
    label: 'YouTube',
    gradient: 'from-[#FF0000] to-[#cc0000]',
    icon: <YoutubeIcon className="w-5 h-5" />,
    iconLg: <YoutubeIcon className="w-8 h-8" />,
  },
  {
    key: 'GMAIL',
    label: 'Gmail',
    gradient: 'from-[#EA4335] to-[#c5221f]',
    icon: <GmailIcon className="w-5 h-5" />,
    iconLg: <GmailIcon className="w-8 h-8" />,
  },
];

const CONTENT_TYPE_ICONS: Record<string, React.ReactNode> = {
  POST: <ImageIcon className="w-4 h-4" />,
  REEL: <Film className="w-4 h-4" />,
  VIDEO: <Video className="w-4 h-4" />,
  SHORT: <Film className="w-4 h-4" />,
  STORY: <Sparkles className="w-4 h-4" />,
  EMAIL: <MailIcon className="w-4 h-4" />,
};

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

// ─── Calendar Component ───────────────────────────────────
function CalendarPicker({
  selected,
  onSelect,
  platform,
}: {
  selected: Date;
  onSelect: (d: Date) => void;
  platform: (typeof PLATFORMS)[0];
}) {
  const [viewYear, setViewYear] = useState(selected.getFullYear());
  const [viewMonth, setViewMonth] = useState(selected.getMonth());
  const [mode, setMode] = useState<'day' | 'month' | 'year'>('day');

  const today = new Date();
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const years = Array.from({ length: 12 }, (_, i) => viewYear - 5 + i);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  return (
    <div className="bg-card rounded-3xl border border-border shadow-2xl overflow-hidden w-full">
      {/* Calendar Header */}
      <div className={`bg-gradient-to-r ${platform.gradient} p-5 text-white`}>
        <div className="flex items-center justify-between">
          {mode === 'day' && (
            <>
              <button onClick={prevMonth} className="p-1.5 rounded-full hover:bg-white/20 transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="text-center">
                <button onClick={() => setMode('month')} className="font-bold text-lg hover:opacity-80 block transition-opacity">
                  {MONTH_NAMES[viewMonth]}
                </button>
                <button onClick={() => setMode('year')} className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  {viewYear}
                </button>
              </div>
              <button onClick={nextMonth} className="p-1.5 rounded-full hover:bg-white/20 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
          {mode === 'month' && (
            <div className="flex-1 flex items-center justify-between">
              <button onClick={() => setMode('day')} className="p-1.5 rounded-full hover:bg-white/20 transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={() => setMode('year')} className="font-bold text-lg hover:opacity-80 transition-opacity">
                {viewYear}
              </button>
              <div className="w-8" />
            </div>
          )}
          {mode === 'year' && (
            <div className="flex-1 flex items-center justify-between">
              <button onClick={() => setViewYear(y => y - 12)} className="p-1.5 rounded-full hover:bg-white/20 transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="font-bold text-lg">Select Year</span>
              <button onClick={() => setViewYear(y => y + 12)} className="p-1.5 rounded-full hover:bg-white/20 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="p-4">
        {/* Year picker */}
        {mode === 'year' && (
          <div className="grid grid-cols-4 gap-2">
            {years.map(y => (
              <button
                key={y}
                onClick={() => { setViewYear(y); setMode('month'); }}
                className={`py-2 rounded-xl text-sm font-semibold transition-all
                  ${y === viewYear ? `bg-gradient-to-r ${platform.gradient} text-white shadow-lg` : 'hover:bg-muted text-foreground'}`}
              >
                {y}
              </button>
            ))}
          </div>
        )}

        {/* Month picker */}
        {mode === 'month' && (
          <div className="grid grid-cols-3 gap-2">
            {MONTH_NAMES.map((m, i) => (
              <button
                key={m}
                onClick={() => { setViewMonth(i); setMode('day'); }}
                className={`py-2.5 rounded-xl text-sm font-semibold transition-all
                  ${i === viewMonth ? `bg-gradient-to-r ${platform.gradient} text-white shadow-lg` : 'hover:bg-muted text-foreground'}`}
              >
                {m.slice(0, 3)}
              </button>
            ))}
          </div>
        )}

        {/* Day picker */}
        {mode === 'day' && (
          <>
            <div className="grid grid-cols-7 mb-2">
              {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
                <div key={d} className="text-center text-[11px] font-bold text-muted-foreground py-1">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-y-1">
              {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const d = new Date(viewYear, viewMonth, day);
                const isSelected =
                  selected.getDate() === day &&
                  selected.getMonth() === viewMonth &&
                  selected.getFullYear() === viewYear;
                const isToday =
                  today.getDate() === day &&
                  today.getMonth() === viewMonth &&
                  today.getFullYear() === viewYear;
                const isFuture = d > today;
                return (
                  <button
                    key={day}
                    disabled={isFuture}
                    onClick={() => onSelect(new Date(viewYear, viewMonth, day))}
                    className={`h-9 w-full rounded-xl text-sm font-semibold transition-all
                      ${isSelected ? `bg-gradient-to-r ${platform.gradient} text-white shadow-lg scale-105` : ''}
                      ${isToday && !isSelected ? 'ring-2 ring-primary text-primary font-black' : ''}
                      ${isFuture ? 'opacity-25 cursor-not-allowed' : !isSelected ? 'hover:bg-muted cursor-pointer' : ''}
                    `}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────
export default function SocialMediaManagementPage() {
  const [activePlatform, setActivePlatform] = useState<Platform | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);

  const platformConfig = PLATFORMS.find(p => p.key === activePlatform);

  const fetchPosts = useCallback(async (date: Date, platform: Platform) => {
    setLoading(true);
    const iso = date.toISOString().split('T')[0];
    try {
      const res = await fetch(`/api/social-media-posts?date=${iso}&platform=${platform}`);
      const data = await res.json();
      setPosts(data.posts || []);
    } catch {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activePlatform) fetchPosts(selectedDate, activePlatform);
  }, [activePlatform, selectedDate, fetchPosts]);

  const handleDownload = async (post: SocialPost) => {
    setDownloading(post.id);
    try {
      const response = await fetch(post.contentUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const ext = post.contentUrl.split('.').pop()?.split('?')[0] || 'mp4';
      a.download = `NvStudio_${post.platform}_${post.contentType}_${post.id}.${ext}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // CORS blocks direct download for social links — open in new tab
      window.open(post.contentUrl, '_blank');
    } finally {
      setDownloading(null);
    }
  };

  const formatDate = (d: Date) =>
    `${MONTH_NAMES[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Header */}
      <div className="bg-card p-8 rounded-3xl shadow-sm border border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        <div className="relative flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-lg flex-shrink-0">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black font-heading text-foreground tracking-tight uppercase">
              Social Media Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Select a platform → pick a date → view &amp; download your published content.
            </p>
          </div>
        </div>
      </div>

      {/* Platform CTAs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {PLATFORMS.map(platform => (
          <button
            key={platform.key}
            id={`cta-${platform.key.toLowerCase()}`}
            onClick={() => {
              setActivePlatform(platform.key);
              setPosts([]);
            }}
            className={`group relative flex flex-col items-center justify-center gap-4 p-8 rounded-3xl border-2 transition-all duration-300 cursor-pointer select-none
              ${activePlatform === platform.key
                ? `border-transparent bg-gradient-to-br ${platform.gradient} text-white shadow-2xl scale-[1.03]`
                : 'bg-card border-border hover:border-transparent hover:scale-[1.02] hover:shadow-xl'
              }`}
          >
            {activePlatform === platform.key && (
              <div className={`absolute inset-0 rounded-3xl blur-xl opacity-25 bg-gradient-to-br ${platform.gradient} -z-10 scale-110`} />
            )}

            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300
              ${activePlatform === platform.key
                ? 'bg-white/20 text-white'
                : `bg-gradient-to-br ${platform.gradient} text-white group-hover:scale-110`
              }`}
            >
              {platform.iconLg}
            </div>

            <span className={`font-black text-lg tracking-tight font-heading
              ${activePlatform === platform.key ? 'text-white' : 'text-foreground'}`}>
              {platform.label}
            </span>

            {activePlatform === platform.key && (
              <span className="absolute top-3 right-3 text-[10px] font-black bg-white/20 text-white px-2 py-0.5 rounded-full tracking-widest uppercase">
                Active
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Calendar + Posts Panel */}
      {activePlatform && platformConfig && (
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 items-start">
          {/* Calendar */}
          <div className="space-y-4">
            <p className="text-xs font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" /> Pick a Date
            </p>
            <CalendarPicker
              selected={selectedDate}
              onSelect={setSelectedDate}
              platform={platformConfig}
            />
          </div>

          {/* Content Results */}
          <div className="space-y-4">
            <p className="text-xs font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${platformConfig.gradient} inline-block`} />
              {platformConfig.label} · {formatDate(selectedDate)}
            </p>

            {loading ? (
              <div className="bg-card rounded-3xl border p-20 flex flex-col items-center gap-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${platformConfig.gradient} animate-pulse`} />
                <p className="text-muted-foreground font-medium">Fetching content…</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="bg-card rounded-3xl border p-20 flex flex-col items-center gap-3 text-center">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${platformConfig.gradient} flex items-center justify-center text-white opacity-30`}>
                  {platformConfig.iconLg}
                </div>
                <p className="text-xl font-bold text-muted-foreground">No content on this date</p>
                <p className="text-sm text-muted-foreground max-w-xs">
                  NV Studio hasn&apos;t published any {platformConfig.label} content on {formatDate(selectedDate)}.
                  Try selecting a different date.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map(post => (
                  <div
                    key={post.id}
                    className="bg-card rounded-3xl border shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                  >
                    {post.thumbnailUrl && (
                      <div className="relative h-52 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={post.thumbnailUrl} alt={post.title || ''} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <span className={`absolute top-3 left-3 text-[11px] font-black px-3 py-1 rounded-full bg-gradient-to-r ${platformConfig.gradient} text-white uppercase tracking-widest`}>
                          {post.contentType}
                        </span>
                        {post.isAutoSynced && (
                          <span className="absolute top-3 right-3 text-[11px] font-black px-3 py-1 rounded-full bg-green-500 text-white flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> Auto-Synced
                          </span>
                        )}
                      </div>
                    )}

                    <div className="p-6">
                      {!post.thumbnailUrl && (
                        <span className={`inline-flex items-center gap-1.5 text-[11px] font-black px-3 py-1 rounded-full bg-gradient-to-r ${platformConfig.gradient} text-white uppercase tracking-widest mb-3`}>
                          {CONTENT_TYPE_ICONS[post.contentType]} {post.contentType}
                        </span>
                      )}
                      <h3 className="text-lg font-bold text-foreground mb-1">
                        {post.title || `${platformConfig.label} ${post.contentType}`}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Published · {formatDate(new Date(post.postDate))}
                      </p>

                      {/* URL bar */}
                      <div className="bg-muted/40 rounded-2xl p-3 mb-5 flex items-center gap-3 border border-border/50">
                        <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${platformConfig.gradient} flex items-center justify-center text-white flex-shrink-0`}>
                          {platformConfig.icon}
                        </div>
                        <a
                          href={post.contentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary font-medium truncate hover:underline flex-1 min-w-0"
                        >
                          {post.contentUrl}
                        </a>
                        <a
                          href={post.contentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 p-2 rounded-xl hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>

                      <div className="flex gap-3">
                        <a
                          href={post.contentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          id={`view-${post.id}`}
                          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm text-white bg-gradient-to-r ${platformConfig.gradient} shadow-lg hover:opacity-90 transition-opacity`}
                        >
                          <ExternalLink className="w-4 h-4" />
                          View on {platformConfig.label}
                        </a>
                        <button
                          id={`download-${post.id}`}
                          onClick={() => handleDownload(post)}
                          disabled={downloading === post.id}
                          className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm border-2 border-border hover:border-primary hover:text-primary transition-all disabled:opacity-50"
                        >
                          {downloading === post.id
                            ? <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            : <Download className="w-4 h-4" />
                          }
                          Save to Gallery
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
