import React from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { Platform } from 'react-native';
import COLOR from '../styles/Color';

import { StartGameScreen } from '../screens/StartGameScreen';
import { GamePlayScreen } from '../screens/GamePlayScreen';
import { GameOverScreen } from '../screens/GameOverScreen';
import { LeaderboardsScreen } from '../screens/LeaderboardsScreen';

const defaultNavOptions: StackNavigationOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? COLOR.PRIMARY : 'white'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : COLOR.PRIMARY,
    headerTitleStyle: {
        alignSelf: 'center'
    },
    headerTitleContainerStyle: {
        left: 0
    },
    
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
                name="Welcome"
                component={StartGameScreen}
            />
            <GameStackNavigator.Screen
                name="Game Play"
                component={GamePlayScreen}
            />
            <GameStackNavigator.Screen
                name="Game Over"
                component={GameOverScreen}
            />
            <GameStackNavigator.Screen
                name="Leaderboards"
                component={LeaderboardsScreen}
            />
        </GameStackNavigator.Navigator>
    )
}

export default GameNavigator;