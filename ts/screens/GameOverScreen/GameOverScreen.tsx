import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import {get} from 'lodash';

import { Screen, Typography } from '../../shared/components';
import MainButton from '../../shared/components/MainButton';

const GameOverScreen: FunctionComponent = () => {
  const [score, setScore] = useState(4);
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    const userScore = get(route.params, 'score', -1);
    setScore(userScore)
    
    if (userScore === -1) {
      console.error('Bad input. Could not get score.')
    }
  }, []);

  const onNewGame = useCallback(() => {
    navigation.navigate('Game Play')
  }, []);

  const onMainMenu = useCallback(() => {
    navigation.navigate('Main Menu')
  }, []);
  
  return (
    <Screen>
      <Typography style={{margin: 4}}>Your Score: {score}</Typography>
      <Typography style={{margin: 4}}>High Score:</Typography>
      <Typography style={{margin: 4}}>Form</Typography>
      <MainButton title="Leaderboards" style={{ width: 140 }}></MainButton>
      <MainButton title="New Game" onPress={onNewGame}></MainButton>
      <MainButton title="Main Menu" onPress={onMainMenu}></MainButton>
    </Screen>
  );
};

export default GameOverScreen;
