<p align="center">
  <a href="https://talaikis.com/">
    <img alt="Talaikis Ltd." src="https://github.com/TalaikisInc/talaikis.com_react/blob/master/media/logo.png" width="228">
  </a>
</p>

# Users Cubed Frontend

DEPRECATED, use [users-cubed-next-frontend](https://github.com/TalaikisInc/users-cubed-next-frontend) instead.

## Features

Fully featured React.js SSR user management system (frontend).

* Serves CSR for end-users and SSR for major crawlers
* User signin, signup, signout
* Profile edit, delete
* Account confirm, password reset
* Terms and conditions. privacy policy, disclaimer examples
* Contact form, etc. examples
* Rate limits

TODO:

* frontload for apis doesn't work
* social login (+backend part)
* real locale instead of short version?
* refer system (left: REFER_USE -> REFER_REGISTER)
* upload field/ avatar field

## Technologies

* [Users Cubed S3](https://github.com/TalaikisInc/users-cubed-s3)
* [Contact us service](https://github.com/TalaikisInc/email_service)
* [Upload S3](https://github.com/TalaikisInc/upload-service-s3)
* [CRA-SSR](https://github.com/cereallarceny/cra-ssr)
* [React](https://github.com/facebook/react)
* [Create React App](https://github.com/facebook/create-react-app)
* [Redux](https://github.com/reduxjs/redux)

## API

You should deploy your own [Users Cubed API](https://github.com/TalaikisInc/users-cubed-s3), [contact us API](https://github.com/TalaikisInc/email_service) and set their URLs on src/config.js.

## Install

```bash
npm i
```

## Build

```bash
# CSS:
npm run build:css
# JS:
npm run build:js
# Everything:
npm run build
```

## Start

```bash
# Development:
npm run start
# Production
npm run build
npm run serve
```

## Deploy

Docker:

```bash
./slave_build.sh <app_name>
./slave_start.sh <app_name> <port>
```

## Benchmark

```bash
autocannon http://localhost:3000
```

## Licence

GPL v 3.0
