var mongoose = require("mongoose");

// Set Schema - to define a pattern for data
var MovieSchema = new mongoose.Schema({
    // _id:String,
    title: String,
    rating_avg: Number,
    rating_count:Number,
    imdbId: Number,
    tmdbId:Number,
    tags:String,
    posterUrl:String
},{collection: 'movieAll_v4'});
module.exports = mongoose.model("movies", MovieSchema);
