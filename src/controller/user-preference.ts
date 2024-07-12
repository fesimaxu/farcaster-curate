import { Request, Response, NextFunction } from "express";
import { sendErrorResponse, sendSuccessfulResponse } from "../utils";
import UserPreference from "../model/user-preference";

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
    const { fid } = req.body;

    const userPreferences = await UserPreference.find({
      fid
    });
    sendSuccessfulResponse(res, 200, userPreferences);
  } catch (err: any) {
    sendErrorResponse(res, 500, err);
  }
};