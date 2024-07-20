import axios from 'axios';
import { config } from 'dotenv';
config();

const apiKey = process.env.apiKey;


const options = {
  method: 'POST',
  url: 'https://api.neynar.com/v2/farcaster/signer',
  headers: {accept: 'application/json', api_key: apiKey}
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });