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

const getCatById = async (req, res, next) => {
  const cat = await findCatById(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    const error = new Error("Cat not found");
    error.status = 404;
    next(error);
  }
};

const getCatsByUserId = async (req, res) => {
  res.json(await findCatsByUserId(req.params.id));
};

const postCat = async (req, res, next) => {
  if (!req.file) {
    const error = new Error("Invalid or missing file");
    error.status = 400;
    return next(error);
  }

  const result = await addCat(req.body, req.file?.filename);
  res.status(201).json({ message: "New cat added.", result });
};

const putCat = async (req, res, next) => {
  const updated = await modifyCat(req.body, req.params.id);
  if (!updated) {
    const error = new Error("Cat not found");
    error.status = 404;
    return next(error);
  }
  res.json({ message: "Cat item updated." });
};

const deleteCat = async (req, res, next) => {
  const deleted = await removeCat(req.params.id);
  if (!deleted) {
    const error = new Error("Cat not found");
    error.status = 404;
    return next(error);
  }
  res.json({ message: "Cat item deleted." });
};

export { getCat, getCatById, getCatsByUserId, postCat, putCat, deleteCat };
