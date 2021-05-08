import React, { FunctionComponent, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Screen, Typography } from '../../shared/components';
import MainButton from '../../shared/components/MainButton';
import Countdown from './components/Countdown';

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
        <Screen>
            <Countdown time={count} style={{ marginTop: 12 }} />
            <Typography>Input</Typography>
            <MainButton title="Check The Guess" style={{ width: 160 }} />
        </Screen>
    )
};

export default GamePlayScreen;
