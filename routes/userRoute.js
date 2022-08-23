const express = require('express');
const userRoute = express.Router();
const userController = require('../controllers/userController')

const authSession = require('../middleware/authSession')

userRoute.use(authSession);
// path = /user/activities
const activitiesRoute = require('../routes/activitiesRoute')
userRoute.use('/activities',activitiesRoute);

// path = /user
// userRoute.get('/', userController.allUsers);
userRoute.get('/me', userController.getUserById);
userRoute.patch('/me', userController.editUser);
userRoute.patch('/goal', userController.editGoal);

module.exports = userRoute;