import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, Dimensions, Platform } from 'react-native'
import React from 'react'
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'
import { StarIcon } from 'react-native-heroicons/solid';
import { PlusIcon } from 'react-native-heroicons/outline';
const {width, height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';
export default function ServiceCard({item, laundry}) {
  const navigation = useNavigation();
  return (

      <View 
        style={{
          borderRadius: 40, 
          backgroundColor: themeColors.bgLight, 
          height: ios? height*0.4 : height*0.50, 
          width: width*0.65,
        }} 
        >
        <View 
        style={{
          shadowColor: 'black',
          shadowRadius: 30,
          shadowOffset: {width: 0, height: 40},
          shadowOpacity: 0.8,
          marginTop: 20,
        }}
        className="flex-row justify-center">
          <Image 
            source={item.image} 
            className="h-40 w-40" 
          />
        </View>
          <View className={`px-5 flex-1 justify-between ${ios? 'mt-5': ''}`}>
            <View className="space-y-3 mt-3">
              <Text style={{textAlign : 'center'}} className="text-2xl text-white font-semibold z-10">
                {item.name}
              </Text>
              <Text style={{textAlign : 'center'}} className="text-xl text-white  z-10">
                {item.price} per Kg
              </Text>
              
              
            
            </View>
            

            <View style={{
              backgroundColor: ios? themeColors.bgLight: 'transparent',
              shadowColor: themeColors.bgDark,
              shadowRadius: 25,
              shadowOffset: {width: 0, height: 40},
              shadowOpacity: 0.8,
            }} className="flex-row justify-between items-center mb-5">
              
              <TouchableOpacity 
              onPress={()=> navigation.navigate('Order', {...item , laundry})}
              style={{
                shadowColor: 'black',
                shadowRadius: 40,
                shadowOffset: {width: -20, height: -10},
                shadowOpacity: 1,
              }} className="p-4 bg-white rounded-full">
                <PlusIcon style={{marginLeft : 80, marginRight : 80}} size="25" strokeWidth={2} color={themeColors.bgDark} />
              </TouchableOpacity>
            </View>
            
            
          </View>

      </View>
    
  )
}