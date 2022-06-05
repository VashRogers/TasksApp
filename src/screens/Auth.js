import React, { Component } from 'react'
import { ImageBackground, Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'

import backgroundImage from '../../assets/login.jpg'
import commonStyles from '../commonStyles'

export default class Auth extends Component {

    state = {
      email:'',
      password:'',
    }

    render(){
      return(
        <ImageBackground source={backgroundImage}
          style={styles.background}
        >
          
          <Text style={styles.title}>Tasks</Text>
          <View style={styles.formContainer}>
            <TextInput 
              placeholder='E-mail'
              value={this.state.email} style={styles.input}
              onChangeText={email => this.setState({ email })}
            />
            <TextInput 
              placeholder='Senha'
              value={this.state.password} style={styles.input}
              onChangeText={password => this.setState({ password })}
            />
          </View>

        </ImageBackground>
      )
    }
}

const styles = StyleSheet.create({
  background:{
    flex:1,
    width:'100%',
    alignItems:'center',
    justifyContent:'center',
  },
  title:{
    // fontFamily:commonStyles.fontFamily,
    color:commonStyles.colors.secondary,
    fontSize:70,
    marginBottom:10,

  },
  input:{
    marginTop:10,
    backgroundColor:'white',
    
  },
  formContainer:{
    backgroundColor:'black',
    padding:20,
    width:'90%'
  },

})