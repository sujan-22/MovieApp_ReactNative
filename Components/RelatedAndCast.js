// relatedAndCast.js
import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const apiKey = "3be634f9be09af34cfd2298e2f2270bf";

const RelatedAndCast = ({ movieId }) => {
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [casts, setCasts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchRelatedMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}&language=en-US&page=1`
        );
        setRelatedMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching related movies:", error);
      }
    };

    const fetchMovieCredits = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`
        );
        setCasts(response.data.cast);
      } catch (error) {
        console.error("Error fetching movie credits:", error);
      }
    };

    fetchRelatedMovies();
    fetchMovieCredits();
  }, [movieId]);

  const handleMoviePress = (id) => {
    navigation.navigate("MovieScreen", { movieId: id });
  };

  const top6Movies = relatedMovies.slice(0, 6);
  const top6Cast = casts.slice(0, 6);

  const handleClick = (castId) => {
    navigation.navigate("CastScreen", { castId: castId });
  };

  const renderRelatedMovies = () => {
    return top6Movies.map((movie) => (
      <TouchableOpacity
        key={movie.id}
        onPress={() => handleMoviePress(movie.id)}
      >
        <View style={styles.movieItem}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            }}
            style={styles.movieImage}
          />
          <Text style={styles.movieTitle}>{movie.title}</Text>
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Top Casts</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {top6Cast.map((cast) => (
          <TouchableOpacity key={cast.id} onPress={() => handleClick(cast.id)}>
            <View style={styles.castItem}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${cast.profile_path}`,
                }}
                style={styles.castImage}
              />
              <Text style={styles.castName}>{cast.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
        <Text style={styles.moreCast}>+ {casts.length - 6} More</Text>
      </ScrollView>
      <Text style={styles.sectionTitle}>Related Movies</Text>
      <View style={styles.moviesContainer}>{renderRelatedMovies()}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexGrow: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  castItem: {
    marginRight: 10,
    width: 100,
    alignItems: "center",
  },
  castImage: {
    width: 100,
    height: 150,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 5,
  },
  moreCast: {
    color: "white",
    textAlign: "center",
    margin: 10,
    top: 65,
  },
  castName: {
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  moviesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  movieItem: {
    width: 100,
    marginBottom: 20,
  },
  movieImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 5,
  },
  movieTitle: {
    color: "white",
    textAlign: "center",
  },
});
export default RelatedAndCast;
