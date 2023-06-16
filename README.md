# [vACC Ukraine](https://vacc-ua.org) [ATIS](https://atisvaccua.up.railway.app)

URL for Euroscope: https://atisvaccua.up.railway.app/?icao=$atisairport&code=$atiscode&rw=$arrrwy($atisairport)

Where:

- icao = ICAO code of requested airport (e.g. UKBB)
- code = current ATIS information letter (e.g. C)
- rw = runway in use, optional (e.g. 36R)

## To run locally

### Prerequisites

1. Node.js v16+
1. npm v8+

- Clone the repository
- Open cloned directory and run `npm install`
- Create your own `.env` file and put your openweathermap API key there (you can find example inside `.env.sample`)
- Run `npm run start:dev` to start application
- Run `npm run test:watch` to run tests
