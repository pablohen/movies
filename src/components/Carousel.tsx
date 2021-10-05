import React, { useEffect, useState } from 'react';
import { Alert, FlatList, ActivityIndicator } from 'react-native';
import { MovieDTO } from '../dtos/MovieDTO';
import tmdbService from '../services/tmdbService';
import styled from 'styled-components/native';
import CarouselItem from './CarouselItem';

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
  const [movies, setMovies] = useState<MovieDTO[]>([]);

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

      {!!movies.length ? (
        <FlatList
          data={movies}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) =>
            item.poster_path && (
              <CarouselItem item={item} handleNavigation={handleNavigation} />
            )
          }
          horizontal={true}
        />
      ) : (
        <ActivityIndicator size="large" color="#fff" />
      )}
    </Container>
  );
};

const Container = styled.View``;

const Category = styled.Text`
  color: #ffffff;
  font-size: 20px;
  font-weight: bold;
  margin-top: 12px;
  margin-bottom: 4px;
`;

export default Carousel;
