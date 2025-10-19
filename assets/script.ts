// merge-countries.ts
import fs from "fs";

interface GeoJSONFeature {
  type: string;
  geometry: {
    type: string;
    coordinates: number[][][];
  };
  properties: Record<string, any>;
}

interface GeoJSONCollection {
  type: string;
  features: GeoJSONFeature[];
}

try {
  // Load and parse Israel GeoJSON
  const israelData = fs.readFileSync("./il.json", "utf8");
  const israel = JSON.parse(israelData) as GeoJSONCollection;
  
  // Load and parse Palestine GeoJSON
  const palestineData = fs.readFileSync("./ps.json", "utf8");
  const palestine = JSON.parse(palestineData) as GeoJSONCollection;

  // Merge features
  const merged = [...israel.features, ...palestine.features];

  // Create output collection
  const output: GeoJSONCollection = {
    type: "FeatureCollection",
    features: merged,
  };

  // Write merged GeoJSON
  fs.writeFileSync("./merged.json", JSON.stringify(output, null, 2), "utf8");
  console.log("✅ Successfully merged GeoJSON files into merged.json");

} catch (error) {
  console.error("❌ Error processing GeoJSON files:", error instanceof Error ? error.message : String(error));
  process.exit(1);
}
