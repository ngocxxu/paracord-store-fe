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
  const { innerCoreColorId, setInnerCoreColorId } = useBuilderStore();

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {PRESET_COLORS.map(({ id, hex }) => (
        <button
          key={id}
          type="button"
          aria-pressed={innerCoreColorId === id}
          className={cn(
            "h-10 w-10 rounded-full border-2 transition-colors",
            innerCoreColorId === id
              ? "border-brand-accent ring-2 ring-brand-accent ring-offset-2 ring-offset-brand-bg-primary"
              : "border-brand-border hover:border-brand-text-medium"
          )}
          style={{ backgroundColor: hex }}
          onClick={() => setInnerCoreColorId(id)}
        />
      ))}
    </div>
  );
}
