# [vACC Ukraine](https://vacc-ua.org) [ATIS](https://atis-vacc-ua.up.railway.app)

URL for Euroscope: https://atis-vacc-ua.up.railway.app/?icao=$atisairport&rw=$arrrwy($atisairport)&code=$atiscode

Where:

- icao = ICAO code of requested airport (e.g. UKBB)
- rw = runway in use (e.g. 36R)
- code = current ATIS information letter (e.g. C)

## To run locally

### Prerequisites

1. Node.js v16+
1. npm v8+

- Clone the repository
- Open cloned directory and run `npm install`
- Create your own `.env` file and put your keys there (you can find example inside `.env.sample`)
- Run `npm run start:dev` to start application
- Run `npm run test:watch` to run tests
