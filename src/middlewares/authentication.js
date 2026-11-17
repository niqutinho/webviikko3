import jwt from "jsonwebtoken";
import "dotenv/config";

const authenticateToken = (req, res, next) => {
  const authenticationError = new Error("Authentication required");
  authenticationError.status = 401;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return next(authenticationError);
  }

  try {
    res.locals.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    const error = new Error("Invalid token");
    error.status = 403;
    next(error);
  }
};

export { authenticateToken };
