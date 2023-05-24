import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { RadioButton } from "react-native-paper";

export default function ToDoItem(props) {
  console.log("renderItem", props);

  const showAlert = () => {
    Alert.alert(
      "Delete to do item",
      `Do you want to delete "${props.data?.title}" ?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            // Handle OK button press
            console.log("OK button pressed");
          }
        }
      ],
      { cancelable: false }
    );
  };

  const style = StyleSheet.create({
    container: {
      backgroundColor: props.data?.color,
      width: "96%",
      marginStart: 12,
      borderRadius: 10,
      elevation: 5,
      flexDirection: "row",
      padding: 10
    }
  });
  return (
    <TouchableOpacity onLongPress={showAlert}>
      <View style={style.container} key={props.data?.id}>
        <RadioButton></RadioButton>
        <Text style={{ color: "white", fontWeight: "bold" }}>
          {props.data?.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
