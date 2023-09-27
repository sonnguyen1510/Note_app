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
  Modal
} from "react-native";
import Colors from "../../Colors";

import ToDoItem from "./ToDoItem";
import AddTodoItem from "./AddTodoItem";
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
      .addNewToDo(title, remind, color, false, props.TaskID, false)
      .then((insertedID) => {
        setItems((currentItem) => [
          ...currentItem,
          {
            id: insertedID,
            title: title,
            taskID: props.TaskID,
            Color: color || "lightblue",
            remind: remind,
            complete: 0,
            important: 0
          }
        ]);
      })
      .catch((error) => {
        console.error(error);
      });
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
    input: {
      flex: 1,
      width: "60%",
      height: 48,

      marginRight: 8,
      paddingHorizontal: 8
    },
    addTodo: {
      width: 130,
      borderRadius: 4,
      padding: 16,
      alignItems: "center",
      justifyContent: "center"
    },
    addTodoItem: {
      backgroundColor: Colors.gray,
      width: "96%",
      height: 60,
      marginStart: 12,
      borderRadius: 10,
      elevation: 5,
      flexDirection: "row",
      padding: 10,
      alignItems: "center"
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
      height: "70%",
      paddingHorizontal: 10,
      backgroundColor: "red",
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

  return (
    <>
      <StatusBar style="dark"></StatusBar>

      <SafeAreaView style={styles.container}>
        <ScrollView
          style={{ flex: 1 }}
          automaticallyAdjustKeyboardInsets={true}
          nestedScrollEnabled={false}
          scrollEnabled={false}
        >
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

          <View style={styles.timetableContainer}>
            {taskCount > 0 ? (
              <ScrollView>
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
                            viewCompletedTask ? "chevron-down" : "chevron-right"
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
          {/* input */}
          <View style={[styles.section, { paddingLeft: 10, paddingRight: 10 }]}>
            <View
              style={{
                width: "100%"
              }}
            >
              <TouchableOpacity onPress={toggleVisibility}>
                <View style={styles.addTodoItem}>
                  <MaterialCommunityIcons
                    name={"plus"}
                    size={24}
                    color="white"
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Title"
                    placeholderTextColor={Colors.gray}
                    onChangeText={(text) => setTitle(text)}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <Modal visible={isVisible} animationType="fade" transparent={true}>
            <AddTodoItem
              onClose={toggleVisibility}
              onCreate={CreateTodo}
            ></AddTodoItem>
          </Modal>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
