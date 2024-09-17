const db = require("../connection/db");

const getAllTodos = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM todo", (err, result) => {
      if (err) {
        console.log("there is error in getting data B:", err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const createTodo = (todo) => {
  let { task, completed } = todo;

  completed = completed ?? false;

  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO todo (task, completed) VALUES (?, ?)",
      [task, completed],
      (err, result) => {
        if (err) {
          console.log("there is error while adding new task B :", err);
          reject(err);
        } else {
          resolve({ id: result.insertId, task, completed });
        }
      }
    );
  });
};

const updateTodo = (id, todo) => {
  const { task, completed } = todo;

  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE todo SET task = ?, completed = ? WHERE id = ?",
      [task, completed, id],
      (err, result) => {
        if (err) {
          console.log("Error updating Task  B: ", err);
          reject({ statusCode: 500, message: err.message });
        }
        if (result.affectedRows === 0) {
          reject({ statusCode: 404, message: "Task not found" });
        }
        resolve({ id, task, completed });
      }
    );
  });
};

const deleteTodo = (id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM todo WHERE id = ?", [id], (err, result) => {
      if (err) {
        console.log("Error deleting task", err);
        reject({ statusCode: 500, message: err.message });
      }
      if (result.affectedRows === 0) {
        reject({ statusCode: 404, message: "Task not found" });
      }
      resolve({ message: "Task deleted Successfully." });
    });
  });
};

module.exports = {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
