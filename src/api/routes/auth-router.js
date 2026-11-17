import express from "express";
import { body } from "express-validator";
import { getMe, postLogin } from "../controllers/auth-controller.js";
import { authenticateToken } from "../../middlewares/authentication.js";
import { validationErrors } from "../../middlewares/error-handlers.js";

const authRouter = express.Router();

authRouter
  .route("/login")
  .post(
    body("username")
      .isString()
      .withMessage("must be a string")
      .bail()
      .trim()
      .isAlphanumeric(),
    body("password")
      .isString()
      .withMessage("must be a string")
      .bail()
      .notEmpty(),
    validationErrors,
    postLogin,
  );
authRouter.route("/me").get(authenticateToken, getMe);

export default authRouter;
