import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { findUserByUsername } from "../models/user-model.js";

const getMe = async (req, res) => {
  if (res.locals.user) {
    res.json({ message: "token ok", user: res.locals.user });
    return;
  }

  res.sendStatus(401);
};

const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await findUserByUsername(username);

  if (!user) {
    res.sendStatus(401);
    return;
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    res.sendStatus(401);
    return;
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
