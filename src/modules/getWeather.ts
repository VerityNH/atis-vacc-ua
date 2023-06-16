import axios from 'axios';
import { Airport, Weather } from 'src/types';

export const getWeather = async (airport: Airport): Promise<Weather> => {
  const key = process.env.WEATHER_KEY;
  const url = `https://api.openweathermap.org/data/3.0/onecall?lon=${airport.lon}&lat=${airport.lat}&units=metric&exclude=minutely,hourly,daily,alerts&appid=${key}`;
  return axios.get(url).then((res) => {
    return {
      wind: [
        res.data.current.wind_deg,
        Math.round(res.data.current.wind_speed),
      ],
      qnh: res.data.current.pressure,
      temperature: Math.round(res.data.current.temp),
      dewPoint: Math.round(res.data.current.dew_point),
      tl:
        res.data.current.pressure >= 1031
          ? 105
          : res.data.current.pressure >= 1013
          ? 110
          : res.data.current.pressure >= 995
          ? 115
          : res.data.current.pressure >= 977
          ? 120
          : res.data.current.pressure >= 959
          ? 125
          : 130,
      visibility: Math.round(res.data.current.visibility / 1000),
    };
  });
};
