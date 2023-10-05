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
import ColorPicker from "./colorPicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RemindTimePicker from "./RemindTimePicker";

export default function AddTodo(props) {
  const [isColorPickerModalVisible, setIsColorPickerModalVisible] =
    useState(false);
  const [isRemindTimePickerModalVisible, setIsRemindTimePickerModalVisible] =
    useState(false);
  const [title, setTitle] = useState("");
  const [guide, setGuide] = useState("Add a new to do");
  const [color, setColor] = useState("#24A6D9");
  const [RemindTime, setRemindTime] = useState(new Date());
  const [isReminded, setIsReminded] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const [textStyle, setTextStyle] = useState({
    color: Colors.gray,
    fontSize: 16 // Initial font size,
  });

  const handleTextChange = (text) => {
    setTitle(text);

    // Update the text style based on the input
    setTextStyle({
      ...textStyle,
      color: text.length > 0 ? Colors.white : "black",
      fontSize: text.length > 0 ? 20 : 16
    });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setGuide("Write something for today...");
  };

  const handleBlur = () => {
    setIsFocused(false);
    setGuide("Add a new to do");
  };

  const handleEnterPress = () => {
    if (title == "") {
      console.log("Here");
    } else {
      props.onCreate(title, color, formatDateToHourAndMinutes(RemindTime));
    }
  };

  const formatDateToHourAndMinutes = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const onCreate = () => {
    if (title == "") {
      console.log("Here");
    } else {
      props.onCreate(title, color, formatDateToHourAndMinutes(RemindTime));
    }
  };

  const pickColor = () => {
    setIsColorPickerModalVisible(!isColorPickerModalVisible);
  };

  const pickRemindTime = () => {
    setIsRemindTimePickerModalVisible(!isRemindTimePickerModalVisible);
  };

  const styles = StyleSheet.create({
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
    input: {
      flex: 1,
      width: "60%",
      height: 48,
      color: Colors.gray,
      fontSize: 16, // Initial font size,,
      marginRight: 8,
      paddingHorizontal: 8
    },
    function: {
      flexDirection: "row"
    },
    funtionItem: {
      marginHorizontal: 5
    }
  });

  return (
    <View style={{ width: "100%" }} onPress={props.inputFT}>
      <View style={styles.addTodoItem}>
        {title == "" && (
          <MaterialCommunityIcons name={"plus"} size={24} color="white" />
        )}
        <TextInput
          style={[styles.input, textStyle]}
          placeholder={guide}
          placeholderTextColor={Colors.white}
          onChangeText={(text) => handleTextChange(text)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onSubmitEditing={handleEnterPress}
        />
        {title != "" && (
          <View style={styles.function}>
            <TouchableOpacity style={styles.funtionItem} onPress={pickColor}>
              <MaterialCommunityIcons name={"square"} size={30} color={color} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.funtionItem}
              onPress={pickRemindTime}
            >
              <MaterialCommunityIcons
                name={"clock-time-two"}
                size={30}
                color={isReminded ? Colors.redpink : Colors.white}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onCreate} style={styles.funtionItem}>
              <MaterialCommunityIcons
                name={"arrow-right-circle"}
                size={32}
                color="white"
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Modal
        transparent={true}
        animationType="slide"
        visible={isColorPickerModalVisible}
        onRequestClose={() => setIsColorPickerModalVisible(false)}
      >
        <ColorPicker
          close={setIsColorPickerModalVisible}
          getColor={setColor}
        ></ColorPicker>
      </Modal>
      <Modal
        transparent={true}
        animationType="slide"
        visible={isRemindTimePickerModalVisible}
        onRequestClose={() => setIsRemindTimePickerModalVisible(false)}
      >
        <RemindTimePicker
          close={setIsRemindTimePickerModalVisible}
          getRemindTime={setRemindTime}
          currentRemindTime={RemindTime}
          IsReminded={isReminded}
          setReminded={setIsReminded}
        ></RemindTimePicker>
      </Modal>
    </View>
  );
}
