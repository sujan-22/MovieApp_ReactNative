// trendingMovies.js
import React, { useState, useEffect } from "react";
import {
  View,
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

const TrendingMovies = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&language=en-US&page=1`
        );
        setTrendingMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };

    fetchTrendingMovies();
  }, []);

  const handleMoviePress = (movieId) => {
    // Navigate to MovieScreen component
    navigation.navigate("MovieScreen", { movieId });
  };

  const renderItem = ({ item, index }) => {
    const itemWidth = Dimensions.get("window").width * 0.6;
    const currentSlideStyle = {
      width: itemWidth,
    };
    return (
      <TouchableOpacity
        style={[styles.movieContainer, currentSlideStyle]}
        onPress={() => handleMoviePress(item.id)}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
            }}
            style={styles.poster}
          />
        </View>
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Trending</Text>
      <View style={styles.carouselContainer}>
        <Carousel
          data={trendingMovies}
          renderItem={renderItem}
          sliderWidth={Dimensions.get("window").width}
          itemWidth={Dimensions.get("window").width * 0.6}
          layout="default"
          inactiveSlideScale={1}
          inactiveSlideOpacity={0.3}
          loop
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: "rgb(14, 2, 33)",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
    marginLeft: 20,
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
    width: 220,
    height: 300,
    marginBottom: 10,
    resizeMode: "cover",
    borderRadius: 10,
  },
  title: {
    fontSize: 17,
    textAlign: "center",
    color: "white",
  },
});

export default TrendingMovies;
