// All user related routes are defined herr...!

import express from "express";
import { welcomeApiScreen, saveUser, logInUser, getAllUser } from "../controllers/user-controllers.js";
import varifyAuth from "../middleware/varify-auth.js";

const router = express.Router();

// Note: / api route api defined here...!
router.route('/').get(welcomeApiScreen);

// Note: / api route api to save user in DB...!
router.route('/save').post(saveUser);

router.route('/login').post(logInUser);

router.route('/fetch/all').get(varifyAuth, getAllUser);

export default router;