const Activities = require('../models/activitiesModel');
const { v4: uuidv4 } = require("uuid");
var ObjectId = require('mongoose').Types.ObjectId;


const getAllActivities = async (req, res, next) => {
    const activities = await Activities.find({
        owner: req.user.user_id
    });
    res.send(activities);
}

const getActivityById = async (req, res, next) => {
    // if (!ObjectId.isValid(req.params.activityId)){
    //     return res.status(400).send()
    //  }; //true
    // const activity = await Activities.findById(req.params.activityId)
    // if (!activity) {
    //      return res.status(404).send();
    // } 
    // req.activity = activity

    res.status(200).send(req.activity);
}

const User = require('../models/userModel');

const addActivity = async (req, res, next) => {
    const user = await User.findOne({
        user_id: req.user.user_id
    })

    const activity = new Activities({
        owner: user.user_id,
        ...req.body,
    });
    const validiateResult = activity.validateSync();
    if (validiateResult) {
        return res.status(400).send(validiateResult)
    }
    await activity.save();
    return res.send(activity)
}

const editActivity = async (req, res, next) => {
    // if (!ObjectId.isValid(req.params.activityId)){
    //     return res.status(400).send()
    //  }; //true
    // const activity = await Activities.findById(req.params.activityId)
    // if (!activity) {
    //      return res.status(404).send();
    // } 
    // req.activity = activity

    const { activity_type, activity_name, date, duration, comment } = req.body
    if (activity_type) {
        req.activity.activity_type = activity_type;
    }
    if (activity_name) {
        req.activity.activity_name = activity_name;
    }
    if (date) {
        req.activity.date = date;
    }
    if (duration) {
        req.activity.duration = duration;
    }
    if (comment) {
        req.activity.comment = comment;
    }
    await req.activity.save()
    res.send(req.activity);
}

const removeActivity = async (req, res, next) => {
    // if (!ObjectId.isValid(req.params.activityId)){
    //     return res.status(400).send()
    //  }; //true
    // const activity = await Activities.findById(req.params.activityId)
    // if (!activity) {
    //      return res.status(404).send();
    // } 
    // req.activity = activity

    await req.activity.remove();
    res.status(204).send()
}
const getSummary = async (req, res, next) => {
    // laterst 7 day 
    let totalDurations;
    totalDurations = await Activities.aggregate([
        {
            $match: {
                owner: req.user.user_id
            },
        },
        {
            $group: {
                _id: "$date",
                total: { $sum: "$duration" },
            }
        }
    ]);

    // db.activities.aggregate({"$group": {_id:"$date","total": {"$sum": "$duration"}}})
    res.send(totalDurations)
}

module.exports = {
    getAllActivities,
    getActivityById,
    addActivity,
    editActivity,
    removeActivity,
    getSummary
};

// $group: {
//     _id: "$date",
//     total: { $sum: "$duration" },
// }