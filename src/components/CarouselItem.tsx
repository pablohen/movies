import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { MovieDTO } from '../dtos/MovieDTO';
import styled from 'styled-components/native';

interface Props {
  item: MovieDTO;
  handleNavigation: (item) => void;
}

const CarouselItem = ({ item, handleNavigation }: Props) => {
  return (
    <Container onPress={() => handleNavigation(item)}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
          width: 100,
          height: 150,
        }}
        style={{
          resizeMode: 'cover',
          borderRadius: 8,
        }}
      />
    </Container>
  );
};

const Container = styled(TouchableOpacity)`
  padding: 4px;
`;

export default CarouselItem;
