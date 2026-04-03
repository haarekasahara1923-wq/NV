'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Video, Activity, MapPin, MessageSquare, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const services = [
  { slug: 'video-shoot-editing', title: 'Video Shoot & Editing', icon: <Video className="w-8 h-8"/>, desc: 'High-quality professional video production including shoot and post-editing.', price: 599, oneTime: true },
  { slug: 'social-media-manager', title: 'Social Media Manager', icon: <Share2 className="w-8 h-8"/>, desc: 'Complete management of FB, IG, YouTube & Gmail with monthly reports.', price: 1499, oneTime: false },
  { slug: 'meta-ads', title: 'Meta Ads Services', icon: <Activity className="w-8 h-8"/>, desc: 'Facebook & Instagram ad campaigns. Targeting, creatives, A/B testing included.', price: 999, oneTime: false },
  { slug: 'chatbot-installation', title: 'ChatBot Installation', icon: <MessageSquare className="w-8 h-8"/>, desc: 'Automate support and capture leads 24/7 on WhatsApp & your Website.', price: 499, oneTime: true },
  { slug: 'google-my-business', title: 'Google My Business', icon: <MapPin className="w-8 h-8"/>, desc: 'Setup, optimize and manage your GMB to rank higher locally.', price: 399, oneTime: true }
];

export default function ServicesPage() {
  const [billing, setBilling] = useState<'MONTHLY' | 'SIX_MONTH' | 'YEARLY'>('MONTHLY');

  const getPrice = (price: number, isOneTime: boolean) => {
    if (isOneTime) return `₹${price}`;
    if (billing === 'MONTHLY') return `₹${price}/mo`;
    if (billing === 'SIX_MONTH') return `₹1,200/mo (₹7,200 total)`;
    if (billing === 'YEARLY') return `₹1,200/mo (₹14,400 total)`;
  };

  return (
    <>
      <Navbar />
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

                <Button className="w-full bg-secondary hover:bg-primary text-white transition-colors h-12 shadow-sm font-bold">
                  Subscribe Now
                </Button>
                
                <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-success" /> Setup within 24 working hours</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-success" /> Live dashboard analytics</li>
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
