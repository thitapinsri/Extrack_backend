const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    username: { 
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
   },
   email: {
        type: String,
        required: true,
        unique: true
   },
   name: {
    type: String,
    require: true
   },
   height: {
    type: Number,
    required: true
   },
   weight:{
    type: Number,
    required: true
   },
   date_of_birth:{
    type: Date
   },
   inspiration: {
    type: String
   },
   goal_weight: {
    type: Number
   },
   weekly_goal: {
    type: Number
   },
   profile_picture: {
    type: Number,
    enum: {
        values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
   }

});

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();
    this.password = bcrypt.hashSync(this.password, 10);
    next();
  });
  

const userModel = new mongoose.model('user',userSchema);


module.exports = userModel;