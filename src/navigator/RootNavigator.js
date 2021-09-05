import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {
  colors,
  horizontalSlide,
  routes,
  verticalSlide,
} from '../utils/constants';

import ListScreen from '../screen/ListScreen';
import DetailScreen from '../screen/DetailScreen';
import CreateScreen from '../screen/CreateScreen';

const Stack = createStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerMode: 'none'}}>
        <Stack.Screen
          name={routes.list}
          component={ListScreen}
          options={{cardStyleInterpolator: verticalSlide}}
        />
        <Stack.Screen
          name={routes.detail}
          component={DetailScreen}
          options={{cardStyleInterpolator: horizontalSlide}}
        />
        <Stack.Screen
          name={routes.create}
          component={CreateScreen}
          options={{
            cardStyleInterpolator: verticalSlide,
          }}
          initialParams={{
            edit: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
