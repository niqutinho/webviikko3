import promisePool from "../../utils/database.js";

const userSelect = "SELECT user_id, name, username, email, role FROM wsk_users";

const listAllUsers = async () => {
  const [rows] = await promisePool.query(`${userSelect} ORDER BY user_id`);
  return rows;
};

const findUserById = async (id) => {
  const [rows] = await promisePool.execute(`${userSelect} WHERE user_id = ?`, [
    id,
  ]);
  return rows[0] ?? false;
};

const findUserByUsername = async (username) => {
  const [rows] = await promisePool.execute(
    `SELECT user_id, name, username, email, password, role
     FROM wsk_users
     WHERE username = ?`,
    [username],
  );
  return rows[0] ?? false;
};

const addUser = async (user) => {
  const { name, username, email, password, role = "user" } = user;
  const [result] = await promisePool.execute(
    `INSERT INTO wsk_users (name, username, email, password, role)
     VALUES (?, ?, ?, ?, ?)`,
    [name, username, email, password, role],
  );
  return { user_id: result.insertId };
};

const modifyUser = async (user, id) => {
  const columns = ["name", "username", "email", "password", "role"];
  const updates = columns.filter((column) => Object.hasOwn(user, column));
  if (updates.length === 0) {
    return false;
  }

  const assignments = updates.map((column) => `\`${column}\` = ?`).join(", ");
  const values = updates.map((column) => user[column]);
  const [result] = await promisePool.execute(
    `UPDATE wsk_users SET ${assignments} WHERE user_id = ?`,
    [...values, id],
  );
  return result.affectedRows > 0;
};

const removeUser = async (id) => {
  const connection = await promisePool.getConnection();
  let transactionStarted = false;

  try {
    await connection.beginTransaction();
    transactionStarted = true;
    await connection.execute("DELETE FROM wsk_cats WHERE owner = ?", [id]);
    const [result] = await connection.execute(
      "DELETE FROM wsk_users WHERE user_id = ?",
      [id],
    );
    await connection.commit();
    transactionStarted = false;
    return result.affectedRows > 0;
  } catch (error) {
    if (transactionStarted) {
      await connection.rollback();
    }
    throw error;
  } finally {
    connection.release();
  }
};

export {
  listAllUsers,
  findUserById,
  findUserByUsername,
  addUser,
  modifyUser,
  removeUser,
};
