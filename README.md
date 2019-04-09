# Users Cubed Frontend

Work in progress.

## Features

Fully featured React.js SSR user management system (frontend).

## Technologies

* [Users Cubed S3](https://github.com/TalaikisInc/users-cubed-s3)
* [Contact us service](https://github.com/TalaikisInc/email_service)
* [Upload service](https://github.com/TalaikisInc/upload-service)
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

## Licence

GPL v 3.0
