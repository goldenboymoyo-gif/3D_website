const GRADIENTS = [
  'from-crimson/30 via-base to-surface',
  'from-surface via-base to-crimson/20',
  'from-crimson/25 via-surface to-base',
  'from-base via-surface to-crimson/25',
];

export default function ProjectThumb({ title, category, image, index = 0 }) {
  const gradient = GRADIENTS[index % GRADIENTS.length];
  const initial = title.trim().charAt(0).toUpperCase();

  return (
    <div className={`relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br ${gradient} border-b border-white/10`}>
      <div className="absolute top-0 left-0 right-0 h-7 bg-black/30 flex items-center gap-1.5 px-3 z-10">
        <span className="w-2 h-2 rounded-full bg-white/20" />
        <span className="w-2 h-2 rounded-full bg-white/20" />
        <span className="w-2 h-2 rounded-full bg-white/20" />
      </div>
      {image ? (
        <img
          src={image}
          alt={`${title} screenshot`}
          className="absolute inset-0 w-full h-full object-cover object-top"
          loading="lazy"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      ) : null}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 pt-4">
        <div className="font-display text-5xl text-white/15 select-none">{initial}</div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-muted/70">{category}</div>
      </div>
    </div>
  );
}
