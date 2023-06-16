import { Airport } from 'src/types';

export const getAirport = (icao: string): Airport => {
  switch (icao) {
    case 'UKBB':
      return {
        lat: 50.345,
        lon: 30.894722,
        name: 'BORYSPIL',
        runways: [
          { name: '18L', heading: 176 },
          { name: '36R', heading: 356 },
        ],
      };
    case 'UKDD':
      return {
        lat: 48.357222,
        lon: 35.100556,
        name: 'DNIPRO',
        runways: [
          { name: '08', heading: 82 },
          { name: '26', heading: 262 },
        ],
      };
    case 'UKDE':
      return {
        lat: 47.867003,
        lon: 35.315692,
        name: 'ZAPORIZHZHIA',
        runways: [
          { name: '02', heading: 16 },
          { name: '20', heading: 196 },
        ],
      };
    case 'UKHH':
      return {
        lat: 49.926749,
        lon: 36.289735,
        name: 'KHARKIV',
        runways: [
          { name: '07', heading: 73 },
          { name: '25', heading: 253 },
        ],
      };
    case 'UKKK':
      return {
        lat: 50.4109,
        lon: 30.526736,
        name: 'KYIV ZHULIANY',
        runways: [
          { name: '08', heading: 79 },
          { name: '26', heading: 259 },
        ],
      };
    case 'UKLI':
      return {
        lat: 48.884167,
        lon: 24.686111,
        name: 'IVANO-FRANKIVSK',
        runways: [
          { name: '10', heading: 98 },
          { name: '28', heading: 278 },
        ],
      };
    case 'UKLL':
      return {
        lat: 49.8125,
        lon: 23.956111,
        name: 'LVIV',
        runways: [
          { name: '13', heading: 130 },
          { name: '31', heading: 310 },
        ],
      };
    case 'UKLU':
      return {
        lat: 48.634278,
        lon: 22.263356,
        name: 'UZHHOROD',
        runways: [
          { name: '10', heading: 97 },
          { name: '28', heading: 277 },
        ],
      };
    case 'UKOH':
      return {
        lat: 46.676376,
        lon: 32.506751,
        name: 'KHERSON',
        runways: [
          { name: '03', heading: 26 },
          { name: '21', heading: 206 },
        ],
      };
    case 'UKON':
      return {
        lat: 47.056367,
        lon: 31.916416,
        name: 'MYKOLAIV',
        runways: [
          { name: '04', heading: 44 },
          { name: '22', heading: 224 },
        ],
      };
    case 'UKOO':
      return {
        lat: 46.426767,
        lon: 30.676464,
        name: 'ODESA',
        runways: [
          { name: '16', heading: 156 },
          { name: '34', heading: 336 },
        ],
      };
  }
};
