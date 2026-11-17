import promisePool from "../../utils/database.js";

const catSelect = `SELECT c.cat_id, c.cat_name, c.weight, c.owner,
                          u.name AS owner_name, c.filename, c.birthdate
                   FROM wsk_cats AS c
                   JOIN wsk_users AS u ON c.owner = u.user_id`;

const listAllCats = async () => {
  const [rows] = await promisePool.query(`${catSelect} ORDER BY c.cat_id`);
  return rows;
};

const findCatById = async (id) => {
  const [rows] = await promisePool.execute(`${catSelect} WHERE c.cat_id = ?`, [
    id,
  ]);
  return rows[0] ?? false;
};

const findCatsByUserId = async (userId) => {
  const [rows] = await promisePool.execute(
    `${catSelect} WHERE c.owner = ? ORDER BY c.cat_id`,
    [userId],
  );
  return rows;
};

const addCat = async (cat, filename) => {
  const { cat_name, weight, owner, birthdate } = cat;
  const [result] = await promisePool.execute(
    `INSERT INTO wsk_cats (cat_name, weight, owner, filename, birthdate)
     VALUES (?, ?, ?, ?, ?)`,
    [
      cat_name,
      weight,
      owner,
      filename ?? cat.filename ?? "",
      birthdate ?? null,
    ],
  );
  return { cat_id: result.insertId };
};

const modifyCat = async (cat, id) => {
  const columns = ["cat_name", "weight", "owner", "filename", "birthdate"];
  const updates = columns.filter((column) => Object.hasOwn(cat, column));
  if (updates.length === 0) {
    return false;
  }

  const assignments = updates.map((column) => `\`${column}\` = ?`).join(", ");
  const values = updates.map((column) => cat[column]);
  const [result] = await promisePool.execute(
    `UPDATE wsk_cats SET ${assignments} WHERE cat_id = ?`,
    [...values, id],
  );
  return result.affectedRows > 0;
};

const removeCat = async (id) => {
  const [result] = await promisePool.execute(
    "DELETE FROM wsk_cats WHERE cat_id = ?",
    [id],
  );
  return result.affectedRows > 0;
};

export {
  listAllCats,
  findCatById,
  findCatsByUserId,
  addCat,
  modifyCat,
  removeCat,
};
