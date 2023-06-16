import { Injectable, NotFoundException } from '@nestjs/common';
import { Dto } from './dto';
import { getActiveRunway, getAirport, getWeather } from './modules';
import { Airport, Weather } from './types';

@Injectable()
export class AppService {
  async getAtis(data: Dto): Promise<string> {
    const airport: Airport = getAirport(data.icao.toUpperCase());
    if (!airport) throw new NotFoundException();

    const weather: Weather = await getWeather(airport);
    const activeRunway: string = data.rw
      ? data.rw
      : getActiveRunway(airport.runways, weather.wind[0]);

    weather.wind[0] = Math.round(weather.wind[0] / 10) * 10;
    if (weather.wind[0] == 0) weather.wind[0] = 360;

    const time = {
      hours: new Date().getUTCHours(),
      minutes: new Date().getUTCMinutes(),
      getTime: function () {
        if (this.hours < 10) this.hours = `0${this.hours}`;
        if (this.minutes >= 30) return `${this.hours}30`;
        else return `${this.hours}00`;
      },
    };

    return `${airport.name} INTERNATIONAL INFORMATION ${data.code.toUpperCase()} AT TIME ${time.getTime()} EXPECT ILS APPROACH RUNWAY ${activeRunway} TRANSITION LEVEL ${weather.tl} WIND ${weather.wind[1] < 1 ? `CALM` : `${weather.wind[0] < 100 ? `0${weather.wind[0]}` : weather.wind[0]} DEGREES ${weather.wind[1]} METERS PER SECOND`} VISIBILITY ${weather.visibility <= 1 ? `${weather.visibility * 1000} METERS` : `${weather.visibility} KILOMETERS ${weather.visibility == 10 ? `OR MORE` : ``}`} TEMPERATURE ${weather.temperature} DEW POINT ${weather.dewPoint} QNH ${weather.qnh} ADVISE YOU HAVE INFORMATION ${data.code.toUpperCase()} ON FIRST CONTACT`;
  }
}
