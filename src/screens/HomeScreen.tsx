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
import styled from 'styled-components/native';

interface Props {
  navigation;
}

interface ResProps {
  page: number;
  results: MovieDTO[];
}

const HomeScreen = ({ navigation }: Props) => {
  // const [page, setPage] = useState<number>(1);
  // const [movies, setMovies] = useState<MovieDTO[]>();

  const handleNavigation = (movie: MovieDTO) => {
    navigation.navigate('MovieDetailsScreen', { movie });
  };

  // useEffect(() => {
  //   const fetchMovies = async () => {
  //     try {
  //       const res = await tmdbService.get<ResProps>('/trending/all/week');
  //       setPage(res.data.page);
  //       setMovies(res.data.results);
  //     } catch (error) {
  //       Alert.alert('Erro', error.message);
  //       console.error(error);
  //     }
  //   };

  //   fetchMovies();
  // }, []);

  return (
    <Container>
      <StatusBar />
      <ScrollView style={{ flex: 1 }}>
        <Main>
          {genres.map((genre) => (
            <Carousel
              key={genre.id}
              genre={genre}
              handleNavigation={handleNavigation}
            />
          ))}
        </Main>
      </ScrollView>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #111111;
`;

const Main = styled.View`
  padding: 12px;
`;

export default HomeScreen;
