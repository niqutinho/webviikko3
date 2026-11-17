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

const getUserById = async (req, res) => {
  const user = await findUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const postUser = async (req, res) => {
  const result = await addUser(req.body);
  res.status(201).json({ message: "New user added.", result });
};

const putUser = async (req, res) => {
  const updated = await modifyUser(req.body, req.params.id);
  if (!updated) {
    res.sendStatus(404);
    return;
  }
  res.json({ message: "User item updated." });
};

const deleteUser = async (req, res) => {
  const deleted = await removeUser(req.params.id);
  if (!deleted) {
    res.sendStatus(404);
    return;
  }
  res.json({ message: "User item deleted." });
};

export { getUser, getUserById, postUser, putUser, deleteUser };
