import mongoose, { Schema } from 'mongoose';


const followSchema = new Schema(
    {
        following: {
            type: String,
            required: true,
        },
        followedBy: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

export const Follow = mongoose.model('Follow', followSchema);