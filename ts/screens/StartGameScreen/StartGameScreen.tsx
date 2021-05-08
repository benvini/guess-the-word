import React, { FunctionComponent, useCallback } from 'react';
import styled from 'styled-components/native';
import { Screen, Typography } from '../../shared/components';
import MainButton from '../../shared/components/MainButton';

const TitleContainer = styled.View`
    margin-top: 8px;
`;

const ButtonsContainer = styled.View`
    flex-direction: row;
    justify-content: center;
`

type Props = {
    navigation: any
}

const StartGameScreen: FunctionComponent<Props> = (props) => {
    const {navigation} = props;

    const onStartGame = useCallback(() => {
        navigation.navigate('Game Play');
    }, []);
    const onLeaderboards = useCallback(() => {
        navigation.navigate('Leaderboards');
    }, []);
    return (
        <Screen>
            <TitleContainer>
                <Typography>Welcome to the Guess the word game!</Typography>
            </TitleContainer>
            <ButtonsContainer>
                <MainButton onPress={onStartGame} title="Start Game"/>
                <MainButton onPress={onLeaderboards} title="Leaderboards" style={{ width: 140 }}/>
            </ButtonsContainer>
            <Typography>Your high score:</Typography>
        </Screen>
    )
};

export default StartGameScreen;
