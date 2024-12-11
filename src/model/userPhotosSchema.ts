import { Schema } from "mongoose";

const userPhotoSChema = new Schema({
  userID: { type: String },
  coverImages: {
    type: Array,
  },
});
