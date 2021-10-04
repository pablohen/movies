import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Alert,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { MovieDTO } from '../dtos/MovieDTO';
import tmdbService from '../services/tmdbService';
import styled from 'styled-components/native';

interface Props {
  genre: {
    id: number;
    name: string;
  };
  handleNavigation;
}

interface ResProps {
  page: number;
  results: MovieDTO[];
}

const Carousel = ({ genre, handleNavigation }: Props) => {
  const [page, setPage] = useState<number>(1);
  const [movies, setMovies] = useState<MovieDTO[]>();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await tmdbService.get<ResProps>('/discover/movie', {
          params: {
            with_genres: genre.id,
          },
        });
        setPage(res.data.page);
        setMovies(res.data.results);
      } catch (error) {
        Alert.alert('Erro', error.message);
        console.error(error);
      }
    };

    fetchMovies();
  }, [genre]);

  return (
    <Container key={genre.id}>
      <Category>{genre.name}</Category>

      <FlatList
        data={movies}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) =>
          item.title && (
            <TouchableOpacity
              onPress={() => handleNavigation(item)}
              style={{ padding: 4, borderColor: 'black', borderWidth: 1 }}
            >
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
                  width: 100,
                  height: 150,
                }}
                style={{
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          )
        }
        horizontal={true}
      />
    </Container>
  );
};

const Container = styled.View`
  /* background-color: #111111; */
`;

const Category = styled.Text`
  color: #ffffff;
  font-size: 20px;
  font-weight: bold;
  margin-top: 12px;
`;

export default Carousel;
