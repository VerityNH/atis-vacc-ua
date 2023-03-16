import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { Dto } from './dto';
import { Location, Weather } from './types';

@Injectable()
export class AppService {
  async getLocation(icao): Promise<Location> {
    const url = `https://aeroapi.flightaware.com/aeroapi/airports/${icao}`;
    const config = {
      headers: {
        'x-apikey': process.env.AIRPORT_KEY,
      },
    };
    return axios
      .get(url, config)
      .then((res) => {
        return {
          lon: res.data.longitude,
          lat: res.data.latitude,
          name: res.data.city.toUpperCase(),
        };
      })
      .catch(() => {
        throw new NotFoundException();
      });
  }

  async getWeather(location: Location): Promise<Weather> {
    const key = process.env.WEATHER_KEY;
    const url = `https://api.openweathermap.org/data/3.0/onecall?lon=${location.lon}&lat=${location.lat}&units=metric&exclude=minutely,hourly,daily,alerts&appid=${key}`;
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
  }

  async getAtis(data: Dto): Promise<string> {
    const location: Location = await this.getLocation(data.icao);
    const weather: Weather = await this.getWeather(location);
    weather.wind[0] = Math.round(weather.wind[0] / 10) * 10;
    if (weather.wind[0] == 0) weather.wind[0] = 360;
    const time = {
      hours: new Date().getUTCHours(),
      minutes: new Date().getUTCMinutes(),
      getTime: function () {
        if (this.hours <= 10) this.hours = `0${this.hours}`;
        if (this.minutes >= 30) return `${this.hours}30`;
        else return `${this.hours}00`;
      },
    };

    return `${location.name} INTERNATIONAL INFORMATION ${data.code.toUpperCase()} AT TIME ${time.getTime()} EXPECT ILS APPROACH RUNWAY ${data.rw} TRANSITION LEVEL ${weather.tl} WIND ${weather.wind[1] < 1 ? `CALM` : `${weather.wind[0] < 100 ? `0${weather.wind[0]}` : weather.wind[0]} DEGREES ${weather.wind[1]} METERS PER SECOND`} VISIBILITY ${weather.visibility <= 1 ? `${weather.visibility * 1000} METERS` : `${weather.visibility} KILOMETERS ${weather.visibility == 10 ? `OR MORE` : ``}`} TEMPERATURE ${weather.temperature} DEW POINT ${weather.dewPoint} QNH ${weather.qnh} ADVISE YOU HAVE INFORMATION ${data.code.toUpperCase()} ON FIRST CONTACT`;
  }
}