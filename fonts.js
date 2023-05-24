import * as Font from "expo-font";

export default async function loadFonts() {
  await Font.loadAsync({
    Rubik: require("./assets/fonts/static/Rubik-Light.ttf")
  });
}
