import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Keyboard, Platform} from 'react-native';
import styled from 'styled-components/native';
import {Input} from 'react-native-elements';
import {isEmpty} from 'lodash';

import {styles} from './styles';
import {Screen, Typography} from '../../shared/components';
import MainButton from '../../shared/components/MainButton';
import Countdown from './components/Countdown';
import {
  DIFFICULTY,
  COUNTDOWN_SECONDS,
  LIFE_POINTS,
  ROUTES,
} from '../../shared/constants/contants';
import {
  getWordByDifficulty,
  getUniqueRandomIndexes,
  replaceLetterByIndex,
  removeSpaces,
} from '../../shared/utils/utils';
import COLOR from '../../styles/Color';

const GuessContainer = styled.View`
  flex-direction: ${Platform.OS === 'ios' ? 'row' : 'row-reverse'};
`;

const TouchableWithoutFeedback = styled.TouchableWithoutFeedback``;

const StyledCountdown = styled(Countdown)`
  margin-bottom: 16px;
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

const StyledSuccessText = styled(Typography)`
  color: ${COLOR.SUCCESS};
`;

const StyledErrorText = styled(Typography)`
  color: ${COLOR.ERROR};
`;

const InputContainer = styled.View`
  border-width: 0;
  width: 48px;
  margin-top: 2px;
  margin-right: 6px;
`;

const StyledInput = styled(Input)`
  font-size: 20px;
  text-align: center;
  color: ${({theme: {palette}}) => palette.textColor};
