const axios = require('axios');
import { config } from 'dotenv';
config();

// const fid = 370503;
const server = "https://hub-api.neynar.com";
const apiKey = process.env.apiKey;


//const url = 'https://api.neynar.com/v2/farcaster/feed/channels?with_recasts=true&with_replies=false&limit=25&should_moderate=false';
const options = {
  method: 'GET',
  headers: {accept: 'application/json', api_key: apiKey}
};
//Returns a list of followers for a specific FID.
export async function allUserFollowers(fid: any) {
    try {
        const response = await axios.get(`https://api.neynar.com/v2/farcaster/followers?fid=${fid}&limit=100`, options);
        return response.data;
    } catch (e: any) {
        if (e.response) {
            console.error(`Error: ${e.response.data.message}`);
        } else {
            console.error(`Error: ${e.message}`);
        }
    }
}
