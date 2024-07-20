const axios = require('axios');
import { config } from 'dotenv';
config();

const server = "https://hub-api.neynar.com";

const apiKey = process.env.apiKey;


//const url = 'https://api.neynar.com/v2/farcaster/feed/channels?with_recasts=true&with_replies=false&limit=25&should_moderate=false';
const options = {
  method: 'GET',
  headers: {accept: 'application/json', api_key: apiKey}
};

export async function getCasts(fid: any) {
    try {
        const response = await axios.get(`${server}/v1/castsByFid?fid=${fid}`, options);
        return response.data;
    } catch (e: any) {
        if (e.response) {
            console.error(`Error: ${e.response.data.message}`);
        } else {
            console.error(`Error: ${e.message}`);
        }
    }
}
