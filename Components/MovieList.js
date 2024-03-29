// TopRatedMovies.js
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

const MovieList = () => {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`
        );
        setTopRatedMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching top rated movies:", error);
      }
    };

    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
        );
        setPopularMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };

    fetchTopRatedMovies();
    fetchPopularMovies();
  }, []);

  const handleMoviePress = (movieId) => {
    // Navigate to MovieScreen component
    navigation.navigate("MovieScreen", { movieId });
  };

  const renderItem = ({ item, index }) => {
    const itemWidth = Dimensions.get("window").width * 0.3;
    const currentSlideStyle = {
      width: itemWidth,
    };
    return (
      <TouchableOpacity onPress={() => handleMoviePress(item.id)}>
        <View style={[styles.movieContainer, currentSlideStyle]}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
              }}
              style={styles.poster}
            />
          </View>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Top Rated</Text>
      <View style={styles.carouselContainer}>
        <Carousel
          data={topRatedMovies}
          renderItem={renderItem}
          sliderWidth={Dimensions.get("window").width}
          itemWidth={Dimensions.get("window").width * 0.3}
          layout="default"
          inactiveSlideScale={1}
          inactiveSlideOpacity={0.6}
          loop
        />
      </View>
      <Text style={styles.sectionTitle}>Popular</Text>
      <View style={styles.carouselContainer}>
        <Carousel
          data={popularMovies}
          renderItem={renderItem}
          sliderWidth={Dimensions.get("window").width}
          itemWidth={Dimensions.get("window").width * 0.3}
          layout="default"
          inactiveSlideScale={1}
          inactiveSlideOpacity={0.6}
          loop
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  carouselContainer: {
    alignItems: "center",
  },
  movieContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    borderRadius: 10,
    overflow: "hidden",
  },
  poster: {
    width: 105,
    height: 150,
    marginTop: 10,
    marginBottom: 2,
    resizeMode: "cover",
    borderRadius: 10,
  },
  title: {
    fontSize: 14,
    textAlign: "center",
    color: "white",
    padding: 2,
  },
});
export default MovieList;
