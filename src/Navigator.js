import { View, Text } from 'react-native';
import { NavigationContainer,  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Auth from './screens/Auth';
import AuthWithHooks from './screens/AuthWithHooks';
import TaskList from './screens/TaskList';

const Stack = createNativeStackNavigator();

const Navigator = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Auth' screenOptions={{ headerShown:false }}>
                <Stack.Screen name='Auth' component={AuthWithHooks} />
                <Stack.Screen name='Home' component={TaskList}/>
                
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigator