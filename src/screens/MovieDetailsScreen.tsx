import React from 'react';
import { View, Text, Image, StatusBar, Alert, Dimensions } from 'react-native';
import { MovieDTO } from '../dtos/MovieDTO';
import styled from 'styled-components/native';
import { Rating } from 'react-native-ratings';

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
          // flex: 1,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          padding: 20,
        }}
      >
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
            width: Dimensions.get('screen').width / 2.25,
            height: Dimensions.get('screen').height / 2,
          }}
          style={{
            resizeMode: 'contain',
          }}
        />

        <View
          style={{
            flex: 1,
            paddingHorizontal: 10,
          }}
        >
          <Title>{movie.title}</Title>
          <Text style={{ color: '#ffffff' }}>
            Lançamento em {new Date(movie.release_date).toLocaleDateString()}
          </Text>
          <Rating
            type="custom"
            imageSize={30}
            startingValue={movie.vote_average / 2}
            tintColor="#111111"
          />
        </View>
      </View>

      <Content>
        <Overview>{movie.overview}</Overview>
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
  margin-top: 20px;
`;

const Overview = styled.Text`
  font-size: 18px;
  color: #ffffffaa;
`;
