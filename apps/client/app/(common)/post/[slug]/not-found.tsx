import { ArrowLeft, FileQuestion, Plus } from 'lucide-react';
import Link from 'next/link';
import { APP_ROUTES } from '@/lib/app-routes';

function PostNotFound() {
  return (
    <main className="grid min-h-[calc(100vh-4rem)] place-items-center px-4 py-12">
      <div className="w-full max-w-md text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-[#ffede7] text-[#c64220]">
          <FileQuestion className="size-6" aria-hidden="true" />
        </span>
        <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.18em] text-[#ee5a2f]">
          404 · Lost thread
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.045em]">That post isn’t here</h1>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-black/50">
          It may have been removed, or the link might point to the wrong conversation.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-2 sm:flex-row">
          <Link
            href={APP_ROUTES.HOME}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-4 text-xs font-semibold transition hover:border-black/20 hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ee5a2f]/40"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Browse posts
          </Link>
          <Link
            href={APP_ROUTES.POST.CREATE}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#20211f] px-4 text-xs font-semibold text-white transition hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ee5a2f]/50"
          >
            <Plus className="size-4" aria-hidden="true" />
            Create a post
          </Link>
        </div>
      </div>
    </main>
  );
}

export default PostNotFound;