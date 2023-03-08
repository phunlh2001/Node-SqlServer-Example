require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");

const errorHandler = require("./_midleware/error-handler");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// api routes
app.use("/users", require("./users/user.controller"));

// global error handler
app.use(errorHandler);

// start server
const port = 5000;
app.listen(port, () => console.log("Server listening on port " + port));