`;

const GamePlayScreen: FC = () => {
  const [seconds, setSeconds] = useState(COUNTDOWN_SECONDS);
  const [difficulty, setDifficulty] = useState(DIFFICULTY.Easy);
  const [lifePoints, setLifePoints] = useState(LIFE_POINTS);
  const [score, setScore] = useState(0);
  const [generatedWord, setGeneratedWord] = useState('');
  const [transformedWord, setTransformedWord] = useState('');
  const [missingIndexes, setMissingIndexes] = useState<number[]>([]);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [guessIndicator, setGuessIndicator] = useState({
    visible: false,
    correct: false,
    message: '',
  });
  const navigation = useNavigation();
  const {t} = useTranslation('gamePlayScreen');
  const {gameOver} = ROUTES;
  const secoreRef = useRef(score);
  secoreRef.current = score;

  const initialGameConfig = useCallback(() => {
    setIsGameEnded(false);
    setSeconds(COUNTDOWN_SECONDS);
    setDifficulty(DIFFICULTY.Easy);
    setLifePoints(LIFE_POINTS);
    setScore(0);
    setGeneratedWord('');
    setTransformedWord('');
    setMissingIndexes([]);
    setGuessIndicator({
      visible: false,
      correct: false,
      message: '',
    });
  }, []);

  const generateNewWord = useCallback(() => {
    const newWord = getWordByDifficulty(difficulty);
    setGeneratedWord(newWord);
    const wordLength = newWord.length;
    const randomIndexes = getUniqueRandomIndexes(1, wordLength);

    setMissingIndexes(randomIndexes);
    const newTransformedWord = newWord
      .split('')
      .map((char, index) => {
        if (randomIndexes.includes(index)) {
          return ' ';
        }
        return char;
      })
      .join('');
    setTransformedWord(newTransformedWord);
  }, [difficulty]);

  useEffect(() => {
    // generate word on initial render
    generateNewWord();
  }, [generateNewWord]);

  useEffect(() => {
    // setup initial game config
    const unsubscribe = navigation.addListener('focus', () => {
      initialGameConfig();
      generateNewWord();
    });

    return unsubscribe;
  }, [navigation, generateNewWord, initialGameConfig]);

  useEffect(() => {
    // hide guess indicator in 3 seconds
    const timer = setTimeout(() => {
      setGuessIndicator({
        visible: false,
        correct: true,
        message: '',
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [guessIndicator]);

  const getNextDifficulty = useCallback(() => {
    let nextLevel = DIFFICULTY.Easy;

    switch (difficulty) {
      case DIFFICULTY.Easy:
        nextLevel = DIFFICULTY.Intermediate;
        break;
      case DIFFICULTY.Intermediate:
        nextLevel = DIFFICULTY.Hard;
        break;
      case DIFFICULTY.Hard:
        nextLevel = DIFFICULTY.WorldClass;
        break;
      default:
        break;
    }

    return nextLevel;
  }, [difficulty]);

  useEffect(() => {
    // moving next level or moving to the end game screen when countdown gets 0
    if (seconds === 0) {
      const nextLevel = getNextDifficulty();
      if (nextLevel !== DIFFICULTY.Easy) {
        // if game continues
        setDifficulty(nextLevel);
        setSeconds(COUNTDOWN_SECONDS);
      } else {
        // game ended
        setIsGameEnded(true);
        setTransformedWord('');
        const timer = setTimeout(() => {
          navigation.navigate(gameOver, {score: secoreRef.current});
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [seconds, gameOver, navigation, getNextDifficulty]);

  const startCountdown = useCallback(() => {
    const timer = setInterval(() => {
      setSeconds(prevSeconds => (prevSeconds - 1 >= 0 ? prevSeconds - 1 : 0));
    }, 1000);
    return timer;
  }, []);

  useEffect(() => {
    // starts the countdown when new level reached
    generateNewWord();
    const countdownTimer = startCountdown();
    setGuessIndicator({
      visible: false,
      correct: true,
      message: '',
    });

    return () => {
      clearInterval(countdownTimer);
    };
  }, [difficulty, generateNewWord, startCountdown]);

  useEffect(() => {
    // potential moving to the end game screen when losing all life points
    if (lifePoints === 0) {
      setIsGameEnded(true);
      setTransformedWord('');
      const timer = setTimeout(() => {
        navigation.navigate(gameOver, {score: secoreRef.current});
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [lifePoints, gameOver, navigation]);

  const onTextChanges = useCallback(
    (text, index) => {
      const letter = isEmpty(text) ? ' ' : text; // check if text is '' or ' ', assign ' '
      const updatedWord = replaceLetterByIndex(transformedWord, index, letter);
      setTransformedWord(updatedWord);
    },
    [transformedWord],
  );

  const renderWord = useCallback(() => {
    const content = transformedWord.split('').map((char, index) => {
      const letter = isEmpty(char.trim()) ? '' : char;
      if (missingIndexes.includes(index)) {
        return (
          <InputContainer key={`${transformedWord} ${index}`}>
            <StyledInput
              style={styles.missingWord}
              autoCompleteType="off"
              autoCapitalize="none"
              value={letter}
              autoFocus
              onChangeText={text => onTextChanges(text, index)}
              maxLength={1}
            />
          </InputContainer>
        );
      }
      return (
        <InputContainer key={`${transformedWord} ${index}`}>
          <StyledInput
            editable={false}
            value={letter}
            autoCompleteType="off"
            autoCapitalize="none"
            autoFocus
            onChangeText={text => onTextChanges(text, index)}
            maxLength={1}
          />
        </InputContainer>
      );
    });

    return content;
  }, [transformedWord, missingIndexes, onTextChanges]);

  const onGuess = useCallback(() => {
    if (transformedWord === generatedWord) {
      setScore(currScore => currScore + 1);
      setGuessIndicator({
        visible: true,
        correct: true,
        message: `${t('correct')}!`,
      });
      generateNewWord();
    } else {
      setLifePoints(currLifePoints => currLifePoints - 1);
      setGuessIndicator({
        visible: true,
        correct: false,
        message: `${t('wrongGuessMsg')}: ${generatedWord}`,
      });
      if (lifePoints - 1 > 0) {
        generateNewWord();
      }
    }
  }, [transformedWord, generatedWord, lifePoints, generateNewWord, t]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Screen>
        <StyledTitle>{t('gameTitle')}</StyledTitle>
        <StyledText>
          {t('score')}: {score}
        </StyledText>
        {!isGameEnded && (
          <>
            <StyledText>
              {t('difficulty')}: {difficulty}
            </StyledText>
            <StyledText>
              {t('lifePoints')}: {lifePoints}
            </StyledText>
            <StyledCountdown time={seconds} />
            <GuessContainer>{renderWord()}</GuessContainer>
            <MainButton
              title={t('checkTheGuess')}
              disabled={
                removeSpaces(transformedWord).length !== generatedWord.length
              }
              style={styles.checkTheGuessButton}
              onPress={onGuess}
            />
          </>
        )}
        {guessIndicator.visible && guessIndicator.correct ? (
          <StyledSuccessText>{guessIndicator.message}</StyledSuccessText>
        ) : (
          <StyledErrorText>{guessIndicator.message}</StyledErrorText>
        )}
      </Screen>
    </TouchableWithoutFeedback>
  );
};

export default GamePlayScreen;
