import React from "react";

import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
  Button,
  Modal
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Colors from "../../Colors";
import Snackbar from "react-native-snackbar-component";
import { useState } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function AddTodoItem(props) {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#24A6D9");
  const [keyboardDisplay, setKeyboardDisplay] = useState(true);

  const [isVisible, setVisible] = useState(false);
  const toggleVisibility = () => setVisible(!isVisible);

  const [RemindTime, setRemindTime] = useState(new Date());

  const [snackIsVisible, setSnackIsVisible] = useState(false);
  const [distance, setDistance] = useState(0);

  const onRemindChange = (event, selectionTime) => {
    // on cancel set date value to previous date
    if (event?.type === "dismissed") {
      setRemindTime(selectionTime);
      return;
    }
    setRemindTime(selectionTime); //setStartTime(selectionTime);
    //console.log(selectionTime);
  };

  const onCreate = () => {
    if (title == "") {
      setSnackIsVisible(true);
      console.log("Here");
    } else {
      setSnackIsVisible(false);
      props.onCreate(title, color, RemindTime);
      //console.log(title, content, color, StartTime, EndTime);
      props.onClose();
    }
  };

  const backgroundColor = [
    "#24A6D9",
    "#595BD9",
    "#F1C75B",
    "#FF5E7D",
    "#4BCF82",
    "#7335D2",
    "#FF8B64"
  ];

  return (
    <View style={{ backgroundColor: "white", height: "100%", width: "100%" }}>
      <Snackbar
        visible={snackIsVisible}
        //SnackBar visibility control
        textMessage="Please enter a title"
        //Text on SnackBar
      />
      <StatusBar></StatusBar>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View
          style={{
            marginHorizontal: 32,
            marginTop: 50
          }}
        >
          <Text style={styles.title}> New ToDo</Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 25
            }}
          >
            {backgroundColor.map((color) => {
              return (
                <TouchableOpacity
                  key={color}
                  style={[styles.colorSelect, { backgroundColor: color }]}
                  onPress={() => setColor(color)}
                />
              );
            })}
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 12
            }}
          ></View>

          <TextInput
            style={styles.input}
            placeholder="Title"
            placeholderTextColor={Colors.gray}
            onChangeText={(text) => setTitle(text)}
          />

          <View
            onPress={() => {
              toggleVisibility();
            }}
            style={[styles.create, styles.inputTimeContainer]}
          >
            <Text
              style={{
                color: Colors.gray,
                fontWeight: "400",
                paddingHorizontal: 20
              }}
            >
              Start:
            </Text>
            <DateTimePicker
              mode="time"
              value={RemindTime}
              is24Hour={true}
              display="default"
              onChange={onRemindChange}
            ></DateTimePicker>
          </View>

          <TouchableOpacity
            style={[styles.create, { backgroundColor: color }]}
            onPress={onCreate}
          >
            <Text style={{ color: Colors.white, fontWeight: "600" }}>
              Create!
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.create, { backgroundColor: "red", marginTop: 10 }]}
            onPress={props.onClose}
          >
            <Text style={{ color: Colors.white, fontWeight: "600" }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
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
  inputTimeContainer: {
    backgroundColor: "white",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.blue,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  colorSelect: {
    width: 30,
    height: 30,
    borderRadius: 4
  },
  content: {
    height: 200
  }
});
