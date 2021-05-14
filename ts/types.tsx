import {AnyAction} from 'redux';

export interface HighScore {
    name: string,
    phone: number,
    score: number
}

export interface HighScoreAction extends AnyAction {
    scores: HighScore,
    type: string
}

export interface HighScoreState {
    highScores: HighScore[]
}
