import React, { FunctionComponent, useCallback } from 'react';
import styled from 'styled-components/native';

type Props = {
    time: number
}

const Container = styled.View`
    margin-bottom: 30px;
`

const Clock = styled.Text`
    font-weight: bold;
    font-size: 30px;
`

const Countdown: FunctionComponent<Props> = ({time}) => {
    const renderClock = useCallback((time) => {
        let seconds = (time % 60).toString();
        let minutes = (Math.floor(time / 60)).toString();
        minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
        seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;
        return minutes + ':' + seconds; 
    }, []);
    
    return (
        <Container>
        <Clock>{renderClock(time)}</Clock>
      </Container>
    )
}

export default Countdown;
