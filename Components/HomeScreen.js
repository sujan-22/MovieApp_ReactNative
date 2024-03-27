import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import TrendingMovies from "./TrendingMovies";
import MovieList from "./MovieList";

const HomeScreen = () => {
  return (
    <View>
      <View style={styles.navbar}>
        <View style={styles.iconContainer}>
          <FontAwesome6 name="bars-staggered" size={24} color="white" />
        </View>
        <Text style={styles.title}>Movies</Text>
        <View style={styles.iconContainer}>
          <Feather name="search" size={24} color="white" />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TrendingMovies />
        <MovieList />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgb(14, 2, 33)", // Add background color
    paddingHorizontal: 20,
    height: 60,
    color: "White",
    borderBottomColor: "lightgray", // Add border color
  },
  iconContainer: {
    width: 240,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

export default HomeScreen;
