import Image from "next/image";
import { cn } from "@/lib/utils";
import logoImg from "@/assets/logo.png";

interface LogoProps {
  readonly className?: string;
  readonly height?: number;
  readonly width?: number;
}

export function Logo({ className, height = 32, width = 140 }: LogoProps) {
  return (
    <span
      className={cn("relative inline-block", className)}
      style={{ height, width }}
    >
      <Image
        src={logoImg}
        alt="KORACORD"
        fill
        className="object-contain object-left"
        sizes="(max-width: 240px) 120px, 200px"
        priority
      />
    </span>
  );
}
