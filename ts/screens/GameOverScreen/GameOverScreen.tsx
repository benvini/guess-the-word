import React, { FunctionComponent, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { useRoute } from '@react-navigation/native';
import {get} from 'lodash';

import { Screen, Typography } from '../../shared/components';

const Button = styled.TouchableOpacity`
    padding: 8px;
    border-radius: 4px;
`;

const GameOverScreen: FunctionComponent = () => {
  const [score, setScore] = useState(4);
  const route = useRoute();

  useEffect(() => {
    const userScore = get(route.params, 'score', -1);
    setScore(userScore)
    
    if (userScore === -1) {
      console.error('Bad input. Could not get score.')
    }
  }, []);
  
  return (
    <Screen>
      <Typography>Game Over Screen</Typography>
      <Typography>Your Score: {score}</Typography>
      <Typography>High Score:</Typography>
      <Typography>Form</Typography>
      <Button><Typography>Leaderboards</Typography></Button>
    </Screen>
  );
};

export default GameOverScreen;
