import { StatusBar } from "expo-status-bar";

import { useMemo, useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  Touchable,
  Modal,
  Dimensions,
  ScrollView
} from "react-native";
import { FloatingAction } from "react-native-floating-action";
import moment from "moment";
import Swiper from "react-native-swiper";
import ListTask from "../ViewTaskScrean/ListTask";
import AddListModal from "../ViewTaskScrean/AddTaskModal";
import Font from "../../fonts";
import InitialData from "../../Database/InitialData";

const { width } = Dimensions.get("screen");

import { db, initializeDatabase } from "../../Database/Connection";
import DAO from "../../Database/DAO";

const StartData = [];
export default function ViewTask() {
  const [List, setList] = useState(StartData);
  const [DisplayList, setDisplayList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        // Call the initializeDatabase function to initialize the database
        await initializeDatabase();
        console.log("Database initialized successfully");
        await InitialData(db);
        DAO(db)
          .getAllTasks()
          .then((Data) => {
            console.log("Retrieved tasks:", Data);
            Data.forEach((element) => {
              StartData.push(element);
            });
          })
          .catch((error) => {
            console.log("Error retrieving tasks:", error);
          });
      } catch (error) {
        console.log("Error initializing database: ", error);
      }
    }
    fetchData();
  }, []);

  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState(0);
  const swiper = useRef();

  const loadFont = Font();

  const weeks = useMemo(() => {
    const start = moment(start).add(week, "weeks").startOf("week");

    return [-1, 0, 1].map((adj) => {
      return Array.from({ length: 7 }).map((_, index) => {
        const date = moment(start).add(adj, "week").add(index, "day");

        return {
          weekday: date.format("ddd"),
          date: date.toDate()
        };
      });
    });
  }, [week]);

  const CreateTask = (name, color, Today) => {
    console.log("InsertDT", name, color, Today);

    console.log(List, "checking");
    DAO(db)
      .addNewtask(name, color, Today, 0)
      .then((id) => {
        console.log("Add task successfully", id);
      })
      .catch((error) => {
        console.error(error);
      });

    setList((current) => {
      if (!Array.isArray(current)) {
        current = []; // If current is not an array, initialize it as an empty array
      }

      return [
        ...current,
        {
          color: color,
          id: id,
          createDate: Today,
          name: name,
          total: 0
        }
      ];
    });
  };

  function PrintData() {
    DAO(db)
      .getAllTasks()
      .then((Data) => {
        //console.log("Retrieved tasks:", Data);
        const Dt = [];
        Data.forEach((element) => {
          Dt.push(element);
        });

        console.log(Dt);
      })
      .catch((error) => {
        console.log("Error retrieving tasks:", error);
      });
  }

  function DeleteTask(TaskID) {}

  const [AddTodoVisible, setAddTodoVisible] = useState(false);

  function AddTodoModal() {
    setAddTodoVisible(!AddTodoVisible);
  }

  return (
    <>
      <StatusBar style="dark"></StatusBar>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={style.container}>
          <View style={style.picker}>
            <Swiper
              index={1}
              ref={swiper}
              showsPagination={false}
              loop={false}
              onIndexChanged={(ind) => {
                if (ind === 1) {
                  return;
                }

                setTimeout(() => {
                  const newIndex = ind - 1;
                  const newWeek = week + newIndex;
                  setWeek(newWeek);
                  setValue(moment(value).add(newIndex, "week").toDate());
                  swiper.current.scrollTo(1, false);
                }, 100);
              }}
            >
              {weeks.map((dates, index) => (
                <View
                  style={[style.itemrow, { paddingHorizontal: 16 }]}
                  key={index}
                >
                  {dates.map((item, dateIndex) => {
                    const isActive =
                      value.toDateString() === item.date.toDateString();

                    return (
                      <TouchableWithoutFeedback
                        key={dateIndex}
                        onPress={() => {
                          setValue(item.date);
                          setDisplayList(
                            List.filter(
                              (items) =>
                                item.date.toDateString() == items.createDate
                            )
                          );
                        }}
                      >
                        <View
                          style={[
                            style.item,
                            isActive && {
                              backgroundColor: "#111",
                              borderColor: "#111"
                            }
                          ]}
                        >
                          <Text
                            style={[
                              style.itemWeekday,
                              isActive && { color: "#fff" }
                            ]}
                          >
                            {item.weekday}
                          </Text>
                          <Text
                            style={[
                              style.itemDate,
                              isActive && { color: "#fff" }
                            ]}
                          >
                            {item.date.getDate()}
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                    );
                  })}
                </View>
              ))}
            </Swiper>
          </View>
          <View style={{ paddingVertical: 10, paddingHorizontal: 13 }}>
            <Text style={style.dateString}>{value.toDateString()}</Text>
          </View>
          {/** Content */}
          <View style={style.content}>
            {DisplayList.length > 0 ? (
              <ListTask data={DisplayList}></ListTask>
            ) : (
              <View style={style.emptyContainer}>
                <Text style={{ color: "grey" }}>
                  No task to day , you can add more task by click add button
                </Text>
              </View>
            )}

            <Modal
              animationType="slide"
              visible={AddTodoVisible}
              onRequestClose={() => AddTodoModal()}
            >
              <AddListModal
                createTask={CreateTask}
                currentDate={value.toDateString()}
                closeModal={() => AddTodoModal()}
              />
            </Modal>
          </View>
        </View>
        <FloatingAction
          actions={actions}
          onPressItem={(name) => {
            if (name == "bt_addNote") {
              AddTodoModal();
            } else if (name == "bt_PrintNote") {
              PrintData();
            }
          }}
        ></FloatingAction>
      </SafeAreaView>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    paddingHorizontal: 36
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  divider: {
    backgroundColor: "#24A6D9",
    height: 1,
    flex: 1,
    alignSelf: "center"
  },
  title: {
    fontSize: 38,
    width: "auto",
    fontWeight: "800",
    color: "black",
    paddingHorizontal: 64
  },
  picker: {
    flex: 1,
    maxHeight: 74,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white"
  },
  itemrow: {
    width,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginHorizontal: -4
  },
  item: {
    flex: 1,
    height: 50,
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: "#e3e3e3",
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "column"
  },
  itemWeekday: {
    fontSize: 13,
    fontWeight: "300",
    color: "#737373",
    marginBottom: 4
  },
  itemDate: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111"
  },
  content: {
    flex: 5
  }
});

const actions = [
  {
    text: "Add new task",
    icon: require("../../assets/addNote.png"),
    name: "bt_addNote",
    position: 2
  },
  {
    text: "Print task",
    icon: require("../../assets/addNote.png"),
    name: "bt_PrintNote",
    position: 3
  }
];
