import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import RelatedAndCast from "./RelatedAndCast";

const apiKey = "3be634f9be09af34cfd2298e2f2270bf";

const MovieScreen = ({ route, navigation }) => {
  const { movieId } = route.params;
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
        );
        setMovieDetails(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movieDetails) {
    return <Text>Loading...</Text>;
  }

  const releaseYear = movieDetails.release_date.substring(0, 4);
  const movieLength = `${Math.floor(movieDetails.runtime / 60)}h ${
    movieDetails.runtime % 60
  }min`;
  const genres = movieDetails.genres.map((genre) => genre.name).join(" • ");

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Feather name="heart" size={24} color="white" />
      </View>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`,
        }}
        style={styles.backdrop}
      />
      <LinearGradient
        colors={["transparent", "rgba(14,2,33,0.8)", "rgba(14,2,33,1)"]}
        style={styles.gradient}
      />
      <Text style={styles.title}>{movieDetails.title}</Text>
      <Text style={styles.info}>
        {releaseYear} • {movieLength}
      </Text>
      <Text style={styles.info}>{genres}</Text>
      <Text style={styles.description}>{movieDetails.overview}</Text>
      <View style={styles.castsContainer}>
        <RelatedAndCast movieId={movieId} />
      </View>
    </ScrollView>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "rgb(14, 2, 33)",
    flexGrow: 1,
    position: "relative",
    padding: 5,
    paddingTop: 0,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  backdrop: {
    width: width,
    height: height * 0.55,
    resizeMode: "cover",
  },
  gradient: {
    position: "absolute",
    width: width,
    height: height * 0.56,
  },
  title: {
    fontSize: 35,
    marginTop: -height * 0.1,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "white",
    lineHeight: 22,
    marginBottom: 20,
    textAlign: "center",
  },
  castsContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  castsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    marginLeft: 5,
  },
  castItem: {
    marginRight: 10,
    alignItems: "center",
  },
  castImage: {
    width: 100,
    height: 150,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 5,
  },
  castName: {
    color: "white",
    textAlign: "center",
  },
  moreCasts: {
    color: "white",
    textAlign: "center",
    top: 65,
    paddingLeft: 10,
    paddingRight: 10,
  },
  relatedMoviesContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  relatedMoviesTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    marginLeft: 5,
  },
  relatedMovieItem: {
    marginRight: 10,
    alignItems: "center",
  },
  relatedMovieImage: {
    width: 100,
    height: 150,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 5,
  },
  relatedMovieTitle: {
    color: "white",
    textAlign: "center",
  },
});

export default MovieScreen;
