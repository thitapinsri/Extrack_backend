const Activities = require("../models/activitiesModel");
const { v4: uuidv4 } = require("uuid");
var ObjectId = require("mongoose").Types.ObjectId;

const getAllActivities = async (req, res, next) => {
  const activities = await Activities.find({
    owner: req.user.user_id,
  }).sort([["date", -1]]);
  res.send(activities);
};

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
};

const User = require("../models/userModel");

const addActivity = async (req, res, next) => {
  const user = await User.findOne({
    user_id: req.user.user_id,
  });

  const activity = new Activities({
    owner: user.user_id,
    ...req.body,
  });

  const validateResult = activity.validateSync();
  if (validateResult) {
    return res.status(400).send(validateResult);
  }
  
  await activity.save();
  return res.send(activity);
};

const editActivity = async (req, res, next) => {
  const { activity_type, activity_name, date, duration, comment } = req.body;

  if (activity_type) req.activity.activity_type = activity_type;
  if (activity_name) req.activity.activity_name = activity_name;
  if (date) req.activity.date = date;
  if (duration) req.activity.duration = duration;
  if (comment) req.activity.comment = comment;

  await req.activity.save();
  res.send(req.activity);
};

const removeActivity = async (req, res, next) => {
  await req.activity.remove();
  res.status(204).send();
};

const getDailyStat = async (req, res, next) => {
  const dailyStat = await Activities.aggregate([
    {
      $match: {
        owner: req.session.user_id,
      },
    },
    {
      $group: {
        _id: "$date",
        total_duration: {
          $sum: "$duration",
        },
      },
    },
    {
        $project:{
          week_day: { $dayOfWeek: "$_id" },
          total_duration: 1
        },
    },
    {
      $sort: {
        _id: -1,
      },
    },
  ]);
  res.send(dailyStat);
};


module.exports = {
  getAllActivities,
  getActivityById,
  addActivity,
  editActivity,
  removeActivity,
  getDailyStat,
};
