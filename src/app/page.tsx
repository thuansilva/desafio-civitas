"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Map, List, Filter, Wind } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import AirQuality from "@/components/customs/air-quality";
import { NeighborhoodWithLatestReading } from "@/core/domain/neighborhood";
import { QualityLevel } from "@/lib/utils";
import ListNeighborhood from "@/components/customs/list-neighborhood";
import NeighborhoodDetail from "@/components/customs/details-neighborhood";

const MapView = dynamic(() => import("@/components/customs/map-view"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] w-full flex items-center justify-center bg-muted rounded-lg">
      <p className="text-muted-foreground">Carregando mapa...</p>
    </div>
  ),
});

type ViewMode = "map" | "list";

import { useNeighborhoods } from "@/hooks/use-neighborhoods";
import { useNeighborhoodFilter } from "@/hooks/use-neighborhood-filter";

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>("map");
  const [selectedNeighborhood, setSelectedNeighborhood] =
    useState<NeighborhoodWithLatestReading | null>(null);

  const { neighborhoods, loading } = useNeighborhoods();

  const {
    qualityFilter,
    setQualityFilter,
    neighborhoodFilter,
    setNeighborhoodFilter,
    filteredNeighborhoods,
  } = useNeighborhoodFilter(neighborhoods);

  return (
    <div className="min-h-screen bg-muted/40">
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

            <AirQuality neighborhoods={neighborhoods} />
          </div>
        </div>
      </header>
      <Separator />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-6">
          <CardHeader className="p-4 border-b">
            <CardTitle className="flex items-center gap-3 text-lg font-semibold">
              <Filter size={20} className="text-primary" />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <Select
                value={neighborhoodFilter}
                onValueChange={setNeighborhoodFilter}
              >
                <SelectTrigger
                  className="w-full md:w-[200px]"
                  data-testid="neighborhood-select"
                >
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
            </CardContent>
          </Card>
        ) : (
          <>
            {viewMode === "map" ? (
              <MapView
                neighborhoods={filteredNeighborhoods}
                onNeighborhoodClick={setSelectedNeighborhood}
              />
            ) : (
              <ListNeighborhood
                neighborhoods={filteredNeighborhoods}
                onNeighborhoodClick={setSelectedNeighborhood}
              />
            )}
          </>
        )}
      </main>

      {selectedNeighborhood && (
        <NeighborhoodDetail
          neighborhood={selectedNeighborhood}
          onClose={() => setSelectedNeighborhood(null)}
        />
      )}
    </div>
  );
}

export default App;
