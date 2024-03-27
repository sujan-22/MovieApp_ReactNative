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

const apiKey = "3be634f9be09af34cfd2298e2f2270bf";

const TrendingMovies = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

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

  const renderItem = ({ item, index }) => {
    const itemWidth = Dimensions.get("window").width * 0.6;
    const currentSlideStyle = {
      width: itemWidth,
    };
    return (
      <TouchableOpacity style={[styles.movieContainer, currentSlideStyle]}>
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
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
    marginLeft: 125, // Align section title to the left
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
    width: 280,
    height: 300,
    marginBottom: 10,
    objectFit: "contain",
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    color: "white",
  },
});

export default TrendingMovies;
