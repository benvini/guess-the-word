import React, { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { Input } from 'react-native-elements';
import { isEmpty } from 'lodash';

import { Screen, Typography } from '../../shared/components';
import MainButton from '../../shared/components/MainButton';
import Countdown from './components/Countdown';
import { DIFFICULTY } from '../../shared/constants/contants';
import { getWordByDifficulty, getUniqueRandomIndexes, replaceLetterByIndex, removeSpaces } from '../../shared/utils/utils';
import COLOR from '../../styles/Color';

const GuessContainer = styled.View`
    flex-direction: row;
`

const StyledInput = styled.View`
    border-width: 0;
    width: 36px;
    margin-top: 2px;
    margin-right: 6px;
    color: black;
    text-align: center;
    font-size: 18px;
`

const GamePlayScreen: FunctionComponent = () => {
    const [seconds, setSeconds] = useState(10);
    const [difficulty, setDifficulty] = useState(DIFFICULTY.Easy);
    const [lifePoints, setLifePoints] = useState(3);
    const [score, setScore] = useState(0);
    const [visitedWords, setVisitedWords] = useState([]);
    const [generatedWord, setGeneratedWord] = useState('');
    const [transformedWord, setTransformedWord] = useState('');
    const [missingIndexes, setMissingIndexes] = useState<number[]>([]);
    const [isGameEnded, setIsGameEnded] = useState(false);
    const [answerIndicator, setAnswerIndicator] = useState({
        visible: false,
        color: COLOR.SUCCESS,
        message: ''
    });
    const navigation = useNavigation();
    const secoreRef = useRef(score);
    secoreRef.current = score;

    useEffect(() => { // generate word on initial render
        generateNewWord();
    }, []);

    useEffect(() => { // setup initial game config
        const unsubscribe = navigation.addListener('focus', () => {
            initialGameConfig();
            generateNewWord();
        });

        return unsubscribe;
    }, [navigation]);

    useEffect(() => { // hide answer indicator in 3 seconds
        const timer = setTimeout(() => {
            setAnswerIndicator({
                visible: false,
                color: COLOR.SUCCESS,
                message: ''
            });
        }, 3000);

        return () => clearTimeout(timer);
    }, [answerIndicator]);

    useEffect(() => { // moving next level or moving to the end game screen when countdown gets 0
        if (seconds === 0) {
            const nextLevel = getNextDifficulty();
            if (nextLevel !== DIFFICULTY.Easy) { // if game continues
                setDifficulty(nextLevel);
                setSeconds(10);
            }
            else { // game ended
                setIsGameEnded(true);
                setTransformedWord('');
                const timer = setTimeout(() => {
                    navigation.navigate('Game Over', { score: secoreRef.current });
                }, 3000);
                return () => clearTimeout(timer);
            }
        }
    }, [seconds]);

    useEffect(() => { // starts the countdown when new level reached
        generateNewWord();
        const countdownTimer = startCountdown();
        setAnswerIndicator({
            visible: false,
            color: COLOR.SUCCESS,
            message: ''
        });

        return () => {
            clearInterval(countdownTimer);
        }
    }, [difficulty]);

    useEffect(() => { // potential moving to the end game screen when losing all life points
        if (lifePoints === 0) {
            setIsGameEnded(true);
            setTransformedWord('');
            const timer = setTimeout(() => {
                navigation.navigate('Game Over', { score: secoreRef.current });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [lifePoints]);

    const initialGameConfig = useCallback(() => {
        setIsGameEnded(false);
        setSeconds(10);
        setDifficulty(DIFFICULTY.Easy)
        setLifePoints(3);
        setScore(0);
        setGeneratedWord('');
        setTransformedWord('');
        setVisitedWords([]);
        setMissingIndexes([]);
        setAnswerIndicator({
            visible: false,
            color: COLOR.SUCCESS,
            message: ''
        });
    }, []);

    const onTextChanges = useCallback((text, index) => {
        const letter = isEmpty(text) ? ' ' : text; // check if text is '' or ' ', assign ' '
        const updatedWord = replaceLetterByIndex(transformedWord, index, letter);
        setTransformedWord(updatedWord);
    }, [replaceLetterByIndex, transformedWord]);

    const generateNewWord = useCallback(() => {
        const generatedWord = getWordByDifficulty(difficulty).toUpperCase();
        setGeneratedWord(generatedWord);
        const wordLength = generatedWord.length;
        const randomIndexes = getUniqueRandomIndexes(1, wordLength);

        setMissingIndexes(randomIndexes);
        const transformedWord = generatedWord.split('').map((char, index) => {
            if (randomIndexes.includes(index)) {
                return ' ';
            }
            return char;
        }).join('');
        setTransformedWord(transformedWord);
    }, [difficulty]);

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
            const letter = isEmpty(char.trim()) ? '' : char;
            if (missingIndexes.includes(index)) {
                return (<StyledInput key={`${transformedWord} ${index}`}><Input style={{ borderBottomWidth: 2 }} value={letter} autoFocus onChangeText={(text) => onTextChanges(text.toUpperCase(), index)} maxLength={1} /></StyledInput>);
            }
            return (<StyledInput key={`${transformedWord} ${index}`}><Input editable={false} value={letter} autoFocus onChangeText={(text) => onTextChanges(text.toUpperCase(), index)} maxLength={1} /></StyledInput>);
        });

        return content;
    }, [transformedWord, missingIndexes]);

    const onGuess = useCallback(() => {
        if (transformedWord === generatedWord) {
            setScore(score => score + 1);
            setAnswerIndicator({
                visible: true,
                color: COLOR.SUCCESS,
                message: 'Correct!'
            })
            generateNewWord();
        }
        else {
            setLifePoints(lifePoints => lifePoints - 1);
            setAnswerIndicator({
                visible: true,
                color: COLOR.ERROR,
                message: `Wrong answer! correct word: ${generatedWord}`
            })
            if (lifePoints - 1 > 0) {
                generateNewWord();
            }
        }
    }, [transformedWord, generatedWord, lifePoints]);

    return (
        <Screen>
            <Typography style={{ margin: 4 }}>Score: {score}</Typography>
            {!isGameEnded &&
                <>
                    <Typography style={{ margin: 4 }}>Difficulty: {difficulty}</Typography>
                    <Typography style={{ margin: 4 }}>Life Points: {lifePoints}</Typography>
                    <Countdown time={seconds} style={{ marginTop: 12 }} />
                    <GuessContainer>{renderWord()}</GuessContainer>
                    <MainButton title="Check The Guess" disabled={removeSpaces(transformedWord).length !== generatedWord.length} style={{ width: 160 }} onPress={onGuess} />
                </>
            }
            {answerIndicator.visible && <Typography style={{ color: answerIndicator.color }}>{answerIndicator.message}</Typography>}
        </Screen>
    )
};

export default GamePlayScreen;
