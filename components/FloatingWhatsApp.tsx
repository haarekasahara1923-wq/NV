'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const message = e.target.message.value;

    const text = `Hi NV Studio! I'm interested in your services.%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Phone:* ${phone}%0A*Message:* ${message}`;
    
    window.open(`https://wa.me/919457440300?text=${text}`, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.23)] hover:scale-105 transition-all outline-none"
          aria-label="Contact us on WhatsApp"
        >
          {isOpen ? (
            <X className="w-8 h-8" />
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.601.725 4.914 2.038 1.314 1.314 2.036 3.06 2.036 4.914-.001 3.824-3.113 6.928-6.95 6.928z"/>
            </svg>
          )}
        </button>

        {isOpen && (
          <div className="absolute bottom-20 right-0 w-[350px] bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-[#128C7E] px-6 py-4 flex flex-col justify-center">
              <h3 className="text-white font-bold text-lg">Start a Conversation</h3>
              <p className="text-white/80 text-sm">Hi! Let us know how we can help you.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1">
                <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Name</Label>
                <Input name="name" required placeholder="Jon Dee" className="bg-slate-50" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                 <div className="space-y-1">
                   <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email</Label>
                   <Input name="email" type="email" required placeholder="mail@example.com" className="bg-slate-50 text-xs" />
                 </div>
                 <div className="space-y-1">
                   <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone</Label>
                   <Input name="phone" required placeholder="9000000000" className="bg-slate-50 text-xs" />
                 </div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Message</Label>
                <textarea 
                  name="message" 
                  required 
                  rows={2}
                  className="w-full rounded-md border border-input bg-slate-50 px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>
              
              <Button type="submit" className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white font-bold h-12 rounded-xl">
                Start Chat <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-2"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.601.725 4.914 2.038 1.314 1.314 2.036 3.06 2.036 4.914-.001 3.824-3.113 6.928-6.95 6.928z"/></svg>
              </Button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
