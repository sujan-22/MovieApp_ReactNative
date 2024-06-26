import React from "react";
import HomeScreen from "./Components/HomeScreen";
import MovieSearch from "./Components/MovieSearch";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MovieScreen from "./Components/MovieScreen";
import CastScreen from "./Components/CastScreen";
import UpComing from "./Components/UpComing";

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
        <Stack.Screen
          name="UpComing"
          component={UpComing}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
