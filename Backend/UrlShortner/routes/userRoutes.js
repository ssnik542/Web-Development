const express = require('express');
const { createUser, loginUser,logoutUser } = require('../controllers/user.controller');
const userRouter = express.Router();

userRouter.post('/signup', createUser)
userRouter.post('/login', loginUser)
userRouter.get('/logout', logoutUser)
module.exports = userRouter