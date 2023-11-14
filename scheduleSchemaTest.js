const mongoose = require("mongoose")

const scheduleSchema = new mongoose.Schema({
    title: String,
    type: String,
    monday: [mongoose.SchemaTypes.ObjectId],
    tuesday: [mongoose.SchemaTypes.ObjectId],
    wednesday: [mongoose.SchemaTypes.ObjectId],
    thrusday: [mongoose.SchemaTypes.ObjectId],
    friday: [mongoose.SchemaTypes.ObjectId]
})

const sessionSchema = new mongoose.Schema({
    name: String,
    coach: String, //mongoose.SchemaTypes.ObjectId - when the coach json is created
    duration: Number,
    capacity: Number
})

module.exports = mongoose.model("Schedule", scheduleSchema);
module.exports = mongoose.model("Session", sessionSchema);