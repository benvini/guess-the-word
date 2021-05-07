import React, { FunctionComponent } from 'react';
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

const StartGameScreen: FunctionComponent = () => {
    return (
        <Screen>
            <TitleContainer>
                <Typography>Welcome to the Guess the word game!</Typography>
            </TitleContainer>
            <ButtonsContainer>
                <MainButton onPress={() => { }} title="Start Game"/>
                <MainButton onPress={() => { }} title="Leaderboards" />
            </ButtonsContainer>
            <Typography>Your high score:</Typography>
        </Screen>
    )
};

export default StartGameScreen;
