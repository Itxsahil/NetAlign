import mongoose, { Schema } from "mongoose";

const followSchema = new Schema(
  {
    following: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    followedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Follow = mongoose.model("Follow", followSchema);
