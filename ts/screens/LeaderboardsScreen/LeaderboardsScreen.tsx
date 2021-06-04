import React, {FC, useCallback} from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import styled from 'styled-components/native';
import {orderBy} from 'lodash';
import {Table, Row} from 'react-native-table-component';

import {Screen, Typography} from '../../shared/components';
import {HighScoreState, HighScore} from '../../types';
import MainButton from '../../shared/components/MainButton';
import COLOR from '../../styles/Color';
import {ROUTES} from '../../shared/constants/contants';

const ScrollView = styled.ScrollView`
  //TODO: fix margin top
  margin-top: -1px;
`;

const StyledTitle = styled(Typography)`
  font-weight: bold;
  margin-top: 12px;
  margin-bottom: 12px;
  font-size: 24px;
  color: ${COLOR.PRIMARY};
`;

const StyledEmptyScoresText = styled(Typography)`
  margin-top: 16px;
`;

const View = styled.View``;

const TableContainer = styled.View`
  flex: 1;
  padding: 16px;
  padding-top: 30px;
`;

const {t} = useTranslation('leaderboardsScreen');
const tableColumns = [t('score'), t('name'), t('phone')];
const tableWidth = [50, 180, 120];

const LeaderboardsScreen: FC = () => {
  const highScores = useSelector((state: HighScoreState) => state.highScores);
  const sortedScores = orderBy(highScores, ['score', 'name'], ['desc']);
  const navigation = useNavigation();
  const {mainMenu, gamePlay} = ROUTES;

  const onNewGame = useCallback(() => {
    navigation.navigate(gamePlay);
  }, []);

  const onMainMenu = useCallback(() => {
    navigation.navigate(mainMenu);
  }, []);

  const getScoreItemAsArray = useCallback((scoreItem: HighScore) => {
    const {score, name, phone} = scoreItem;
    const scoreItemAsArray = [];
    scoreItemAsArray.push(score);
    scoreItemAsArray.push(name);
    scoreItemAsArray.push(phone);
    return scoreItemAsArray;
  }, []);

  return (
    <Screen>
      <StyledTitle>{t('leaderboards')}</StyledTitle>
      <MainButton title={t('newGame')} onPress={onNewGame} />
      <MainButton title={t('mainMenu')} onPress={onMainMenu} />
      {sortedScores && sortedScores.length ? (
        <TableContainer>
          <ScrollView horizontal={true}>
            <View>
              <Table>
                <Row
                  data={tableColumns}
                  widthArr={tableWidth}
                  style={{
                    height: 50,
                    backgroundColor: COLOR.PRIMARY,
                  }}
                  textStyle={{
                    textAlign: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                />
              </Table>
              <ScrollView>
                <Table>
                  {sortedScores.map((scoreItem, index) => (
                    <Row
                      key={index}
                      data={getScoreItemAsArray(scoreItem)}
                      widthArr={tableWidth}
                      style={{height: 40, backgroundColor: COLOR.SECONDARY}}
                      textStyle={{
                        textAlign: 'center',
                        fontWeight: '400',
                        color: 'white',
                      }}
                    />
                  ))}
                </Table>
              </ScrollView>
            </View>
          </ScrollView>
        </TableContainer>
      ) : (
        <StyledEmptyScoresText>{t('noDataToShow')}</StyledEmptyScoresText>
      )}
    </Screen>
  );
};

export default LeaderboardsScreen;
