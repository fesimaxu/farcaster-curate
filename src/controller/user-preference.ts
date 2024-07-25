import { Request, Response, NextFunction } from "express";
import { sendErrorResponse, sendSuccessfulResponse } from "../utils";
import UserPreference, { IUserPreference } from "../model/user-preference";
import { filterChannels, getFollowedChannelIds } from "../utils/channelSuggestion";
import { getTopFollowers } from "../utils/accountSuggestion";
import {personalizedFeed} from "../utils/personalizedFeed";
import {getCasts} from "../utils/usersCast";
import { getChannel } from "../utils/axios";
import {userFollowedChannel} from '../utils/userFollowedChannel';
import {allUserFollowers} from '../utils/allUserFollowers';
import neynarClient from "../utils/neynarClient";
import { followUser } from "../utils/folllowUser";
import { config } from 'dotenv';
config();

export const createUserPreferenceAndInterest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { preferences, fid } = req.body;

    // Convert preferences to lowercase
    const lowercasePreferences = preferences.map((pref: string) => pref.toLowerCase());

    // Check if user preferences exist for the given fid
    const existingUser = await UserPreference.findOne({ fid });
    
    if (!existingUser) {
      // If not found, create a new user preference
      const userPreferences: any = new UserPreference({
        fid,
        preference: lowercasePreferences,
      });
      await userPreferences.save();
      const userResults = {
        fid: userPreferences.fid,
        preferences: userPreferences.preference
       }
      
      return sendSuccessfulResponse(res, 200, userResults);
    }

    // If found, update the existing user preferences
    let updatedPreferences = existingUser.preference.map((pref: string) => pref.toLowerCase());

    // Filter out existing preferences and merge new ones
    const newPreferences = lowercasePreferences.filter(
      (newPref: string) => !updatedPreferences.includes(newPref)
    );

    updatedPreferences = [...updatedPreferences, ...newPreferences];

    const updateField: Partial<IUserPreference> = {
      preference: updatedPreferences,
    };

    const updateUserPreferences: any = await UserPreference.findByIdAndUpdate(existingUser._id, updateField, {
      new: true,
    });

   const userResults = {
    fid: updateUserPreferences.fid,
    preferences: updateUserPreferences.preference
   }

    sendSuccessfulResponse(res, 200, userResults);
  } catch (err: any) {
    sendErrorResponse(res, 500, err.message);
  }
};

export const getUserPreferenceAndInterest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // request body payload
  try {
    const { fid } = req.params;

    const userPreferences = await UserPreference.find({
      fid,
    });
    if(!userPreferences || userPreferences.length === 0){
      sendSuccessfulResponse(res, 200, []); 
    }
     const userResults = userPreferences.map((user) => {
        return {
          fid: user.fid,
          preferences: user.preference
        }
      })
    sendSuccessfulResponse(res, 200, userResults);
  } catch (err: any) {
    sendErrorResponse(res, 500, err);
  }
};

export const getUserChannel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // request body payload
  try {
    const { fid } = req.params;

    const userPreferences = await UserPreference.find({
      fid,
    });

    // const userPreferences = ["crypto", "social", "airdrop"];
    const userResults = userPreferences.map((user) => {
      return user.preference
    })
    const flatUserPreferences = userResults.flat();
    const minFollowers = 5000;
    const data = await getChannel();
    const filteredChannels = filterChannels(data, flatUserPreferences, minFollowers);


    const userfollowedchannel = await userFollowedChannel(fid)

    const followedChannelIds = getFollowedChannelIds(userfollowedchannel);

    const recommendedChannels = filteredChannels.filter((channel: any) => !followedChannelIds.includes(channel.id));

    sendSuccessfulResponse(res, 200, recommendedChannels);
  } catch (err: any) {
    sendErrorResponse(res, 500, err);
  }
};

export const getUserFarcasterAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // request body payload
  try {

    const { fid, preferences } = req.body;

    // const userPreferences = await UserPreference.find({
    //   fid,
    // });

    // const userResults = userPreferences.map((user) => {
    //   return user.preference
    // })
    // const flatUserPreferences = userResults.flat();

    const updatedPreferences = preferences.map((pref: string) => pref.toLowerCase());


    const minFollowers = 5000;
    const data = await getChannel();

    const topFollowersResponse = await getTopFollowers(
      data,
      updatedPreferences,
      minFollowers,
      fid // Add fid argument here
    );

    sendSuccessfulResponse(res, 200, topFollowersResponse);
  } catch (err: any) {
    sendErrorResponse(res, 500, err);
  }
};




export const getUserFeed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // request body payload
  try {
    const { fid } = req.params;

    // const userPreferences = await UserPreference.find({
    //   fid,
    // });
    

    const feeds = await personalizedFeed(fid);

    sendSuccessfulResponse(res, 200, feeds);
  } catch (err: any) {
    sendErrorResponse(res, 500, err);
  }
};


export const getUserCast = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // request body payload
  try {
    const { fid } = req.params;

    const userPreferences = await UserPreference.find({
      fid,
    });
    

    const response = await getCasts(fid);

    sendSuccessfulResponse(res, 200, response);
  } catch (err: any) {
    sendErrorResponse(res, 500, err);
  }
};


export const getUserFollowedChannels = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // request body payload
  try {
    const { fid } = req.params;

    const userPreferences = await UserPreference.find({
      fid,
    });
    

    const response = await userFollowedChannel(fid);

    sendSuccessfulResponse(res, 200, response);
  } catch (err: any) {
    sendErrorResponse(res, 500, err);
  }
};


export const getAllUserFollowers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // request body payload
  try {
    const { fid } = req.params;

    const userPreferences = await UserPreference.find({
      fid,
    });
    

    const response = await allUserFollowers(fid);

    sendSuccessfulResponse(res, 200, response);
  } catch (err: any) {
    sendErrorResponse(res, 500, err);
  }
};


export const followFarcasterUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const { signer_uuid, fids } = req.body;


    const response = await followUser(signer_uuid, fids);

    sendSuccessfulResponse(res, 200, response);
  } catch (err: any) {
    sendErrorResponse(res, 500, err);
  }
};

