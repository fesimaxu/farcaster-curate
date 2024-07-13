import { Request, Response, NextFunction } from "express";
import { sendErrorResponse, sendSuccessfulResponse } from "../utils";
import UserPreference, { IUserPreference } from "../model/user-preference";
import { filterChannels } from "../utils/channelSuggestion";
import { getTopFollowers } from "../utils/accountSuggestion";
import { getChannel } from "../utils/axios";

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
    const response = filterChannels(data, flatUserPreferences, minFollowers);

    sendSuccessfulResponse(res, 200, response);
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
    const topMember = 10;
    const data = await getChannel();

    const topFollowersResponse = await getTopFollowers(
      data,
      flatUserPreferences,
      minFollowers,
      topMember
    );

    sendSuccessfulResponse(res, 200, topFollowersResponse);
  } catch (err: any) {
    sendErrorResponse(res, 500, err);
  }
};
