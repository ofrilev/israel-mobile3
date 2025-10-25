import React, { useEffect, useRef, useState, useCallback } from 'react';
import { StyleSheet, View, LayoutChangeEvent } from 'react-native';
import Mapbox, { Camera, MapView, PointAnnotation } from '@rnmapbox/maps';
import { IsraelOnlyMapProps, Point } from '../../src/@types';
import {
  generateIsraelMapStyle,
  ISRAEL_BOUNDS,
  ISRAEL_MAX_BOUNDS,
} from './mapConfig';

// Use MapLibre backend (no token)
Mapbox.setAccessToken(null);

const IsraelOnlyMapComponent: React.FC<IsraelOnlyMapProps> = ({
  onMapClick,
  currentCityPoint,
  mapRef,
}: IsraelOnlyMapProps) => {
  const mapViewRef = useRef<any>(null);
  const userMarkerRef = useRef<any>(null);
  const cityMarkerRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
  const [showUserMarker, setShowUserMarker] = useState(false);
  const [showCityMarker, setShowCityMarker] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [layout, setLayout] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const [userMarkerCoords, setUserMarkerCoords] = useState<[number, number]>([
    0, 0,
  ]);
  const [cityMarkerCoords, setCityMarkerCoords] = useState<[number, number]>([
    0, 0,
  ]);

  const CENTER_COORDINATE: [number, number] = [
    (ISRAEL_BOUNDS[0] + ISRAEL_BOUNDS[2]) / 2,
    (ISRAEL_BOUNDS[1] + ISRAEL_BOUNDS[3]) / 2,
  ];
  const MIN_ZOOM = 6.0;

  /** 🔁 Layout listener — handle dynamic map container sizing */
  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setLayout({ width, height });
  };

  /** 🗺️ Dynamically fit camera once layout is known */
  useEffect(() => {
    if (layout && cameraRef.current) {
      const padding = Math.min(layout.width, layout.height) * 0.1;
      cameraRef.current.fitBounds(
        [ISRAEL_BOUNDS[0], ISRAEL_BOUNDS[1]],
        [ISRAEL_BOUNDS[2], ISRAEL_BOUNDS[3]],
        padding,
        0
      );
    }
  }, [layout]);

  /** 🎯 Update city marker when props change */
  useEffect(() => {
    if (
      currentCityPoint &&
      (currentCityPoint.lat !== 0 || currentCityPoint.lng !== 0)
    ) {
      setCityMarkerCoords([currentCityPoint.lng, currentCityPoint.lat]);
    }
  }, [currentCityPoint]);

  /** 📡 Camera behavior */
  const handleCameraChanged = useCallback(
    (event: any) => {
      const zoom = event.properties.zoom;

      // Lock panning below threshold
      if (zoom > MIN_ZOOM && !scrollEnabled) {
        setScrollEnabled(true);
      } else if (zoom <= MIN_ZOOM && scrollEnabled) {
        setScrollEnabled(false);
      }

      // Auto recentre at min zoom
      if (zoom <= MIN_ZOOM + 0.05 && cameraRef.current) {
        cameraRef.current.setCamera({
          centerCoordinate: CENTER_COORDINATE,
          zoomLevel: MIN_ZOOM,
          animationDuration: 800,
        });
      }
    },
    [scrollEnabled]
  );

  /** 👆 Handle clicks and delayed marker display */
  const handleMapPress = useCallback(
    (feature: any) => {
      const { geometry } = feature;
      if (!geometry?.coordinates) return;

      const [lng, lat] = geometry.coordinates;
      const clickPoint: Point = { lat, lng };

      setShowUserMarker(false);
      setShowCityMarker(false);

      setUserMarkerCoords([lng, lat]);
      setShowUserMarker(true);

      setTimeout(() => {
        if (
          currentCityPoint &&
          (currentCityPoint.lat !== 0 || currentCityPoint.lng !== 0)
        ) {
          setCityMarkerCoords([currentCityPoint.lng, currentCityPoint.lat]);
          setShowCityMarker(true);

          setTimeout(() => {
            setShowUserMarker(false);
            setShowCityMarker(false);
          }, 1000);
        }
      }, 500);

      onMapClick?.(clickPoint);
    },
    [currentCityPoint, onMapClick]
  );

  const mapStyle = generateIsraelMapStyle();

  return (
    <View style={styles.container} onLayout={onLayout}>
      <MapView
        ref={ref => {
          mapViewRef.current = ref;
          if (mapRef) (mapRef as any).current = ref;
        }}
        surfaceView
        style={styles.map}
        styleJSON={JSON.stringify(mapStyle)}
        onPress={handleMapPress}
        zoomEnabled
        pitchEnabled={false}
        rotateEnabled={false}
        logoEnabled={false}
        attributionEnabled={false}
        compassEnabled={false}
        scaleBarEnabled={false}
        onCameraChanged={handleCameraChanged}
        scrollEnabled={scrollEnabled}
      >
        <Camera
          ref={cameraRef}
          centerCoordinate={CENTER_COORDINATE}
          minZoomLevel={MIN_ZOOM}
          maxZoomLevel={12}
          maxBounds={{
            ne: ISRAEL_MAX_BOUNDS.ne,
            sw: ISRAEL_MAX_BOUNDS.sw,
          }}
          zoomLevel={6.0}
          animationDuration={0}
        />

        {showUserMarker && (
          <PointAnnotation
            ref={userMarkerRef}
            id="user-marker"
            coordinate={userMarkerCoords}
          >
            <View style={styles.userMarker} />
          </PointAnnotation>
        )}

        {showCityMarker && (
          <PointAnnotation
            ref={cityMarkerRef}
            id="city-marker"
            coordinate={cityMarkerCoords}
          >
            <View style={styles.cityMarker} />
          </PointAnnotation>
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '70%',
    minHeight: 400,
    backgroundColor: 'transparent',
  },
  map: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  userMarker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FF3B30',
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  cityMarker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#0077ff',
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
});

export const IsraelOnlyMap = React.memo(
  IsraelOnlyMapComponent,
  (prev, next) =>
    prev.onMapClick === next.onMapClick &&
    prev.mapRef === next.mapRef &&
    prev.gamePhase === next.gamePhase
);

export default IsraelOnlyMap;
