import { Router } from "express";
import {
  createUserPreferenceAndInterest,
  getUserPreferenceAndInterest,
  getUserChannel,
  getUserFarcasterAccount,
} from "../controller/user-preference";

const router = Router();

router.post("/user/set-preference", createUserPreferenceAndInterest);
router.get("/user/get-preference/:fid", getUserPreferenceAndInterest);
router.get("/user/get-channel/:fid", getUserChannel);
router.get("/user/get-farcaster-account/:fid", getUserFarcasterAccount);

export default router;
