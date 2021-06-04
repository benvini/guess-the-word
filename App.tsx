import React, {useState, useEffect} from 'react';
import {useColorScheme} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {Provider} from 'react-redux';
import {getLocales} from 'react-native-localize';

import {loadLocale} from './ts/shared/utils/locale';
import {loadTheme} from './ts/shared/theme';
import AppNavigator from './ts/navigation/AppNavigator';
import store from './ts/store/store';

const App = () => {
  const colorScheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(true);
  const [{languageCode, isRTL}] = getLocales(); //TODO: fix languageCode, comes always he
  const theme = loadTheme(colorScheme || 'light', isRTL);

  useEffect(() => {
    (async () => {
      loadLocale('en');
      setIsLoading(false);
    })();
  }, [languageCode]);

  if (isLoading) {
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppNavigator />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
