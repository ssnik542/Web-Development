const express = require('express');
const { createUser, loginUser, logoutUser } = require('../controllers/user.controller');
const userRouter = express.Router();


userRouter.post('/login', loginUser)

userRouter.post('/signup', createUser)

userRouter.get('/logout', logoutUser)
module.exports = userRouter