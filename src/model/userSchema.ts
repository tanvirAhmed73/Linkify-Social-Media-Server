import { Document, model, Schema } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  day: number;
  month: number;
  year: number;
  gender: string;
  city: string;
  country: string;
  profilePicture?: string;
  coverPicture?: string;
  about?: string;
  followers: any[];
  following: any[];
  isAdmin: boolean;
  createdAt: Date;
}

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  day: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
  },
  coverPicture: {
    type: String,
  },
  about: {
    type: String,
  },
  followers: {
    type: Array,
  },
  following: {
    type: Array,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const User = model<IUser>("User", userSchema);
export default User;
