import { validationResult } from "express-validator";

const notFoundHandler = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    next(err);
    return;
  }

  const status =
    err.status ??
    err.statusCode ??
    (err.code === "LIMIT_FILE_SIZE"
      ? 413
      : err.name === "MulterError"
        ? 400
        : 500);
  const safeStatus =
    Number.isInteger(status) && status >= 400 && status <= 599 ? status : 500;

  res.status(safeStatus).json({
    error: {
      message: err.message,
      status: safeStatus,
    },
  });
};

const validationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors
      .array()
      .map((error) => `${error.path}: ${error.msg}`)
      .join(", ");
    const error = new Error(messages);
    error.status = 400;
    next(error);
    return;
  }
  next();
};

export { notFoundHandler, errorHandler, validationErrors };
