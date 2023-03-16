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
        return { lon: res.data.longitude, lat: res.data.latitude, name: res.data.city.toUpperCase()};
      })
      .catch((error) => {
        throw new NotFoundException();
      });
  }

  async getWeather(location: Location): Promise<Weather> {
    const key = process.env.WEATHER_KEY;
    const url = `https://api.openweathermap.org/data/3.0/onecall?lon=${location.lon}&lat=${location.lat}&units=metric&appid=${key}`;
    return axios.get(url).then((res) => {
      return {
        wind: [
          res.data.current.wind_deg,
          Math.floor(res.data.current.wind_speed),
        ],
        qnh: res.data.current.pressure,
        temperature: Math.floor(res.data.current.temp),
        dewPoint: Math.floor(res.data.current.dew_point),
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
      };
    });
  }

  async getAtis(data: Dto) {
    const location: Location = await this.getLocation(data.icao);
    const weather: Weather = await this.getWeather(location);
    const time = {
      hours: new Date().getUTCHours(),
      minutes: new Date().getUTCMinutes(),
      getTime: function () {
        if (this.hours <= 10) this.hours = `0${this.hours}`
        if (this.minutes >= 30) return `${this.hours}30`
        else return `${this.hours}00`
      }
    }
    console.log(time);
    
    return `${location.name} INTERNATIONAL INFORMATION ${data.code.toUpperCase()} AT TIME ${time.getTime()} EXPECT ILS APPROACH 
    RUNWAY ${data.rw} TRANSITION LEVEL ${weather.tl} WIND ${weather.wind[0]} DEGREES ${weather.wind[1]} METERS PER
    SECOND VISIBILITY 10 KILOMETERS OR MORE FEW059 TEMPERATURE ${weather.temperature} 
    DEW POINT ${weather.dewPoint} QNH ${weather.qnh} ADVISE YOU HAVE INFORMATION ${data.code.toUpperCase()} ON FIRST CONTACT`;
  }
}
