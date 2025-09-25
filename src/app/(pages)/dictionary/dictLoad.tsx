export default function Loading() {
  return (
    <section className="dark:bg-primary-dark grid-background bg-primary h-dvh w-screen overflow-hidden pt-[80px] transition">
      <div className="relative left-1/2 flex h-full max-w-[1440px] -translate-x-1/2 flex-col items-center justify-center gap-8 px-4">
        <div className="relative flex size-5 animate-spin justify-center">
          <span className="bg-accent dark:bg-accent-dark absolute -bottom-5 size-4 rounded-full" />
          <span className="bg-accent dark:bg-accent-dark absolute -top-5 size-4 rounded-full" />
          <span className="bg-accent dark:bg-accent-dark absolute top-1/2 -left-5 size-4 -translate-y-1/2 rounded-full" />
          <span className="bg-accent dark:bg-accent-dark absolute top-1/2 -right-5 size-4 -translate-y-1/2 rounded-full" />
        </div>
      </div>
    </section>
  );
}
