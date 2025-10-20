import React, { useEffect, useRef, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { IsraelOnlyMapProps, Point } from '../../src/@types';
import { renderMapHtml } from './map';

// Memoized component to prevent re-renders when currentCityPoint changes
const IsraelOnlyMapComponent: React.FC<IsraelOnlyMapProps> = ({
  onMapClick,
  currentCityPoint,
  mapRef,
}: IsraelOnlyMapProps) => {
  const webViewRef = useRef<WebView>(null);
  const prevCityPoint = useRef<Point>(currentCityPoint);

  // Handle initial marker setup and updates
  useEffect(() => {
    if (currentCityPoint !== prevCityPoint.current) {
      prevCityPoint.current = currentCityPoint;
      webViewRef.current?.injectJavaScript(`
        if (window.updateCityMarker) {
          window.updateCityMarker(${JSON.stringify(currentCityPoint)});
        }
      `);
    }
  }, [currentCityPoint]);

  // Set initial marker when WebView loads
  const handleWebViewLoad = () => {
    // Small delay to ensure map is fully initialized
    setTimeout(() => {
      webViewRef.current?.injectJavaScript(`
        if (window.updateCityMarker) {
          window.updateCityMarker(${JSON.stringify(currentCityPoint)});
        }
      `);
    }, 500);
  };

  // Memoize the HTML generation to prevent re-creation on every render
  const israelBounds: [number, number, number, number] = [
    34.2, 29.4, 35.9, 33.5,
  ];
  const html = useMemo(() => {
    // Generate HTML without currentCityPoint to make it static
    return renderMapHtml({
      currentCityPoint: { lat: 0, lng: 0 }, // Use dummy point, will be updated via JavaScript
      israelBounds,
    });
  }, [israelBounds]); // Only re-generate if bounds change

  // When a message (click) is received from the WebView
  const handleMessage = (event: any) => {
    try {
      const coords = JSON.parse(event.nativeEvent.data);
      onMapClick?.(coords);
    } catch (err) {
      console.warn('Failed to parse click event', err);
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={mapRef as any}
        originWhitelist={['*']}
        source={{ html }}
        style={styles.webview}
        onMessage={handleMessage}
        onLoad={handleWebViewLoad}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowFileAccess={true}
        allowUniversalAccessFromFileURLs={true}
        allowFileAccessFromFileURLs={true}
        mixedContentMode="always"
        scalesPageToFit={true}
        backgroundColor="rgba(255, 255, 255, 0.01)"
        opacity={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: 400,
    backgroundColor: 'rgba(255, 255, 255, 0.01)',
    minHeight: 400,
  },
  webview: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.01)',
    minHeight: 400,
  },
});

// Export memoized version to prevent re-renders when only currentCityPoint changes
export const IsraelOnlyMap = React.memo(
  IsraelOnlyMapComponent,
  (prevProps, nextProps) => {
    // Only re-render if onMapClick or mapRef changes
    // currentCityPoint changes are handled via JavaScript injection, not re-renders
    return (
      prevProps.onMapClick === nextProps.onMapClick &&
      prevProps.mapRef === nextProps.mapRef &&
      prevProps.gamePhase === nextProps.gamePhase
    );
  }
);

export default IsraelOnlyMap;
