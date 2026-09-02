export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="border-b border-border bg-gradient-brand">
      <div className="mx-auto max-w-6xl px-5 py-10 text-primary-foreground sm:py-12">
        <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-medium tracking-wide uppercase">
          {eyebrow}
        </span>
        <h1 className="font-display mt-4 max-w-2xl text-3xl font-semibold sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-sm/relaxed opacity-90">{description}</p>
      </div>
    </header>
  );
}
