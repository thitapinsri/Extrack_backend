const User = require("../models/userModel");
const { v4: uuidv4 } = require("uuid");

// sign up
const createUser = async (req, res, next) => {
    let randomNumber = Math.floor(Math.random() * 10);
  try {
    const newUser = new User({ 
        user_id: uuidv4().slice(0, 8),
        profile_picture: randomNumber,
        ...req.body
    });
    await newUser.save();
    req.session.user_id = newUser.user_id;
    res.send("Register success");
  } catch (err) {
    res.send(err);
  }
};

// for update activity
const getUserById = async (req, res, next) => {
  const user = await User.findOne({ user_id: req.user.user_id });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.send(user);
};

// for setting personal info
const editUser = async (req, res, next) => {
  const user = await User.findOne({ user_id: req.user.user_id });
  if (!user) {
    return res.status(404).send();
  }
  const { username, password, name, email, height, weight, date_of_birth } = req.body;

  if (name) user.name = name;
  if (username) user.username = username;
  if (email) user.email = email;
  if (password) user.password = password;
  if (date_of_birth) user.date_of_birth = date_of_birth;
  if (weight) user.weight = weight;
  if (height) user.height = height;

  await user.save();
  res.send(user);
};
// for setting goal
const editGoal = async (req, res, next) => {
  const user = await User.findOne({ user_id: req.user.user_id });
  if (!user) {
    return res.status(404).send();
  }

  const { weekly_goal, goal_weight, inspiration } = req.body;

  if (weekly_goal) user.weekly_goal = weekly_goal;
  if (goal_weight) user.goal_weight = goal_weight;
  if (inspiration) user.inspiration = inspiration;

  await user.save();
  res.send(
    req.user._id,
    req.user.user_id,
    req.user.weekly_goal,
    req.user.goal_weight,
    req.user.inspiration
  );
};

// for community
const allUsername = async (req, res, next) => {
  const usernames = await User.find({}, { user_id: 1, name: 1 });
  res.send(usernames);
};

module.exports = {
  getUserById,
  createUser,
  editUser,
  editGoal,
  allUsername,
};
