import { Router } from "express";
import {
  createUserPreferenceAndInterest,
  getUserPreferenceAndInterest,
  getUserChannel,
  getUserFarcasterAccount,
  getUserFeed,
  getUserCast,
  getUserFollowedChannels,
  getAllUserFollowers,
  followFarcasterUser,
} from "../controller/user-preference";

const router = Router();

router.post("/user/set-preference", createUserPreferenceAndInterest);
router.get("/user/get-preference/:fid", getUserPreferenceAndInterest);
router.get("/user/get-channel/:fid", getUserChannel);
router.get("/user/get-farcaster-account/:fid", getUserFarcasterAccount);
router.get("/user/get-feed/:fid", getUserFeed);
router.get("/user/get-cast/:fid", getUserCast);
router.get("/user/get-followed-channels/:fid", getUserFollowedChannels);
router.get("/user/get-all-followers/:fid", getAllUserFollowers);
router.post("/user/follow-farcaster-user", followFarcasterUser);

export default router;
