import React, { FunctionComponent, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { orderBy } from 'lodash';

import { Screen, Typography } from '../../shared/components';
import { HighScoreState } from '../../types';
import MainButton from '../../shared/components/MainButton';
import COLOR from '../../styles/Color';

const ScoresContainer = styled.View`
    align-items: flex-start;
`

const LeaderboardsScreen: FunctionComponent = () => {
    const highScores = useSelector((state: HighScoreState) => state.highScores);
    const sortedScores = orderBy(highScores, ['score', 'name'], ['desc'])
    const navigation = useNavigation();

    const onNewGame = useCallback(() => {
        navigation.navigate('Game Play');
    }, []);

    const onMainMenu = useCallback(() => {
        navigation.navigate('Main Menu');
    }, []);

    return (
        <Screen>
            <Typography style={{ fontWeight: 'bold', marginVertical: 12, fontSize: 24, color: COLOR.PRIMARY }}>Leaderboards</Typography>
            <MainButton title="New Game" onPress={onNewGame} />
            <MainButton title="Main Menu" onPress={onMainMenu} />
            <ScoresContainer>
                {
                    sortedScores && sortedScores.length ? sortedScores.map((highScore, index) => {
                        return (
                            <Typography key={`${highScore.name} ${index}`} style={{ marginVertical: 4, padding: 12 }}>{index + 1}) Score: {highScore.score}, Player: {highScore.name}, Phone: {highScore.phone}</Typography>
                        );
                    }) : <Typography style={{ marginTop: 16 }}>No data to show</Typography>
                }
            </ScoresContainer>
        </Screen>
    )
}

export default LeaderboardsScreen;
