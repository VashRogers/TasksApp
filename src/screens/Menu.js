import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerItemList, DrawerContentScrollView, } from '@react-navigation/drawer';
import Gravatar from '@krosben/react-native-gravatar';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome'

import commonStyles from '../commonStyles';
import { CommonActions } from '@react-navigation/native';

export default (props) => {
    
    const logout = () =>{
        delete axios.defaults.headers.common['Authorization']
        AsyncStorage.removeItem('userData')
        props.navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes:[
                    {
                        name: 'AuthOrApp',
                    }
                ]
            })
        )
        
    }

    return(
        <DrawerContentScrollView>
            <View style={styles.header}>
                <Text style={styles.title}>Tasks</Text>
                <Gravatar style={styles.avatar}
                    options={{
                        email: props.email,
                        secure: true
                    }} />
                <View style={styles.userInfo}>
                    <Text style={styles.name}>
                        {props.name}
                    </Text>
                    <Text style={styles.email}>
                        {props.email}
                    </Text>
                </View>
                <TouchableOpacity onPress={logout}>
                    <View style={styles.logoutIcon}>
                        <Icon name='sign-out' size={30} color='#800' />
                    </View>
                </TouchableOpacity>
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    header: {
        justifyContent:'center',
        alignItems:'center',
        borderBottomWidth: 1,
        borderColor: '#DDD',
        backgroundColor:'#adadad'
    },
    title: {
        color: '#000',
        fontSize: 30,
        paddingTop: Platform.OS === 'ios' ? 70 : 30,
        padding: 10
    },
    avatar: {
        width: 60,
        height: 60,
        borderWidth: 3,
        borderRadius: 30,
        margin: 10,
        backgroundColor: '#222'
    },
    userInfo: {
        marginLeft: 10,
    },
    name: {
        fontSize: 20,
        color: 'black',
        marginBottom: 5,
        textAlign:'center',
    },
    email: {
        fontSize: 15,
        color: 'black',
        marginBottom: 10,
        textAlign:'center',
    },
    logoutIcon: {
        marginLeft: 10,
        marginBottom: 10,
    }
})