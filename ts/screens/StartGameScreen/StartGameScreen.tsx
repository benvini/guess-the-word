import React, {FC, useCallback} from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {orderBy} from 'lodash';

import {Screen, Typography} from '../../shared/components';
import {HighScoreState} from '../../types';
import MainButton from '../../shared/components/MainButton';
import {ROUTES} from '../../shared/constants/contants';
import COLOR from '../../styles/Color';
import {styles} from './styles';

const StyledTitle = styled(Typography)`
  font-size: 24px;
  font-weight: bold;
  color: ${COLOR.PRIMARY};
  margin-top: 12px;
  margin-bottom: 12px;
`;

const ButtonsContainer = styled.View`
  flex-direction: row;
`;

const StartGameScreen: FC = () => {
  const navigation = useNavigation();
  const {t} = useTranslation('startGameScreen');
  const highScores = useSelector((state: HighScoreState) => state.highScores);
  const sortedScores = orderBy(highScores, ['score', 'name'], ['desc']);
  const highScore =
    sortedScores && sortedScores.length ? sortedScores[0].score : 0;
  const {gamePlay, leaderboards} = ROUTES;

  const onStartGame = useCallback(() => {
    navigation.navigate(gamePlay);
  }, [gamePlay, navigation]);

  const onLeaderboards = useCallback(() => {
    navigation.navigate(leaderboards);
  }, [leaderboards, navigation]);

  return (
    <Screen>
      <StyledTitle>{t('welcomeTitle')}</StyledTitle>
      <ButtonsContainer>
        <MainButton onPress={onStartGame} title={t('startGame')} />
        <MainButton
          onPress={onLeaderboards}
          title={t('leaderboards')}
          style={styles.leaderboardsButton}
        />
      </ButtonsContainer>
      <Typography>
        {t('highScore')}: {highScore}
      </Typography>
    </Screen>
  );
};

export default StartGameScreen;
