import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {StartGameScreen} from '../screens/StartGameScreen';
import {GamePlayScreen} from '../screens/GamePlayScreen';
import {GameOverScreen} from '../screens/GameOverScreen';
import {LeaderboardsScreen} from '../screens/LeaderboardsScreen';
import {ROUTES} from '../shared/constants/contants';

const opacityTransition: object = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: {
      animation: 'timing',
    },
    close: {
      animation: 'timing',
      config: {
        duration: 600,
      },
    },
  },
  cardStyleInterpolator: ({current}: {current: {progress: number}}) => ({
    cardStyle: {
      opacity: current.progress,
    },
  }),
};

const GameStackNavigator = createStackNavigator();

const GameNavigator = () => {
  const {mainMenu, gamePlay, gameOver, leaderboards} = ROUTES;
  return (
    <GameStackNavigator.Navigator
      screenOptions={{
        ...opacityTransition,
        headerShown: false,
      }}>
      <GameStackNavigator.Screen name={mainMenu} component={StartGameScreen} />
      <GameStackNavigator.Screen name={gamePlay} component={GamePlayScreen} />
      <GameStackNavigator.Screen
        name={gameOver}
        component={GameOverScreen}
        options={() => ({
          headerLeft: () => null,
        })}
      />
      <GameStackNavigator.Screen
        name={leaderboards}
        component={LeaderboardsScreen}
        options={() => ({
          headerLeft: () => null,
        })}
      />
    </GameStackNavigator.Navigator>
  );
};

export default GameNavigator;
