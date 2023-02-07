import React, { useMemo } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainScreen from './src/screens/MainScreen';
import { Card } from './src/types';
import CardEditScreen from './src/screens/CardEditScreen';
import { QueryClient, QueryClientProvider } from 'react-query';
import { StatusBar, useColorScheme } from 'react-native';
import { ThemeProvider } from 'styled-components/native';

import LightTheme from './src/themes/lightTheme';
import DarkTheme from './src/themes/darkTheme';

export type RootStackParams = {
  Main: undefined;
  Add: undefined;
  Edit: { card: Card; index: number };
};

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator<RootStackParams>();

const App = () => {
  const colorScheme = useColorScheme();
  const theme = useMemo(
    () => (colorScheme === 'dark' ? DarkTheme : LightTheme),
    [colorScheme],
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <StatusBar
            backgroundColor={'transparent'}
            barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
            translucent
          />
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: theme.colors.header,
              },
              headerTintColor: theme.colors.text,
              headerTitleStyle: {
                color: theme.colors.text,
                fontWeight: 'bold',
              },
            }}
          >
            <Stack.Screen
              name={'Main'}
              component={MainScreen}
              options={{
                title: '홈',
              }}
            />
            <Stack.Screen
              name={'Add'}
              component={CardEditScreen}
              options={{ title: '카드 추가' }}
            />
            <Stack.Screen
              name={'Edit'}
              component={CardEditScreen}
              options={{ title: '카드 편집' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
