import React, { FunctionComponent, useCallback } from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { orderBy } from 'lodash';

import { Screen, Typography } from '../../shared/components';
import { HighScoreState } from '../../types';
import MainButton from '../../shared/components/MainButton';
import { ROUTES } from '../../shared/constants/contants';

const TitleContainer = styled.View`
    margin-top: 8px;
`;

const ButtonsContainer = styled.View`
    flex-direction: row;
`

const StartGameScreen: FunctionComponent = () => {
    const navigation = useNavigation();
    const highScores = useSelector((state: HighScoreState) => state.highScores);
    const sortedScores = orderBy(highScores, ['score', 'name'], ['desc'])
    const { gamePlay, leaderboards } = ROUTES;
    const onStartGame = useCallback(() => {
        navigation.navigate(gamePlay);
    }, []);
    const onLeaderboards = useCallback(() => {
        navigation.navigate(leaderboards);
    }, []);
    return (
        <Screen>
            <TitleContainer>
                <Typography>Welcome to the Guess the word game!</Typography>
            </TitleContainer>
            <ButtonsContainer>
                <MainButton onPress={onStartGame} title="Start Game" />
                <MainButton onPress={onLeaderboards} title="Leaderboards" style={{ width: 140 }} />
            </ButtonsContainer>
            {
                sortedScores && sortedScores.length ?
                    <Typography>High score: {sortedScores[0].score}</Typography>
                    : <Typography>High score: 0</Typography>
            }
        </Screen>
    )
};

export default StartGameScreen;
