import { cn } from "@/lib/utils";

export function Footer({ lang }: { lang: string }) {
  return (
    <footer className={cn("border-t py-6")}>
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        Paracord Store — {lang}
      </div>
    </footer>
  );
}
