const todoService = require("../services/todo.service");

const todoList = async (req, res) => {
  res.json(await todoService.todoList());
};

const createTodo = async (req, res) => {
  const body = req.body;

  if (body.title?.length < 3)
    return res
      .status(401)
      .json({ message: "minimum size of title needs to be 3" });

  if (body.content?.length < 5)
    return res
      .status(401)
      .json({ message: "minimum size of content needs to be 5" });

  let todo = await todoService.createTodo(body);

  res.json({ message: "todo is created successfully", todo });
};

const updateTodo = async (req, res) => {
  const body = req.body;
  const id = +req.params.id;

  if (body.title?.length < 3)
    return res
      .status(401)
      .json({ message: "minimum size of title needs to be 3" });

  if (body.content?.length < 5)
    return res
      .status(401)
      .json({ message: "minimum size of content needs to be 5" });

  let todo = await todoService.updateTodo(id, body);

  if (!todo) return res.status(404).json({ error: "todo is not found" });

  res.json({ message: "todo is updated successfully", todo });
};

const updateTodoPart = async (req, res) => {
  const body = req.body;
  const id = +req.params.id;

  if (body.title && body.title.length < 3)
    return res
      .status(401)
      .json({ message: "minimum size of title needs to be 3" });

  if (body.content && body.content.length < 5)
    return res
      .status(401)
      .json({ message: "minimum size of content needs to be 5" });

  let todo = await todoService.patchTodo(id, body);

  if (!todo) return res.status(404).json({ error: "todo is not found" });

  res.json({ message: `todo is updated successfully`, todo });
};

const deleteTodo = async (req, res) => {
  const id = +req.params.id;

  if (typeof id != "number")
    return res.status(401).json({ error: "id is not valid" });

  let result = await todoService.deleteTodo(id);

  if (!result) return res.status(404).json({ error: "todo is not found" });

  res.json({
    message: "todo is deleted successfully",
  });
};

module.exports = {
  todoList,
  createTodo,
  updateTodo,
  updateTodoPart,
  deleteTodo,
};
