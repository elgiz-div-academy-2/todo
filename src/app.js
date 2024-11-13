const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

const evnPath = path.join(__dirname, "../.env");
dotenv.config({ path: evnPath });

const todoRouter = require("./routes/todo.router");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("todo app");
});

app.use("/todo", todoRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`application is running on http://localhost:${port} port`);
});
