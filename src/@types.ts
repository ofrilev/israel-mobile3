import MapView from 'react-native-maps';
// ===================================
// Core Enums
// ===================================

export enum PlaceType {
  CITY = 'city',
  MOUNTAIN = 'mountain',
  FAMOUS_PLACE = 'famous_place',
}

export enum GamePhase {
  CITIES = 'cities',
  MOUNTAINS = 'mountains',
  FAMOUS_PLACES = 'famous_places',
}

export enum CityRegion {
  MAIN_CITIES = 'main_cities',
  CENTRAL_TOWNS = 'central_towns',
  JERUSALEM_REGION = 'jerusalem_region',
  BEER_TUVIA_REGION = 'beer_tuvia_region',
  HAIFA_CARMEL_REGION = 'haifa_carmel_region',
  GALILEE_REGION = 'galilee_region',
  ARAVA_DEAD_SEA_REGION = 'arava_dead_sea_region',
}

// ===================================
// Core Types
// ===================================

export type Point = {
  lat: number;
  lng: number;
};

export type Place = {
  name: string;
  label: string;
  point: Point;
  type: PlaceType;
  img?: string;
};

// ===================================
// Map Types
// ===================================

export type MarkerData = {
  id: string;
  coordinate: [number, number];
  color: string;
  text: string;
};

export interface MarkerHandlerProps {
  userPoint?: Point;
  currentCityPoint?: Point;
  score?: number;
}

export interface IsraelOnlyMapProps {
  onMapClick: (p: Point) => void;
  currentCityPoint: Point;
  gamePhase?: string;
  mapRef?: React.RefObject<MapView>;
}

export interface ClockIconProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

export interface PulsingClockProps {
  size?: number;
  color?: string;
}

export interface FloatingPointsProps {
  trigger: boolean;
  text?: string;
}

export type FloatingPointVariant = 'default' | 'speedBonus' | 'score';

export interface FloatingPointConfig {
  duration?: number;
  initialY?: number;
  animateY?: number;
  textColor?: string;
  fontSize?: string;
  customText?: string;
}

// ===================================
// Stats & Game Types
// ===================================

export type LastScore = {
  time: number;
  score: number;
};
