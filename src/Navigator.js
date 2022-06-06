import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer,  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Auth from './screens/Auth';
import AuthWithHooks from './screens/AuthWithHooks';

const Stack = createNativeStackNavigator();

const Navigator = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Auth'>
                <Stack.Screen name='Auth' component={AuthWithHooks}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigator