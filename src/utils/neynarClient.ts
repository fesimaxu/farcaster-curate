import { NeynarAPIClient } from "@neynar/nodejs-sdk";
import { config } from 'dotenv';
config();

const apiKey = process.env.apiKey;

if (!apiKey) {
  throw new Error("Make sure you set NEYNAR_API_KEY in your .env file");
}

const neynarClient = new NeynarAPIClient(apiKey);

export default neynarClient;