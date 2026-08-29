import mongoose from "mongoose";

export default async function connectMongo(path) {
  return await mongoose.connect(path);
}
