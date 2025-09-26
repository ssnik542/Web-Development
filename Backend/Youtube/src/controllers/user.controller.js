import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/user.model.js'
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from '../utils/ApiResponse.js'
import jwt from "jsonwebtoken";
import mongoose from 'mongoose'

const generateAccessTokenAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, 'Something went wrong while generating token')
    }
}

export const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

    const { fullName, email, username, password } = req.body
    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ email }, { username }]
    })
    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;
    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }


    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
})

export const loginUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;
    if (!(email || username) || !password) {
        throw new ApiError(400, "email or passworrd is required")
    }
    const user = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (!user) {
        throw new ApiError(404, "User not found")
    }
    const matchPassword = await user.isPasswordCorrect(password);
    if (!matchPassword) {
        throw new ApiError(401, "Invalid user credentials")
    }

    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select('-password -refreshToken');

    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options).json(new ApiResponse(200, {
        user: loggedInUser,
        accessToken,
        refreshToken
    }, "User logged in Successfully"))
})

export const logoutUser = asyncHandler(async (req, res) => {
    const id = req.user._id
    const user = await User.findByIdAndUpdate(id, {
        $unset: {
            'refreshToken': 1
        }
    }, {
        new: true
    })

    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200).clearCookie('accessToken', options).clearCookie('refreshToken', options).json(new ApiResponse(200, {}, "User logged out"))

})

export const refreshAccessToken = asyncHandler(async (req, res) => {
    try {
        const refreshTokenInc = req.cookies?.refreshToken || req.body.refreshToken;
        if (!refreshTokenInc) {
            throw new ApiError(401, "unathorized request")
        }
        const decodedToken = jwt.verify(refreshTokenInc, process.env.REFRESH_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id)
        if (!user) {
            throw new ApiError(404, "Invalid Access Token")
        }
        if (refreshTokenInc !== user?.refreshToken) {
            throw new ApiError(404, "Refresh token is expired")
        }
        const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id)
        const options = {
            httpOnly: true,
            secure: true
        }
        return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options).json(new ApiResponse(200, {
            accessToken,
            refreshToken
        }, "Access token refreshed"))
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Refresh Token")
    }
})

export const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user?._id)
    const ispasswordCOrrect = await user.isPasswordCorrect(currentPassword)
    if (!ispasswordCOrrect) {
        throw new ApiError(403, "The current password you entered is incorrect");
    }

    user.password = newPassword;
    const us = await user.save({ validateBeforeSave: false })
    return res.status(200).json(new ApiError(200, {}, "Password change successfully"));
})

export const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200).json(new ApiError(200, req.user, "Current user fetched successfully"));
})

export const updateAccountDetails = asyncHandler(async (req, res) => {
    const { fullName, email } = req.body
    if (!(email || fullName)) {
        throw new ApiError(400, "email or username is required")
    }

    const user = await User.findByIdAndUpdate(req.user._id, {
        $set: {
            fullName: fullName ? fullName : req.user.fullName,
            email: email ? email : req.user.email
        }
    }, { new: true }).select("-password")
    return res.status(200).json(new ApiError(200, user, "Account updated successfully"));
})

export const updateUserAvatar = asyncHandler(async (req, res) => {
    const avatarLocalPath = req.file?.path;
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is missing");
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    if (!avatar.url) {
        throw new ApiError(400, "Error while uploading on avatar");
    }

    const user = await User.findByIdAndUpdate(req.user._id, {
        $set: {
            avatar: avatar.url
        }
    }, { new: true }).select("-password")
    return res.status(200).json(new ApiError(200, user, "Avatar updated successfully"));
})


export const getUserChannelProfile = asyncHandler(async (req, res) => {
    let username = req.params;
    if (!username) {
        throw new ApiError(400, "No username found")
    }

    const channel = await User.aggregate([
        {
            $match: { username: username }
        }, {
            $lookup: {
                from: "subscriptions",  // The table to perform the join with.
                localField: "_id",  // The field in the current collection to match.
                foreignField: "channel",  // The field in the joined collection to match.
                as: "subscribers"  // The array variable name representing the joined results.  
            }
        }, {
            $lookup: {
                from: "subscriptions",  // The table to perform the join with.
                localField: "_id",  // The field in the current collection to match.
                foreignField: "subscriber",  // The field in the joined collection to match.
                as: "subscriberTo"  // The array variable name representing the joined results.  
            }
        }, {
            $addFields: {
                subscribersCount: { $size: "$subscribers" },
                channelsSubsToCound: { $size: "$subscriberTo" },
                isSubscribed: {
                    $cond: {
                        if: { $in: [req.user?._id, "$subscribers.subscriber"] },
                        then: true, else: false
                    }
                }
            }
        }, {
            $project: {
                fullName: 1,
                username: 1,
                subscribersCount: 1,
                channelsSubsToCound: 1,
                isSubscribed: 1,
                coverImage: 1,
                email: 1,
                avatar: 1

            }
        }
    ])

    if (!channel?.length) {
        throw new ApiError(400, "Channel not found")
    }
    return res.status(200).json(new ApiError(200, channel[0], "User channel fetched Successfully"));
})

export const getUserWatchedHistory = asyncHandler(async (req, res) => {
    const user = await User.aggregate([
        {
            $match: { _id: new mongoose.Types.ObjectId(req.user._id) }
        }, {
            $lookup: {
                from: "videos",
                localField: "watchHistory",
                foreignField: "_id",
                as: "watchHistory",
                pipeline: [{
                    $lookup: {
                        from: "users",
                        localField: "owner",
                        foreignField: "_id",
                        as: "owner",
                        pipeline: [{
                            $project: { fullName: 1, avatar: 1, username: 1 }
                        }]

                    }
                }, {
                    $addFields: { owner: { $arrayElemAt: ["$owner", 0] } }
                }]
            }
        }
    ])
    return res.status(200).json(new ApiError(200, user[0].watchedHistory, "watched Historyfetched Successfully"));
})
