'use client';
import React, { useState } from 'react';
import { Input } from './input';
import { cn } from 'cn';
import { Eye, EyeClosed } from 'lucide-react';

function PasswordInput({ className, ...props }: React.ComponentProps<'input'>) {
  const [passwordShown, setPasswordShown] = useState(false);
  return (
    <div className="relative">
      <Input
        {...props}
        type={passwordShown ? 'text' : 'password'}
        data-slot="input"
        className={cn(
          'h-7 w-full min-w-0 rounded-md border border-input bg-input/20 px-2 py-0.5 text-sm transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-xs/relaxed file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 md:text-xs/relaxed dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
          className,
        )}
      />
      <button
        type="button"
        onClick={() => setPasswordShown((pv) => !pv)}
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:opacity-60"
      >
        {passwordShown ? (
          <EyeClosed className="size-4 stroke-1" />
        ) : (
          <Eye className="size-4 stroke-1" />
        )}
      </button>
    </div>
  );
}

export default PasswordInput;