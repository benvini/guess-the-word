import React from 'react';
import { useColorScheme } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import AppNavigator from './ts/navigation/AppNavigator'
import { loadTheme } from './ts/shared/theme';

const App = () => {
  const colorScheme = useColorScheme();
  const theme = loadTheme(colorScheme || 'light');

  return (
    <ThemeProvider theme={theme}>
      <AppNavigator/>
    </ThemeProvider>
  );
};

export default App;
