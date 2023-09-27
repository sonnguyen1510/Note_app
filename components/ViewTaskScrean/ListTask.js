import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal
} from "react-native";
import Colors from "../../Colors";
import ToDoList from "./TaskItem";
import React from "react";
import SearchBar from "../Function/SearchBar";
import DAO from "../../Database/DAO";
import { db } from "../../Database/Connection";

export default class App extends React.Component {
  state = {
    addToDoVisble: false,
    lists: this.props.data,
    searchList: this.props.data
  };

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.setState({ lists: this.props.data });
    }
  }

  deleteTS(taskID) {
    DAO(db)
      .deleteTask(taskID)
      .then((rowsAffected) => {
        const NewData = [];
        this.props.data.forEach((element) => {
          if (element.id != taskID) {
            NewData.push(element);
          }
        });
        this.setState({ lists: NewData });
        // Handle success, if needed
      })
      .catch((error) => {
        console.error("Error deleting task: ", error);
        // Handle error, if needed
      });
  }

  renderList = (item) => {
    return (
      <ToDoList
        RenderItems={item}
        deleteTasks={this.deleteTS}
        updateList={this.updateList}
      />
    );
  };

  addList = (list) => {
    this.setState({
      lists: [
        ...this.state.lists,
        { ...list, id: this.state.lists.length + 1, todos: [] }
      ]
    });
  };

  updateList = (list) => {
    this.setState({
      lists: this.state.lists.map((item) => {
        return item.id === list.id ? list : item;
      })
    });
  };

  render() {
    console.log("InList task", this.state.lists);
    return (
      <View style={styles.container}>
        <SearchBar></SearchBar>

        <View
          style={{
            height: "auto",
            width: "100%",
            flexDirection: "column",
            justifyContent: "flex-start",
            marginTop: 5
          }}
        >
          <FlatList
            style={styles.showListTask}
            data={this.state.lists}
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => this.renderList(item)}
            keyExtractor={(item, index) => item.id.toString()}
            keyboardShouldPersistTaps="always"
          />
          {}
        </View>
        <View style={{ marginVertical: 16 }}></View>
      </View>
    );
  }
}

{
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },
  showListTask: {
    width: "100%",
    height: "auto"
  },

  divider: {
    backgroundColor: Colors.lightblue,
    height: 1,
    flex: 1,
    alignSelf: "center"
  },
  title: {
    fontSize: 38,
    width: "auto",
    fontWeight: "800",
    color: Colors.black,
    paddingHorizontal: 70
  },
  addList: {
    borderWidth: 2,
    borderColor: Colors.lightblue,
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  add: {
    color: Colors.blue,
    fontWeight: "600",
    fontSize: 14,
    marginTop: 8
  },
  functionTitle: {
    margin: 10,
    fontWeight: "bold",
    fontSize: 18
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center"
  }
});
