import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import TrendingMovies from "./TrendingMovies";
import MovieList from "./MovieList";

const HomeScreen = (props) => {
  console.log(props);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.navbar}>
        <View style={styles.iconContainer}>
          <FontAwesome6 name="bars-staggered" size={24} color="white" />
        </View>
        <Text style={styles.title}>Movies</Text>
        <View style={styles.iconContainer}>
          <Feather name="search" size={24} color="white" />
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <TrendingMovies />
        <MovieList />
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    backgroundColor: "rgb(14, 2, 33)",
    flexGrow: 1,
  },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgb(14, 2, 33)",
    paddingHorizontal: 10,
    height: 60,
    color: "White",
    marginTop: 50,
  },
  iconContainer: {
    width: 100,
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
