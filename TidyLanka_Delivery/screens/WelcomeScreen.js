import { View, Text, StyleSheet, Dimensions, TouchableOpacity,ImageBackground  } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Lottie from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowRightCircleIcon, MinusIcon, PlusIcon } from 'react-native-heroicons/outline';
import AsyncStorage from "@react-native-async-storage/async-storage";


const {width, height} = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation();

  useEffect(()=>{
    checkLogin() ;
  },[])

  const checkLogin =async () =>{
    const token = await AsyncStorage.getItem('token') ;
    const id = await AsyncStorage.getItem('rider') ;

    if(id == null || token ==null) {
      AsyncStorage.removeItem('token') ;
      AsyncStorage.removeItem('rider') ;
    }else {
      navigation.navigate('Home') ;
    }
  }
 
  return (
    <ImageBackground
      source={require('../assets/images/background5.jpg')} 
      style={styles.background}
    >
    <SafeAreaView style={styles.container}>
    
      <View style={styles.lottie}>
        <Lottie source={require('../assets/welcome.json')} autoPlay loop />
      </View>
      <Text style={styles.text}>Tidy Lanka</Text>
      
      

      <TouchableOpacity 
                onPress={() => navigation.navigate('Login')}
                style={{ backgroundColor: '#FFFFFF',
                padding: 20, marginTop: 10, marginLeft: 50, marginRight: 30 }}
                className="py-3 rounded-xl">
                    <View className="px-4 flex-row justify-between items-center">
                <Text style={{color: '#000000', marginRight: 20}}
                    className="text-xl font-bold text-center text-white"
                >
                    Start Riding
                </Text>
                <ArrowRightCircleIcon size="50" strokeWidth={1.2} color="black" />
                </View>


            </TouchableOpacity>

    </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: width,
        height: height,
      },
  container: {
    flex: 1,
    alignItems: 'center'
  },
  lottie:{
    marginTop: 50,
    width: width*0.8,
    height: width
  },
  text: {
    marginLeft:20,
    color: '#FFFFFF',
    fontSize: width*0.13,
    marginBottom: 20
  },
 
})

