'use client';

import { AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { APP_ROUTES } from '@/lib/app-routes';

type Props = {
  reset: () => void;
};

function SinglePostError({ reset }: Props) {
  return (
    <main className="grid min-h-[calc(100vh-4rem)] place-items-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-black/8 bg-white px-6 py-10 text-center shadow-[0_18px_60px_rgba(42,37,28,0.07)] sm:px-10">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-[#fff1c7] text-[#8a5a00]">
          <AlertCircle className="size-6" aria-hidden="true" />
        </span>
        <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.18em] text-[#ee5a2f]">
          A small hiccup
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.045em]">
          We couldn’t open this post
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-black/50">
          The conversation is still here, but it didn’t load correctly. Give it another try.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-2 sm:flex-row">
          <Link
            href={APP_ROUTES.HOME}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-4 text-xs font-semibold transition hover:border-black/20 hover:bg-[#f8f7f3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ee5a2f]/40"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to the feed
          </Link>
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#20211f] px-4 text-xs font-semibold text-white transition hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ee5a2f]/50"
          >
            <RefreshCw className="size-3.5" aria-hidden="true" />
            Try again
          </button>
        </div>
      </div>
    </main>
  );
}

export default SinglePostError;