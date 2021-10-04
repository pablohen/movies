import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStackRoutes from './app.stack.routes';

const Routes = () => {
  return (
    <NavigationContainer>
      <AppStackRoutes />
    </NavigationContainer>
  );
};

export default Routes;
