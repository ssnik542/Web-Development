import mongoose, { Schema } from "mongoose";

const tweetSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Tweet = mongoose.model('tweet', tweetSchema);
export default Tweet;