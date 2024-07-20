import express from "express";
import cors from 'cors';
import { createServer } from "http";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";
import UserPreferenceRoute from "./routes/index";
import socketConfig from "./websocket/config";

dotenv.config();

const app = express();
const server = createServer(app);

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(UserPreferenceRoute);

app.options('*', cors());

  // Websocket Connection
  socketConfig(server)
  .then(() => {
    console.log("websocket is connected");
  })
  .catch((err: any) => {
    console.log(err);
  });
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || '', {
  } as ConnectOptions) 
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.log('MongoDB connection Error:', error);
    });
  
  // Active PORT
  const DB_PORT = process.env.PORT;

    server.listen(DB_PORT, () => {
      console.log(`server running on port http://localhost:${DB_PORT}/`);
    });

// app.listen(process.env.PORT, () => {
//     console.log(`This application is listening at ${process.env.PORT}`)
// });

export default server;