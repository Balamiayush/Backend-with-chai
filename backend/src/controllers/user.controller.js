
import { User } from "../models/user.models.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
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
  const { username, email, password, fullName } = req.body;
  if (
    [username, email, password, fullName].some((field) => field?.trim() === " ")
  ) {
    throw new ApiError("Fields cannot be empty", 400);
  }
  const existedUser  = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError("User already exists", 400);
  } 
  req.files?.avatar[0]?.path
});

export default registerUser;
