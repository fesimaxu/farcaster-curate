// import axios from 'axios';
// import { filterChannels } from './channelSuggestion';
// import {userDetails} from './userDetails';


// // Get all channels
// export async function getAllChannels() {
//     const response = await axios.get('https://api.warpcast.com/v2/all-channels');
//     return response.data;
// }

// // Function to get channel followers
// export async function getChannelFollowers(channelId: any): Promise<any[]> {
//     const response = await axios.get(`https://api.warpcast.com/v1/channel-followers?channelId=${channelId}`);
//     return response.data.result.users;
// }

// export async function getTopFollowers(data: any, keywords: any, minFollowers: any, topMember: any) {
//     const filteredChannels = filterChannels(data, keywords, minFollowers);
//     const followerPromises = filteredChannels.map((channel: any )=> getChannelFollowers(channel.id));
//     const followersArrays = await Promise.all(followerPromises);

//     // console.log(allFollowers, "allFollowers");

//     function sortByFollowedAtDesc(arr: any[]) {
//         arr.sort((a, b) => b.followedAt - a.followedAt);
//       }
//       // Sort each array in followersArrays
//       followersArrays.forEach(array => sortByFollowedAtDesc(array));


//       console.log(followersArrays.length, "followersArrays");

//       // Function to get the first N fid from an array
//       function getFirstNFid(arr: any[], n: number) {
//         return arr.slice(0, n).map(obj => obj.fid);
//       }



//       // Calculate the maximum number of followers we can take from each array
//       const maxFollowersPerArray = Math.floor(100 / followersArrays.length);
      
//       console.log(maxFollowersPerArray, "maxFollowersPerArray");

//       // Array to store results
//       let topFollowers: any[] = [];

//       // Get the maximum allowed followers from each sorted array
//       followersArrays.forEach(array => {
//         const numFollowers = Math.min(array.length, maxFollowersPerArray);
//         topFollowers.push(...getFirstNFid(array, numFollowers));
//       });


//       // Flatten the array
//       topFollowers = topFollowers.flat();

//       // Remove duplicates
//       topFollowers = [...new Set(topFollowers)];

//       console.log(topFollowers.length , "topFollowers");

//       // Get user details
//       const topFollowerDetails = await userDetails(topFollowers);


//     return topFollowerDetails;
// }





import axios from 'axios';
import { filterChannels } from './channelSuggestion';
import { allUserFollowers } from './allUserFollowers';
import { userDetails } from './userDetails';

// Get all channels
export async function getAllChannels(): Promise<any> {
    try {
        const response = await axios.get('https://api.warpcast.com/v2/all-channels');
        return response.data;
    } catch (error) {
        console.error('Error fetching channels:', error);
        throw error;
    }
}

// Function to get channel followers
export async function getChannelFollowers(channelId: string): Promise<any[]> {
    try {
        const response = await axios.get(`https://api.warpcast.com/v1/channel-followers?channelId=${channelId}`);
        return response.data.result.users;
    } catch (error) {
        console.error(`Error fetching followers for channel ${channelId}:`, error);
        throw error;
    }
}

export async function getTopFollowers(data: any, keywords: string[], minFollowers: number, fid: string): Promise<any> {
    const filteredChannels = filterChannels(data, keywords, minFollowers);
    const followerPromises = filteredChannels.map((channel: any) => getChannelFollowers(channel.id));
    const followersArrays = await Promise.all(followerPromises);

    function sortByFollowedAtDesc(arr: any[]) {
        arr.sort((a, b) => b.followedAt - a.followedAt);
    }

    // Sort each array in followersArrays
    followersArrays.forEach(array => sortByFollowedAtDesc(array));

    // Fetch the users the current user is already following
    let followingUsers = await allUserFollowers(fid);

    // Convert followingUsers to a Set for efficient lookup
    const followingUsersSet = new Set(followingUsers.users.map((user: any) => user.fid));


    // Filter out already-followed users from each channel's followers
    const filteredFollowersArrays = followersArrays.map(array => array.filter((follower: any) => !followingUsersSet.has(follower.fid)));

    function getFirstNFid(arr: any[], n: number) {
        return arr.slice(0, n).map(obj => obj.fid);
    }

    // Array to store results
    let topFollowers: any[] = [];
    let totalFollowersCount = 0;
    const maxTotalFollowers = 100;

    // Distribute followers dynamically
    for (let i = 0; i < filteredFollowersArrays.length; i++) {
        const array = filteredFollowersArrays[i];
        const remainingSlots = maxTotalFollowers - totalFollowersCount;
        const numFollowers = Math.min(array.length, Math.ceil(remainingSlots / (filteredFollowersArrays.length - i)));

        if (numFollowers > 0) {
            topFollowers.push(...getFirstNFid(array, numFollowers));
            totalFollowersCount += numFollowers;
        }

        // Break if we reach the maximum total followers
        if (totalFollowersCount >= maxTotalFollowers) {
            break;
        }
    }

    // Remove duplicates
    topFollowers = [...new Set(topFollowers)];

    // Get user details
    const topFollowerDetails = await userDetails(topFollowers);

    return topFollowerDetails;
}
