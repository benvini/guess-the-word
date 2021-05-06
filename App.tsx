import React from 'react';
import { useColorScheme } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { Screen } from './ts/shared/components/common';
import { Typography } from './ts/shared/components';
import { loadTheme } from './ts/shared/theme';
import StartGameScreen from './ts/screens/StartGameScreen';

const App = () => {
  const colorScheme = useColorScheme();
  const theme = loadTheme(colorScheme || 'light');

  return (
    <ThemeProvider theme={theme}>
      {/* <Screen>
        <Typography>Guess The Word</Typography>
      </Screen> */}
      <StartGameScreen/>
    </ThemeProvider>
  );
};

export default App;
