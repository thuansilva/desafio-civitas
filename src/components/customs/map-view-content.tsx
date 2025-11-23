"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { NeighborhoodWithLatestReading } from "@/core/domain/neighborhood";
import L from "leaflet";

const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapViewProps {
  neighborhoods: NeighborhoodWithLatestReading[];
  onNeighborhoodClick: (neighborhood: NeighborhoodWithLatestReading) => void;
}

export default function MapView({
  neighborhoods,
  onNeighborhoodClick,
}: MapViewProps) {
  const position: [number, number] = [-22.9068, -43.1729];

  return (
    <MapContainer
      center={position}
      zoom={12}
      scrollWheelZoom={true}
      className="h-[500px] w-full rounded-lg z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {neighborhoods.map((neighborhood) => (
        <Marker
          key={neighborhood.id}
          position={[neighborhood.latitude, neighborhood.longitude]}
          eventHandlers={{
            click: () => onNeighborhoodClick(neighborhood),
          }}
        >
          <Popup>
            <div className="font-bold">{neighborhood.name}</div>
            <div>AQI: {neighborhood.latest_reading?.aqi ?? "N/A"}</div>
            <div
              className="text-sm text-blue-600 cursor-pointer hover:underline mt-1"
              onClick={() => onNeighborhoodClick(neighborhood)}
            >
              Ver detalhes
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
