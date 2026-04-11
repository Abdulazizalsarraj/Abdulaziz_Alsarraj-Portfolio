export default function Loading() {
  return (
    <div className="min-h-screen bg-primary">
      <div className="min-h-screen flex items-center justify-center pt-16 px-6">
        <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1 space-y-5">
            <div className="h-4 w-28 bg-secondary/80 rounded-full animate-pulse" />
            <div className="h-14 w-3/4 bg-secondary/80 rounded-xl animate-pulse" />
            <div className="h-8 w-1/2 bg-secondary/60 rounded-xl animate-pulse" />
            <div className="h-20 w-full bg-secondary/40 rounded-xl animate-pulse" />
            <div className="flex gap-4">
              <div className="h-12 w-36 bg-teal-400/20 rounded-2xl animate-pulse" />
              <div className="h-12 w-36 bg-secondary/60 rounded-2xl animate-pulse" />
            </div>
          </div>
          <div className="w-64 h-64 rounded-full bg-secondary/60 animate-pulse shrink-0" />
        </div>
      </div>
    </div>
  );
}
