import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { findUserByUsername } from "../models/user-model.js";

const getMe = async (req, res, next) => {
  if (res.locals.user) {
    res.json({ message: "token ok", user: res.locals.user });
    return;
  }

  const error = new Error("Authentication required");
  error.status = 401;
  next(error);
};

const postLogin = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await findUserByUsername(username);

  if (!user) {
    const error = new Error("Invalid username or password");
    error.status = 401;
    return next(error);
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    const error = new Error("Invalid username or password");
    error.status = 401;
    return next(error);
  }

  const userWithNoPassword = {
    user_id: user.user_id,
    name: user.name,
    username: user.username,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(userWithNoPassword, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  res.json({ user: userWithNoPassword, token });
};

export { getMe, postLogin };
