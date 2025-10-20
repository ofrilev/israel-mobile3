import mergedGeoJSON from '../../assets/merged.json';

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

export const generateMapConfig = (
  israelBounds: [number, number, number, number]
): MapConfig => {
  const center: [number, number] = [
    (israelBounds[0] + israelBounds[2]) / 2,
    (israelBounds[1] + israelBounds[3]) / 2,
  ];

  return {
    center,
    zoom: 5.95,
    bounds: israelBounds,
    geoJsonData: mergedGeoJSON,
    style: {
      baseUrl:
        'data:application/json;charset=utf-8,' +
        encodeURIComponent(
          JSON.stringify({
            version: 8,
            sources: {},
            layers: [],
          })
        ),
      apiKey: '',
    },
    layers: [
      {
        id: 'background',
        type: 'background',
        paint: {
          'background-color': 'rgba(0, 0, 0, 0.001)', // Nearly transparent but present
        },
      },
      {
        id: 'israel-fill',
        type: 'fill',
        source: 'israel',
        paint: {
          'fill-color': '#2E8B57', // Sea green for Israel
          'fill-opacity': 0.18,
        },
      },
      {
        id: 'israel-outline',
        type: 'line',
        source: 'israel',
        paint: {
          'line-color': '#1F4E79', // Dark blue outline
          'line-width': 2,
          'line-opacity': 1.0,
        },
      },
    ],
  };
};
