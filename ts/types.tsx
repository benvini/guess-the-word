import {AnyAction} from 'redux';

export interface User {
  name: string;
  phone: string;
}

export interface HighScore {
  name: string;
  phone: string;
  score: number;
}

export interface HighScoreAction extends AnyAction {
  type: string;
  user: User;
  score: number;
}

export interface HighScoreState {
  highScores: HighScore[];
}
