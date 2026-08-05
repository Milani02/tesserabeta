export function AmenitiesMarquee({ items }: { items: string[] }) {
  return (
    <div
      className="group relative mt-14 overflow-hidden border-y border-foreground/10 py-8"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <ul
        aria-hidden
        className="flex w-max animate-marquee items-center gap-12 group-hover:[animation-play-state:paused] motion-reduce:animate-none"
      >
        {[...items, ...items].map((amenity, index) => (
          <li
            key={index}
            className="flex items-center gap-3 whitespace-nowrap font-display text-xl text-foreground/85 sm:text-2xl"
          >
            <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
            {amenity}
          </li>
        ))}
      </ul>

      <ul className="sr-only">
        {items.map((amenity) => (
          <li key={amenity}>{amenity}</li>
        ))}
      </ul>
    </div>
  );
}
