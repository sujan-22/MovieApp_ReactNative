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
  const [movieReviews, setMovieReviews] = useState([]);
  const [showAllReviews, setShowAllReviews] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const [detailsResponse, reviewsResponse] = await Promise.all([
          axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
          ),
          axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}&language=en-US&page=1`
          ),
        ]);
        setMovieDetails(detailsResponse.data);
        setMovieReviews(reviewsResponse.data.results);
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

  const toggleShowAllReviews = () => {
    setShowAllReviews((prevShowAllReviews) => !prevShowAllReviews);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather
            name="arrow-left"
            size={24}
            color="white"
            style={styles.icon}
          />
        </TouchableOpacity>
        <Feather name="heart" size={24} color="white" style={styles.icon} />
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
      <Text style={styles.rating}>
        Rating: {movieDetails.vote_average}/10 ({movieDetails.vote_count} votes)
      </Text>
      <Text style={styles.description}>{movieDetails.overview}</Text>
      <View style={styles.reviewsContainer}>
        <Text style={styles.reviewsTitle}>Reviews</Text>
        {showAllReviews
          ? movieReviews.map((review) => (
              <View key={review.id} style={styles.reviewItem}>
                <Text style={styles.reviewAuthor}>{review.author}</Text>
                <Text style={styles.reviewContent}>{review.content}</Text>
              </View>
            ))
          : movieReviews.slice(0, 1).map((review) => (
              <View key={review.id} style={styles.reviewItem}>
                <Text style={styles.reviewAuthor}>{review.author}</Text>
                <Text style={styles.reviewContent}>{review.content}</Text>
              </View>
            ))}
        <TouchableOpacity onPress={toggleShowAllReviews}>
          <Text style={styles.seeMore}>
            {showAllReviews ? "See Less" : "See More"}
          </Text>
        </TouchableOpacity>
      </View>
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
    padding: 20,
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
  rating: {
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
  reviewsContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  reviewsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    textAlign: "center",
  },
  reviewItem: {
    marginBottom: 20,
  },
  reviewAuthor: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00BFFF",
    marginBottom: 5,
  },
  reviewContent: {
    fontSize: 16,
    color: "white",
    lineHeight: 22,
  },
  seeMore: {
    fontSize: 16,
    color: "#00BFFF",
    textAlign: "center",
    marginTop: 10,
  },
  castsContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export default MovieScreen;
