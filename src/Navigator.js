import React from 'react'
import { View, Text } from 'react-native';
import { NavigationContainer,  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Auth from './screens/Auth';
import AuthWithHooks from './screens/AuthWithHooks';
import TaskList from './screens/TaskList';
import Menu from './screens/Menu';
import commonStyles from './commonStyles';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const menuConfig = {
    labelStyle:{
        fontWeight:'normal',
        fontSize:20
    },
    activeTintColor:'#080',
    headerShown:false,
}

const DrawerNavigator = (props) => {
    const { email, name } = props.route.params
    return(
        <Drawer.Navigator 
            screenOptions={menuConfig}
            drawerContent={ (props) => <Menu {...props} email={email} name={name} />}
        >
            
            <Drawer.Screen name='Today' options={{ title:'Hoje', headerShown:false}}>
                {props => <TaskList {...props} title='Hoje' daysAhead={0} />}
            </Drawer.Screen>
            <Drawer.Screen name='Tomorrow' options={{ title:'Amanhã', headerShown:false}}>
                {props => <TaskList {...props} title='Amanhã' daysAhead={1} />}
            </Drawer.Screen>
            <Drawer.Screen name='Week' options={{ title:'Semana', headerShown:false}}>
                {props => <TaskList {...props} title='Semana' daysAhead={7} />}
            </Drawer.Screen>
            <Drawer.Screen name='Month' options={{ title:'Mês', headerShown:false}}>
                {props => <TaskList {...props} title='Mês' daysAhead={30} />}
            </Drawer.Screen>

        </Drawer.Navigator>
    )
}

const StackNavigator = () => {
    return(
        <Stack.Navigator initialRouteName='Auth' screenOptions={{ headerShown:false }}>
            <Stack.Screen name='Auth' component={AuthWithHooks} />
            <Stack.Screen name='Home' component={DrawerNavigator}/>
        </Stack.Navigator>
    )
}

const Navigator = () => {
    return(
        <NavigationContainer>
            <StackNavigator/>
        </NavigationContainer>
    )
}

export default Navigator