export default function (db) {
  return {
    getAllTasks: () => {
      return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            `SELECT * FROM task`,
            [],
            (_, results) => {
              if (results.rows.length != 0) {
                const data = [];
                for (let i = 0; i < results.rows.length; i++) {
                  const row = results.rows.item(i);
                  data.push(row);
                }
                resolve(data);
              } else {
                console.log(results, "error here");
                resolve([]);
              }
            },
            (error) => {
              reject(error);
            }
          );
        });
      });
    },
    getTaskByDate: (date) => {
      return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            "SELECT * FROM task WHERE createDate = ?",
            [date],
            [],
            (_, results) => {
              if (results.rows.length != 0) {
                const data = [];
                for (let i = 0; i < results.rows.length; i++) {
                  const row = results.rows.item(i);
                  data.push(row);
                }
                resolve(data);
              } else {
                resolve([]);
              }
            },
            (error) => {
              reject(error);
            }
          );
        });
      });
    },
    deleteTask: (taskID) => {
      return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            "DELETE FROM task WHERE id = ?",
            [taskID],
            (_, { rowsAffected }) => {
              console.log("Rows deleted: " + rowsAffected);
              resolve(rowsAffected);
            },
            (error) => {
              reject(error);
            }
          );
        });
      });
    },
    deleteAllTask: () => {
      return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            "DELETE FROM task",
            [],
            (_, { rowsAffected }) => {
              console.log("Rows deleted: " + rowsAffected);
              resolve(rowsAffected);
            },
            (error) => {
              reject(error);
            }
          );
        });
      });
    },
    getTodoByTasksID: (taskID) => {
      return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            `SELECT * FROM ToDos WHERE taskId = ?`,
            [taskID],
            (_, results) => {
              if (results.rows.length != 0) {
                const data = [];
                for (let i = 0; i < results.rows.length; i++) {
                  const row = results.rows.item(i);
                  data.push(row);
                }
                console.log("GetTODO", data);
                resolve(data);
              } else {
                console.log(results, "error here");
                resolve([]);
              }
            },
            (error) => {
              reject(error);
            }
          );
        });
      });
    },
    getTodoImportant: () => {
      return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            `SELECT * FROM ToDos WHERE important = ?`,
            [1],
            (_, results) => {
              if (results.rows.length != 0) {
                const data = [];
                for (let i = 0; i < results.rows.length; i++) {
                  const row = results.rows.item(i);
                  data.push(row);
                }
                resolve(data);
              } else {
                console.log(results, "Get important todo failed");
                resolve([]);
              }
            },
            (error) => {
              reject(error);
            }
          );
        });
      });
    },
    addNewToDo: (title, remind, color, completed, taskID, important) => {
      return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          console.log(startTime, endTime);
          tx.executeSql(
            `INSERT INTO ToDos (title, remind, color, completed, TaskId , important) VALUES (?, ?, ?, ?, ?, ?)`,
            [title, remind, color, completed, taskID, important],
            (_, results) => {
              resolve(results.insertId);
            },
            (error) => {
              reject(error);
            }
          );
        });
      });
    },
    addNewtask: (name, color, createDate, total) => {
      return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            "INSERT INTO task (name, color, createDate,total ) VALUES (?, ?, ?, ?)",
            [name, color, createDate, total],
            (_, results) => {
              resolve(results.insertId);
            },
            (error) => {
              reject(error);
            }
          );
        });
      });
    },
    updateCompleteTodo: (todoId, completed) => {
      return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            "UPDATE ToDos SET completed=? WHERE id=?",
            [completed, todoId],
            (_, { rowsAffected }) => {
              if (rowsAffected > 0) {
                resolve();
                console.log("Update complete successfully");
              } else {
                reject(new Error("Failed to update task."));
              }
            },
            (_, error) => reject(error)
          );
        });
      });
    },
    updateImportantTodo: (todoId, important) => {
      return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            "UPDATE ToDos SET important=? WHERE id=?",
            [important, todoId],
            (_, { rowsAffected }) => {
              if (rowsAffected > 0) {
                resolve();
              } else {
                reject(new Error("Failed to update task."));
              }
            },
            (_, error) => reject(error)
          );
        });
      });
    },
    deleteTodo: (todoId) => {
      return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            "DELETE FROM ToDos WHERE id=?",
            [todoId],
            (_, { rowsAffected }) => {
              if (rowsAffected > 0) {
                resolve();
              } else {
                reject(new Error("Failed to delete task."));
              }
            },
            (_, error) => reject(error)
          );
        });
      });
    },
    getTaskById: (taskId) => {
      return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            "SELECT * FROM task WHERE id=? LIMIT 1",
            [taskId],
            (_, results) => {
              if (results.rows.length != 0) {
                const data = [];
                for (let i = 0; i < results.rows.length; i++) {
                  const row = results.rows.item(i);
                  data.push(row);
                }
                resolve(data);
              } else {
                console.log(results, "Get task failed");
                resolve([]);
              }
            },
            (_, error) => reject(error)
          );
        });
      });
    }
  };
}
