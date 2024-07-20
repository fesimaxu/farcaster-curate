
const axios = require('axios');
import { config } from 'dotenv';
config();

// const fid = 370503;
const server = "https://hub-api.neynar.com";
const apiKey = process.env.apiKey;


//const url = 'https://api.neynar.com/v2/farcaster/feed/channels?with_recasts=true&with_replies=false&limit=25&should_moderate=false';


  
//Returns a list of followers for a specific FID.
export async function followUser(uuid: any, fids: []) {


    const options = {
        method: 'POST',
        url: 'https://api.neynar.com/v2/farcaster/user/follow',
        headers: {
          accept: 'application/json',
          api_key: apiKey,
          'content-type': 'application/json'
        },
        data: {signer_uuid: uuid, target_fids: fids}
      };
    

    try {
        const response = await axios.request(options);
        console.log(response.data), "response";
        return response.data;
    } catch (e: any) {
        if (e.response) {
            console.error(`Error: ${e.response.data.message}`);
        } else {
            console.error(`Error: ${e.message}`);
        }
    }
}
