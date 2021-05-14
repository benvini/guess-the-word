import { SUBMIT_SCORE } from './actionTypes';
import { HighScore } from '../../types';

export const submitScore = (highScore: HighScore) => {
    console.log('highScore', highScore);
    
    return {
        type: SUBMIT_SCORE,
        highScore
    }
};
