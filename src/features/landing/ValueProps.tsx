import { Hand, Ruler, Layers, Link } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LandingDict } from "./types";

const VALUE_ICONS = [Hand, Ruler, Layers, Link] as const;

interface ValuePropsProps {
  items: LandingDict["valueProps"];
}

export function ValueProps({ items }: ValuePropsProps) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, i) => {
        const Icon = VALUE_ICONS[i] ?? Hand;
        return (
          <div
            key={i}
            className="flex flex-col items-center text-center"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center text-brand-accent">
              <Icon className="h-8 w-8" aria-hidden />
            </div>
            <h3 className="font-heading text-lg font-bold uppercase tracking-tight text-brand-text-high">
              {item.title}
            </h3>
            <p className="mt-2 text-sm text-brand-text-medium">
              {item.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
