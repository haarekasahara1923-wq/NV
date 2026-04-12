'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Video, Activity, MapPin, MessageSquare, CheckCircle2, Loader2, LayoutDashboard } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const services = [
  { slug: 'video-shoot-editing', title: 'Video Shoot & Editing', icon: <Video className="w-8 h-8"/>, desc: 'High-quality professional video production including shoot and post-editing.', price: 599, oneTime: true },
  { slug: 'social-media-manager', title: 'Social Media Manager', icon: <Share2 className="w-8 h-8"/>, desc: 'Complete management of FB, IG, YouTube & Gmail with monthly reports.', price: 1499, oneTime: false },
  { slug: 'meta-ads', title: 'Meta Ads Services', icon: <Activity className="w-8 h-8"/>, desc: 'Facebook & Instagram ad campaigns. Targeting, creatives, A/B testing included. (Excluding Meta Charges)', price: 999, oneTime: false },
  { slug: 'chatbot-installation', title: 'ChatBot Installation', icon: <MessageSquare className="w-8 h-8"/>, desc: 'Automate support and capture leads 24/7 on WhatsApp & your Website. (Excluding Platform Charges per message)', price: 499, oneTime: true },
  { slug: 'google-my-business', title: 'Google My Business', icon: <MapPin className="w-8 h-8"/>, desc: 'Setup, optimize and manage your GMB to rank higher locally.', price: 399, oneTime: true }
];

