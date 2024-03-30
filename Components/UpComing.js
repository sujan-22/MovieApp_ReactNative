import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import axios from "axios";

const UpComing = ({ navigation }) => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchUpcomingMovies();
    }, 2000);

    return () => clearTimeout(delay);
  }, []);

  const fetchUpcomingMovies = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/upcoming",
        {
          params: {
            api_key: "3be634f9be09af34cfd2298e2f2270bf",
            language: "en-US",
            page: 1,
          },
        }
      );
      setUpcomingMovies(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching upcoming movies:", error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather
            name="arrow-left"
            size={24}
            color="white"
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Upcoming Movies</Text>
        <View style={{ width: 24 }} />
      </View>
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          {upcomingMovies.map((item) => (
            <View key={item.id} style={styles.movieContainer}>
              <View style={styles.leftContainer}>
                <Text style={styles.releaseDate}>
                  {new Date(item.release_date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </Text>
              </View>
              <View style={styles.rightContainer}>
                <Text style={styles.movieTitle}>{item.title}</Text>
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                  }}
                  style={styles.poster}
                  resizeMode="contain"
                />
                <Text style={styles.description}>{item.overview}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    backgroundColor: "rgb(14, 2, 33)",
    padding: 20,
    flex: 1,
  },
  navbar: {
    flexDirection: "row",
    width: "100%",
    height: 70,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  navTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 15,
    textAlign: "right",
  },
  icon: {
    marginTop: 15,
  },
  movieContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  leftContainer: {
    width: 90,
    marginRight: 10,
  },
  rightContainer: {
    flex: 1,
  },
  releaseDate: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "left",
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  poster: {
    width: 125,
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  description: {
    color: "white",
    fontSize: 14,
    textAlign: "justify",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(14, 2, 33)",
  },
});

export default UpComing;
