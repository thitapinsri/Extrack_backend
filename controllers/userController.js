const User =require('../models/userModel')
const { v4: uuidv4 } = require("uuid");


const allUsers = async (req,res,next) => {
    const users = await User.find({})
    res.send(users)
}
const createUser = async (req,res,next) => {
    try {
        const newUser = new User({user_id: uuidv4(),...req.body})
        await newUser.save();
        res.send("Register success");  
    }catch (err) {  
        res.send(err);
    }
};

const getUserById = async (req,res,next) => {
    // const {user_id} = req.params
    const user = await User.findOne({user_id: req.user.user_id})
    if (!user) {
        return res.status(404).json({error: "User not found"})
    }
    res.send(user);
    
}

const editUser = async (req,res,next) => {
    // const {user_id} = req.params
    const user = await User.findOne({user_id: req.user.user_id})
    if(!user) {
        return res.status(404).send();
    }
    const {username,password,name, height,weight,inspiration,goal_weight,weekly_goal} = req.body
    if (username){
        user.username = username;
    }
    if(password){
        user.password = password;
    }
    if(name){
        user.name = name;
    }
    if(height){
        user.height = height;
    }
     if(weight){
        user.weight = weight;
    }
    if(inspiration){
        user.inspiration = inspiration;
    }
    if(goal_weight){
        user.goal_weight = goal_weight;
    }
    if(weekly_goal){
        user.weekly_goal = weekly_goal;
    }
    await user.save();
    res.send(user);
}
module.exports = {
    getUserById,
    createUser,
    editUser,
    allUsers
}