export default function ServicesPage() {
  const [billing, setBilling] = useState<'MONTHLY' | 'SIX_MONTH' | 'YEARLY'>('MONTHLY');
  const [loading, setLoading] = useState<string | null>(null);
  const [userSubs, setUserSubs] = useState<string[]>([]);
  const [user, setUser] = useState<any>(null);
  const [showQRMode, setShowQRMode] = useState<boolean>(false);
  const [showUtrInput, setShowUtrInput] = useState<boolean>(false);
  const [utrNumber, setUtrNumber] = useState<string>('');
  const [currentOrder, setCurrentOrder] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch user profile and subscriptions on mount if logged in
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/me/profile');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          setUserSubs(data.user.subscriptions.map((s: any) => s.service.slug));
        }
      } catch (e) {
        console.log('Not logged in');
      }
    };
    fetchUser();
  }, []);

  const getPrice = (price: number, isOneTime: boolean) => {
    if (isOneTime) return `₹${price}`;
    
    let monthlyPrice = price;
    if (billing === 'SIX_MONTH') monthlyPrice = Math.round(price * 0.8); // 20% Discount
    if (billing === 'YEARLY') monthlyPrice = Math.round(price * 0.7); // 30% Discount (Example for yearly)
    
    if (billing === 'MONTHLY') return `₹${price}/mo`;
    
    const multiplier = billing === 'SIX_MONTH' ? 6 : 12;
    const total = monthlyPrice * multiplier;
    
    return `₹${monthlyPrice.toLocaleString('en-IN')}/mo (₹${total.toLocaleString('en-IN')} total)`;
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

  const handleSubscribe = async (slug: string) => {
    setLoading(slug);
    try {
      const res = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceSlug: slug, planType: billing })
      });

      if (res.status === 401) {
        toast.error('Please login to subscribe');
        router.push(`/login?callbackUrl=/services`);
        return;
      }

      const orderData = await res.json();
      if (!res.ok) throw new Error(orderData.error);

      // RAZORPAY FLOW HOLD - USING MANUAL QR FLOW
      setCurrentOrder({ ...orderData, slug });
      setShowQRMode(true);
      setShowUtrInput(false);
      setUtrNumber('');
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong');
    } finally {
      setLoading(null);
    }
  };

  const handleManualPaymentDone = () => {
    setShowUtrInput(true);
  };

  const submitUtrAndClose = async () => {
    if (!utrNumber.trim()) {
      toast.error('Please enter the UPI Transaction/UTR Number');
      return;
    }
    try {
      const res = await fetch('/api/payment/update-utr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: currentOrder.orderId, utrNo: utrNumber })
      });
      if (!res.ok) throw new Error('Failed to update UTR');
      toast.success('UTR Submitted! We have notified the Admin. Your service will be activated once verified.');
      setShowQRMode(false);
      router.push('/dashboard');
    } catch (err) {
      toast.error('Failed to submit UTR. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      
      {showQRMode && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-card w-full max-w-md rounded-3xl p-8 shadow-2xl relative border border-border animate-in fade-in zoom-in duration-300">
            <button onClick={() => setShowQRMode(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              ✕
            </button>

            {!showUtrInput ? (
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-black font-heading text-primary uppercase tracking-wider">Pay to NV Studio</h2>
                <p className="text-sm text-muted-foreground">
                  Please scan the QR code below using any UPI App (GPay, PhonePe, Paytm).
                  <br/>
                  <span className="font-bold text-foreground mt-2 block">You can pay the standard price or your agreed custom price!</span>
                </p>
                
                <div className="bg-white p-4 rounded-2xl mx-auto shadow-inner border border-slate-200 inline-block w-64 h-64 relative">
                  <Image src="/upi-qr.jpg" alt="NV Studio UPI QR" fill className="object-contain rounded-xl" />
                </div>
                
                <div className="bg-muted/50 p-3 rounded-lg border">
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">NV Studio UPI ID</p>
                  <p className="text-base font-bold text-foreground select-all mt-1">haarekasahara1923-3@oksbi</p>
                </div>

                <div className="pt-4">
                  <Button onClick={handleManualPaymentDone} className="w-full h-12 text-lg font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-500/20">
                    I have paid the amount
                  </Button>
                </div>
                
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl mt-4 text-left">
                  <p className="text-xs text-blue-600 font-medium">
                    <span className="font-bold">Note:</span> Upon successful payment, you will need to share the necessary access to manage your Social Media Platforms. Services will be activated within 24 Hrs of access sharing.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-6">
                 <h2 className="text-2xl font-black font-heading text-primary uppercase tracking-wider">Verify Payment</h2>
                 <p className="text-sm text-muted-foreground">
                   Please enter the 12-digit UPI Transaction ID or UTR number from your payment app so we can verify your payment.
                 </p>
                 
                 <div className="text-left space-y-2">
                   <label className="text-xs font-bold uppercase text-muted-foreground ml-1">UTR / Transaction ID</label>
                   <input 
                     type="text" 
                     value={utrNumber}
                     onChange={(e) => setUtrNumber(e.target.value)}
                     placeholder="e.g. 308412345678" 
                     className="w-full h-12 px-4 rounded-xl border bg-muted/50 font-bold focus:ring-2 focus:ring-primary outline-none"
                   />
                 </div>

                 <Button onClick={submitUtrAndClose} className="w-full h-12 text-lg font-bold bg-primary text-white shadow-xl shadow-primary/20">
                    Submit UTR Details
                 </Button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="bg-background min-h-screen py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-foreground mb-4">Our Services & Pricing</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Premium digital marketing services built specifically to scale businesses efficiently.
            </p>
            
            <div className="mt-8 flex justify-center">
              <div className="bg-secondary p-1.5 rounded-full inline-flex font-medium text-sm text-secondary-foreground shadow-sm">
                <button onClick={() => setBilling('MONTHLY')} className={`px-6 py-2 rounded-full transition-all ${billing === 'MONTHLY' ? 'bg-primary text-white shadow' : 'hover:text-primary'}`}>Monthly</button>
                <button onClick={() => setBilling('SIX_MONTH')} className={`px-6 py-2 rounded-full transition-all relative ${billing === 'SIX_MONTH' ? 'bg-primary text-white shadow' : 'hover:text-primary'}`}>
                  6-Months <span className="absolute -top-3 -right-2 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full shadow-sm">Save 20%</span>
                </button>
                <button onClick={() => setBilling('YEARLY')} className={`px-6 py-2 rounded-full transition-all ${billing === 'YEARLY' ? 'bg-primary text-white shadow' : 'hover:text-primary'}`}>Yearly</button>
              </div>
            </div>
          </div>
          
          {/* Dashboard Preview Section (Featured First) */}
          <div className="bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl border border-white/5 relative mb-24">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent pointer-events-none"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-8 md:p-16 relative z-10">
              <div className="space-y-8 text-white text-center lg:text-left">
                <div className="inline-block px-4 py-1.5 bg-primary/20 text-primary-foreground rounded-full text-sm font-bold tracking-wider uppercase">
                  Client Portal
                </div>
                <h2 className="text-3xl md:text-5xl font-bold font-heading leading-tight">
                  Track Your Growth with <span className="text-primary italic">Live Analytics</span>
                </h2>
                <p className="text-xl text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Every subscription comes with a personalized dashboard. Monitor your social media reach, ad performance, and engagement metrics in real-time.
                </p>
                <div className="flex flex-col gap-4 items-center lg:items-start">
                  {[
                    "Daily Performance Updates",
                    "Detailed Audience Insights",
                    "ROI Tracking for Paid Ads",
                    "Project Status Tracking"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 text-slate-300">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                      </div>
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-blue-500/50 rounded-2xl blur-2xl opacity-20 transition duration-500"></div>
                <div className="relative rounded-2xl border border-white/10 overflow-hidden shadow-2xl transform transition-transform group-hover:scale-[1.02] duration-700">
                  <Image 
                    src="/images/social-media/growth-2.jpg" 
                    alt="NV Studio Client Dashboard" 
                    width={1200} 
                    height={800} 
                    className="w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc) => (
              <div key={svc.slug} className="bg-card border rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col items-start relative overflow-hidden group">
                <div className="absolute top-0 w-full h-1 bg-primary/20 group-hover:bg-primary transition-colors left-0"></div>
                <div className="w-16 h-16 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  {svc.icon}
                </div>
                <h3 className="text-xl font-bold font-heading mb-2">{svc.title}</h3>
                <p className="text-muted-foreground text-sm mb-6 flex-1 line-clamp-3">{svc.desc}</p>
                
                <div className="mb-6">
                  <p className="text-3xl font-bold text-foreground">
                    {getPrice(svc.price, svc.oneTime)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 font-semibold uppercase tracking-wider">
                    {svc.oneTime ? 'One-time Payment' : 'Subscription'}
                  </p>
                </div>

                {userSubs.includes(svc.slug) ? (
                  <Link href={getAnalyticsLink(svc.slug)} className="w-full">
                    <Button className="w-full bg-success hover:bg-success/90 text-white transition-colors h-12 shadow-sm font-bold gap-2">
                      <LayoutDashboard className="w-4 h-4" />
                      View Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Button 
                    onClick={() => handleSubscribe(svc.slug)} 
                    disabled={loading === svc.slug}
                    className="w-full bg-secondary hover:bg-primary text-white transition-colors h-12 shadow-sm font-bold"
                  >
                    {loading === svc.slug ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                    Subscribe Now
                  </Button>
                )}
                
                <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Setup within 24 working hours</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Live dashboard analytics</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}


