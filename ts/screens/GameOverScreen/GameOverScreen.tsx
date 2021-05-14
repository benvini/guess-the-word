import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { get } from 'lodash';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { Formik } from 'formik'
import { Input } from 'react-native-elements';
import * as yup from 'yup'

import { Screen, Typography } from '../../shared/components';
import { submitScore } from '../../store/actions/guess';
import COLOR from '../../styles/Color';
import MainButton from '../../shared/components/MainButton';

const StyledInput = styled.View`
    width: 200px;
    margin-top: 12px;
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

const formValidationSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, ({ min }) => `Name must be at least ${min} characters`)
    .required('Name is Required'),
  phone: yup
    .number()
    .positive()
    .integer()
    .test('len', 'Phone must be exactly 9 characters', (val) => val?.toString().length === 9)
    .required('Phone is required'),
});

const GameOverScreen: FunctionComponent = () => {
  const [score, setScore] = useState(4);
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    const userScore = get(route.params, 'score', -1);
    setScore(userScore);

    if (userScore === -1) {
      console.error('Bad input. Could not get score.');
    }
  }, []);

  const onNewGame = useCallback(() => {
    navigation.navigate('Game Play');
  }, []);

  const onMainMenu = useCallback(() => {
    navigation.navigate('Main Menu');
  }, []);

  const onLeaderboards = useCallback(() => {
    navigation.navigate('Leaderboards');
  }, []);

  const onSubmit = useCallback((highScore) => {
    dispatch(submitScore(highScore))
  }, []);

  return (
    <Screen>
      <Typography style={{ margin: 4 }}>Your Score: {score}</Typography>
      <Typography style={{ margin: 4 }}>High Score:</Typography>
      <FormContainer>
        <Formik
          validationSchema={formValidationSchema}
          initialValues={{ name: '', phone: '' }}
          onSubmit={values => onSubmit(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
            <>
              <Typography style={{ fontWeight: 'bold', fontSize: 24, color: COLOR.PRIMARY }}>Submit your score</Typography>
              <StyledInput><Input
                key="name"
                placeholder="Name"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                autoFocus
                value={values.name}
              />
              </StyledInput>
              {errors.name &&
                <Typography style={{ fontSize: 14, color: 'red' }}>{errors.name}</Typography>
              }
              <StyledInput><Input
                key="phone"
                placeholder="Phone"
                keyboardType="numeric"
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                value={values.phone}
              />
              </StyledInput>
              {errors.phone &&
                <Typography style={{ fontSize: 14, color: 'red' }}>{errors.phone}</Typography>
              }
              <MainButton onPress={handleSubmit} title="Submit" disabled={!isValid} style={{ backgroundColor: COLOR.SUCCESS, marginTop: 12 }} />
            </>
          )}
        </Formik>
      </FormContainer>
      <MainButton title="Leaderboards" style={{ width: 140 }} onPress={onLeaderboards}></MainButton>
      <MainButton title="New Game" onPress={onNewGame}></MainButton>
      <MainButton title="Main Menu" onPress={onMainMenu}></MainButton>
    </Screen>
  );
};

export default GameOverScreen;
