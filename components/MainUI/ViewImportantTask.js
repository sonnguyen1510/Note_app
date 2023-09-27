import { StyleSheet, View, FlatList, Text, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import SearchBar from "../Function/SearchBar";
import DAO from "../../Database/DAO";
import { db } from "../../Database/Connection";

export default function ImportantTask(props) {
  const ListTodo = [];
  useEffect(() => {
    DAO(db)
      .getTodoImportant()
      .then((todo) => {
        todo.forEach((element) => {
          ListTodo.push(element);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [listTodo, setListTodo] = useState(ListTodo);
  const [SearchTodo, setSearchTodo] = useState([]);

  const setImportant = (id) => {
    const updateList = [...listTodo];
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

    setListTodo(updateList);
  };
  return (
    <View>
      <View style={styles.SearchBarContainer}>
        <SearchBar></SearchBar>
      </View>
      {}
      {listTodo.length > 0 ? (
        <ScrollView>
          {ListTodo.map((todo) => (
            <View>
              <ToDoItem data={todo} ChangeImportant={setImportant}></ToDoItem>
              <View style={styles.separator}></View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={{ color: "grey" }}>No important task !</Text>
        </View>
      )}
      {}
    </View>
  );
}

const styles = StyleSheet.create({
  contaner: {
    flex: 1,
    flexDirection: "column"
  },
  SearchBarContainer: {
    marginVertical: 10
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
