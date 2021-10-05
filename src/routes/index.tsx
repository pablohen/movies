import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppTabRoutes from './app.tab.routes';

const Routes = () => {
  return (
    <NavigationContainer>
      <AppTabRoutes />
    </NavigationContainer>
  );
};

export default Routes;
