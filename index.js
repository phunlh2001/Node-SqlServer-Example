require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");

const errorHandler = require("./_midleware/error-handler");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// api routes
app.use("/users", require("./models/users/user.controller"));
app.use("/books", require("./models/books/book.controller"));

// global error handler
app.use(errorHandler);

// start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
