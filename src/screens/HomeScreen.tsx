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
  route;
}

const HomeScreen = ({ navigation, route }: Props) => {
  const { firstChar } = route.params || '';

  const handleNavigation = (movie: MovieDTO) => {
    navigation.navigate('MovieDetailsScreen', { movie });
  };

  return (
    <Container>
      <StatusBar />
      <ScrollView style={{ flex: 1 }}>
        <Main>
          {firstChar &&
            genres
              .filter((genre) => genre.name[0] === firstChar)
              .map((genre) => (
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
