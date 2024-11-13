const { readStore, updateStore } = require("../store");

const todoList = async () => {
  let todos = await readStore("todo");
  return todos || [];
};

const createTodo = async (params) => {
  const todos = await todoList();
  let id = 0;
  if (todos.length) {
    let lastItem = todos[todos.length - 1];
    id = lastItem.id;
  } else {
    id = 1;
  }

  const todo = {
    id: todos.length + 1,
    title: params.title,
    content: params.content,
  };

  todos.push(todo);

  updateStore("todo", todos);

  return todo;
};

const updateTodo = async (id, params) => {
  const todos = await todoList();
  let index = todos.findIndex((todo) => todo.id === id);

  if (index === -1) return false;

  let todo = {
    id,
    title: params.title,
    content: params.content,
  };

  todos[index] = todo;

  updateStore("todo", todos);
  return todo;
};

const patchTodo = async (id, params) => {
  const todos = await todoList();
  let todo = todos.find((todo) => todo.id === id);

  if (!todo) return false;

  for (let [key, value] of Object.entries(params)) {
    todo[key] = value;
  }

  updateStore("todo", todos);
  return todo;
};

const deleteTodo = async (id) => {
  let todos = await todoList();
  let todo = todos.find((todo) => todo.id === id);

  if (!todo) return false;

  todos = todos.filter((item) => item.id !== todo.id);

  updateStore("todo", todos);

  return true;
};

const todoService = {
  todoList,
  createTodo,
  updateTodo,
  patchTodo,
  deleteTodo,
};

module.exports = todoService;
