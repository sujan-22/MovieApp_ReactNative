import React from "react";
import { View, Text, StyleSheet } from "react-native";
import HomeScreen from "./Components/HomeScreen";
import MovieSearch from "./Components/MovieSearch";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MovieScreen from "./Components/MovieScreen";
import CastScreen from "./Components/CastScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MovieScreen"
          component={MovieScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CastScreen"
          component={CastScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MovieSearch"
          component={MovieSearch}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
