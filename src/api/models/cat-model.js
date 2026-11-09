const catItems = [
  {
    cat_id: 9592,
    cat_name: "Frank",
    weight: 11,
    owner: 3609,
    filename: "f3dbafakjsdfhg4",
    birthdate: "2021-10-12",
  },
  {
    cat_id: 9590,
    cat_name: "Mittens",
    weight: 8,
    owner: 3602,
    filename: "f3dasdfkjsdfhgasdf",
    birthdate: "2021-10-12",
  },
];

const listAllCats = () => catItems;

const findCatById = (id) => catItems.find((item) => item.cat_id === Number(id));

const addCat = (cat, filename) => {
  const newId = Math.max(0, ...catItems.map((item) => item.cat_id)) + 1;
  catItems.unshift({
    ...cat,
    ...(filename && { filename }),
    cat_id: newId,
  });
  return { cat_id: newId };
};

export { listAllCats, findCatById, addCat };
