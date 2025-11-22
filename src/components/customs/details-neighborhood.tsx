"use client";

import { useEffect, useState } from "react";
import { MapPin, Clock, Cloud, AlertCircle, Info } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { AirQualityReading, NeighborhoodWithLatestReading } from "@/app/page";
import {
  formatDate,
  getQualityColor,
  getQualityDescription,
  getQualityLabel,
} from "@/lib/utils";
import ChartNeighborhood from "./chart-detail";
import { fetchNeighborhoodReadings } from "@/http/api-detail";

interface NeighborhoodDetailProps {
  neighborhood: NeighborhoodWithLatestReading;
  onClose: () => void;
}

function NeighborhoodDetail({
  neighborhood,
  onClose,
}: NeighborhoodDetailProps) {
  const [readings, setReadings] = useState<AirQualityReading[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReadings = async () => {
      try {
        const data = await fetchNeighborhoodReadings(neighborhood.id);
        setReadings(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadReadings();
  }, [neighborhood.id]);

  const latestReading = neighborhood.latest_reading;

  const color = latestReading
    ? getQualityColor(latestReading.quality_level)
    : "hsl(215 20.2% 65.1%)";
  const label = latestReading
    ? getQualityLabel(latestReading.quality_level)
    : "Sem dados";
  const description = latestReading
    ? getQualityDescription(latestReading.quality_level)
    : "Aguardando novos dados.";

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="px-4 sm:px-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl font-bold">
            <MapPin size={24} className="text-blue-600" />
            {neighborhood.name}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Detalhes da Qualidade do Ar para {neighborhood.name}
          </DialogDescription>
        </DialogHeader>

        <div className="h-[80vh] overflow-y-auto rounded-md [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {loading ? (
            <div className="text-center py-12 text-gray-500">
              Carregando dados...
            </div>
          ) : latestReading ? (
            <>
              <Card
                className="relative overflow-hidden mb-6"
                style={{
                  borderLeft: `4px solid ${color}`,
                  backgroundColor: `${color}10`,
                }}
              >
                <CardHeader className="pb-3 flex flex-row justify-between items-start">
                  <div>
                    <CardTitle className="text-sm font-semibold text-muted-foreground mb-1">
                      Qualidade do Ar Atual
                    </CardTitle>
                    <div className="text-3xl font-bold mb-2" style={{ color }}>
                      <Badge
                        variant="outline"
                        style={{
                          backgroundColor: color,
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        {label}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <CardTitle className="text-sm font-semibold text-muted-foreground mb-1">
                      Índice AQI
                    </CardTitle>
                    <div className="text-4xl font-extrabold text-foreground">
                      {latestReading.aqi}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{description}</CardDescription>
                </CardContent>
                <CardFooter className="pt-2">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock size={12} />
                    Atualizado em {formatDate(latestReading.recorded_at)}
                  </p>
                </CardFooter>
              </Card>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">
                  Poluentes Medidos
                </h3>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 sm:gap-4">
                  {[
                    {
                      icon: Cloud,
                      label: "PM10",
                      value: latestReading.pm10,
                      unit: "µg/m³",
                    },
                    {
                      icon: AlertCircle,
                      label: "CO",
                      value: latestReading.co,
                      unit: "mg/m³",
                    },
                  ].map((pollutant) => (
                    <div
                      key={pollutant.label}
                      className="bg-gray-50 rounded-lg p-5"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <pollutant.icon size={16} className="text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">
                          {pollutant.label}
                        </span>
                      </div>
                      <div className="text-xl font-bold text-gray-900">
                        {pollutant.value.toFixed(1)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {pollutant.unit}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {!loading && readings.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">Histórico AQI</h3>
                  <Card>
                    <ChartNeighborhood readingsObject={readings} />
                  </Card>
                  <Separator className="my-6" />

                  <Card className="bg-blue-50/50 border-blue-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-semibold text-blue-800 flex items-center gap-2">
                        <Info size={16} />
                        Legenda de Qualidade
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                        {[
                          { level: "bom" as const, range: "0-50" },
                          { level: "moderado" as const, range: "51-100" },
                          { level: "ruim" as const, range: "101-150" },
                          { level: "péssimo" as const, range: "151+" },
                        ].map((item) => (
                          <div
                            key={item.level}
                            className="flex items-center gap-2"
                          >
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{
                                backgroundColor: getQualityColor(item.level),
                              }}
                            />
                            <div className="text-sm">
                              <div className="font-medium text-foreground">
                                {getQualityLabel(item.level)}
                              </div>
                              <div className="text-muted-foreground text-xs">
                                {item.range} AQI
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              Nenhum dado disponível para este bairro
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default NeighborhoodDetail;
