import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { get } from 'lodash';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { Formik } from 'formik'
import { Input, Card } from 'react-native-elements';
import * as yup from 'yup'

import { Screen, Typography } from '../../shared/components';
import { submitScore } from '../../store/actions/guess';
import COLOR from '../../styles/Color';
import MainButton from '../../shared/components/MainButton';
import { Keyboard } from 'react-native';
import { ROUTES } from '../../shared/constants/contants';

const StyledInput = styled.View`
    width: 200px;
    margin-top: 12px;
`

const TouchableWithoutFeedback = styled.TouchableWithoutFeedback``

const FormContainer = styled.View`
    width: 80%;
    align-items: center;
    background-color: white;
    padding: 4px;
`

const formValidationSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, ({ min }) => `Name must be at least ${min} characters`)
    .required('Name is Required'),
  phone: yup
    .number()
    .integer()
    .test('len', 'Phone must be exactly 9 characters', (val) => val?.toString().length === 9)
    .required('Phone is required'),
});

const GameOverScreen: FunctionComponent = () => {
  const [score, setScore] = useState(4);
  const [isSubmitForm, setIsSubmitForm] = useState(false);
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();
  const { mainMenu, gamePlay, leaderboards } = ROUTES;

  useEffect(() => {
    const userScore = get(route.params, 'score', -1);
    setScore(userScore);

    if (userScore === -1) {
      console.error('Bad input. Could not get score.');
    }
  }, []);

  const onNewGame = useCallback(() => {
    navigation.navigate(gamePlay);
  }, []);

  const onMainMenu = useCallback(() => {
    navigation.navigate(mainMenu);
  }, []);

  const onLeaderboards = useCallback(() => {
    navigation.navigate(leaderboards);
  }, []);

  const onSubmit = useCallback((userDetails, score) => {
    dispatch(submitScore(userDetails, score));
    setIsSubmitForm(true);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Screen>
        {!isSubmitForm &&
          <>
            <Typography style={{ margin: 4 }}>Your Score: {score}</Typography>
            <Typography style={{ margin: 4 }}>High Score:</Typography>
            <Card containerStyle={{ alignItems: 'center', marginBottom: 4, borderColor: COLOR.PRIMARY, borderWidth: 3 }}>
              <Card.Title style={{ color: COLOR.PRIMARY, fontWeight: 'bold', fontSize: 24 }}>Submit your score</Card.Title>
              <Card.Divider style={{ backgroundColor: COLOR.PRIMARY, height: 2 }} />
              <FormContainer>
                <Formik
                  validationSchema={formValidationSchema}
                  initialValues={{ name: '', phone: '' }}
                  onSubmit={values => onSubmit(values, score)}
                >
                  {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
                    <>
                      <StyledInput>
                        <Input
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
            </Card>
          </>
        }
        {
          isSubmitForm && <Typography style={{ marginVertical: 12 }}>Your score has been successfully submitted!</Typography>
        }
        <MainButton title="Leaderboards" style={{ width: 140 }} onPress={onLeaderboards}></MainButton>
        <MainButton title="New Game" onPress={onNewGame}></MainButton>
        <MainButton title="Main Menu" onPress={onMainMenu}></MainButton>
      </Screen>
    </TouchableWithoutFeedback>
  );
};

export default GameOverScreen;
