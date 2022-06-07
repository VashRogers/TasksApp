import React, { useState } from 'react'
import { ImageBackground, Text, View, StyleSheet, TextInput, TouchableOpacity, Platform, Alert } from 'react-native'
import axios from 'axios'

import backgroundImage from '../../assets/login.jpg'
import commonStyles from '../commonStyles'
import AuthInput from '../components/AuthInput'

import { server, showError, showSuccess } from '../common'
import { clickProps } from 'react-native-web/dist/cjs/modules/forwardedProps'

const AuthWithHooks = (props) => {
    const[ name, setName ] = useState('');
    const[ email, setEmail ] = useState('');
    const[ password, setPassword ] = useState('');
    const[ confirmPassword, setConfirmPassword ] = useState('');
    const[ stageNew, setStageNew ] = useState(false)
    // state = {
    //   name:'',
    //   email:'',
    //   password:'',
    //   confirmPassword:'',
    //   stageNew: false
    // }

    const signinOrsignup = () => {
      if(stageNew){
        signup();
      } else{
        signin()
      }
    }

    const signup = async () => {
      try{
        await axios.post(`${server}/signup`, {
          name: name,
          email: email,
          password: password,
          confirmPassword: confirmPassword
        })

        showSuccess('Usuário Cadastrado.');
        setStageNew(false)
      }
      catch (e) {
        showError(e)
      }
    }

    const signin = async () => {
      try{
        const res = await axios.post(`${server}/signin`, {
          email:email,
          password:password,
        })
        axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`
        // console.log( axios.defaults.headers.common['Authorization'])
        props.navigation.reset({
          routes: [{name:'Home'}]
        })
      }
      catch(e){
        showError(e)
      }
    }

    return(
      <ImageBackground source={backgroundImage}
        style={styles.background}
      >
        
        <Text style={styles.title}>Tasks</Text>
        <View style={styles.formContainer}>
          <Text style={styles.subtitle}>
            {stageNew ? 'Crie sua conta' : 'Informe seus dados'}
          </Text>
          {stageNew &&
              <AuthInput
              icon='user' 
              placeholder='Nome'
              value={name} style={styles.input}
              onChangeText={name => setName(name)}
            />

          }
           <AuthInput icon='at' 
            placeholder='E-mail'
            value={email} style={styles.input}
            onChangeText={email => setEmail(email)}
          />
          <AuthInput
              icon='lock'
              placeholder='Senha'
            value={password} style={styles.input}
            onChangeText={password => setPassword(password)}
            secureTextEntry={true}
          />
          {stageNew &&
            <AuthInput
            icon='asterisk'
            placeholder='Confirme a senha'
            value={confirmPassword} style={styles.input}
            onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
            secureTextEntry={true}
          />
          }
          <TouchableOpacity 
            onPress={signinOrsignup}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>
                {stageNew ? 'Registrar' : 'Entrar'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{ padding:10 }}
          onPress={() => { 
            setStageNew(!stageNew)
          }}
        >
          <Text style={styles.subtitle}>
            {stageNew ? 'Já possui conta?':'Ainda não possui conta?'}
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    )
  }

export default AuthWithHooks

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
  subtitle:{
    color:commonStyles.colors.secondary,
    fontSize:20,
    textAlign:'center',
    marginBottom:10,

  },
  formContainer:{
    backgroundColor:'black',
    padding:20,
    width:'90%'
  },
  input:{
    marginTop:10,
    backgroundColor:'white',
    // padding: Platform.OS == 'ios' ? 15 : 10
  },
  button:{
    backgroundColor:'#080',
    marginTop:10,
    padding:10,
    alignItems:'center',
    borderRadius:5,
  },
  buttonText:{
    color:'white',
    fontSize:20
  },

})