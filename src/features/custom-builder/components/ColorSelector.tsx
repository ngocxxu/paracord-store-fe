"use client";

import { cn } from "@/lib/utils";
import { useBuilderStore } from "../store";

const PRESET_COLORS = [
  { id: "black", hex: "#000000" },
  { id: "red", hex: "#dc2626" },
  { id: "blue", hex: "#2563eb" },
  { id: "green", hex: "#16a34a" },
  { id: "yellow", hex: "#ca8a04" },
  { id: "white", hex: "#fafafa" },
];

export function ColorSelector({ className }: { className?: string }) {
  const { selectedColorIds, toggleColor } = useBuilderStore();

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {PRESET_COLORS.map(({ id, hex }) => (
        <button
          key={id}
          type="button"
          aria-pressed={selectedColorIds.includes(id)}
          className={cn(
            "h-10 w-10 rounded-full border-2 transition-colors",
            selectedColorIds.includes(id)
              ? "border-foreground ring-2 ring-offset-2"
              : "border-muted hover:border-foreground/50"
          )}
          style={{ backgroundColor: hex }}
          onClick={() => toggleColor(id)}
        />
      ))}
    </div>
  );
}
