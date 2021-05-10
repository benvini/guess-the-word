import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';

const words = require('../../../vocabulary.json');
import { Screen, Typography } from '../../shared/components';
import MainButton from '../../shared/components/MainButton';
import Countdown from './components/Countdown';
import {DIFFICULTY} from '../../shared/constants/contants';
import styled from 'styled-components/native';
import {replaceChar} from '../../shared/utils/utils';

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

type Props = {
    navigation: any;
}

const GamePlayScreen: FunctionComponent<Props> = ({navigation}: Props) => {
    const [count, setCount] = useState(30);
    const [difficulty, setDifficulty] = useState(DIFFICULTY.Hard);
    const [lifePoints, setLifePoints] = useState(3);
    const [score, setScore] = useState(3);
    const [visitedWords, setVisitedWords] = useState([]);
    const [generatedWord, setGeneratedWord] = useState('');
    const [transformedWord, setTransformedWord] = useState('');
    const [errorLabel, setErrorLabel] = useState(false);

    const onTextChanges = useCallback((text, index) => {        
        setTransformedWord(transformedWord => replaceChar(transformedWord, text, index));
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCount(prevCount => prevCount - 1 >= 0 ? prevCount - 1 : 0);
        }, 1000);

        if (count === 0) {
            return () => {
                clearInterval(timer);
                setLifePoints(lifePoints => lifePoints - 1);
            }
        }
        return () => {
            clearInterval(timer);
        }
    }, []);
    useEffect(() => {
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
    }, []);

    useEffect(() => {
        if (lifePoints === 0) {
            navigation.navigate('Game Over');
        }
    }, [lifePoints]);

    const getWordByDifficulty = useCallback((difficulty: DIFFICULTY) => {
        const {Easy, Intermediate, Hard, WorldClass} = DIFFICULTY;
        let generatedWord = '';
        switch(difficulty) {
            case Easy:
                generatedWord = words[0].easy[Math.floor(Math.random() * words[0].easy.length)];
            break;
            case Intermediate:
                generatedWord = words[1].intermediate[Math.floor(Math.random() * words[1].intermediate.length)];
            break;
            case Hard:
                generatedWord = words[2].hard[Math.floor(Math.random() * words[2].hard.length)];
            break;
            case WorldClass:
                generatedWord = words[3].worldClass[Math.floor(Math.random() * words[3].worldClass.length)];
            break;
            default: 
            break;
        }
        return generatedWord;
    }, []);

    const getUniqueRandomIndexes = useCallback((amount: number, wordLength: number) => {
        let randomIndexes = [];

        while(randomIndexes.length < amount) {
            const randIndex = Math.floor(Math.random() * wordLength);
            if(randomIndexes.indexOf(randIndex) === -1) randomIndexes.push(randIndex);
        }

        return randomIndexes;
    }, []);

    const renderWord = useCallback(() => {
        const content = transformedWord.split('').map((char, index) => {
            if (char === ' ') {
                return (<StyledInput key={index} style={{borderBottomWidth: 2}} onChangeText={(text) => onTextChanges(text.toUpperCase(), index)} maxLength={1}/>);
            }
            return (<StyledInput key={index} editable={false} value={char.toUpperCase()} onChangeText={(text) => onTextChanges(text.toUpperCase(), index)} maxLength={1}/>);
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
            <Countdown time={count} style={{ marginTop: 12 }} />
            <GuessContainer>{renderWord()}</GuessContainer>
            {errorLabel && <Typography>Please fill all characters</Typography>}
            <MainButton title="Check The Guess" style={{ width: 160 }} onPress={onGuess}/>
        </Screen>
    )
};

export default GamePlayScreen;
