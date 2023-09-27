import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ViewTask from "./components/MainUI/ViewTask";
import ViewImportantTask from "./components/MainUI/ViewImportantTask";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function HomeScreen() {
  return <ViewTask></ViewTask>;
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

function ImportantScreen() {
  return <ViewImportantTask></ViewImportantTask>;
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <>
      <StatusBar style="light" backgroundColor="#000000" />
      <Tab.Navigator>
        <Tab.Screen
          name="Your task"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="list-status"
                color={color}
                size={size}
              />
            )
          }}
        />
        <Tab.Screen
          name="Important"
          component={ImportantScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="bell" color={color} size={size} />
            )
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="settings-helper"
                color={color}
                size={size}
              />
            )
          }}
        />
      </Tab.Navigator>
    </>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
