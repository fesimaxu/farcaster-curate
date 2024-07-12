import axios from 'axios';
import { filterChannels } from './channelSuggestion';


// Get all channels
export async function getAllChannels() {
    const response = await axios.get('https://api.warpcast.com/v2/all-channels');
    return response.data;
}

// Function to get channel followers
export async function getChannelFollowers(channelId: any): Promise<any[]> {
    const response = await axios.get(`https://api.warpcast.com/v1/channel-followers?channelId=${channelId}`);
    return response.data.result.users;
}

export async function getTopFollowers(data: any, keywords: any, minFollowers: any, topMember: any) {
    const filteredChannels = filterChannels(data, keywords, minFollowers);
    const followerPromises = filteredChannels.map((channel: any )=> getChannelFollowers(channel.id));
    const followersArrays = await Promise.all(followerPromises);

    // console.log(allFollowers, "allFollowers");

    function sortByFollowedAtDesc(arr: any[]) {
        arr.sort((a, b) => b.followedAt - a.followedAt);
      }
      // Sort each array in followersArrays
      followersArrays.forEach(array => sortByFollowedAtDesc(array));

      function getFirst10Fid(arr: any[]) {
        return arr.slice(0, topMember).map(obj => obj.fid);
      }
      
      // Array to store results
      let topFollowers: any[] = [];
      
      // Get first 10 fid from each sorted array
      followersArrays.forEach(array => {
        topFollowers.push(getFirst10Fid(array));
      });

    return topFollowers;
}

