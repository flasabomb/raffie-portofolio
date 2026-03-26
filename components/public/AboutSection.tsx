/* eslint-disable @next/next/no-img-element */
export default function AboutSection() {
  return (
    <section id="about" className="section-bg-grid bg-base py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="font-heading text-xl uppercase tracking-wider text-accent">Behind the Campaigns</p>
            <h2 className="mt-3 font-heading text-5xl text-[var(--text-primary)]">Shaping Brands That Drive Real Results</h2>
            <p className="mt-5 max-w-xl text-muted">
              I combine strategy, creativity, and consistent execution to help brands stand out and grow.
              Every campaign is designed to move metrics, not just impressions.
            </p>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-border bg-surface/50 p-6">
            <p className="text-xl text-[var(--text-primary)]">Building clear positioning and measurable growth for ambitious businesses.</p>
            <a
              href="#contact"
              className="mt-6 inline-flex w-fit rounded-full bg-accent px-6 py-3 font-semibold text-[var(--text-primary)] transition hover:bg-[var(--accent-dark)]"
            >
              Get in touch →
            </a>
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <img
              key={item}
              className="h-56 w-full rounded-2xl object-cover grayscale"
              src={`https://picsum.photos/seed/raffie-${item}/900/600`}
              alt="Decorative portfolio"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
