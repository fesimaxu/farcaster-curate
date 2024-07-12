import { Request, Response, NextFunction } from "express";
import { sendErrorResponse, sendSuccessfulResponse } from "../utils";
import UserPreference from "../model/user-preference";
import { filterChannels } from '../utils/channelSuggestion';
import { getAllChannels, getTopFollowers } from '../utils/accountSuggestion';
import {getChannel, getFollowers} from '../utils/axios';


export const createUserPreferenceAndInterest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // request body payload
  try {
    const { preferences, fid } = req.body;

    const userPreferences = new UserPreference({
      fid,
      preference: preferences,
    });
    await userPreferences.save();
    sendSuccessfulResponse(res, 200, userPreferences);
  } catch (err: any) {
    sendErrorResponse(res, 500, err);
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
      fid
    });
    sendSuccessfulResponse(res, 200, userPreferences);
  } catch (err: any) {
    sendErrorResponse(res, 500, err);
  }
};

export const getUserChannel= async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // request body payload
  try {

    const { fid } = req.params;

    const userPreferences = await UserPreference.find({
      fid
    });

    // const userPreferences = ["crypto", "social", "airdrop"];



    const minFollowers = 5000;
    const data = await getChannel();
    console.log(data, "data from controller");
    const response = filterChannels(data, userPreferences, minFollowers);
    console.log(response, "response from controller");

    sendSuccessfulResponse(res, 200, response);
  } catch (err: any) {
    sendErrorResponse(res, 500, err);
  }
};

export const getUserFarcasterAccount= async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // request body payload
  try {

    const { fid } = req.params;

    const userPreferences = await UserPreference.find({
      fid
    });

    // const userPreferences = ["crypto", "social", "airdrop"];

    const minFollowers = 5000;
    const topMember = 10;
    const data = await getChannel();

    const topFollowersResponse = await getTopFollowers(data, userPreferences, minFollowers, topMember);
  
    sendSuccessfulResponse(res, 200, topFollowersResponse);
  } catch (err: any) {
    sendErrorResponse(res, 500, err);
  }
};

