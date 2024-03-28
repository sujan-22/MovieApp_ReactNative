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

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleMoviePress(item.id)}>
        <View style={styles.movieContainer}>
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
      <Text style={styles.sectionTitle}>Casts</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {casts.map((cast) => (
          <View key={cast.id} style={styles.castItem}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${cast.profile_path}`,
              }}
              style={styles.castImage}
            />
            <Text style={styles.castName}>{cast.name}</Text>
          </View>
        ))}
      </ScrollView>
      <Text style={styles.sectionTitle}>Related Movies</Text>
      <View style={styles.carouselContainer}>
        <Carousel
          data={top6Movies}
          renderItem={renderItem}
          sliderWidth={Dimensions.get("window").width}
          itemWidth={Dimensions.get("window").width * 0.3}
          layout="default"
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          loop
        />
      </View>
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
    marginTop: 10,
  },
  castName: {
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
});

export default RelatedAndCast;
