import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { genresAlphabet } from '../utils/moviesGenres';
import AppStackRoutes from './app.stack.routes';
import { Feather } from '@expo/vector-icons';

interface Props {}

const AppTabRoutes = (props: Props) => {
  const { Navigator, Screen } = createBottomTabNavigator();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <Feather
            name="download"
            size={20}
            color={focused ? '#fff' : '#fffa'}
          />
        ),
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#fffa',
        tabBarActiveBackgroundColor: '#111111',
        tabBarInactiveBackgroundColor: '#111111',
      }}
    >
      {genresAlphabet.map((firstChar) => (
        <Screen
          key={firstChar}
          name={firstChar}
          component={AppStackRoutes}
          initialParams={{ firstChar }}
        />
      ))}
    </Navigator>
  );
};

export default AppTabRoutes;
