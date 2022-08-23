const express = require('express');
const authRoutes = express.Router();

const authController = require('../controllers/authController')
const userController = require('../controllers/userController');

authRoutes.post("/signin",authController.signIn)
authRoutes.post("/signup", userController.createUser)
authRoutes.post("/signout",authController.signOut)

module.exports = authRoutes;

 