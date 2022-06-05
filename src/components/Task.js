import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import commonStyles from '../commonStyles'
import { FontAwesome } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable'

import moment from 'moment';
import 'moment/locale/pt-br'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default (props)=>{

  const doneOrNotStyle = (props.doneAt != null) ? { textDecorationLine: 'line-through' } : {}

  const date = (props.doneAt) ? props.doneAt : props.estimateAt;

  const formattedDate = moment(props.estimateAt).locale('pt-br').format('ddd, D [de] MMMM')

  const getRightContent = () => {
    return(
      <TouchableOpacity style={styles.right}
        onPress={() => props.onDelete && props.onDelete(props.id)}
      >
        <FontAwesome name="trash" size={20} color="white" style={styles.excludeIcon} />
      </TouchableOpacity>
    )
  }

  const getLeftContent = () => {
    return(
      <View style={styles.left}>
        <FontAwesome name="trash" size={20} color="white" />
        <Text style={styles.excludeText}>Excluir</Text>
      </View>
    )
  }

  return(
    <GestureHandlerRootView>
        <Swipeable renderRightActions={getRightContent} 
          renderLeftActions={getLeftContent}
          onSwipeableLeftOpen={() => props.onDelete && props.onDelete(props.id)}
        >
        <View style={styles.container}>
          <TouchableWithoutFeedback 
            onPress={()=> props.onToggleTask(props.id)}
          >
            <View style={styles.checkContainer}>
              {getCheckView(props.doneAt)}
            </View>
          </TouchableWithoutFeedback>
          
          <View>
            <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
            
            <Text style={styles.date}>{formattedDate}</Text>
          </View>
      
        </View>
      </Swipeable>
    </GestureHandlerRootView>
    
    
  )
}

function getCheckView(doneAt){
  if(doneAt !== null){
    return(
      <View style={styles.done}>
        <FontAwesome name="check" size={20} color="white" />
      </View>
    )
  } else{
    return(
      <View style={styles.pending}>
          
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    borderColor:'#AAA',
    borderBottomWidth:1,
    alignItems:'center',
    padding:10,
    backgroundColor:'white'

  },
  checkContainer:{
    width:'20%',
    alignItems:'center',
    justifyContent:'center',
  },
  pending:{
    height:25,
    width:25,
    borderRadius:13,
    borderWidth:1,
    borderColor:"#555",
  },
  done:{
    height:25,
    width:25,
    borderRadius:13,
    backgroundColor:'#4D7031',
    alignItems:'center',
    justifyContent:'center',
  },
  desc:{
    color:commonStyles.colors.mainText,
    fontSize:15,
  },
  date:{
    color:commonStyles.colors.subText,
    fontSize:12,
  },
  right:{
    backgroundColor:'red',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-end',
    paddingHorizontal:20,

  },
  left:{
    backgroundColor:'red',
    flexDirection:'row',
    alignItems:'center',
    flex:1,
  },
  excludeText:{
    color:'white',
    fontSize:20,
    margin:10,

  },
  excludeIcon:{
    marginLeft:10,
  },

})