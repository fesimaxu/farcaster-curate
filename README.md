# Curate Farcaster Service API

Backend for the curate Farcaster service api.

## 🔧 Tech Stack

- NodeJS
- ExpressJS
- Mongoose
- Socket.io: Chat functionality
- Input Validation: Express validator
- Documentation: implemented with swagger docs

## 📝 Requirements

This project requires nodeJS version >= 14 and npm package manager.

## 📁 Project Configuration

The project is divided into:

- Controller: found in `src/controller` folder. Coordinates the interaction between the UI and the backend services.
- Middlewares: found in `src/middlewares` folder. Logic to process incoming HTTP requests and perform tasks such as authentication, validation, etc.
- Model: found in `src/model` directory. Database Schema of the preference app.
- Routes: found in `src/routes` directory. URL endpoints and their corresponding method/action.


## 💻 Running Locally

1. Clone this repository by running:
   ```bash
   git clone https://github.com/fesimaxu/curate-cast-backend
   cd curate-cast-backend
   ```
2. Install the dependencies:
   ```bash
    yarn
   ```
3. Using the `.env.example` template, create a `.env` file and fill in the values for each environment variables:
   ```bash
   cp .env.example .env 
   ```
4. To compile the typescript to javascript:
   ```bash
   yarn tsc 
   ```

## 🗃️ Database SetUp

This project uses Mongoose Module for the database. Database Schema can be found in the Documentation section.
**NOTE**: You need to setup a using Messaging csv Dataset , the default database name is: `localhost/config`. DB schemas are automatically synced

### Starting App

- Linux
Start the server in dev mode:
  ```bash
  yarn start 
  ```


## 🌐 Endpoints

- POST `/user/set-preference` -> Create User Preferences
- GET `/user/get-preference/:fid` -> Get All User Preference
- GET `/user/get-channel/:fid` -> Get All MeCastsage
- GET `/user/get-farcaster-account/:fid` -> All Farcaster Accounts
Personalised Feeds
- GET `/user/get-feed/:fid` -> Get User personalised feeds
Cast
- GET `/user/get-cast/:fid` -> Get User cast
- GET `/user/get-followed-channels/:fid` -> Get User followed channels
- GET `/user/get-all-followers/:fid` -> Get All User followers
- POST `/user/follow-farcaster-user` -> Follow Users

## WebSocket Endpoints
- Message `getUserCast` -> Send fid
  ```json
  {
    "fid": "200",
  }
  ```
- Emitter `userCastData` -> Emits the user cast


## 📩 Requests

- Accepts JSON only.
- Request body should **only** contain the specified values and follow the database schema.
- POST `/user/set-preference` -> Create User Preferences
- Example request:
  ```json
  {
    "fid": "208",
    "preferences": ["crypto", "social", "airdrop"]
  }
  ```

## 📂 Response

Returns JSON.

## ⚠️ Response Status

- 200 - OK: User or resource has been successfully updated.
- 201 - Created: User or resource has been successfully created.
- 400 - Bad Request:
  - Request body has more than the specified attribute.
  - Invalid content-Type.
- 403 - Unauthorized: A user is not authenticated
- 404 - User or Resource Not Found.
- 500 - Internal Server Error.

## 💻 Testing

Tests can be done with jest and supertest:

```bash
yarn run test
```

Alternatively, online API testing tools such as Postman can be used to test the endpoints.

## 📄 License

This project uses the MIT License as found in [LICENSE](/LICENSE)

## 📖 Documentation

Documentation can be found [SWAGGERDOCS](https://farcaster-curate.onrender.com/api/docs)

## 🔗 Links

[Live Base URL](https://farcaster-curate.onrender.com)

[Database Schema]()

## 🤝 The DEVELOPER

Built by Team OnHack CurateCrew
[AUTHORS](/AUTHORS)

