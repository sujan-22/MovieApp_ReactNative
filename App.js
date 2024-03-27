import React from "react";
import { View, Text, StyleSheet } from "react-native";
import HomeScreen from "./Components/HomeScreen";
import MovieSearch from "./Components/MovieSearch";

export default function App() {
  return (
    <View style={styles.container}>
      <HomeScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(14, 2, 33)",
    alignItems: "center",
    color: "white",
    paddingTop: 33,
  },
});
