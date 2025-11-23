"use client";

import dynamic from "next/dynamic";
import { MapViewSkeleton } from "./map-view-skeleton";

const MapView = dynamic(() => import("../map-view-content"), {
  ssr: false,
  loading: () => <MapViewSkeleton />,
});

export default MapView;
