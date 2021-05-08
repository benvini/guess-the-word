import React, { FunctionComponent, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import {Screen, Typography} from '../../shared/components'; 
import Countdown from './components/Countdown';

const Button = styled.TouchableOpacity`
    padding: 8px;
    border-radius: 4px;
`;

const GamePlayScreen: FunctionComponent = () => {
    const [count, setCount] = useState(30);
    useEffect(() => {
        const timer = setInterval(() => {
            setCount(prevCount => prevCount - 1 >= 0 ? prevCount - 1 : 0);
          }, 1000);

          if (count === 0) {
            return () => {
                clearInterval(timer);
            }
          }
    }, []);
    return (
        <Screen><Typography>Game Play Screen</Typography>
        <Countdown time={count}/>
        <Typography>Input</Typography>
        <Button><Typography>Check Guess</Typography></Button>
        </Screen>
    )
};

export default GamePlayScreen;