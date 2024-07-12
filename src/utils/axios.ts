import axios from "axios";

export const getChannel = async () => {
    try {
      const response = await axios.get("https://api.warpcast.com/v2/all-channels");
      return response.data;
    } catch (error) {
      console.log("Error on crypto pairs: ", error);
      return [];
    }
  };


export const getFollowers = async (channelId: string) => {
    try {
        const response = await axios.get(`https://api.warpcast.com/v1/channel-followers?channelId=${channelId}`);
        return response.data;
    } catch (error) {
        console.log("Error on crypto pairs: ", error);
        return [];
    }
};
