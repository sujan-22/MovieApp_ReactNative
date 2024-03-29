import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";

const apiKey = "3be634f9be09af34cfd2298e2f2270bf";

const CastScreen = ({ route, navigation }) => {
  const { castId } = route.params;
  const [castInfo, setCastInfo] = useState(null);
  const [castMovies, setCastMovies] = useState([]);
  const [showFullBio, setShowFullBio] = useState(false);
  const [showAllMovies, setShowAllMovies] = useState(false);

  useEffect(() => {
    const fetchCastInfo = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/person/${castId}?api_key=${apiKey}&language=en-US`
        );
        setCastInfo(response.data);
      } catch (error) {
        console.error("Error fetching cast information:", error);
      }
    };

    const fetchCastMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/person/${castId}/movie_credits?api_key=${apiKey}&language=en-US`
        );
        setCastMovies(response.data.cast);
      } catch (error) {
        console.error("Error fetching cast movies:", error);
      }
    };

    fetchCastInfo();
    fetchCastMovies();
  }, [castId]);

  if (!castInfo) {
    return <Text>Loading...</Text>;
  }

  const toggleShowFullBio = () => {
    setShowFullBio((prevFullBio) => !prevFullBio);
  };

  const toggleShowAllMovies = () => {
    setShowAllMovies((prevMovies) => !prevMovies);
  };

  const getBiography = () => {
    const bio = castInfo.biography;
    if (showFullBio || bio.length <= 150) {
      return bio;
    } else {
      const truncatedBio = bio.substr(0, bio.indexOf(".", 150) + 1);
      return truncatedBio;
    }
  };

  const handleMoviePress = (id) => {
    navigation.navigate("MovieScreen", { movieId: id });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.navbar}>
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
        </View>
        <View style={styles.header}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${castInfo.profile_path}`,
              }}
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.name}>{castInfo.name}</Text>
        </View>
        <Text style={styles.birthPlace}>{castInfo.place_of_birth}</Text>
        <Text style={styles.bio}>Biography</Text>
        <Text style={styles.biography}>
          {getBiography()}
          {castInfo.biography.length > 150 && (
            <TouchableOpacity onPress={toggleShowFullBio}>
              <Text style={styles.moreButton}>
                {showFullBio ? " Read less" : " Read more"}
              </Text>
            </TouchableOpacity>
          )}
        </Text>
        <Text style={styles.moviesTitle}>Movies of {castInfo.name}</Text>
        <View style={styles.moviesContainer}>
          {castMovies
            .slice(0, showAllMovies ? castMovies.length : 6)
            .map((movie) => (
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
            ))}
        </View>
        {!showAllMovies && castMovies.length > 6 && (
          <TouchableOpacity onPress={toggleShowAllMovies}>
            <Text style={styles.seeMoreButton}>
              {showAllMovies ? "See less" : "See more"}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(14, 2, 33)",
    padding: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    top: 0,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 50,
  },
  imageContainer: {
    overflow: "hidden",
  },
  profileImage: {
    width: 400,
    borderRadius: 10,
    height: 300,
    resizeMode: "contain",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    color: "white",
  },
  birthPlace: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    color: "white",
  },
  bio: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  biography: {
    fontSize: 16,
    color: "white",
    marginBottom: 20,
  },
  moreButton: {
    color: "#00BFFF",
    fontSize: 16,
    top: 3,
  },
  moviesTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
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
  seeMoreButton: {
    color: "#00BFFF",
    textAlign: "center",
    alignSelf: "center",
    marginBottom: 10,
    marginTop: -5,
    fontSize: 16,
  },
});

export default CastScreen;
