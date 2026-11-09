const userItems = [
  {
    user_id: 3609,
    name: "John Doe",
    username: "johndoe",
    email: "john@metropolia.fi",
    role: "user",
    password: "password",
  },
  {
    user_id: 3602,
    name: "Jane Doe",
    username: "janedoe",
    email: "jane@metropolia.fi",
    role: "user",
    password: "password",
  },
];

const listAllUsers = () => userItems;

const findUserById = (id) =>
  userItems.find((item) => item.user_id === Number(id));

const addUser = (user) => {
  const newId = Math.max(0, ...userItems.map((item) => item.user_id)) + 1;
  userItems.unshift({ ...user, user_id: newId });
  return { user_id: newId };
};

export { listAllUsers, findUserById, addUser };
