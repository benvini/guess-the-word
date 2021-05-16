import React, { FunctionComponent, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { orderBy } from 'lodash';
import { Table, Row } from 'react-native-table-component';

import { Screen, Typography } from '../../shared/components';
import { HighScoreState, HighScore } from '../../types';
import MainButton from '../../shared/components/MainButton';
import COLOR from '../../styles/Color';

const ScrollView = styled.ScrollView`
    margin-top: -1px;   
`

const View = styled.View`
`

const TableContainer = styled.View`
    flex: 1; 
    padding: 16px;
    padding-top: 30px; 
`

const tableColumns = ['Score', 'Name', 'Phone'];
const tableWidth = [50, 180, 120];

const LeaderboardsScreen: FunctionComponent = () => {
    const highScores = useSelector((state: HighScoreState) => state.highScores);
    const sortedScores = orderBy(highScores, ['score', 'name'], ['desc'])
    const navigation = useNavigation();

    const onNewGame = useCallback(() => {
        navigation.navigate('Game Play');
    }, []);

    const onMainMenu = useCallback(() => {
        navigation.navigate('Main Menu');
    }, []);

    const getScoreItemAsArray = useCallback((scoreItem: HighScore) => {
        const { score, name, phone } = scoreItem;
        const scoreItemAsArray = [];
        scoreItemAsArray.push(score);
        scoreItemAsArray.push(name);
        scoreItemAsArray.push(phone);
        return scoreItemAsArray;
    }, []);

    return (
        <Screen>
            <Typography style={{ fontWeight: 'bold', marginVertical: 12, fontSize: 24, color: COLOR.PRIMARY }}>Leaderboards</Typography>
            <MainButton title="New Game" onPress={onNewGame} />
            <MainButton title="Main Menu" onPress={onMainMenu} />
            {
                sortedScores && sortedScores.length ?
                    <TableContainer>
                        <ScrollView horizontal={true}>
                            <View>
                                <Table>
                                    <Row data={tableColumns} widthArr={tableWidth} style={{
                                        height: 50,
                                        backgroundColor: COLOR.PRIMARY
                                    }} textStyle={{
                                        textAlign: 'center',
                                        color: 'white',
                                        fontWeight: 'bold'
                                    }} />
                                </Table>
                                <ScrollView>
                                    <Table>
                                        {
                                            sortedScores.map((scoreItem, index) => (
                                                <Row
                                                    key={index}
                                                    data={getScoreItemAsArray(scoreItem)}
                                                    widthArr={tableWidth}
                                                    style={{ height: 40, backgroundColor: COLOR.SECONDARY }}
                                                    textStyle={{
                                                        textAlign: 'center',
                                                        fontWeight: '400',
                                                        color: 'white'
                                                    }}
                                                />
                                            ))
                                        }
                                    </Table>
                                </ScrollView>
                            </View>
                        </ScrollView>
                    </TableContainer>
                    : <Typography style={{ marginTop: 16 }}>No data to show</Typography>
            }
        </Screen >
    )
}

export default LeaderboardsScreen;
