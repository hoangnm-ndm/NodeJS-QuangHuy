import mongoose from "mongoose";
import { optionsSchema } from "../../shared/constants/optionsShema.js";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: true,
    },
  },
  optionsSchema,
);

export const User = mongoose.model("User", userSchema);
