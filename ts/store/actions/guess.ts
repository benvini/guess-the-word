import { SUBMIT_SCORE } from './actionTypes';
import { User } from '../../types';

export const submitScore = (user: User, score: number) => {        
    return {
        type: SUBMIT_SCORE,
        user,
        score
    }
};
