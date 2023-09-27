import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { RadioButton } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { useState, useEffect } from "react";

export default function ToDoItem(props) {
  //console.log("renderItem", props.data);

  const [sound, setSound] = useState();

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sound/snd_fragment_retrievewav-14728.mp3")
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

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
      height: 60,
      marginStart: 12,
      borderRadius: 10,
      elevation: 5,
      flexDirection: "row",
      padding: 10,
      alignItems: "center"
    }
  });
  return (
    <TouchableOpacity onLongPress={showAlert}>
      <View style={style.container} key={props.data?.id}>
        <TouchableOpacity
          onPress={() => {
            props.ChangeImportant(props.data?.id);
          }}
        >
          <MaterialCommunityIcons
            name={props.data.important ? "star" : "star-outline"}
            size={24}
            color="white"
          />
        </TouchableOpacity>
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 18,
            width: "80%",
            marginHorizontal: 5
          }}
        >
          {props.data?.title}
        </Text>
        <TouchableOpacity
          onPress={() => {
            playSound();
            props.ChangeComplete(props.data?.id);
          }}
        >
          <MaterialCommunityIcons
            name={props.data.completed == 1 ? "circle" : "check-circle"}
            size={35}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
