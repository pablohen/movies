import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  Alert,
  Dimensions,
  Linking,
} from 'react-native';
import { MovieDTO } from '../dtos/MovieDTO';
import styled from 'styled-components/native';
import { Rating } from 'react-native-ratings';
import tmdbService from './../services/tmdbService';
import { MovieTrailerDTO } from './../dtos/MovieTrailerDTO';
interface Props {
  navigation;
  route;
}

interface ResProps {
  id: number;
  results: MovieTrailerDTO[];
}

const MovieDetailsScreen = ({ navigation, route }: Props) => {
  const movie = route.params.movie as MovieDTO;
  const [trailers, setTrailers] = useState<MovieTrailerDTO[]>([]);
  const youtubeUrl = 'https://www.youtube.com/watch?v=';

  useEffect(() => {
    const fetchTrailers = async () => {
      try {
        const res = await tmdbService.get<ResProps>(
          `/movie/${movie.id}/videos`
        );
        const { results } = res.data;
        setTrailers(results);
      } catch (error) {
        Alert.alert('Ocorreu um erro', 'Tente novamente mais tarde.');
      }
    };

    if (movie.id) fetchTrailers();
  }, [movie]);

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
            height: Dimensions.get('screen').height / 4,
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

      {!!trailers.length && (
        <Content>
          <Title>Trailers</Title>

          {trailers.map((trailer) => {
            if (trailer.site === 'YouTube') {
              return (
                <Text
                  onPress={() => {
                    Linking.openURL(`${youtubeUrl}${trailer.key}`);
                  }}
                  style={{ color: '#ffffffdd', marginBottom: 8 }}
                  key={trailer.key}
                >
                  {trailer.name}
                </Text>
              );
            }
          })}
        </Content>
      )}
    </Container>
  );
};

export default MovieDetailsScreen;

const Container = styled.ScrollView`
  flex: 1;
  background-color: #111111;
`;

const Content = styled.View`
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  color: white;
  margin-bottom: 20px;
`;

const Overview = styled.Text`
  font-size: 18px;
  color: #ffffffaa;
`;
