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
    window.currentCityPoint = ${JSON.stringify(currentCityPoint)};

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

    // Function to create user marker (red - shows user's guess)
    window.createUserMarker = (lngLat) => {
      const userMarkerEl = document.createElement('div');
      userMarkerEl.style.backgroundColor = '#FF3B30'; // Red
      userMarkerEl.style.width = '20px';
      userMarkerEl.style.height = '20px';
      userMarkerEl.style.borderRadius = '50%';
      userMarkerEl.style.border = '2px solid white';
      userMarkerEl.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
      
      window.userMarker = new maplibregl.Marker(userMarkerEl)
        .setLngLat(lngLat)
        .addTo(window.mapInstance);
    };

    // Function to create city marker (blue - shows correct location)
    window.createCityMarker = (cityPoint) => {
      const cityMarkerEl = document.createElement('div');
      cityMarkerEl.style.backgroundColor = '#0077ff'; // Blue
      cityMarkerEl.style.width = '20px';
      cityMarkerEl.style.height = '20px';
      cityMarkerEl.style.borderRadius = '50%';
      cityMarkerEl.style.border = '2px solid white';
      cityMarkerEl.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
      
      window.cityMarker = new maplibregl.Marker(cityMarkerEl)
        .setLngLat([cityPoint.lng, cityPoint.lat])
        .addTo(window.mapInstance);
    };

    // Function to update city marker position
    window.updateCityMarker = (cityPoint) => {
      window.currentCityPoint = cityPoint;
      if (window.cityMarker) {
        window.cityMarker.setLngLat([cityPoint.lng, cityPoint.lat]);
      }
    };

    // Handle map click events
    window.handleMapClick = (e) => {
      window.clearMarkers();

      // Create user marker immediately (red - shows user's guess)
      window.createUserMarker(e.lngLat);

      // Create city marker after delay using current city point (blue - shows correct location)
      setTimeout(() => {
        if (window.currentCityPoint) {
          window.createCityMarker(window.currentCityPoint);

          // Clear both markers after another delay
          setTimeout(() => {
            window.clearMarkers();
          }, ${MARKER_TIMINGS.clearMarkersDelay});
        }
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
