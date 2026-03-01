import { cn } from "@/lib/utils";

interface TopBarProps {
  text: string;
}

export function TopBar({ text }: TopBarProps) {
  return (
    <div
      className={cn(
        "bg-[#1a1918] py-2 text-center text-xs font-medium uppercase tracking-widest-custom text-brand-text-medium"
      )}
      role="region"
      aria-label="Announcement"
    >
      {text}
    </div>
  );
}
