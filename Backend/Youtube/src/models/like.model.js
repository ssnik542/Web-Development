import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema({
    video: {
        type: Schema.Types.ObjectId, ref: "video"
    },
    comment: {
        type: Schema.Types.ObjectId, ref: "comment"
    },
    tweet: {
        type: Schema.Types.ObjectId, ref: "tweet"
    },
    likedby: { type: Schema.Types.ObjectId, ref: "User" },

}, { timestamps: true })

const Like = mongoose.model('like', likeSchema);
export default Like;