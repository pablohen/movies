import React from 'react';
import { View, Text, Image, StatusBar } from 'react-native';
import { MovieDTO } from '../dtos/MovieDTO';
import styled from 'styled-components/native';

interface Props {
  navigation;
  route;
}

const MovieDetailsScreen = ({ navigation, route }: Props) => {
  const movie = route.params.movie as MovieDTO;
  return (
    <Container>
      <StatusBar />
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
            width: 100,
            height: 200,
          }}
          style={{
            resizeMode: 'contain',
          }}
        />

        <Text style={{ color: '#ffffff' }}>
          Lançamento: {new Date(movie.release_date).toLocaleDateString()}
        </Text>
      </View>

      <Content>
        <Title>{movie.title}</Title>
        <Text>{movie.popularity}</Text>
        <Text>Resumo: {movie.overview}</Text>
      </Content>
    </Container>
  );
};

export default MovieDetailsScreen;

const Container = styled.View`
  flex: 1;
  background-color: #111111;
`;

const Content = styled.View`
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  color: white;
`;
