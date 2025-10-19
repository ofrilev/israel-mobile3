import { Point } from "../@types";

export interface MarkerConfig {
  color: string;
  scale: number;
}

export interface MarkerTimings {
  cityMarkerDelay: number;
  clearMarkersDelay: number;
}

export const MARKER_CONFIGS = {
  user: {
    color: '#FF3B30',
    scale: 0.8
  } as MarkerConfig,
  city: {
    color: '#0077ff',
    scale: 0.8
  } as MarkerConfig
};

export const MARKER_TIMINGS: MarkerTimings = {
  cityMarkerDelay: 500,
  clearMarkersDelay: 1000
};

export const generateMarkersScript = (currentCityPoint: Point): string => {
  return `
    // Initialize marker variables
    window.userMarker = null;
    window.cityMarker = null;

    // Function to clear all markers
    window.clearMarkers = () => {
      if (window.userMarker) {
        window.userMarker.remove();
        window.userMarker = null;
      }
      if (window.cityMarker) {
        window.cityMarker.remove();
        window.cityMarker = null;
      }
    };

    // Function to create user marker
    window.createUserMarker = (lngLat) => {
      window.userMarker = new maplibregl.Marker(${JSON.stringify(MARKER_CONFIGS.user)})
        .setLngLat(lngLat)
        .addTo(window.mapInstance);
    };

    // Function to create city marker
    window.createCityMarker = (cityPoint) => {
      window.cityMarker = new maplibregl.Marker(${JSON.stringify(MARKER_CONFIGS.city)})
        .setLngLat([cityPoint.lng, cityPoint.lat])
        .addTo(window.mapInstance);
    };

    // Function to update city marker position
    window.updateCityMarker = (cityPoint) => {
      if (window.cityMarker) {
        window.cityMarker.setLngLat([cityPoint.lng, cityPoint.lat]);
      }
    };

    // Handle map click events
    window.handleMapClick = (e) => {
      window.clearMarkers();

      // Create user marker immediately
      window.createUserMarker(e.lngLat);

      // Create city marker after delay
      setTimeout(() => {
        const cityPoint = ${JSON.stringify(currentCityPoint)};
        window.createCityMarker(cityPoint);

        // Clear both markers after another delay
        setTimeout(window.clearMarkers, ${MARKER_TIMINGS.clearMarkersDelay});
      }, ${MARKER_TIMINGS.cityMarkerDelay});

      // Send coordinates to React Native
      const coords = { 
        lat: e.lngLat.lat, 
        lng: e.lngLat.lng
      };
      window.ReactNativeWebView.postMessage(JSON.stringify(coords));
    };

    // Attach click handler to map
    window.mapInstance.on('click', window.handleMapClick);
  `;
};
