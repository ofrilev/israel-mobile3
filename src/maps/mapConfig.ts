import mergedGeoJSON from '../../assets/merged.json';

export interface MapConfig {
  center: [number, number];
  zoom: number;
  bounds: [number, number, number, number];
  geoJsonData: any;
  style: MapStyle;
}

export interface MapStyle {
  version: number;
  sources: Record<string, any>;
  layers: LayerConfig[];
}

export interface LayerConfig {
  id: string;
  type: 'background' | 'fill' | 'line' | 'raster';
  sourceLayer?: string;
  source?: string;
  paint: Record<string, any>;
  filter?: any[];
}

/**
 * Generates a MapLibre style that renders only inside Israel's polygon,
 * with the rest of the world fully transparent.
 */
export const generateMapConfig = (
  israelBounds: [number, number, number, number]
): MapConfig => {
  const center: [number, number] = [
    (israelBounds[0] + israelBounds[2]) / 2,
    (israelBounds[1] + israelBounds[3]) / 2,
  ];

  // Flatten Israel polygons for the worldMask “hole”
  const combinedCoordinates = mergedGeoJSON.features
    .map((geometry: any) => geometry.geometry.coordinates)
    .flat();

  return {
    center,
    zoom: 5.95,
    bounds: israelBounds,

    geoJsonData: mergedGeoJSON,
    style: {
      version: 8,
      sources: {
        israel: {
          type: 'geojson',
          data: mergedGeoJSON,
        },
        terrainSource: {
          type: 'raster',
          tiles: ['https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'],
          tileSize: 256,
          maxzoom: 20,
        },
        // ⚠️ Do not modify worldMask: outer world polygon + inner Israel hole
        worldMask: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'Polygon',
                  coordinates: [
                    // Outer ring (covers entire world)
                    [
                      [-180, -85],
                      [180, -85],
                      [180, 85],
                      [-180, 85],
                      [-180, -85],
                    ],
                    // Inner ring (Israel boundaries → “hole”)
                    ...combinedCoordinates,
                  ],
                },
              },
            ],
          },
        },
      },
      layers: [
        // 🗺️ Base terrain imagery (Google satellite tiles)
        {
          id: 'terrain-raster',
          type: 'raster',
          source: 'terrainSource',
          paint: {
            'raster-opacity': 1.0,
          },
        },

        // 🧩 Transparent mask outside Israel (lets background show through)
        {
          id: 'outside-mask',
          type: 'fill',
          source: 'worldMask',
          paint: {
            'fill-color': [
              'interpolate',
              ['linear'],
              ['zoom'],
              0,
              '#4FC3F7',
              10,
              '#E0F7FA',
              20,
              '#FFFFFF',
            ],
          },
        },

        // ✏️ Israel outline (optional visual border)
        {
          id: 'israel-outline',
          type: 'line',
          source: 'israel',
          paint: {
            'line-color': '#1F4E79',
            'line-width': 1.5,
            'line-opacity': 0.8,
          },
        },
      ],
    },
  };
};

// 🇮🇱 Default Israel bounds
export const ISRAEL_BOUNDS: [number, number, number, number] = [
  34.2, 29.4, 35.9, 33.5,
];
export const ISRAEL_MAX_BOUNDS: { ne: [number, number]; sw: [number, number] } =
  {
    ne: [34.2, 29.4],
    sw: [35.9, 33.5],
  };

// Export ready-to-use MapLibre style
export const generateIsraelMapStyle = (): MapStyle => {
  return generateMapConfig(ISRAEL_BOUNDS).style;
};
