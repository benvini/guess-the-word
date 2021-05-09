import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';

const words = require('../../../vocabulary.json');
import { Screen, Typography } from '../../shared/components';
import MainButton from '../../shared/components/MainButton';
import Countdown from './components/Countdown';
import {DIFFICULTY} from '../../shared/constants/contants';
import Input from '../../shared/components/Input';
import styled from 'styled-components/native';

const GuessContainer = styled.View`
    flex-direction: row;
`

const GamePlayScreen: FunctionComponent = () => {
    const [count, setCount] = useState(30);
    const [difficulty, setDifficulty] = useState(DIFFICULTY.Hard);
    const [lifePoints, setLifePoints] = useState(3);
    const [visitedWords, setVisitedWords] = useState([]);
    const [generatedWord, setGeneratedWord] = useState('');
    const [transformedWord, setTransformedWord] = useState('');

    useEffect(() => {
        const timer = setInterval(() => {
            setCount(prevCount => prevCount - 1 >= 0 ? prevCount - 1 : 0);
        }, 1000);

        if (count === 0) {
            return () => {
                clearInterval(timer);
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
                return (<Input key={`${char} ${index}`} style={{borderBottomWidth: 2}}/>);
            }
            return (<Input key={`${char} ${index}`} editable={false} value={char.toUpperCase()}/>)
        })
        return content;
    }, [transformedWord]);

    return (
        <Screen>
            <Typography>Difficulty: {difficulty}</Typography>
            <Typography>Life Points: {lifePoints}</Typography>
            <Countdown time={count} style={{ marginTop: 12 }} />
            <GuessContainer>{renderWord()}</GuessContainer>
            <MainButton title="Check The Guess" style={{ width: 160 }} />
        </Screen>
    )
};

export default GamePlayScreen;
