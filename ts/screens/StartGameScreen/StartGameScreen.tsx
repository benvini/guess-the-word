import React, { FunctionComponent } from 'react';
import styled from 'styled-components/native';
import { Screen, Typography } from '../../shared/components';

const Button = styled.TouchableOpacity`
    padding: 8px;
    border-radius: 4px;
`;

const ButtonsContainer = styled.View`
    flex-direction: row;
    justify-content: center;
`

const StartGameScreen: FunctionComponent = () => {
    return (
        <Screen>
            <Typography>Welcome to the Guess the word game!</Typography>
            <ButtonsContainer>
            <Button><Typography>Start Game</Typography></Button>
            <Button><Typography>Leaderboards</Typography></Button>
            </ButtonsContainer>
            <Typography>Your high score:</Typography>
        </Screen>
    )
};

export default StartGameScreen;
