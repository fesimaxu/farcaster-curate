import axios from 'axios';
import { config } from 'dotenv';
config();

const apiKey = process.env.apiKey;


const options = {
  method: 'GET',
  
  headers: {accept: 'application/json', api_key: apiKey}
};

export async function personalizedFeed(fid: any) {
    try {
        const response = await axios.get(`https://api.neynar.com/v2/farcaster/feed/for_you?fid=${fid}&limit=50`, options);
 
        return response.data;
    } catch (e: any) {
        // Handle errors
        if (e.response) {
            console.error(`Error: ${e.response.data.message}`);
        } else {
            console.error(`Error: ${e.message}`);
        }
    }
}


