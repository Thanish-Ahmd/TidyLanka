import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, Dimensions, Platform } from 'react-native'
import React from 'react'
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'
import { StarIcon } from 'react-native-heroicons/solid';
import { PlusIcon } from 'react-native-heroicons/outline';
const {width, height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';
export default function LaundryCard({item}) {
  const navigation = useNavigation();
  return (

      <View 
        style={{
          borderRadius: 40, 
          backgroundColor: themeColors.bgDark, 
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
          marginTop: ios? -(height*0.08): 15,
        }}
        className="flex-row justify-center">
          <Image 
            source={item.image} 
            className="h-40 w-40" 
          />
        </View>
          <View className={`px-5 flex-1 justify-between ${ios? 'mt-5': ''}`}>
            <View className="space-y-3 mt-3">
              <Text className="text-2xl text-white font-semibold z-10">
                {item.name}
              </Text>
              
              <View className="flex-row  z-10 mb-6">
                <View>
              
                <Text className="text-base text-white font-semibold">{item.address}</Text>
                <Text className="text-base text-white font-semibold opacity-60"> 
                Since {new Date(item.createdAt).toDateString()}
                </Text>

                </View>
              </View>
            </View>
            

            <View style={{
              backgroundColor: ios? themeColors.bgDark: 'transparent',
              shadowColor: themeColors.bgDark,
              shadowRadius: 25,
              shadowOffset: {width: 0, height: 40},
              shadowOpacity: 0.8,
            }} className="flex-row justify-between items-center mb-5">
              <View>
              <Text className="text-white font-bold text-lg">$ Wash Dry Fold {item.washDryFold}</Text>
              <Text className="text-white font-bold text-lg">$ Wash and Iron {item.washIron}</Text>
              <Text className="text-white font-bold text-lg">$ Dry Clean {item.dryClean}</Text>

              </View>
              <TouchableOpacity 
              onPress={()=>{console.log(item)  
                navigation.navigate('Product', {...item})}}
              style={{
                shadowColor: 'black',
                shadowRadius: 40,
                shadowOffset: {width: -20, height: -10},
                shadowOpacity: 1,
              }} className="p-4 bg-white rounded-full">
                <PlusIcon size="25" strokeWidth={2} color={themeColors.bgDark} />
              </TouchableOpacity>
            </View>
            
            
          </View>

      </View>
    
  )
}