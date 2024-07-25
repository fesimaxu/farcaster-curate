import axios from 'axios';
import {userFollowedChannel} from './userFollowedChannel';

export function filterChannels(data: any , keywords: any, minFollowers: any) {
    const channels = data.result.channels;
    return channels.filter((channel: any )=> {
        const nameContainsKeyword = keywords.some((keyword: any )=> channel.name.toLowerCase().includes(keyword.toLowerCase()));
        const descriptionContainsKeyword = keywords.some((keyword: any )=> channel.description.toLowerCase().includes(keyword.toLowerCase()));
        return (nameContainsKeyword || descriptionContainsKeyword) && channel.followerCount > minFollowers;
    });
}

export function getFollowedChannelIds(data: any) {
  return data.result.channels.map((channel: any) => channel.id);
}

// Get all channels
// axios.get('https://api.warpcast.com/v2/all-channels')
//   .then(response => {
//     const minFollowers = 1000;
//     const filteredChannels = filterChannels(response.data, keywords, minFollowers);
//     //console.log(filteredChannels.map((channel: any )=> channel.id), "recommeded channels for you!");
//    const filterChannelsData = filteredChannels.map((channel: any )=> channel.id);
//    return filterChannelsData;
//   })
//   .catch(error => {
//     console.error('There was an error making the request:', error);
//   });


