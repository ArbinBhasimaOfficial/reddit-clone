'use client';

import type { Post } from '@/lib/types/post.types';
import {
  ArrowBigDown,
  ArrowBigUp,
  ArrowDownUp,
  Bookmark,
  FileText,
  Plus,
  Search,
  Sparkles,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { APP_ROUTES } from '@/lib/app-routes';

type SortDirection = 'newest' | 'oldest';
type Vote = -1 | 0 | 1;

const avatarStyles = [
  'bg-[#ffede7] text-[#c43f18]',
  'bg-[#e6f3ee] text-[#17674f]',
  'bg-[#ece9ff] text-[#5846a8]',
  'bg-[#fff1c7] text-[#8a5a00]',
];

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

function formatDate(value: Date | string) {
  const date = value instanceof Date ? value : new Date(value);

  return Number.isNaN(date.getTime()) ? 'Recently' : dateFormatter.format(date);
}

function normalizeText(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}

function toDate(value: Date | string) {
  return value instanceof Date ? value : new Date(value);
}

function PostList({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState('');
  const [sortDirection, setSortDirection] = useState<SortDirection>('newest');
  const [votes] = useState<Record<string, Vote>>({});
  const [savedPosts] = useState<Set<number>>(() => new Set());

  //   const visiblePosts = useMemo(() => {
  //     const normalizedQuery = query.trim().toLocaleLowerCase();
  //     const filteredPosts = normalizedQuery
  //       ? posts.filter((post) =>
  //           `${post.title} ${post.content}`.toLocaleLowerCase().includes(normalizedQuery),
  //         )
  //       : posts;

  //     return [...filteredPosts].sort((firstPost, secondPost) => {
  //       const difference =
  //         new Date(secondPost.createdAt).getTime() - new Date(firstPost.createdAt).getTime();

  //       return sortDirection === 'newest' ? difference : -difference;
  //     });
  //   }, [posts, query, sortDirection]);

  //   function castVote(postId: string, nextVote: Exclude<Vote, 0>) {
  //     setVotes((currentVotes) => ({
  //       ...currentVotes,
  //       [postId]: currentVotes[postId] === nextVote ? 0 : nextVote,
  //     }));
  //   }

  //   function toggleSaved(postId: string) {
  //     setSavedPosts((currentSavedPosts) => {
  //       const nextSavedPosts = new Set(currentSavedPosts);

  //       if (nextSavedPosts.has(postId)) nextSavedPosts.delete(postId);
  //       else nextSavedPosts.add(postId);

  //       return nextSavedPosts;
  //     });
  //   }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14">
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#ee5a2f]">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Community feed
          </div>
          <h1 className="mt-4 max-w-xl text-4xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-5xl lg:text-[3.5rem]">
            The good stuff, all in one place.
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-6 text-black/55">
            Ideas, questions, and small discoveries from people who like to share what they know.
          </p>

          <div className="mt-6 hidden border-t border-black/10 pt-5 lg:block">
            <p className="text-2xl font-semibold tracking-[-0.04em]">{posts.length}</p>
            <p className="mt-0.5 text-xs text-black/45">
              {posts.length === 1 ? 'post' : 'posts'} so far
            </p>
          </div>
        </aside>

        <div className="min-w-0">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="relative min-w-0 flex-1">
              <span className="sr-only">Search posts</span>
              <Search
                className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-black/40"
                aria-hidden="true"
              />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="h-11 w-full rounded-full border border-black/10 bg-white pl-11 pr-11 text-sm shadow-[0_1px_0_rgba(0,0,0,0.03)] outline-none transition placeholder:text-black/35 focus:border-[#ee5a2f]/50 focus:ring-4 focus:ring-[#ee5a2f]/10"
                placeholder="Search posts"
                type="search"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-2 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-black/40 transition hover:bg-black/5 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ee5a2f]/40"
                  aria-label="Clear search"
                >
                  <X className="size-3.5" aria-hidden="true" />
                </button>
              ) : null}
            </label>

            <button
              type="button"
              onClick={() =>
                setSortDirection((currentDirection) =>
                  currentDirection === 'newest' ? 'oldest' : 'newest',
                )
              }
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-4 text-sm font-medium shadow-[0_1px_0_rgba(0,0,0,0.03)] transition hover:border-black/20 hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ee5a2f]/40"
              aria-label={`Sort by ${sortDirection === 'newest' ? 'oldest' : 'newest'} first`}
            >
              <ArrowDownUp className="size-4 text-black/45" aria-hidden="true" />
              {sortDirection === 'newest' ? 'Newest first' : 'Oldest first'}
            </button>
          </div>

          {posts.length === 0 ? (
            <EmptyFeed />
          ) : posts.length === 0 ? (
            <NoSearchResults query={query} onReset={() => setQuery('')} />
          ) : (
            <div className="space-y-3">
              <p className="px-1 pb-1 text-xs text-black/45 lg:hidden">
                {posts.length} {posts.length === 1 ? 'conversation' : 'conversations'}
              </p>

              {posts.map((post, index) => {
                const vote = votes[post.id] ?? 0;
                const isSaved = savedPosts.has(post.id);
                const wasEdited =
                  toDate(post.updated_at).getTime() !== toDate(post.created_at).getTime();

                return (
                  <article
                    key={post.id}
                    className="group relative overflow-hidden rounded-2xl border border-black/8 bg-white p-4 shadow-[0_1px_0_rgba(0,0,0,0.04)] transition duration-300 hover:-translate-y-0.5 hover:border-black/15 hover:shadow-[0_18px_45px_rgba(42,37,28,0.08)] sm:p-5"
                  >
                    <div className="flex gap-3.5 sm:gap-4">
                      <div
                        className={`grid size-10 shrink-0 place-items-center rounded-xl text-sm font-bold ${avatarStyles[index % avatarStyles.length]}`}
                        aria-hidden="true"
                      >
                        {post.user.name.trim().charAt(0).toUpperCase() || 'U'}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-medium text-black/42">
                          <span className="text-black/65">{post.user.name}</span>
                          <span className="size-0.5 rounded-full bg-black/25" aria-hidden="true" />
                          <time dateTime={toDate(post.created_at).toISOString()}>
                            {formatDate(post.created_at)}
                          </time>
                          {wasEdited ? (
                            <>
                              <span
                                className="size-0.5 rounded-full bg-black/25"
                                aria-hidden="true"
                              />
                              <span>Edited</span>
                            </>
                          ) : null}
                        </div>

                        <Link
                          href={APP_ROUTES.POST.VIEW(post.slug)}
                          className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ee5a2f]/40 focus-visible:ring-offset-4"
                        >
                          <h2 className="mt-2 text-lg font-semibold leading-snug tracking-tight text-[#20211f] transition-colors group-hover:text-[#c64220] sm:text-xl">
                            {post.title}
                          </h2>
                          <p className="mt-2 line-clamp-3 text-sm leading-6 text-black/58">
                            {normalizeText(post.content)}
                          </p>
                        </Link>

                        <div className="mt-4 flex items-center justify-between gap-3 border-t border-black/6 pt-3">
                          <div
                            className="inline-flex items-center rounded-full bg-[#f3f2ee] p-0.5"
                            aria-label="Post voting"
                          >
                            <button
                              type="button"
                              // onClick={() => castVote(post.id, 1)}
                              className={`grid size-7 place-items-center rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ee5a2f]/40 ${
                                vote === 1
                                  ? 'bg-[#ff6842] text-white shadow-sm'
                                  : 'text-black/45 hover:bg-white hover:text-[#e44e27]'
                              }`}
                              aria-label="Upvote post"
                              aria-pressed={vote === 1}
                            >
                              <ArrowBigUp className="size-4" aria-hidden="true" />
                            </button>
                            <span
                              className={`min-w-7 text-center text-xs font-bold tabular-nums ${
                                vote === 0 ? 'text-black/55' : 'text-[#c64220]'
                              }`}
                              aria-label={`${vote} votes`}
                            >
                              {vote}
                            </span>
                            <button
                              type="button"
                              // onClick={() => castVote(post.id, -1)}
                              className={`grid size-7 place-items-center rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6b5fd3]/40 ${
                                vote === -1
                                  ? 'bg-[#6558c7] text-white shadow-sm'
                                  : 'text-black/45 hover:bg-white hover:text-[#6558c7]'
                              }`}
                              aria-label="Downvote post"
                              aria-pressed={vote === -1}
                            >
                              <ArrowBigDown className="size-4" aria-hidden="true" />
                            </button>
                          </div>

                          <button
                            type="button"
                            //   onClick={() => toggleSaved(post.id)}
                            className={`inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ee5a2f]/40 ${
                              isSaved
                                ? 'bg-[#fff0eb] text-[#c64220]'
                                : 'text-black/45 hover:bg-[#f3f2ee] hover:text-black/70'
                            }`}
                            aria-pressed={isSaved}
                          >
                            <Bookmark
                              className={`size-3.5 ${isSaved ? 'fill-current' : ''}`}
                              aria-hidden="true"
                            />
                            {isSaved ? 'Saved' : 'Save'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyFeed() {
  return (
    <div className="rounded-2xl border border-dashed border-black/15 bg-white/60 px-6 py-16 text-center">
      <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-[#ffede7] text-[#d94a24]">
        <FileText className="size-5" aria-hidden="true" />
      </span>
      <h2 className="mt-5 text-lg font-semibold tracking-[-0.02em]">This space is wide open</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-black/50">
        Be the first to start a conversation and give the community something to talk about.
      </p>
      <Link
        href={APP_ROUTES.POST.CREATE}
        className="mt-6 inline-flex h-9 items-center gap-2 rounded-full bg-[#20211f] px-4 text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ee5a2f]/50"
      >
        <Plus className="size-4" aria-hidden="true" />
        Create the first post
      </Link>
    </div>
  );
}

function NoSearchResults({ query, onReset }: { query: string; onReset: () => void }) {
  return (
    <div className="rounded-2xl border border-dashed border-black/15 bg-white/60 px-6 py-14 text-center">
      <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-[#ece9ff] text-[#5846a8]">
        <Search className="size-5" aria-hidden="true" />
      </span>
      <h2 className="mt-5 text-lg font-semibold tracking-[-0.02em]">Nothing found</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-black/50">
        No conversations match “{query}”. Try another phrase or clear the search.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-5 text-xs font-bold text-[#c64220] underline decoration-[#c64220]/25 underline-offset-4 transition hover:decoration-[#c64220] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ee5a2f]/40"
      >
        Clear search
      </button>
    </div>
  );
}

export default PostList;