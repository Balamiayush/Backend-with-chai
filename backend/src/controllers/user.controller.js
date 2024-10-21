import { User } from "../models/user.models.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
  // 1. Extract user details from request body get  user details by forntend
  //2 . validation -{not empty}
  //3. Check if the user already exists (email,username)
  //4. If the user exists, return an error
  // check  for img , check for avtar
  // upload them to   cloudnary
  //5. If the user does not exist, create a new user
  //6. Save the user to the database
  //7. Return a success message
  const { username, fullName, password, email } = req.body;
  // console.log(password,fullName,email);
  if (
    [fullName, password, email, username].some((field) => field?.trim() == " ")
  ) {
    throw new ApiError("Fields cannot be empty", 400);
  }
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) throw new ApiError("User already exists", 400);
  const avatarLocalPath = req.files?.avatar[0]?.path;
  //const coverImageLocalPath = req.files?.coverImage[0]?.path;

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }
  if (!coverImageLocalPath) {
    throw new ApiError("Cover image is required", 400);
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath, "avatar");
  const coverImage = await uploadOnCloudinary(coverImageLocalPath, "cover");
  if (!avatar) {
    throw new ApiError("Failed to upload avatar to cloudinary", 500);
  }
  const user = await User.create({
    username,
    email,
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || " ",
    password,
  });

const createdUser =   User.findById(user._id)
 .select("-password -refreshToken")
 if(!createdUser){
  throw new ApiError("Failed to create user", 500);
 }
  return res.status(201).json(new ApiResponse(200,createdUser,'successflly user registerr'))
});

export default registerUser;
