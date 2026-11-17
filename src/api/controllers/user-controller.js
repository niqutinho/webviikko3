import bcrypt from "bcrypt";
import {
  addUser,
  findUserById,
  listAllUsers,
  modifyUser,
  removeUser,
} from "../models/user-model.js";

const getUser = async (req, res) => {
  res.json(await listAllUsers());
};

const getUserById = async (req, res, next) => {
  const user = await findUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    const error = new Error("User not found");
    error.status = 404;
    next(error);
  }
};

const postUser = async (req, res) => {
  const user = {
    ...req.body,
    password: await bcrypt.hash(req.body.password, 10),
  };
  const result = await addUser(user);
  res.status(201).json({ message: "New user added.", result });
};

const putUser = async (req, res, next) => {
  const user = { ...req.body };
  if (Object.hasOwn(user, "password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  const updated = await modifyUser(user, req.params.id);
  if (!updated) {
    const error = new Error("User not found");
    error.status = 404;
    return next(error);
  }
  res.json({ message: "User item updated." });
};

const deleteUser = async (req, res, next) => {
  const deleted = await removeUser(req.params.id);
  if (!deleted) {
    const error = new Error("User not found");
    error.status = 404;
    return next(error);
  }
  res.json({ message: "User item deleted." });
};

export { getUser, getUserById, postUser, putUser, deleteUser };
