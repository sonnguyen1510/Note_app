import {
  ScrollView,
  TouchableOpacity,
  Touchable,
  StyleSheet,
  Text,
  View,
  Modal
} from "react-native";
import { useState } from "react";
import Colors from "../../Colors";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function RemindTimePicker(props) {
  const [RemindTime, setRemindTime] = useState(props.currentRemindTime);
  const styles = StyleSheet.create({
    colorSelect: {
      width: 30,
      height: 30,
      borderRadius: 4
    },
    title: {
      margin: 6,
      fontSize: 17,
      fontWeight: "bold"
    },
    ColorListcontainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 10
    },
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "flex-end",
      alignItems: "flex-end",
      paddingRight: 20
    },
    ColorPickContainer: {
      justifyContent: "flex-start",
      alignItems: "center",
      width: 160,
      height: 200,
      backgroundColor: Colors.lightGray2,
      borderWidth: 2,
      borderRadius: 5
    },
    button: {
      height: 35,
      width: 130,
      margin: 10,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center"
    },
    textButton: {
      textAlign: "center",
      color: Colors.white
    }
  });

  const onRemindChange = (event, selectionTime) => {
    // on cancel set date value to previous date
    if (event?.type === "dismissed") {
      setRemindTime(selectionTime);
      console.log("Reminde change");
      return;
    }
    setRemindTime(selectionTime); //setStartTime(selectionTime);
    //console.log(selectionTime);
  };

  const setRemindedTime = () => {
    console.log("setRemind");
    props.getRemindTime(RemindTime);
    props.setReminded(true);
    props.close(false);
  };

  const onRemoveRemind = () => {
    console.log("Remove remind");
    props.setReminded(false);
    props.close(false);
  };

  return (
    <View style={styles.container}>
      {/* Your modal content */}

      <TouchableOpacity
        style={{ height: "100%", width: "100%" }}
        onPress={() => props.close(false)}
      ></TouchableOpacity>

      <View style={styles.ColorPickContainer}>
        {/* Add the contents of your modal here */}

        <Text style={styles.title}> Pick a Time</Text>
        <DateTimePicker
          style={{ margin: 7 }}
          mode="time"
          value={RemindTime}
          is24Hour={true}
          display="default"
          onChange={onRemindChange}
        ></DateTimePicker>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: Colors.lightGreen }]}
          onPress={() => setRemindedTime()}
        >
          <Text style={styles.textButton}>Confirm</Text>
        </TouchableOpacity>
        {props.IsReminded && (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "red" }]}
            onPress={() => onRemoveRemind()}
          >
            <Text style={styles.textButton}>Remove Remind</Text>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        style={{ height: 90, width: "100%" }}
        onPress={() => props.close(false)}
      ></TouchableOpacity>
    </View>
  );
}
