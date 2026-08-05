export function SiteFooter() {
  return (
    <footer className="border-t border-foreground/10 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-xs text-muted-foreground sm:flex-row sm:px-10">
        <span>&copy; {new Date().getFullYear()} Téssera Negócios Imobiliários &middot; CRECI 8380J</span>
        <span className="font-mono-data">tessera.imb.br</span>
      </div>
    </footer>
  );
}
