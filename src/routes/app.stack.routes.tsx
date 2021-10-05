import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MovieDetailsScreen from '../screens/MovieDetailsScreen';

const AppStackRoutes = ({ route }) => {
  const { Navigator, Screen } = createNativeStackNavigator();

  return (
    <Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="HomeScreen"
    >
      <Screen name="MovieDetailsScreen" component={MovieDetailsScreen} />
      <Screen
        name="HomeScreen"
        component={HomeScreen}
        initialParams={{ firstChar: route.params.firstChar }}
      />
    </Navigator>
  );
};

export default AppStackRoutes;
