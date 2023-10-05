import {
  ScrollView,
  TouchableOpacity,
  Touchable,
  StyleSheet,
  Text,
  View,
  Modal
} from "react-native";
import Colors from "../../Colors";

export default function colorPicker(props) {
  const backgroundColor = [
    "#24A6D9",
    "#595BD9",
    "#F1C75B",
    "#FF5E7D",
    "#4BCF82",
    "#7335D2",
    "#FF8B64"
  ];

  const styles = StyleSheet.create({
    colorSelect: {
      width: 30,
      height: 30,
      borderRadius: 4
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
      alignItems: "center"
    },
    ColorPickContainer: {
      justifyContent: "center",
      width: "90%",
      height: 50,
      backgroundColor: Colors.lightGray2,
      borderWidth: 2,
      borderRadius: 5
    }
  });

  const setColor = (color) => {
    props.getColor(color);
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

        <View style={styles.ColorListcontainer}>
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
      </View>

      <TouchableOpacity
        style={{ height: 90, width: "100%" }}
        onPress={() => props.close(false)}
      ></TouchableOpacity>
    </View>
  );
}
