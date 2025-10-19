import React, { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import { IsraelOnlyMapProps, Point } from "../../src/@types";
import { renderMapHtml } from "./map";

export const IsraelOnlyMap: React.FC<IsraelOnlyMapProps> = ({
  onMapClick,
  currentCityPoint,
  mapRef,
}: IsraelOnlyMapProps) => {
  const webViewRef = useRef<WebView>(null);
  const prevCityPoint = useRef<Point>(currentCityPoint);

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

  const israelBounds: [number, number, number, number] = [34.2, 29.4, 35.9, 33.5];
  const html = renderMapHtml({
    currentCityPoint,
    israelBounds
  });

  // When a message (click) is received from the WebView
  const handleMessage = (event: any) => {
    try {
      const coords = JSON.parse(event.nativeEvent.data);
      onMapClick?.(coords);
    } catch (err) {
      console.warn("Failed to parse click event", err);
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={mapRef as any}
        originWhitelist={["*"]}
        source={{ html }}
        style={styles.webview}
        onMessage={handleMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowFileAccess={true}
        allowUniversalAccessFromFileURLs={true}
        allowFileAccessFromFileURLs={true}
        mixedContentMode="always"
        scalesPageToFit={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: 400,
  },
  webview: {
    flex: 1,
  },
});

export default IsraelOnlyMap;
