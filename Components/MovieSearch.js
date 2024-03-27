// components/MovieSearch.js

import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import axios from "axios";

const API_KEY = "3be634f9be09af34cfd2298e2f2270bf";

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&query=${query}`
      );
      setMovies(response.data.results);
      setQuery("");
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  const resetSearch = () => {
    setMovies([]);
    setQuery(""); // Clear input box value
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.navTitle}>Movie Search</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Search for a movie..."
        placeholderTextColor="white"
        onChangeText={(text) => setQuery(text)}
        value={query}
      />
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.movieContainer}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
              }}
              style={styles.poster}
            />
            <Text style={styles.title}>{item.title}</Text>
          </View>
        )}
      />

      <View style={styles.buttonContainer}>
        <Button title="Search" onPress={searchMovies} />
        <Button title="Reset" onPress={resetSearch} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    color: "white", // Set text color to white
  },
  navbar: {
    width: "100%",
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  navTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: "white", // Set text color to white
  },
  buttonContainer: {
    flexDirection: "row", // Arrange buttons horizontally
    justifyContent: "space-between", // Add space between buttons
    width: "80%", // Adjust width to align with input
    marginBottom: 10,
  },
  flatList: {
    flex: 1,
    width: "100%",
  },
  movieContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  poster: {
    width: 50,
    height: 75,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    color: "white", // Set text color to white
  },
});

export default MovieSearch;
