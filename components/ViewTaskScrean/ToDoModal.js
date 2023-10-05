import React, { useEffect } from "react";
import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Modal,
  Dimensions
} from "react-native";
import Colors from "../../Colors";
import AddTodo from "./AddTodo";

import ToDoItem from "./ToDoItem";
import DAO from "../../Database/DAO";
import { db } from "../../Database/Connection";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

export default ToDoModal = function (props) {
  const [viewCompletedTask, setViewCompletedTask] = useState(true);
  const [CompletedTask, setCompletedTask] = useState([]);
  const [IncompleteTask, setIncompletedTask] = useState([]);
  const [AllTask, setAlltask] = useState(props.TaskItem);

  useEffect(() => {
    //console.log(TaskDetails);
    const Completed = [];
    const Incomplete = [];
    AllTask.map((task) => {
      if (task.completed == "1") {
        Completed.push(task);
      } else {
        Incomplete.push(task);
      }
    });
    setCompletedTask(Completed);
    setIncompletedTask(Incomplete);
    console.log("use effect");
  }, [AllTask]);

  const [isVisible, setVisible] = useState(false);
  const toggleVisibility = () => setVisible(!isVisible);

  const ItemSeparator = () => {
    return <View style={styles.separator} />;
  };

  const CreateTodo = (title, color, remind) => {
    //const options = { hour: "2-digit", minute: "2-digit", hour12: false };

    DAO(db)
      .addNewToDo(title, remind, color, 0, props.TaskID, 0)
      .then()
      .catch((error) => {
        console.error(error);
      });

    const updateList = [...AllTask];
    updateList.push({
      color: color,
      completed: 0,
      id: 549,
      important: 0,
      remind: remind,
      taskId: props.TaskID,
      title: title
    });
    setAlltask(updateList);
  };

  const setImportant = (id) => {
    const updateList = [...AllTask];
    for (let i = 0; i < updateList.length; i++) {
      if (updateList[i].id == id) {
        updateList[i].important = !updateList[i].important;
        DAO(db)
          .updateImportantTodo(id, updateList[i].important)
          .then(() => {})
          .catch((error) => console.error(error));
        break;
      }
    }

    setAlltask(updateList);
  };

  const setComplete = (id) => {
    const updateList = [...AllTask];
    console.log("complete", id);
    for (let i = 0; i < updateList.length; i++) {
      if (updateList[i].id == id) {
        updateList[i].completed = !updateList[i].completed;
        DAO(db)
          .updateCompleteTodo(id, updateList[i].completed)
          .then(() => {})
          .catch((error) => console.error(error));
        break;
      }
    }
    console.log("updateComplete");
    setAlltask(updateList);
  };

  const setViewCompletedTasks = () => {
    console.log("click");
    setViewCompletedTask(!viewCompletedTask);
  };

  const taskCount = CompletedTask.length + IncompleteTask.length;
  const completedCount = CompletedTask.length;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: props.modalHeight,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      marginTop: 30,
      paddingTop: 30
    },
    section: {
      flexDirection: "row",
      alignSelf: "stretch",
      marginTop: 20
    },
    header: {
      marginLeft: 24,
      borderBottomWidth: 3,
      justifyContent: "space-between"
    },
    title: {
      fontSize: 32,
      fontWeight: 800
    },
    taskCount: {
      marginTop: 4,
      marginBottom: 16,
      marginLeft: 10,
      color: Colors.gray,
      fontWeight: "600"
    },
    footer: {
      paddingLeft: 32,
      flexDirection: "row",
      alignItems: "center"
    },

    addTodo: {
      width: 130,
      borderRadius: 4,
      padding: 16,
      alignItems: "center",
      justifyContent: "center"
    },

    closeModal: {
      borderRadius: 4,
      alignItems: "center",
      justifyContent: "flex-start",
      marginRight: 13
    },
    todoContainer: {
      paddingVertical: 16,
      flexDirection: "row"
    },
    todo: {
      color: Colors.black,
      fontWeight: "700",
      fontSize: 16
    },
    timetableContainer: {
      flex: 1,
      height: Dimensions.get("window").height * 0.7,
      paddingHorizontal: 10,

      width: "100%",
      marginTop: 10,
      padding: 10
    },
    separator: {
      height: 10 // Adjust the height as desired for the spacing
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    completedTask: {
      width: 150,
      flex: 0,
      flexDirection: "row",
      alignItems: "center",
      height: 30,
      marginHorizontal: 12,
      marginBottom: 5,
      borderRadius: 10,
      elevation: 5,
      backgroundColor: Colors.black2
    }
  });

  {
    /**  Custom add to do */
  }

  return (
    <>
      <StatusBar style="dark"></StatusBar>

      <SafeAreaView style={styles.container}>
        <ScrollView
          style={{
            height: "100%"
          }}
          automaticallyAdjustKeyboardInsets={true}
          nestedScrollEnabled={false}
          scrollEnabled={false}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between",
              height: Dimensions.get("window").height * 0.85
            }}
          >
            <View style={{ flex: 1 }}>
              <View
                style={[
                  styles.section,
                  styles.header,
                  { borderBottomColor: props.color }
                ]}
              >
                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.title}> {props.name}</Text>
                  <Text style={styles.taskCount}>
                    {completedCount} of {taskCount} tasks left
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={props.closeModal}
                  style={[
                    styles.closeModal,
                    {
                      flexDirection: "column",
                      alignItems: "flex-end"
                    }
                  ]}
                >
                  <MaterialCommunityIcons
                    name={"chevron-down-circle-outline"}
                    size={50}
                    color="red"
                  />
                </TouchableOpacity>
              </View>

              <View style={[styles.timetableContainer, {}]}>
                {taskCount > 0 ? (
                  <ScrollView style={{}}>
                    {CompletedTask.length > 0 && (
                      <View>
                        {CompletedTask.map((item) => (
                          <View id={item.id}>
                            <ToDoItem
                              data={item}
                              ChangeImportant={setImportant}
                              ChangeComplete={setComplete}
                            ></ToDoItem>
                            <View style={styles.separator}></View>
                          </View>
                        ))}
                      </View>
                    )}
                    {IncompleteTask.length > 0 && (
                      <View>
                        <TouchableOpacity onPress={setViewCompletedTasks}>
                          <View style={styles.completedTask}>
                            <Text
                              style={{
                                color: "white",
                                margin: 7,
                                fontWeight: "bold"
                              }}
                            >
                              Completed {IncompleteTask.length}
                            </Text>

                            <MaterialCommunityIcons
                              name={
                                viewCompletedTask
                                  ? "chevron-down"
                                  : "chevron-right"
                              }
                              size={24}
                              color="white"
                            />
                          </View>
                        </TouchableOpacity>
                        {viewCompletedTask &&
                          IncompleteTask.map((item) => (
                            <View>
                              <ToDoItem
                                data={item}
                                ChangeImportant={setImportant}
                                ChangeComplete={setComplete}
                              ></ToDoItem>
                              <View style={styles.separator}></View>
                            </View>
                          ))}
                      </View>
                    )}
                  </ScrollView>
                ) : (
                  <View style={styles.emptyContainer}>
                    <Text style={{ color: "grey" }}>
                      No task to day , you can add more task by click add button
                    </Text>
                  </View>
                )}
              </View>
            </View>
            {/* input */}
          </View>
          <View style={{ paddingHorizontal: 10 }}>
            <AddTodo onCreate={CreateTodo} inputFT={toggleVisibility}></AddTodo>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
