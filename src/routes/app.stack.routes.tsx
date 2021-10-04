import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MovieDetailsScreen from '../screens/MovieDetailsScreen';

const AppStackRoutes = () => {
  const { Navigator, Screen } = createNativeStackNavigator();
  return (
    <Navigator initialRouteName="HomeScreen">
      <Screen name="HomeScreen" component={HomeScreen} />
      <Screen name="MovieDetailsScreen" component={MovieDetailsScreen} />
    </Navigator>
  );
};

export default AppStackRoutes;
