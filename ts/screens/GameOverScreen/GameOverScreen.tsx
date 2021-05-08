import React, {FunctionComponent} from 'react';
import styled from 'styled-components/native';

import {Screen, Typography} from '../../shared/components';

const Button = styled.TouchableOpacity`
    padding: 8px;
    border-radius: 4px;
`;

const GameOverScreen: FunctionComponent = () => {
  return (
    <Screen>
      <Typography>Game Over Screen</Typography>
      <Typography>Your Score:</Typography>
      <Typography>High Score:</Typography>
      <Typography>Form</Typography>
      <Button><Typography>Leaderboards</Typography></Button>
    </Screen>
  );
};

export default GameOverScreen;
