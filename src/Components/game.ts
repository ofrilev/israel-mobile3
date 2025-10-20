import { Point } from '../../src/@types';

export function calculateDistance(point1: Point, point2: Point) {
  const { lat: lat1, lng: lon1 } = point1;
  const { lat: lat2, lng: lon2 } = point2;
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function calculateScore(distance: number) {
  if (distance < 3) return 100;
  if (distance < 5) return 90;
  if (distance < 10) return 80;
  if (distance < 15) return 70;
  if (distance < 25) return 60;
  if (distance < 35) return 50;
  if (distance < 45) return 40;
  if (distance < 55) return 30;
  if (distance < 65) return 20;
  return 0;
}
