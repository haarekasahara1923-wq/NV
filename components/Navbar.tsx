import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="flex flex-col">
            <span className="text-2xl font-black font-heading tracking-tight text-primary group-hover:text-primary/80 transition-colors">SCALEVO</span>
            <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-foreground/60 mt-[-4px]">Digital Growth Agency</span>
          </div>
        </Link>
        
        <div className="hidden md:flex flex-1 justify-center space-x-8 text-sm font-medium">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
          <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
          <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/login">
            <Button variant="ghost" className="font-semibold">Log in</Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-primary hover:bg-primary/90 text-white font-semibold">Get Started</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
