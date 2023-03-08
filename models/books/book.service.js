const db = require("../../_helpers/db");

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  return await db.Book.findAll();
}

async function getById(id) {
  return await getBook(id);
}

async function create(books) {
  // validate
  for (let book of books) {
    if (await db.Book.findOne({ where: { title: book.title } })) {
      throw `Title ${book.title} is already exists`;
    }
  }

  const bookCreate = await db.Book.bulkCreate(books);

  // create book
  return bookCreate;
}

async function update(id, params) {
  const book = await getBook(id);

  // validate
  const bookChanged = params.title && book.title !== params.title;
  if (
    bookChanged &&
    (await db.Book.findOne({ where: { title: params.title } }))
  ) {
    throw `Book ${params.title} is already taken`;
  }

  // copy params to user and save
  Object.assign(book, params);
  await book.save();
}

async function _delete(id) {
  const book = await getBook(id);
  await book.destroy();
}

// helper functions

async function getBook(id) {
  const book = await db.Book.findByPk(id);
  if (!book) throw "Book not found";
  return book;
}
