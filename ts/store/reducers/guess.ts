import * as actionTypes from '../actions/actionTypes';
import {HighScoreAction, HighScoreState} from '../../types';

const initialState = {
    highScores: []
};

const GuessReducer = (
    state: HighScoreState = initialState,
    action: HighScoreAction
) => {
    switch(action.type) {
        case actionTypes.SUBMIT_SCORE:
            return submitScore(state, action);
        default:
            return state;
    }
};

const submitScore = (state: HighScoreState, action: HighScoreAction) => {
    console.log('action', action.highScore);
    
    return {
        ...state,
        highScores: [...state.highScores, action.highScore]
    }
};

export default GuessReducer;
