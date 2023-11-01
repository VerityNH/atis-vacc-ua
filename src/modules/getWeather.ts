import axios from 'axios';
import { Airport, Weather } from 'src/types';

export const getWeather = async (airport: Airport): Promise<Weather> => {
  const key = process.env.WEATHER_KEY;
  //const url = `https://api.openweathermap.org/data/3.0/onecall?lon=${airport.lon}&lat=${airport.lat}&units=metric&exclude=minutely,hourly,daily,alerts&appid=${key}`;
  const url = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${airport.lat},${airport.lon}&aqi=no`;
  return axios.get(url).then((res) => {
    const calcDP = (temp, humi) => {
      return (
        temp -
        (14.55 + 0.114 * temp) * (1 - 0.01 * humi) -
        Math.pow((2.5 + 0.007 * temp) * (1 - 0.01 * humi), 3) -
        (15.9 + 0.117 * temp) * Math.pow(1 - 0.01 * humi, 14)
      );
    };

    const qnh = Math.round(res.data.current.pressure_mb);
    const temperature = Math.round(res.data.current.temp_c);
    const humidity = res.data.current.humidity;
    const dewPoint = Math.round(calcDP(temperature, humidity));
    const visibility = Math.round(res.data.current.vis_km);

    return {
      wind: [
        res.data.current.wind_degree,
        Math.round((res.data.current.wind_kph * 5) / 18),
      ],
      qnh: qnh,
      temperature: temperature,
      dewPoint: dewPoint,
      tl:
        qnh >= 1031
          ? 105
          : qnh >= 1013
          ? 110
          : qnh >= 995
          ? 115
          : qnh >= 977
          ? 120
          : qnh >= 959
          ? 125
          : 130,
      visibility: visibility,
    };
  });
};
