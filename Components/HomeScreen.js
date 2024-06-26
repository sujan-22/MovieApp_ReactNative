import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TrendingMovies from "./TrendingMovies";
import MovieList from "./MovieList";

import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleSearchPress = () => {
    navigation.navigate("MovieSearch");
  };

  const handleUpcomingPress = () => {
    navigation.navigate("UpComing");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.title}>
          Movies
          <MaterialCommunityIcons name="popcorn" size={24} color="white" />
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <TrendingMovies />
        <MovieList />
      </ScrollView>
      <View style={styles.bottomDock}>
        <TouchableOpacity>
          <MaterialIcons
            name="upcoming"
            size={24}
            color="white"
            onPress={handleUpcomingPress}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSearchPress}>
          <Feather name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    backgroundColor: "rgb(14, 2, 33)",
    padding: 10,
    flex: 1,
  },
  navbar: {
    alignItems: "center",
    backgroundColor: "rgb(14, 2, 33)",
    height: 30,
    top: 0,
    marginBottom: 10,
  },
  bottomDock: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 40, // Adjust as needed
    backgroundColor: "rgb(14, 2, 33)",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

export default HomeScreen;
