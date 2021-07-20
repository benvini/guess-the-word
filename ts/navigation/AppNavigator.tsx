import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import GameNavigator from './GameNavigator';

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <GameNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
