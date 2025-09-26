import { Router } from "express";
import { changeCurrentPassword, getCurrentUser, getUserChannelProfile, getUserWatchedHistory, loginUser, logoutUser, refreshAccessToken, registerUser, updateAccountDetails, updateUserAvatar } from '../controllers/user.controller.js'
const router = Router();
import { upload } from '../middlewares/multer.middleware.js'
import { verifyJwt } from "../middlewares/auth.middleware.js";

router.route('/register').post(
    upload.fields([{ name: "avatar", maxCount: 1 }, { name: "coverImage", maxCount: 1 }]),
    registerUser
)
router.route('/login').post(loginUser)
router.route('/logout').post(verifyJwt, logoutUser)
router.route('/refresh-token').post(refreshAccessToken)
router.route('/change-password').post(verifyJwt, changeCurrentPassword)
router.route('/current-user').get(verifyJwt, getCurrentUser)
router.route('/update-account').patch(updateAccountDetails)
router.route('/avatar').patch(verifyJwt, upload.single('avatar'), updateUserAvatar)
router.route('/channel/:username').get(verifyJwt, getUserChannelProfile)
router.route('/watch-history').get(verifyJwt, getUserWatchedHistory)


export default router