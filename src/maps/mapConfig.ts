import mergedGeoJSON from "../../assets/merged.json";

export interface MapConfig {
  center: [number, number];
  zoom: number;
  bounds: [number, number, number, number];
  geoJsonData: any;
  layers: LayerConfig[];
  style: MapStyle;
}

export interface LayerConfig {
  id: string;
  type: 'background' | 'fill' | 'line';
  source?: string;
  paint: Record<string, any>;
}

export interface MapStyle {
  baseUrl: string;
  apiKey: string;
}

export const generateMapConfig = (israelBounds: [number, number, number, number]): MapConfig => {
  const center: [number, number] = [
    (israelBounds[0] + israelBounds[2]) / 2, 
    (israelBounds[1] + israelBounds[3]) / 2
  ];

  return {
    center,
    zoom: 5.95,
    bounds: israelBounds,
    geoJsonData: mergedGeoJSON,
    style: {
      baseUrl: 'https://api.maptiler.com/maps/streets/style.json',
      apiKey: '7SdtjsgWznkkvugdE9tE'
    },
    layers: [
      {
        id: 'background',
        type: 'background',
        paint: { 'background-color': 'rgba(255,255,255,0.1)' }
      },
      {
        id: 'israel-fill',
        type: 'fill',
        source: 'israel',
        paint: { 'fill-color': 'rgba(0,0,0,0.8)' }
      },
      {
        id: 'israel-outline',
        type: 'line',
        source: 'israel',
        paint: { 'line-color': '#333', 'line-width': 1.5 }
      }
    ]
  };
};
