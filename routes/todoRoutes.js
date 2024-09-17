const express = require("express");
const db = require("../connection/db");
const {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../repository/todoRepository");
const router = express.Router();

//Handle Get request
router.get("/", async (req, res) => {
  console.log("GET/ todo endpoint hit");
  try {
    console.log("get todo");
    const result = await getAllTodos();
    return res.send(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//Handle POST request
router.post("/", async (req, res) => {
  try {
    const todo = req.body;
    const result = await createTodo(todo);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to add task" });
  }
});

//Handle PUT request
// Update a task
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await updateTodo(id, req.body);
    return res.send({ id: result.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Handle DELETE request
//delete task
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deletedTodo = await deleteTodo(id);
    return res.send({ message: deletedTodo.message });
  } catch (err) {
    return res.status(err.statusCode).json({ message: err.message });
  }
});

module.exports = router;
