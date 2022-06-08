import React, { useEffect } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Alert } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'


const AuthOrAppWithHooks = (props) => {

    useEffect(() => {
        Authorization();
    }, [])

    const Authorization = async () => {
        const userDataJson = await AsyncStorage.getItem('userData')
        let userData = null
        try{
            userData = JSON.parse(userDataJson)
        } 
        catch(e) {
            Alert.alert('Erro', 'Os dados do Usuário não foram setados.');
        }

        if(userData && userData.token){
            axios.defaults.headers.common['Authorization'] = `bearer ${userData.token}`
            props.navigation.navigate('Home', userData)
        } 
        else {
            props.navigation.navigate('Auth');
        }
        
    }

    return(
        <View style={styles.container}>
            <ActivityIndicator 
                size='large'
                color='#fff'
            />
        </View>
    )
}


const styles = StyleSheet.create({

    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#000'
    },
    
})

export default AuthOrAppWithHooks