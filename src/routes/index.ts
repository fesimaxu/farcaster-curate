import { Router } from "express";
import { createUserPreferenceAndInterest, getUserPreferenceAndInterest } from "../controller/user-preference";

const router = Router();


router.post('/user/set-preference', createUserPreferenceAndInterest);
router.get('/user/get-preference', getUserPreferenceAndInterest);


export default router