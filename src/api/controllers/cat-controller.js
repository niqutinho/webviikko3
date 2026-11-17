import {
  addCat,
  findCatById,
  findCatsByUserId,
  listAllCats,
  modifyCat,
  removeCat,
} from "../models/cat-model.js";

const getCat = async (req, res) => {
  res.json(await listAllCats());
};

const getCatById = async (req, res) => {
  const cat = await findCatById(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const getCatsByUserId = async (req, res) => {
  res.json(await findCatsByUserId(req.params.id));
};

const postCat = async (req, res) => {
  const result = await addCat(req.body, req.file?.filename);
  res.status(201).json({ message: "New cat added.", result });
};

const putCat = async (req, res) => {
  const updated = await modifyCat(req.body, req.params.id);
  if (!updated) {
    res.sendStatus(404);
    return;
  }
  res.json({ message: "Cat item updated." });
};

const deleteCat = async (req, res) => {
  const deleted = await removeCat(req.params.id);
  if (!deleted) {
    res.sendStatus(404);
    return;
  }
  res.json({ message: "Cat item deleted." });
};

export { getCat, getCatById, getCatsByUserId, postCat, putCat, deleteCat };
