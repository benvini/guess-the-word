import {AnyAction} from 'redux';

export interface User {
    name: string,
    phone: number
}

export interface HighScore {
    name: string,
    phone: number,
    score: number
}

export interface HighScoreAction extends AnyAction {
    type: string
    user: User,
    score: number
}

export interface HighScoreState {
    highScores: HighScore[]
}
