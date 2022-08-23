const express = require('express');
const activityRoutes = express.Router();
const activitiesController = require('../controllers/activitiesController')
const Activities = require('../models/activitiesModel');
var ObjectId = require('mongoose').Types.ObjectId;

activityRoutes.param('activityId', async (req,res,next, id) => {
    if (!ObjectId.isValid(req.params.activityId)){
        return res.status(400).send()
     };

    const activity = await Activities.findById({_id: id})
    if (!activity) {
         return res.status(404).send();
    } 
    req.activity = activity
    next();
});

activityRoutes.get('/', activitiesController.getAllActivities);
activityRoutes.get('/daily-stats', activitiesController.getDailyStat);
activityRoutes.get('/:activityId', activitiesController.getActivityById);
activityRoutes.post('/', activitiesController.addActivity);
activityRoutes.patch('/:activityId', activitiesController.editActivity);
activityRoutes.delete('/:activityId', activitiesController.removeActivity);

module.exports = activityRoutes;

