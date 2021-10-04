import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Alert,
  Image,
  StatusBar,
  Button,
  ScrollView,
} from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import tmdbService from '../services/tmdbService';
import { MovieDTO } from '../dtos/MovieDTO';
import genres from './../utils/moviesGenres';
import Carousel from '../components/Carousel';

interface Props {
  navigation;
}

interface ResProps {
  page: number;
  results: MovieDTO[];
}

const HomeScreen = ({ navigation }: Props) => {
  const [page, setPage] = useState<number>(1);
  const [movies, setMovies] = useState<MovieDTO[]>();

  const handleNavigation = (movie: MovieDTO) => {
    navigation.navigate('MovieDetailsScreen', { movie });
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await tmdbService.get<ResProps>('/trending/all/week');
        setPage(res.data.page);
        setMovies(res.data.results);
      } catch (error) {
        Alert.alert('Erro', error.message);
        console.error(error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>
      <StatusBar />

      <View style={{ padding: 12, backgroundColor: '#111111' }}>
        {/* {genres.map((genre) => (
          <Carousel
            key={genre.id}
            genre={genre}
            handleNavigation={handleNavigation}
          />
          ))} */}

        <FlatList
          data={genres}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Carousel
              key={item.id}
              genre={item}
              handleNavigation={handleNavigation}
            />
          )}
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
