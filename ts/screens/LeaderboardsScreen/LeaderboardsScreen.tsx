import React, {FunctionComponent, useCallback, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Screen, Typography} from '../../shared/components';
import { HighScoreState } from '../../types';
import MainButton from '../../shared/components/MainButton';
import COLOR from '../../styles/Color';

const LeaderboardsScreen: FunctionComponent = () => {
    const highScores = useSelector((state: HighScoreState) => state.highScores);
    const navigation = useNavigation();
    
    // useEffect(() => {  @Todo: continue debug side effects
    //     console.log('highScores', highScores);
        
    // }, [highScores]);

    const onNewGame = useCallback(() => {
        navigation.navigate('Game Play');
    }, []);

    const onMainMenu = useCallback(() => {
        navigation.navigate('Main Menu');
    }, []);
    
    return (
        <Screen>
            <Typography style={{fontWeight: 'bold', marginVertical: 12, fontSize: 24, color: COLOR.PRIMARY}}>Leaderboards</Typography>
            <MainButton title="New Game" onPress={onNewGame}/>
            <MainButton title="Main Menu" onPress={onMainMenu}/>
            {
                highScores.length && highScores.map((highScore) => {
                    return (
                        <>
                        <Typography>{highScore.name}</Typography>
                        <Typography>{highScore.phone}</Typography>
                        </>
                    )
                })
            }
        </Screen>
    )
}

export default LeaderboardsScreen;
