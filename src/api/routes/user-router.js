import express from "express";
import { body, param } from "express-validator";
import {
  deleteUser,
  getUser,
  getUserById,
  postUser,
  putUser,
} from "../controllers/user-controller.js";
import { validationErrors } from "../../middlewares/error-handlers.js";

const userRouter = express.Router();

const nameValidation = (required = false) =>
  body("name")
    .if((value) => required || value !== undefined)
    .isString()
    .withMessage("must be a string")
    .bail()
    .trim()
    .isLength({ min: 1, max: 100 });
const usernameValidation = (required = false) =>
  body("username")
    .if((value) => required || value !== undefined)
    .isString()
    .withMessage("must be a string")
    .bail()
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("must be 3 to 20 characters")
    .bail()
    .isAlphanumeric();
const emailValidation = (required = false) =>
  body("email")
    .if((value) => required || value !== undefined)
    .isString()
    .withMessage("must be a string")
    .bail()
    .trim()
    .isEmail()
    .normalizeEmail();
const passwordValidation = (required = false) =>
  body("password")
    .if((value) => required || value !== undefined)
    .isString()
    .withMessage("must be a string")
    .bail()
    .isLength({ min: 8 });

userRouter
  .route("/")
  .get(getUser)
  .post(
    nameValidation(true),
    usernameValidation(true),
    emailValidation(true),
    passwordValidation(true),
    body("role").optional().isIn(["user", "admin"]),
    validationErrors,
    postUser,
  );
userRouter
  .route("/:id")
  .get(param("id").isInt({ min: 1 }).toInt(), validationErrors, getUserById)
  .put(
    param("id").isInt({ min: 1 }).toInt(),
    body()
      .custom((_, { req }) =>
        ["name", "username", "email", "password", "role"].some((field) =>
          Object.hasOwn(req.body ?? {}, field),
        ),
      )
      .withMessage("at least one field must be provided"),
    nameValidation(),
    usernameValidation(),
    emailValidation(),
    passwordValidation(),
    body("role").optional().isIn(["user", "admin"]),
    validationErrors,
    putUser,
  )
  .delete(param("id").isInt({ min: 1 }).toInt(), validationErrors, deleteUser);

export default userRouter;
