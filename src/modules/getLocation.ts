import { Location } from '../types';

export const getLocation = (icao: string): Location => {
  switch (icao) {
    case 'UKBB':
      return {
        lat: 50.345,
        lon: 30.894722,
        name: 'BORYSPIL',
      };
    case 'UKDD':
      return {
        lat: 48.357222,
        lon: 35.100556,
        name: 'DNIPRO',
      };
    case 'UKDE':
      return {
        lat: 47.867003,
        lon: 35.315692,
        name: 'ZAPORIZHZHIA',
      };
    case 'UKHH':
      return {
        lat: 49.926749,
        lon: 36.289735,
        name: 'KHARKIV',
      };
    case 'UKKK':
      return {
        lat: 50.4109,
        lon: 30.526736,
        name: 'KYIV ZHULIANY',
      };
    case 'UKLI':
      return {
        lat: 48.884167,
        lon: 24.686111,
        name: 'IVANO-FRANKIVSK',
      };
    case 'UKLL':
      return {
        lat: 49.8125,
        lon: 23.956111,
        name: 'LVIV',
      };
    case 'UKLU':
      return {
        lat: 48.634278,
        lon: 22.263356,
        name: 'UZHHOROD',
      };
    case 'UKOH':
      return {
        lat: 46.676376,
        lon: 32.506751,
        name: 'KHERSON',
      };
    case 'UKON':
      return {
        lat: 47.056367,
        lon: 31.916416,
        name: 'MYKOLAIV',
      };
    case 'UKOO':
      return {
        lat: 46.426767,
        lon: 30.676464,
        name: 'ODESA',
      };
  }
};
