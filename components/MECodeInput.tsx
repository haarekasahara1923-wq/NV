'use client';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';

export default function MECodeInput({ onChange, value }: { onChange: (v: string) => void, value: string }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'valid' | 'invalid'>('idle');
  const [meName, setMeName] = useState<string>('');

  useEffect(() => {
    if (!value || value.trim() === '') {
      setStatus('idle');
      return;
    }

    const timer = setTimeout(async () => {
      setStatus('loading');
      try {
        const res = await fetch(`/api/me/validate-code?code=${value}`);
        if (res.ok) {
          const data = await res.json();
          if (data.valid) {
            setStatus('valid');
            setMeName(data.meName);
          } else {
            setStatus('invalid');
          }
        } else {
          setStatus('invalid');
        }
      } catch (e) {
        setStatus('invalid');
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="space-y-2">
      <Label htmlFor="mecode">Marketing Executive Code (Optional)</Label>
      <div className="relative">
        <Input 
          id="mecode"
          placeholder="e.g. ME001. Leave blank for default (NV001)" 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`uppercase ${status === 'invalid' ? 'border-destructive focus-visible:ring-destructive' : status === 'valid' ? 'border-success focus-visible:ring-success' : ''}`}
        />
        {status === 'loading' && <span className="absolute right-3 top-2.5 text-xs text-muted-foreground animate-pulse">Checking...</span>}
        {status === 'valid' && <span className="absolute right-3 top-2.5 text-xs font-bold text-success">✓ {meName}</span>}
        {status === 'invalid' && <span className="absolute right-3 top-2.5 text-xs font-bold text-destructive">Invalid Code</span>}
      </div>
      <p className="text-[11px] text-muted-foreground">Referred by an executive? Enter their code.</p>
    </div>
  );
}
