import { Navigation } from "./Navigation";
import { cn } from "@/lib/utils";

export function Header({ lang }: { lang: string }) {
  return (
    <header className={cn("border-b bg-background")}>
      <div className="container mx-auto flex h-14 items-center px-4">
        <Navigation lang={lang} />
      </div>
    </header>
  );
}
