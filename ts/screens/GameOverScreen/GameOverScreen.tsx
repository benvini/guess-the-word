import React, {FC, useCallback, useEffect, useState} from 'react';
import {useRoute, useNavigation, RouteProp} from '@react-navigation/native';
import {orderBy} from 'lodash';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import styled from 'styled-components/native';
import {Formik} from 'formik';
import {Input, Card} from 'react-native-elements';
import * as yup from 'yup';

import {Screen, Typography} from '../../shared/components';
import {submitScore} from '../../store/actions/guess';
import COLOR from '../../styles/Color';
import MainButton from '../../shared/components/MainButton';
import {Keyboard} from 'react-native';
import {ROUTES} from '../../shared/constants/contants';
import {HighScoreState} from '../../types';
const {t} = useTranslation('gameOverScreen');

const StyledInput = styled.View`
  width: 200px;
  margin-top: 12px;
`;

const StyledTitle = styled(Typography)`
  font-size: 24px;
  font-weight: bold;
  color: ${COLOR.PRIMARY};
  margin-top: 12px;
  margin-bottom: 12px;
`;

const StyledText = styled(Typography)`
  margin: 4px;
`;

const StyledErrorText = styled(Typography)`
  font-size: 14px;
  color: red;
`;

const StyledSubmitScoreText = styled(Typography)`
  margin-top: 12px;
  margin-bottom: 12px;
`;

const TouchableWithoutFeedback = styled.TouchableWithoutFeedback``;

const FormContainer = styled.View`
  width: 80%;
  align-items: center;
  background-color: white;
  padding: 4px;
`;

const formValidationSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, ({min}) => `${t('nameValidationMsg')} ${min} ${t('characters')}`)
    .required(t('nameRequired')),
  phone: yup
    .string()
    .test('len', t('phoneValidationMsg'), val => val?.length === 9)
    .required(t('phoneRequired')),
});

const GameOverScreen: FC = () => {
  const [score, setScore] = useState(0);
  const [isSubmitForm, setIsSubmitForm] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const route = useRoute() as RouteProp<{params: {score: string}}, 'params'>;
  const navigation = useNavigation();
  const highScores = useSelector((state: HighScoreState) => state.highScores);
  const sortedScores = orderBy(highScores, ['score', 'name'], ['desc']);
  const highScore =
    sortedScores && sortedScores.length ? sortedScores[0].score : 0;

  const {mainMenu, gamePlay, leaderboards} = ROUTES;

  useEffect(() => {
    const userScore = parseInt(route.params?.score);
    if (!userScore && userScore !== 0) {
      setError(true);
    } else {
      setScore(userScore);
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

  if (error) {
    return (
      <Screen>
        <Typography>{t('unableSaveScore')}</Typography>
      </Screen>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Screen>
        <StyledTitle>{t('gameEnded')}</StyledTitle>
        {!isSubmitForm && (
          <>
            <StyledText>
              {t('yourScore')}: {score}
            </StyledText>
            <StyledText>
              {t('highScore')}: {highScore}
            </StyledText>
            <Card
              containerStyle={{
                alignItems: 'center',
                marginBottom: 4,
                borderColor: COLOR.PRIMARY,
                borderWidth: 3,
              }}>
              <Card.Title
                style={{
                  color: COLOR.PRIMARY,
                  fontWeight: 'bold',
                  fontSize: 24,
                }}>
                {t('submitYourScore')}
              </Card.Title>
              <Card.Divider
                style={{backgroundColor: COLOR.PRIMARY, height: 2}}
              />
              <FormContainer>
                <Formik
                  validationSchema={formValidationSchema}
                  initialValues={{name: '', phone: ''}}
                  onSubmit={values => onSubmit(values, score)}>
                  {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    isValid,
                  }) => (
                    <>
                      <StyledInput>
                        <Input
                          key="name"
                          placeholder={t('name')}
                          onChangeText={handleChange('name')}
                          onBlur={handleBlur('name')}
                          autoFocus
                          value={values.name}
                        />
                      </StyledInput>
                      {errors.name && (
                        <StyledErrorText>{errors.name}</StyledErrorText>
                      )}
                      <StyledInput>
                        <Input
                          key="phone"
                          placeholder={t('phone')}
                          keyboardType="numeric"
                          onChangeText={handleChange('phone')}
                          onBlur={handleBlur('phone')}
                          value={values.phone.toString()}
                        />
                      </StyledInput>
                      {errors.phone && (
                        <StyledErrorText>{errors.phone}</StyledErrorText>
                      )}
                      <MainButton
                        onPress={handleSubmit}
                        title={t('submit')}
                        disabled={!isValid}
                        style={{backgroundColor: COLOR.SUCCESS, marginTop: 12}}
                      />
                    </>
                  )}
                </Formik>
              </FormContainer>
            </Card>
          </>
        )}
        {isSubmitForm && (
          <StyledSubmitScoreText>
            {t('scoreSubmittedSuccessfully')}
          </StyledSubmitScoreText>
        )}
        <MainButton
          title={t('leaderboards')}
          style={{width: 140}}
          onPress={onLeaderboards}></MainButton>
        <MainButton title={t('newGame')} onPress={onNewGame}></MainButton>
        <MainButton title={t('mainMenu')} onPress={onMainMenu}></MainButton>
      </Screen>
    </TouchableWithoutFeedback>
  );
};

export default GameOverScreen;
