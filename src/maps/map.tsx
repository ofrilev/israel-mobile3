import { Point } from '../@types';
import { generateMapConfig, MapConfig } from './mapConfig';
import { generateMarkersScript } from './markers';

interface MapHtmlProps {
  currentCityPoint: Point;
  israelBounds: [number, number, number, number];
}

export const renderMapHtml = ({
  currentCityPoint,
  israelBounds,
}: MapHtmlProps): string => {
  // Pre-calculate all map configuration
  const mapConfig: MapConfig = generateMapConfig(israelBounds);

  // Generate the map initialization script
  const mapScript = `
    // Initialize map with pre-calculated configuration
    window.mapInstance = new maplibregl.Map({
      container: 'map',
      style: '${mapConfig.style.baseUrl}',
      center: [${mapConfig.center[0]}, ${mapConfig.center[1]}],
      zoom: ${mapConfig.zoom}
    });

    // Pre-calculated map setup
    window.mapInstance.on('load', () => {
      // Starting with blank style, no existing layers to hide

      // Add background layer first (nearly transparent)
      ${mapConfig.layers
        .filter(layer => layer.type === 'background')
        .map(
          layer => `
        window.mapInstance.addLayer({
          id: '${layer.id}',
          type: '${layer.type}',
          paint: ${JSON.stringify(layer.paint)}
        });`
        )
        .join('')}

      // Add GeoJSON source once
      window.mapInstance.addSource('israel', {
        type: 'geojson',
        data: ${JSON.stringify(mapConfig.geoJsonData)}
      });

      // Add other layers (fill, line, etc.)
      ${mapConfig.layers
        .filter(layer => layer.type !== 'background')
        .map(
          layer => `
        window.mapInstance.addLayer({
          id: '${layer.id}',
          type: '${layer.type}',
          source: '${layer.source}',
          paint: ${JSON.stringify(layer.paint)}
        });`
        )
        .join('')}
    });

    ${generateMarkersScript(currentCityPoint)}
  `;

  // Generate CSS styles with transparent background
  const styles = `
    html, body {
      height: 100%;
      width: 100%;
      margin: 0;
      padding: 0;
      background: transparent;
    }
    #map {
      height: 100%;
      width: 100%;
      margin: 0;
      padding: 0;
      background: transparent !important;
    }
    .maplibregl-canvas-container {
      background: transparent !important;
    }
    .maplibregl-canvas {
      background: transparent !important;
    }
  `;

  // Return complete HTML as string template
  return `<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://unpkg.com/maplibre-gl@4.0.0/dist/maplibre-gl.js"></script>
    <link href="https://unpkg.com/maplibre-gl@4.0.0/dist/maplibre-gl.css" rel="stylesheet">
    <style>${styles}</style>
  </head>
  <body>
    <div id="map"></div>
    <script>${mapScript}</script>
  </body>
</html>`;
};
