import React, { FunctionComponent, useCallback } from 'react';
import styled from 'styled-components/native';

type Props = {
    time: number,
    style?: object
}

const Container = styled.View`
    margin-bottom: 16px;
`

const Clock = styled.Text`
    font-weight: bold;
    font-size: 40px;
`

const Countdown: FunctionComponent<Props> = ({time, style}: Props) => {
    const renderClock = useCallback((time) => {
        let seconds = (time % 60).toString();
        let minutes = (Math.floor(time / 60)).toString();
        minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
        seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;
        return minutes + ':' + seconds; 
    }, []);
    
    return (
        <Container style={{...style}}>
        <Clock>{renderClock(time)}</Clock>
      </Container>
    )
}

export default Countdown;
