import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../Colors";

export default class AddListModal extends React.Component {
  backgroundColor = [
    "#24A6D9",
    "#595BD9",
    "#F1C75B",
    "#FF5E7D",
    "#4BCF82",
    "#7335D2",
    "#FF8B64"
  ];
  state = {
    name: "",
    color: this.backgroundColor[0]
  };

  CreateToDo = () => {
    const { name, color } = this.state;
    const Today = new Date();

    const list = { name, color };

    //this.props.addList(list);

    this.setState({ name: "" });
    this.props.closeModal();
    this.props.createTask(name, color, this.props.currentDate);
  };
  RenderColor() {
    return this.backgroundColor.map((color) => {
      return (
        <TouchableOpacity
          key={color}
          style={[styles.colorSelect, { backgroundColor: color }]}
          onPress={() => this.setState({ color })}
        />
      );
    });
  }
  render() {
    return (
      <>
        <View
          style={{
            marginHorizontal: 32,
            marginTop: 50
          }}
        >
          <Text style={styles.title}> New plane</Text>

          <TextInput
            style={styles.input}
            placeholder="Name?"
            onChangeText={(text) => this.setState({ name: text })}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 12
            }}
          >
            {this.RenderColor()}
          </View>

          <TouchableOpacity
            style={[styles.create, { backgroundColor: this.state.color }]}
            onPress={this.CreateToDo}
          >
            <Text style={{ color: Colors.white, fontWeight: "600" }}>
              Create!
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.create, { backgroundColor: "red", marginTop: 10 }]}
            onPress={this.props.closeModal}
          >
            <Text style={{ color: Colors.white, fontWeight: "600" }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  containter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: Colors.black,
    alignSelf: "center",
    marginBottom: 16
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.blue,
    borderRadius: 6,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 18
  },
  create: {
    marginTop: 24,
    height: 50,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center"
  },
  colorSelect: {
    width: 30,
    height: 30,
    borderRadius: 4
  }
});
