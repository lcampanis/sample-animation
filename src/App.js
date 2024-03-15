import 'react-native-gesture-handler';
import { registerRootComponent } from "expo";
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from "@gluestack-ui/config"
import { Account, Home } from './screens'

const Stack = createStackNavigator();

function App() {
  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              transitionSpec: {
                open: { animation: 'timing', config: { duration: 500 } },
                close: { animation: 'timing', config: { duration: 1000 } },
              },
            }}
          />
          <Stack.Screen
            name="Account"
            component={Account}
            options={{
              cardStyleInterpolator: ({ current }) => ({
                cardStyle: {
                  opacity: current.progress,
                },
              }),
              transitionSpec: {
                open: { animation: 'timing', config: { duration: 1000 } },
                close: { animation: 'timing', config: { duration: 500 } },
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}

export default registerRootComponent(App);
