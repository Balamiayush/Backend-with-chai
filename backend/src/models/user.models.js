import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
   
    },
    avatar: {
      type: String, // URL to the avatar image
      required: true,
    },
    coverImage: {
      type: String, // URL to the cover image
    },
    watchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

userSchema.pre("save", async function (next) {
  // Check if the password field has been modified
  if (!this.isModified("password")) return next(); //password is  update then go out
  // Hash the password before saving
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
  // Compare the hashed password with the password provided by the user
  // Returns true if the passwords match, false otherwise
};
userSchema.methods.generateAccessToken = async function () {
  jwt.sign(
    {
      userId: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET
  ),
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    };
};
userSchema.methods.generateRefreshToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};
export const User = mongoose.model("User", userSchema);
