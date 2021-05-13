import {DIFFICULTY} from '../constants/contants';
const words = require('../../../vocabulary.json');

export const replaceLetterByIndex = (originStr: string, index: number, letter: string) => {
    return originStr.substr(0, index) + letter + originStr.substr(index + 1);
};

export const removeSpaces = (originStr: string) => {
    return originStr.replace(/\s/g, '')
};

export const getWordByDifficulty = (difficulty: DIFFICULTY) => {
    const { Easy, Intermediate, Hard, WorldClass } = DIFFICULTY;
    let generatedWord = '';
    switch (difficulty) {
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
};

export const getUniqueRandomIndexes = (amount: number, wordLength: number) => {
    let randomIndexes = [];

    while (randomIndexes.length < amount) {
        const randIndex = Math.floor(Math.random() * wordLength);
        if (randomIndexes.indexOf(randIndex) === -1) randomIndexes.push(randIndex);
    }

    return randomIndexes;
};
