import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema({
    subscriber: { type: Schema.Types.ObjectId, ref: 'User' }, // The User who owns this Subscription
    channel: { type: Schema.Types.ObjectId, ref: 'User' }, // Channel to which the user is subscribed
}, { timestamps: true })

const Subscription = mongoose.model('subscription', subscriptionSchema);
export default Subscription;