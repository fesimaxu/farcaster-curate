import axios from 'axios';
import { config } from 'dotenv';
config();

const apiKey = process.env.apiKey;


const options = {
  method: 'GET',
  headers: {accept: 'application/json', api_key: apiKey}
};

export async function userDetails(fid: any[]) {
    try {
        const response = await axios.get(`https://api.neynar.com/v2/farcaster/user/bulk?fids=${fid}`, options);
        return response.data;
    } catch (e: any) {
        if (e.response) {
            console.error(`Error: ${e.response.data.message}`);
        } else {
            console.error(`Error: ${e.message}`);
        }
    }
}
