// import type { NeighborhoodWithLatestReading } from "../lib/database.types";
// import { getQualityColor, getQualityLabel } from "../lib/airQualityService";
import { NeighborhoodWithLatestReading, QualityLevel } from "@/app/page";
import { MapPin, Wind, Activity } from "lucide-react";

interface ListViewProps {
  neighborhoods: NeighborhoodWithLatestReading[];
  onNeighborhoodClick: (neighborhood: NeighborhoodWithLatestReading) => void;
}

function ListView({ neighborhoods, onNeighborhoodClick }: ListViewProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  function getQualityColor(level: QualityLevel): string {
    const colorsQuality = {
      bom: "#10b981",
      moderado: "#f59e0b",
      ruim: "#ef4444",
      péssimo: "#7f1d1d",
    };
    return colorsQuality[level];
  }

  function getQualityLabel(level: QualityLevel): string {
    const labels = {
      bom: "Bom",
      moderado: "Moderado",
      ruim: "Ruim",
      péssimo: "Péssimo",
    };
    return labels[level];
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {neighborhoods.map((neighborhood) => {
        const reading = neighborhood.latest_reading;
        const color = reading
          ? getQualityColor(reading.quality_level)
          : "#94a3b8";
        const label = reading
          ? getQualityLabel(reading.quality_level)
          : "Sem dados";

        return (
          <button
            key={neighborhood.id}
            onClick={() => onNeighborhoodClick(neighborhood)}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-5 text-left group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <MapPin size={20} className="text-gray-600" />
                <h3 className="font-semibold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
                  {neighborhood.name}
                </h3>
              </div>
              {reading && (
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
              )}
            </div>

            {reading ? (
              <>
                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Qualidade</span>
                    <span
                      className="text-sm font-semibold px-2 py-1 rounded"
                      style={{
                        backgroundColor: `${color}20`,
                        color: color,
                      }}
                    >
                      {label}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Activity size={14} className="text-gray-500" />
                      <span className="text-sm text-gray-600">AQI</span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">
                      {reading.aqi}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Wind size={14} className="text-gray-500" />
                      <span className="text-sm text-gray-600">PM10</span>
                    </div>
                    <span className="text-sm text-gray-700">
                      {reading.pm10.toFixed(1)} µg/m³
                    </span>
                  </div>
                </div>

                <div className="text-xs text-gray-500 pt-2 border-t">
                  Atualizado: {formatDate(reading.recorded_at)}
                </div>
              </>
            ) : (
              <div className="text-sm text-gray-500 py-4 text-center">
                Nenhuma leitura disponível
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default ListView;
