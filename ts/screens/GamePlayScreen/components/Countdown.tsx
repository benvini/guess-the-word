import React, {FC, useCallback} from 'react';
import styled from 'styled-components/native';
import {Typography} from '../../../shared/components';

type Props = {
  time: number;
};

const StyledClock = styled(Typography)`
  font-weight: bold;
  font-size: 40px;
`;

const Countdown: FC<Props> = ({time}: Props) => {
  const getCountdownTime = useCallback(time => {
    let seconds = (time % 60).toString();
    let minutes = Math.floor(time / 60).toString();
    minutes = minutes.toString().length === 1 ? '0' + minutes : minutes;
    seconds = seconds.toString().length === 1 ? '0' + seconds : seconds;
    return minutes + ':' + seconds;
  }, []);

  return <StyledClock>{getCountdownTime(time)}</StyledClock>;
};

export default Countdown;
