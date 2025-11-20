"use client";
import { useState, useEffect } from "react";
import { Map, List, Filter, Wind } from "lucide-react";
// Importações de componentes do shadcn/ui
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import AirQuality from "@/components/customs/air-quality";
// Seus componentes e serviços
// import { MapView } from "./components/MapView";
// import { ListView } from "./components/ListView";
// import { NeighborhoodDetail } from "./components/NeighborhoodDetail";
// import { getNeighborhoodsWithLatestReadings } from "./lib/airQualityService";

type ViewMode = "map" | "list";

export type QualityLevel = "bom" | "moderado" | "ruim" | "péssimo";

// const qualityColors: Record = {
//   bom: { color: "text-green-600", bg: "bg-green-100" },
//   moderado: { color: "text-yellow-600", bg: "bg-yellow-100" },
//   ruim: { color: "text-red-600", bg: "bg-red-100" },
//   péssimo: { color: "text-red-900", bg: "bg-red-200" },
// };

export interface AirQualityReading {
  id: string;
  neighborhood_id: string;
  aqi: number;
  pm10: number;
  no2: number;
  co: number;
  quality_level: QualityLevel;
  recorded_at: string;
  created_at: string;
}

export interface Neighborhood {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  created_at: string;
}

export interface NeighborhoodWithLatestReading extends Neighborhood {
  latest_reading?: AirQualityReading;
}

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>("map");
  const [neighborhoods, setNeighborhoods] = useState<
    NeighborhoodWithLatestReading[]
  >([]);
  const [filteredNeighborhoods, setFilteredNeighborhoods] = useState<
    NeighborhoodWithLatestReading[]
  >([]);
  const [selectedNeighborhood, setSelectedNeighborhood] =
    useState<NeighborhoodWithLatestReading | null>(null);
  const [qualityFilter, setQualityFilter] = useState("all");
  const [neighborhoodFilter, setNeighborhoodFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 60000);
    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   applyFilters();
  // }, [neighborhoods, qualityFilter, neighborhoodFilter]);

  const loadData = async () => {
    try {
      const res = await fetch("/api/server/neighborhoods", {
        method: "GET",
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Erro ao buscar dados do servidor fake");
      }
      const data = await res.json();
      setNeighborhoods(data);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  // const applyFilters = () => {
  //   let filtered = [...neighborhoods];

  //   if (qualityFilter !== "all") {
  //     filtered = filtered.filter(
  //       (n) => n.latest_reading?.quality_level === qualityFilter
  //     );
  //   }

  //   if (neighborhoodFilter !== "all") {
  //     filtered = filtered.filter((n) => n.id === neighborhoodFilter);
  //   }

  //   setFilteredNeighborhoods(filtered);
  // };

  // const qualityStats = {
  //   bom: neighborhoods.filter((n) => n.latest_reading?.quality_level === "bom")
  //     .length,
  //   moderado: neighborhoods.filter(
  //     (n) => n.latest_reading?.quality_level === "moderado"
  //   ).length,
  //   ruim: neighborhoods.filter(
  //     (n) => n.latest_reading?.quality_level === "ruim"
  //   ).length,
  //   péssimo: neighborhoods.filter(
  //     (n) => n.latest_reading?.quality_level === "péssimo"
  //   ).length,
  // };

  // const qualityLabels = [
  //   {
  //     key: "bom",
  //     label: "Bom",
  //     colorClass: "text-green-600",
  //     dotColor: "bg-green-500",
  //   },
  //   {
  //     key: "moderado",
  //     label: "Moderado",
  //     colorClass: "text-yellow-600",
  //     dotColor: "bg-yellow-500",
  //   },
  //   {
  //     key: "ruim",
  //     label: "Ruim",
  //     colorClass: "text-red-600",
  //     dotColor: "bg-red-500",
  //   },
  //   {
  //     key: "péssimo",
  //     label: "Péssimo",
  //     colorClass: "text-red-900",
  //     dotColor: "bg-red-900",
  //   },
  // ] as const;

  return (
    <div className="min-h-screen bg-muted/40">
      {/* Header atualizado com Card/Badge/Divs simples */}
      <header className="sticky top-0 z-10 w-full border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Wind size={32} className="text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Painel de Qualidade do Ar
                </h1>
                <p className="text-sm text-gray-600">
                  Rio de Janeiro - Monitoramento em tempo real
                </p>
              </div>
            </div>

            {/* Estatísticas de Qualidade (usando Badge ou divs simples estilizadas) */}
            <AirQuality neighborhoods={neighborhoods} />
            {/* <div className="hidden md:flex items-center gap-6">
              {qualityLabels.map((item) => (
                <div key={item.key} className="text-center">
                  <div className={`text-xl font-bold ${item.colorClass}`}>
                    {qualityStats[item.key]}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <div
                      className="w-2 h-2 rounded-full"
                      // style={{
                      //   backgroundColor:
                      //     item.dotColor.split("-").pop() === "900"
                      //       ? "#7f1d1d"
                      //       : item.dotColor.split("-").pop() === "500"
                      //         ? item.dotColor.replace("bg-", "")
                      //         : item.dotColor.replace("bg-", ""),
                      // }}
                    />
                    {item.label}
                  </div>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </header>
      <Separator />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Card para Filtros e Visualização */}

        <Card className="mb-6">
          <CardHeader className="p-4 border-b">
            <CardTitle className="flex items-center gap-3 text-lg font-semibold">
              <Filter size={20} className="text-primary" />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Select para Bairro */}
              <Select
                value={neighborhoodFilter}
                onValueChange={setNeighborhoodFilter}
              >
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Selecione um bairro" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os bairros</SelectItem>
                  <Separator />
                  {neighborhoods
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((n) => (
                      <SelectItem key={n.id} value={n.id}>
                        {n.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              {/* Select para Qualidade */}
              <Select
                value={qualityFilter}
                onValueChange={(val) =>
                  setQualityFilter(val as QualityLevel | "all")
                }
              >
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Qualidade do Ar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as qualidades</SelectItem>
                  <SelectItem value="bom">Bom</SelectItem>
                  <SelectItem value="moderado">Moderado</SelectItem>
                  <SelectItem value="ruim">Ruim</SelectItem>
                  <SelectItem value="péssimo">Péssimo</SelectItem>
                </SelectContent>
              </Select>

              {/* Toggle Group (substituindo o div customizado) */}
              <div className="flex bg-muted rounded-md p-1">
                <Toggle
                  pressed={viewMode === "map"}
                  onPressedChange={(pressed) => pressed && setViewMode("map")}
                  className="rounded-r-none"
                  aria-label="Alternar para Mapa"
                >
                  <Map size={18} className="mr-2" />
                  Mapa
                </Toggle>
                <Toggle
                  pressed={viewMode === "list"}
                  onPressedChange={(pressed) => pressed && setViewMode("list")}
                  className="rounded-l-none border-l border-input"
                  aria-label="Alternar para Lista"
                >
                  <List size={18} className="mr-2" />
                  Lista
                </Toggle>
              </div>
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
              Exibindo **{filteredNeighborhoods.length}** de **
              {neighborhoods.length}** bairros
            </div>
          </CardContent>
        </Card>

        {/* Conteúdo Principal (Mapa ou Lista) */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-xl shadow-md">
            <Wind
              size={48}
              className="text-blue-600 animate-spin mx-auto mb-4"
            />
            <p className="text-gray-600">Carregando dados...</p>
          </div>
        ) : filteredNeighborhoods.length === 0 ? (
          <Card className="p-12 text-center">
            <CardContent>
              <p className="text-gray-600">
                Nenhum bairro encontrado com os filtros selecionados
              </p>
              <Button
                onClick={() => {
                  setQualityFilter("all");
                  setNeighborhoodFilter("all");
                }}
                className="mt-4"
              >
                Limpar Filtros
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* {viewMode === "map" ? (
              <MapView
                neighborhoods={filteredNeighborhoods}
                onNeighborhoodClick={setSelectedNeighborhood}
              />
            ) : (
              <ListView
                neighborhoods={filteredNeighborhoods}
                onNeighborhoodClick={setSelectedNeighborhood}
              />
            )} */}
          </>
        )}
      </main>

      {/* Detalhe do Bairro (Mantenha o componente original, mas considere usar um shadcn Dialog/Drawer se for um modal) */}
      {/* {selectedNeighborhood && (
        <NeighborhoodDetail
          neighborhood={selectedNeighborhood}
          onClose={() => setSelectedNeighborhood(null)}
        />
      )} */}
    </div>
  );
}

export default App;
