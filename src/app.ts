import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";

dotenv.config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || '', {
  } as ConnectOptions) 
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.log('MongoDB connection Error:', error);
    });
  



app.listen(process.env.PORT, () => {
    console.log(`This application is listening at ${process.env.PORT}`)
});




export default app;