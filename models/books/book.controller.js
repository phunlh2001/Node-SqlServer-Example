const express = require("express");
const router = express.Router();
const Joi = require("joi");

const validateRequest = require("../../_midleware/validate-request");
const bookService = require("./book.service");

// routes

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", createSchema, create);
router.put("/:id", updateSchema, update);
router.delete("/:id", _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
  bookService
    .getAll()
    .then((users) => res.json(users))
    .catch(next);
}

function getById(req, res, next) {
  bookService
    .getById(req.params.id)
    .then((user) => res.json(user))
    .catch(next);
}

function create(req, res, next) {
  bookService
    .create(req.body)
    .then(() => res.json({ message: "Book created" }))
    .catch(next);
}

function update(req, res, next) {
  bookService
    .update(req.params.id, req.body)
    .then(() => res.json({ message: "Book updated" }))
    .catch(next);
}

function _delete(req, res, next) {
  bookService
    .delete(req.params.id)
    .then(() => res.json({ message: "Book deleted" }))
    .catch(next);
}

// schema functions

function createSchema(req, res, next) {
  const schema = Joi.array()
    .items(
      Joi.object({
        title: Joi.string().required(),
        link: Joi.string().required(),
      })
    )
    .min(1);

  validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    title: Joi.string().empty(""),
    link: Joi.string().empty(""),
  });
  validateRequest(req, next, schema);
}
