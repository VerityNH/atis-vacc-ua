export type Airport = {
  lon: number;
  lat: number;
  name: string;
  runways: { name: string; heading: number }[];
};
