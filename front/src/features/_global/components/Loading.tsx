import { cn } from "@/lib/utils";

interface LoadingDotsProps {
  color?: string;
  size?: number;
  className?: string;
}

export function Loading({
  color = "currentColor",
  size = 12,
  className,
}: LoadingDotsProps) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      {[0, 1, 2].map((index) => (
        <span
          key={index}
          className={cn("mx-0.5 h-2 w-2 rounded-full", "animate-loading-dots")}
          style={{
            backgroundColor: color,
            width: size,
            height: size,
            animationDelay: `${index * 0.15}s`,
          }}
        />
      ))}
      <span className="sr-only">Cargando...</span>
    </span>
  );
}
