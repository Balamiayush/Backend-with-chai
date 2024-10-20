import { Router } from "express";
import registerUser from "../controllers/user.controller.js";
import upload from "../middlewares/multer.middlewares.js";
const router = Router();

// User routes
router.route("/register").post(
  upload.field(
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "cover",
      maxCount: 1,
    }
    
  ),

  registerUser
);
export default router;
