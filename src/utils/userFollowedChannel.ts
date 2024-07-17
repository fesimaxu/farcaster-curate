const axios = require('axios');
import { config } from 'dotenv';
config();

const fid = 370503;
const server = "https://hub-api.neynar.com";
const apiKey = process.env.apiKey;


//const url = 'https://api.neynar.com/v2/farcaster/feed/channels?with_recasts=true&with_replies=false&limit=25&should_moderate=false';
const options = {
  method: 'GET',
  headers: {accept: 'application/json', api_key: apiKey}
};
//List all Warpcast channels a user is following. Ordered by the time when the channel was followed, descending. Paginated.
export async function userFollowedChannel(fid: any) {
    try {
        const response = await axios.get(`https://api.warpcast.com/v1/user-following-channels?fid=${fid}`, options);
        return response.data;
    } catch (e: any) {
        if (e.response) {
            console.error(`Error: ${e.response.data.message}`);
        } else {
            console.error(`Error: ${e.message}`);
        }
    }
}
