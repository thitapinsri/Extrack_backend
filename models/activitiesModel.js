const mongoose = require('mongoose');

const activitiesSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true
    },
    activity_type: {
        type: String,
        enum: {
            values: ['cardio','weight training'],
            message: 'activity_type value is not supported'
        },
        required: true,
    },
    activity_name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
    }
});

const activitiesModel = new mongoose.model('activities', activitiesSchema);
module.exports = activitiesModel;