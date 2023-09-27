import DAO from "./DAO";

export default async function insertData(db) {
  const insertDataPromise = (data) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO task (name, color, createDate, total ) VALUES (?, ?, ?, ?)",
          [data.name, data.color, data.createDate, data.total],
          (_, insert) => {
            //console.log(data, insert);
            const promises = data.todos.map((todo) => {
              return new Promise((resolve, reject) => {
                tx.executeSql(
                  "INSERT INTO ToDos (taskId, title, remind,color, completed, important) VALUES (?, ?, ?, ?, ?, ?)",
                  [
                    insert.insertId,
                    todo.title,
                    todo.remind,
                    todo.color,
                    todo.completed,
                    todo.important
                  ],
                  (_, insert) => {
                    resolve();
                  },
                  (_, error) => reject(error)
                );
              });
            });

            Promise.all(promises)
              .then(() => resolve())
              .catch((error) => reject(error));
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  };

  const dataArray = [
    {
      name: "plan the trip",
      color: "#FF5E7D",
      createDate: "Tue Sep 26 2023",
      total: 2,
      todos: [
        {
          title: "Book flight",
          remind: "17:30",
          color: "#595BD9",
          completed: 1,
          important: 0
        },
        {
          title: "Passport check",
          remind: "20:30",
          color: "#F1C75B",
          completed: 1,
          important: 0
        }
      ]
    },
    {
      name: "Errands",
      color: "#F1C75B",
      createDate: "Tue Sep 26 2023",
      total: 4,
      todos: [
        {
          title: "Buy Milk",
          remind: "9:30",
          color: "#FF5E7D",
          completed: 1,
          important: 0
        },
        {
          title: "Clean house",
          remind: "10:30",
          color: "#4BCF82",
          completed: 1,
          important: 0
        },
        {
          title: "Jogging",
          remind: "19:30",
          color: "#FF8B64",
          completed: 0,
          important: 0
        },
        {
          title: "Playing",
          remind: "21:30",
          color: "#24A6D9",
          completed: 1,
          important: 0
        }
      ]
    },
    {
      name: "Job for today",
      color: "#88D274",
      createDate: "Wed Sep 27 2023",
      total: 3,
      todos: [
        {
          title: "Coffee shop",
          remind: "7:30",
          color: "#4BCF82",
          completed: 1,
          important: 0
        },
        {
          title: "Check list",
          remind: "12:30",
          color: "#595BD9",
          completed: 0,
          important: 0
        },
        {
          title: "Party night",
          remind: "15:30",
          color: "#FF8B64",
          completed: 1,
          important: 0
        }
      ]
    }
  ];
  const ClearData = DAO(db).deleteAllTask();
  const insertPromises = dataArray.map((data) => insertDataPromise(data));

  return [
    Promise.all(insertPromises)
      .then(() => {
        console.log("Insert successful");
      })
      .catch((error) => {
        console.log("Error inserting data: ", error);
      }),
    Promise.all(ClearData)
      .then(() => {
        console.log("ClearData successful");
      })
      .catch((error) => {
        console.log("Error Clearing data: ", error);
      })
  ];
}
