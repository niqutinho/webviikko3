import express from "express";
import { body, param } from "express-validator";
import {
  deleteCat,
  getCat,
  getCatById,
  getCatsByUserId,
  postCat,
  putCat,
} from "../controllers/cat-controller.js";
import { validationErrors } from "../../middlewares/error-handlers.js";
import { createThumbnail, upload } from "../../middlewares/upload.js";
import { authenticateToken } from "../../middlewares/authentication.js";

const catRouter = express.Router();

catRouter
  .route("/")
  .get(getCat)
  .post(
    authenticateToken,
    upload,
    createThumbnail,
    body("cat_name")
      .isString()
      .withMessage("must be a string")
      .bail()
      .trim()
      .isLength({ min: 3, max: 50 }),
    body("weight").isFloat({ gt: 0 }).toFloat(),
    body("owner").isInt({ min: 1 }).toInt(),
    body("birthdate").isISO8601({ strict: true, strictSeparator: true }),
    validationErrors,
    postCat,
  );
catRouter
  .route("/user/:id")
  .get(
    param("id").isInt({ min: 1 }).toInt(),
    validationErrors,
    getCatsByUserId,
  );
catRouter
  .route("/:id")
  .get(param("id").isInt({ min: 1 }).toInt(), validationErrors, getCatById)
  .put(
    param("id").isInt({ min: 1 }).toInt(),
    body()
      .custom((_, { req }) =>
        ["cat_name", "weight", "owner", "birthdate", "filename"].some((field) =>
          Object.hasOwn(req.body ?? {}, field),
        ),
      )
      .withMessage("at least one field must be provided"),
    body("cat_name")
      .optional()
      .isString()
      .withMessage("must be a string")
      .bail()
      .trim()
      .isLength({ min: 3, max: 50 }),
    body("weight").optional().isFloat({ gt: 0 }).toFloat(),
    body("owner").optional().isInt({ min: 1 }).toInt(),
    body("birthdate")
      .optional()
      .isISO8601({ strict: true, strictSeparator: true }),
    body("filename")
      .optional()
      .isString()
      .withMessage("must be a string")
      .bail()
      .trim()
      .isLength({ max: 255 }),
    validationErrors,
    putCat,
  )
  .delete(param("id").isInt({ min: 1 }).toInt(), validationErrors, deleteCat);

export default catRouter;
