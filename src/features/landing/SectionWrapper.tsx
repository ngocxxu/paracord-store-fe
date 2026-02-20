import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  variant?: "primary" | "surface";
  className?: string;
  ariaLabel?: string;
}

export function SectionWrapper({
  children,
  variant = "primary",
  className,
  ariaLabel,
}: SectionWrapperProps) {
  return (
    <section
      className={cn(
        "w-full",
        variant === "surface" && "bg-brand-bg-surface",
        variant === "primary" && "bg-brand-bg-primary",
        className
      )}
      aria-label={ariaLabel}
    >
      <div className="container mx-auto px-4 py-12 md:py-16">{children}</div>
    </section>
  );
}
