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
  Modal
} from "react-native";
import Colors from "../../Colors";
import moment from "moment";
import Timetable from "react-native-calendar-timetable";

import ToDoItem from "./ToDoItem";
import AddTodoItem from "./AddTodoItem";
import DAO from "../../Database/DAO";
import { db } from "../../Database/Connection";

export default ToDoModal = function (props) {
  const TaskDetail = props.TaskItem;
  const InitialData = [];
  const [isVisible, setVisible] = useState(false);
  const toggleVisibility = () => setVisible(!isVisible);

  const [items, setItems] = React.useState(TaskDetail);

  const ItemSeparator = () => {
    return <View style={styles.separator} />;
  };

  const CreateTodo = (title, color, remind) => {
    //const options = { hour: "2-digit", minute: "2-digit", hour12: false };

    DAO(db)
      .addNewToDo(title, remind, color, 0, props.TaskID, 0)
      .then((insertedID) => {
        console.log("Inserted ToDo:", StartTime, EndTime);
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

  console.log("initial Data", items);

  const taskCount = TaskDetail.length;
  const completedCount = TaskDetail.filter((todo) => todo.completed).length;
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View
          style={[
            styles.section,
            styles.header,
            { borderBottomColor: TaskDetail.color }
          ]}
        >
          <View>
            <Text style={styles.title}> {props.name}</Text>
            <Text style={styles.taskCount}>
              {completedCount} of {taskCount} tasks
            </Text>
          </View>
        </View>

        <View style={styles.timetableContainer}>
          <ScrollView>
            {items.map((item) => (
              <View>
                <ToDoItem data={item}></ToDoItem>
                <View style={styles.separator}></View>
              </View>
            ))}
          </ScrollView>
        </View>
        {/* input */}
        <View style={[styles.section, styles.footer]}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-around"
            }}
          >
            <TouchableOpacity
              onPress={props.closeModal}
              style={[styles.addTodo, { backgroundColor: "red" }]}
            >
              <Text style={{ color: Colors.white, fontWeight: "600" }}>
                Back
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.addTodo, { backgroundColor: Colors.blue }]}
              onPress={toggleVisibility}
            >
              <Text style={{ color: Colors.white, fontWeight: "600" }}>
                Add ToDo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal visible={isVisible} animationType="fade" transparent={true}>
          <AddTodoItem
            onClose={toggleVisibility}
            onCreate={CreateTodo}
          ></AddTodoItem>
        </Modal>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  section: {
    flex: 1,
    alignSelf: "stretch"
  },
  header: {
    justifyContent: "flex-end",
    marginLeft: 24,
    borderBottomWidth: 3
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
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center"
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
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
    paddingHorizontal: 10,
    width: "100%",
    height: "70%",
    marginTop: 10,
    padding: 10
  },
  separator: {
    height: 10 // Adjust the height as desired for the spacing
  }
});
