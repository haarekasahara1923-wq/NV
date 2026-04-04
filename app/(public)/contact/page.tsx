'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const submitAuth = async (e: any) => {
    e.preventDefault();
    setLoading(true); setError(''); setSuccess(false);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: e.target.name.value,
          email: e.target.email.value,
          phone: e.target.phone.value,
          message: e.target.message.value,
        })
      });
      if (!res.ok) throw new Error('Submission failed');
      setSuccess(true);
      e.target.reset();
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <div className="bg-slate-50 min-h-screen py-20 flex px-4">
        <div className="container mx-auto max-w-5xl bg-white border rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          
          <div className="bg-slate-900 p-12 text-white md:w-5/12 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold font-heading text-primary mb-6">Get in Touch</h2>
              <p className="text-slate-300 mb-8 leading-relaxed">
                Ready to accelerate your growth? Send us a message and our team will get back to you within 24 working hours.
              </p>
              
              <div className="mt-8 rounded-2xl overflow-hidden border border-white/10 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <Image 
                  src="/images/social-media/growth-1.jpg" 
                  alt="Growth with NV Studio" 
                  width={400} 
                  height={600} 
                  className="w-full h-auto"
                />
              </div>
            </div>
            
            <div className="space-y-6 mt-12 relative z-10">
              <div>
                <p className="font-bold text-primary text-sm uppercase tracking-wider">Address</p>
                <p className="text-lg mt-1 text-slate-200">Morar, Gwalior, MP — 474006</p>
              </div>
              <div>
                <p className="font-bold text-primary text-sm uppercase tracking-wider">Contact Info</p>
                <p className="text-lg mt-1 text-slate-200">admin@nvstudio.in</p>
                <p className="text-lg text-slate-200">+91 9999999999</p>
              </div>
            </div>
          </div>

          <div className="p-12 md:w-7/12">
            {success ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-20 h-20 bg-success/10 text-success rounded-full flex items-center justify-center text-4xl">✓</div>
                <h3 className="text-2xl font-bold">Message Sent!</h3>
                <p className="text-muted-foreground">We'll get back to you shortly.</p>
                <Button onClick={() => setSuccess(false)} variant="outline" className="mt-4">Send Another</Button>
              </div>
            ) : (
              <form onSubmit={submitAuth} className="space-y-6">
                {error && <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg font-medium text-center">{error}</div>}
                
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input name="name" required placeholder="John Doe" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input name="email" type="email" required placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input name="phone" placeholder="+91 9999999999" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>How can we help?</Label>
                  <textarea 
                    name="message" 
                    required 
                    rows={4}
                    className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>

                <Button type="submit" disabled={loading} className="w-full h-12 text-md font-bold mt-2">
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            )}
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}
