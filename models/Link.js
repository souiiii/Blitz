import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
  {
    original: {
      type: String,
      required: true,
    },
    blitz: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true },
);

const linkModel = mongoose.model("links", linkSchema);

export default linkModel;
