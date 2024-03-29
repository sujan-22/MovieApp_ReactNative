// components/MovieSearch.js

import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import axios from "axios";

const API_KEY = "3be634f9be09af34cfd2298e2f2270bf";

const MovieSearch = ({ navigation }) => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async (text) => {
    try {
      setQuery(text);
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&query=${text}`
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  const resetSearch = () => {
    setMovies([]);
    setQuery("");
  };

  const handleMoviePress = (id) => {
    navigation.navigate("MovieScreen", { movieId: id });
  };
  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather
            name="arrow-left"
            size={24}
            color="white"
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Movie Search</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search for a movie..."
          placeholderTextColor="white"
          onChangeText={searchMovies}
          value={query}
        />
        <Button title="Reset" onPress={resetSearch} />
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          horizontal={false}
        >
          {movies.map((movie) => (
            <TouchableOpacity
              key={movie.id}
              onPress={() => handleMoviePress(movie.id)}
            >
              <View style={styles.movieContainer}>
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                  }}
                  style={styles.poster}
                />
                <Text style={styles.title}>{movie.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.buttonContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(14, 2, 33)",
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    color: "white",
  },
  navbar: {
    flexDirection: "row",
    width: "100%",
    height: 70,
    alignItems: "center",
    justifyContent: "space-between", // Align items to the ends
    marginBottom: 10,
  },
  navTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 15,
    textAlign: "right",
  },
  icon: {
    marginTop: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    width: "80%",
    paddingHorizontal: 10,
  },
  input: {
    height: 40,
    flex: 1,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
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
    width: 100,
    height: 150,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    color: "white", // Set text color to white
  },
});

export default MovieSearch;
