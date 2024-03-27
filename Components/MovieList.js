// TopRatedMovies.js
import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";
import axios from "axios";

const apiKey = "3be634f9be09af34cfd2298e2f2270bf";

const MovieList = () => {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);

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

  const renderItem = ({ item, index }) => {
    const itemWidth = Dimensions.get("window").width * 0.3;
    const currentSlideStyle = {
      width: itemWidth,
    };
    return (
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
    );
  };

  return (
    <View style={styles.container}>
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
    width: 100,
    height: 200,
    marginBottom: 2,
    objectFit: "contain",
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    color: "white",
  },
});
export default MovieList;
