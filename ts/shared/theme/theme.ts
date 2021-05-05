import {Platform} from 'react-native';
import light from './light';
import dark from './dark';

export type Palette = {
  textColor: string;
  backgroundColor: string;
};

export type Theme = {
  isIOS: Boolean;
  palette: Palette;
};

const isIOS = Platform.OS === 'ios';

export const loadTheme = (colorSchema: String): Theme => ({
  isIOS,
  palette: colorSchema === 'light' ? light : dark,
});
