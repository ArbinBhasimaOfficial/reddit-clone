export default function SinglePostLoading() {
  return (
    <main
      className="mx-auto min-h-[calc(100vh-4rem)] w-full max-w-6xl animate-pulse px-4 py-8 sm:px-6 sm:py-12 lg:px-8"
      aria-label="Loading post"
    >
      <div className="h-4 w-28 rounded-full bg-black/8" />

      <div className="mt-6 grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_230px] lg:gap-7">
        <div className="overflow-hidden rounded-3xl border border-black/8 bg-white shadow-[0_18px_60px_rgba(42,37,28,0.05)]">
          <div className="px-5 py-8 sm:px-9 sm:py-10 lg:px-12 lg:py-12">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-[#ffede7]" />
              <div className="space-y-2">
                <div className="h-3 w-28 rounded-full bg-black/8" />
                <div className="h-2.5 w-40 rounded-full bg-black/6" />
              </div>
            </div>
            <div className="mt-8 h-10 w-11/12 rounded-xl bg-black/8" />
            <div className="mt-3 h-10 w-3/5 rounded-xl bg-black/8" />
          </div>

          <div className="border-t border-black/7 px-5 py-9 sm:px-9 lg:px-12">
            <div className="h-4 w-full rounded-full bg-black/6" />
            <div className="mt-4 h-4 w-full rounded-full bg-black/6" />
            <div className="mt-4 h-4 w-4/5 rounded-full bg-black/6" />
            <div className="mt-8 h-4 w-full rounded-full bg-black/6" />
            <div className="mt-4 h-4 w-2/3 rounded-full bg-black/6" />
          </div>

          <div className="flex items-center justify-between border-t border-black/7 bg-[#fbfaf7] px-5 py-4 sm:px-9 lg:px-12">
            <div className="h-9 w-28 rounded-full bg-black/7" />
            <div className="h-9 w-36 rounded-full bg-black/7" />
          </div>
        </div>

        <div className="hidden space-y-3 lg:block">
          <div className="h-36 rounded-2xl border border-black/8 bg-white" />
          <div className="h-52 rounded-2xl border border-black/8 bg-white" />
        </div>
      </div>
    </main>
  );
}