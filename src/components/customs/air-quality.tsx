"use client";
import { NeighborhoodWithLatestReading } from "@/core/domain/neighborhood";

const qualityLabels = [
  {
    key: "bom",
    label: "Bom",
    colorClass: "text-green-600",
  },
  {
    key: "moderado",
    label: "Moderado",
    colorClass: "text-yellow-600",
  },
  {
    key: "ruim",
    label: "Ruim",
    colorClass: "text-red-600",
  },
  {
    key: "péssimo",
    label: "Péssimo",
    colorClass: "text-red-900",
  },
] as const;

function AirQuality({
  neighborhoods,
}: {
  neighborhoods: NeighborhoodWithLatestReading[];
}) {
  const qualityStats = {
    bom: neighborhoods.filter((n) => n.latest_reading?.quality_level === "bom")
      .length,
    moderado: neighborhoods.filter(
      (n) => n.latest_reading?.quality_level === "moderado",
    ).length,
    ruim: neighborhoods.filter(
      (n) => n.latest_reading?.quality_level === "ruim",
    ).length,
    péssimo: neighborhoods.filter(
      (n) => n.latest_reading?.quality_level === "péssimo",
    ).length,
  };

  return (
    <div className="hidden md:flex items-center gap-6">
      {qualityLabels.map((item) => (
        <div key={item.key} className="text-center">
          <div className={`text-xl font-bold ${item.colorClass}`}>
            {qualityStats[item.key]}
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <div className="w-2 h-2 rounded-full" />
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AirQuality;
