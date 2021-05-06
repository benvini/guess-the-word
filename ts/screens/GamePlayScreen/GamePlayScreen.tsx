import React, { FunctionComponent } from 'react';
import styled from 'styled-components/native';
import {Screen, Typography} from '../../shared/components'; 

const Button = styled.TouchableOpacity`
    padding: 8px;
    border-radius: 4px;
`;

const GamePlayScreen: FunctionComponent = () => {
    return (
        <Screen><Typography>Game Play Screen</Typography>
        <Typography>Countdown</Typography>
        <Typography>Input</Typography>
        <Button><Typography>Check Guess</Typography></Button>
        </Screen>
    )
};

export default GamePlayScreen;