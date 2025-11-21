import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type QualityLevel = "bom" | "moderado" | "ruim" | "péssimo";

export function getQualityColor(level: QualityLevel): string {
  const colorsQuality = {
    bom: "#10b981",
    moderado: "#f59e0b",
    ruim: "#ef4444",
    péssimo: "#7f1d1d",
  } as const;
  return colorsQuality[level as keyof typeof colorsQuality];
}

export function getQualityLabel(level: QualityLevel): string {
  const labels = {
    bom: "Bom",
    moderado: "Moderado",
    ruim: "Ruim",
    péssimo: "Péssimo",
  } as const;
  return labels[level as keyof typeof labels];
}

export function getQualityDescription(level: QualityLevel): string {
  const descriptions = {
    bom: "A qualidade do ar é satisfatória e não representa risco à saúde.",
    moderado:
      "A qualidade do ar é aceitável. Pessoas sensíveis devem considerar limitar atividades ao ar livre.",
    ruim: "Pessoas sensíveis podem experimentar efeitos na saúde. O público em geral não é afetado.",
    péssimo:
      "Alerta de saúde. Todos podem experimentar efeitos mais sérios na saúde.",
  } as const;
  return descriptions[level as keyof typeof descriptions];
}

export function dateToDayName(dateString: string) {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    timeZone: "UTC",
  };
  return date.toLocaleDateString("pt-BR", options);
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
