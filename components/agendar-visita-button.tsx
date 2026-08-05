import Link from "next/link";
import { cn } from "@/lib/utils";
import { buildWhatsAppLink } from "@/lib/whatsapp";

interface AgendarVisitaButtonProps {
  propertyLabel: string;
  className?: string;
  variant?: "solid" | "outline";
}

export function AgendarVisitaButton({
  propertyLabel,
  className,
  variant = "solid",
}: AgendarVisitaButtonProps) {
  const message = `Olá, Téssera! Gostaria de agendar uma visita ao imóvel: ${propertyLabel}.`;

  return (
    <Link
      href={buildWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      data-magnetic
      data-magnetic-color={variant === "solid" ? "#008080" : "#ffffff"}
      className={cn(
        "group relative inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide uppercase transition-colors duration-300",
        variant === "solid"
          ? "bg-teal text-teal-foreground hover:bg-teal"
          : "border border-foreground/25 text-foreground hover:border-foreground/60",
        className,
      )}
    >
      <span>Agendar visita</span>
      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
        &rarr;
      </span>
    </Link>
  );
}
