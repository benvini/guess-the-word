import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import {get} from 'lodash';
import styled from 'styled-components/native';
import { Formik } from 'formik'
import {Input} from 'react-native-elements'; 

import { Screen, Typography } from '../../shared/components';
import COLOR from '../../styles/Color';
import MainButton from '../../shared/components/MainButton';

const StyledInput = styled.View`
    width: 200px;
`

const FormContainer = styled.View`
    width: 80%;
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    align-items: center;
    background-color: white;
    padding: 10px;
    margin-top: 8px;
    margin-bottom: 16px;
`

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
      <FormContainer>
      <Formik
            initialValues={{ name: '', phone: '' }}
            onSubmit={values => console.log(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <>
              <Typography style={{fontWeight: 'bold', marginBottom: 14, fontSize: 24, color: COLOR.PRIMARY}}>Submit your score</Typography>
                <StyledInput><Input
                  key="name"
                  placeholder="Name"
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  autoFocus
                  value={values.name}
                />
                </StyledInput>
                <StyledInput><Input
                  key="phone"
                  placeholder="Phone"
                  keyboardType="numeric"
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                />
                </StyledInput>
                <MainButton onPress={handleSubmit} title="Submit" style={{backgroundColor: COLOR.SUCCESS}}/>
              </>
            )}
        </Formik>
        </FormContainer>
      <MainButton title="Leaderboards" style={{ width: 140 }}></MainButton>
      <MainButton title="New Game" onPress={onNewGame}></MainButton>
      <MainButton title="Main Menu" onPress={onMainMenu}></MainButton>
    </Screen>
  );
};

export default GameOverScreen;
