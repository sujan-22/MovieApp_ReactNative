// trendingMovies.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const apiKey = "3be634f9be09af34cfd2298e2f2270bf";

const TrendingMovies = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
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
    navigation.navigate("MovieScreen", { movieId });
  };

  const renderItem = ({ item, index }) => {
    const itemWidth = Dimensions.get("window").width;
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

  const paginationDots = trendingMovies.map((_, index) => (
    <TouchableOpacity
      key={index}
      onPress={() => {
        carouselRef.snapToItem(index);
        setActiveSlide(index);
      }}
      style={[styles.dot, index === activeSlide && styles.activeDot]}
    />
  ));

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Trending</Text>
      <View style={styles.carouselContainer}>
        <Carousel
          data={trendingMovies}
          renderItem={renderItem}
          sliderWidth={Dimensions.get("window").width}
          itemWidth={Dimensions.get("window").width}
          layout="default"
          inactiveSlideScale={1}
          inactiveSlideOpacity={0.3}
          loop
          onSnapToItem={(index) => setActiveSlide(index)}
          ref={(c) => (carouselRef = c)}
        />
        <ScrollView horizontal style={styles.paginationContainer}>
          {paginationDots}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "rgb(14, 2, 33)",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
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
    width: 320,
    height: 470,
    marginBottom: 10,
    resizeMode: "cover",
    borderRadius: 10,
  },
  title: {
    fontSize: 17,
    textAlign: "center",
    color: "white",
  },
  paginationContainer: {
    marginTop: 10,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    width: 6,
    height: 6,
  },
});

export default TrendingMovies;
