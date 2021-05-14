import React from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';

import COLOR from '../styles/Color';
import { StartGameScreen } from '../screens/StartGameScreen';
import { GamePlayScreen } from '../screens/GamePlayScreen';
import { GameOverScreen } from '../screens/GameOverScreen';
import { LeaderboardsScreen } from '../screens/LeaderboardsScreen';

const defaultNavOptions: StackNavigationOptions = {
    headerStyle: {
        backgroundColor: COLOR.PRIMARY
    },
    headerTintColor: 'white',
    headerTitleStyle: {
        alignSelf: 'center'
    },
    headerTitleContainerStyle: {
        left: 0
    },
    headerBackTitle: ''
};

const opacityTransition: object = { // animation on navigate the screens
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
    cardStyleInterpolator: ({ current }: { current: { progress: number } }) => ({
        cardStyle: {
            opacity: current.progress,
        },
    }),
};

const GameStackNavigator = createStackNavigator();

const GameNavigator = () => {
    return (
        <GameStackNavigator.Navigator screenOptions={{ ...defaultNavOptions, ...opacityTransition }}>
            <GameStackNavigator.Screen
                name="Main Menu"
                component={StartGameScreen}
            />
            <GameStackNavigator.Screen
                name="Game Play"
                component={GamePlayScreen}
            />
            <GameStackNavigator.Screen
                name="Game Over"
                component={GameOverScreen}
                options={() => ({
                    headerLeft: () => null,
                  })}
            />
            <GameStackNavigator.Screen
                name="Leaderboards"
                component={LeaderboardsScreen}
                options={() => ({
                    headerLeft: () => null,
                  })}
            />
        </GameStackNavigator.Navigator>
    )
}

export default GameNavigator;