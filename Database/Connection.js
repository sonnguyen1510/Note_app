import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("MyTodo.db");

const createTasksTable = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS task (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, color TEXT,total INTERGER, createDate TEXT)",
        [],
        (_, result) => {
          console.log("tasks table created successfully");
          resolve(result);
        },
        (_, error) => {
          console.log("Error creating tasks table: ", error);
          reject(error);
        }
      );
    });
  });
};

const createTodosTable = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS ToDos (id INTEGER PRIMARY KEY AUTOINCREMENT, taskId INTEGER, title TEXT, remind TEXT,color TEXT , completed INTEGER , important INTEGER)",
        [],
        (_, result) => {
          console.log("Todos table created successfully");
          resolve(result);
        },
        (_, error) => {
          console.log("Error creating Todos table: ", error);
          reject(error);
        }
      );
    });
  });
};

const initializeDatabase = async () => {
  try {
    await createTasksTable();
    await createTodosTable();
  } catch (error) {
    console.log("Error initializing database: ", error);
  }
};

export { db, initializeDatabase };
