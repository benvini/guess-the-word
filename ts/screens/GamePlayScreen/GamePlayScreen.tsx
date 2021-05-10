import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';

import { Screen, Typography } from '../../shared/components';
import MainButton from '../../shared/components/MainButton';
import Countdown from './components/Countdown';
import { DIFFICULTY } from '../../shared/constants/contants';
import { replaceChar, getWordByDifficulty, getUniqueRandomIndexes } from '../../shared/utils/utils';
import COLOR from '../../styles/Color';

const GuessContainer = styled.View`
    flex-direction: row;
    margin-bottom: 12px;
`

const StyledInput = styled.TextInput`
    padding: 0px;
    border-width: 0;
    width: 36px;
    margin-bottom: 8px;
    margin-top: 16px;
    margin-right: 6px;
    color: black;
    text-align: center;
    font-size: 18px;
`

const GamePlayScreen: FunctionComponent = () => {
    const [seconds, setSeconds] = useState(5);
    const [difficulty, setDifficulty] = useState(DIFFICULTY.Easy);
    const [lifePoints, setLifePoints] = useState(3);
    const [score, setScore] = useState(0);
    const [visitedWords, setVisitedWords] = useState([]);
    const [generatedWord, setGeneratedWord] = useState('');
    const [transformedWord, setTransformedWord] = useState('');
    const [errorLabel, setErrorLabel] = useState(false);
    const navigation = useNavigation();

    const onTextChanges = useCallback((text, index) => {
        setTransformedWord(transformedWord => replaceChar(transformedWord, text, index));
    }, []);

    useEffect(() => {
        generateNewWord();
    }, []);

    useEffect(() => {
        if (seconds === 0) {
            const nextLevel = getNextDifficulty();
            if (nextLevel !== DIFFICULTY.Easy) {
                setDifficulty(nextLevel);
                setSeconds(5);
            }
            else {
                cleanupGameConfig();
                navigation.navigate('Game Over', { score });
            }
        }
    }, [seconds, score]);

    useEffect(() => {
        const timer = startCountdown();

        return () => {
            clearInterval(timer);
        }
    }, [difficulty]);

    useEffect(() => {
        if (lifePoints === 0) {
            cleanupGameConfig();
            navigation.navigate('Game Over', { score });
        }
        else {
            setErrorLabel(false);
            generateNewWord();
        }
    }, [lifePoints, difficulty, score]);

    const generateNewWord = useCallback(() => {
        const generatedWord = getWordByDifficulty(difficulty);
        setGeneratedWord(generatedWord);
        const wordLength = generatedWord.length;
        const randomIndexes = wordLength < 5 ? getUniqueRandomIndexes(1, wordLength) : getUniqueRandomIndexes(2, wordLength);
        const transformedWord = generatedWord.split('').map((char, index) => {
            if (randomIndexes.includes(index)) {
                return ' ';
            }
            return char;
        }).join('');
        setTransformedWord(transformedWord);
    }, [difficulty]);

    const cleanupGameConfig = useCallback(() => {
        setSeconds(5);
        setDifficulty(DIFFICULTY.Easy)
        setLifePoints(3);
        setScore(0);
        setErrorLabel(false);
    }, []);

    const startCountdown = useCallback(() => {
        const timer = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds - 1 >= 0 ? prevSeconds - 1 : 0);
        }, 1000);
        return timer;
    }, []);

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

    const renderWord = useCallback(() => {
        const content = transformedWord.split('').map((char, index) => {
            if (char === ' ') {
                return (<StyledInput key={index} style={{ borderBottomWidth: 2 }} onChangeText={(text) => onTextChanges(text.toUpperCase(), index)} maxLength={1} />);
            }
            return (<StyledInput key={index} editable={false} value={char.toUpperCase()} onChangeText={(text) => onTextChanges(text.toUpperCase(), index)} maxLength={1} />);
        });
        return content;
    }, [transformedWord]);

    const onGuess = useCallback(() => {
        if (transformedWord.trim().length === generatedWord.length) {
            setErrorLabel(false);
            if (transformedWord === generatedWord) {
                setScore(score => score + 1);
            }
            else {
                setLifePoints(lifePoints => lifePoints - 1);
            }
        }
        else {
            setErrorLabel(true);
        }
    }, [transformedWord, generatedWord]);

    return (
        <Screen>
            <Typography>Difficulty: {difficulty}</Typography>
            <Typography>Life Points: {lifePoints}</Typography>
            <Typography>Score: {score}</Typography>
            <Countdown time={seconds} style={{ marginTop: 12 }} />
            <GuessContainer>{renderWord()}</GuessContainer>
            {errorLabel && <Typography style={{ color: COLOR.ERROR }}>Please fill all characters</Typography>}
            <MainButton title="Check The Guess" style={{ width: 160 }} onPress={onGuess} />
        </Screen>
    )
};

export default GamePlayScreen;
