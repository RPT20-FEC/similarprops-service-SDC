# AIRBNB CLONE: SIMILAR PROPERTIES SERVICE

> This repo is the service-side of an AirBnB clone. This service is the "More Places to Stay" module of a listing's page.
> This module contains an outer carousel, an inner carousel of a listing's photos, the listing's details, and a favorite icon (UI only) on hover.


## Related Projects
> To view the other modules' repos of our clone, please visit the link below.
  - https://github.com/RPT20-FEC

- https://github.com/RPT20-FEC/photo-service-SDC
- https://github.com/RPT20-FEC/sdc-listing-service
- https://github.com/RPT20-FEC/photo-service

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)

## Usage

> Use `npm start` to start the server.
> Use `npm run test` to run the tests.

## API Endpoints

NOTE: ${id} can be listingId or headline of listing

> GET /:id
  - Responds with an HTML page displaying the similar properties service which renders twelve similar listings based on the current listing's location.

> GET /similarprops/:id
  - Should retrieve a listing by its listingId or headline.

> GET /similarprops
  - Should retrieve all listings in record.

> GET /listings/:id/similarprops
  - Should retrieve at MOST twelve similar properties from database based on current listing's location.

> POST /similarprops/:id
  - Creates a new listing.

> PUT /similarprops/:id
  - Updates a single property listing matching listingId or headline.

> DELETE /similarprops/:id
  - Deletes a single property listing matching listingId or headline.


## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 12.16.2
- Database TBD

## Development

### Installing Dependencies

From within the root directory:
`npm install`

