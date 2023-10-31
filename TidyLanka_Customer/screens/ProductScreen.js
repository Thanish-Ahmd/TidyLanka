import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftCircleIcon, MinusIcon, PlusIcon } from 'react-native-heroicons/outline';
import { HeartIcon, StarIcon } from 'react-native-heroicons/solid';
import { themeColors } from '../theme';
import { ShoppingBag } from 'react-native-feather';
import { categories, serviceItems } from '../constants';
import Carousel from 'react-native-snap-carousel';
import ServiceCard from "../components/ServiceCard";

const {width, height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';


export default function FavouriteScreen(props) {
  const laundry = props.route.params;
  const [size, setSize] = useState('small');
  const navigation = useNavigation();
  const [types, setTypes ] = useState([]) ;

  const tp = [
    {
      laundry : laundry._id ,
      name : 'Wash & Iron',
      price : laundry.washIron,
      image : require('../assets/images/service2.png')
    },
    {
      laundry : laundry._id ,
      name : 'Wash Dry Fold',
      price : laundry.washDryFold ,
      image : require('../assets/images/service1.png')
    },
    {
      laundry : laundry._id ,
      name : 'Dry clean',
      price : laundry.dryClean,
      image : require('../assets/images/service3.png')
    }
  ]

  useEffect(()=>{
      console.log(laundry) ;
  },[]) ;

  const gettype =async () =>{
    const tp = [
      {
        name : 'Wash & Iron',
        price : laundry.washIron,
        image : require('../assets/images/service2.png')
      },
      {
        name : 'Wash Dry Fold',
        price : laundry.washDryFold ,
        image : require('../assets/images/service1.png')
      },
      {
        name : 'Dry clean',
        price : laundry.dryClean,
        image : require('../assets/images/service3.png')
      }
    ]

    
  }
  return (
    <ScrollView >
    <View className="flex-1">
      <StatusBar style="light" />
      <Image 
        source={require('../assets/images/background5.jpg')} 
        style={{height: 270, borderBottomLeftRadius: 50, borderBottomRightRadius: 50}} 
        className="w-full absolute" />
      <SafeAreaView className="space-y-3 flex-1">
        <View className="mx-4 flex-row justify-between items-center">
          <TouchableOpacity className=" rounded-full " onPress={()=> navigation.goBack()}>
            <ArrowLeftCircleIcon size="50" strokeWidth={1.2} color="white" />
          </TouchableOpacity>

          <TouchableOpacity className=" rounded-full border-2 border-white p-2">
            <HeartIcon size="24" color="white" />
          </TouchableOpacity>
        </View>
        <View 
          style={{
            shadowColor: themeColors.bgDark,
            shadowRadius: 30,
            shadowOffset: {width: 0, height: 30},
            shadowOpacity: 0.9,
          }}
          className="flex-row justify-center">
          <Image source={laundry.image} className="h-60 w-60" style={{marginTop: ios? 0:40}} />
        </View>
        
        <View className="px-4 flex-row justify-between items-center">
            <Text style={{color: themeColors.text}} className="text-3xl font-semibold">
              {laundry.name}
            </Text>
            <Text style={{color: themeColors.text}} className="text-lg font-semibold">
              $ {laundry.price}
            </Text>
            
        </View>
        

        <View className="px-4 space-y-2">
          <Text style={{color: themeColors.text}} className="text-lg font-bold">About</Text>
          <Text className="text-gray-600">
            {laundry.desc}
          </Text>
          
        </View>

        {/* Services Component */}
        <View className={`overflow-visible flex justify-center flex-1 ${ios? 'mt-10':''}`}>
        <View>
          <Carousel
            containerCustomStyle={{overflow: 'visible'}}
            data={tp}
            renderItem={({item})=> <ServiceCard item={item} laundry={laundry} />}
            firstItem={1}
            inactiveSlideScale={0.75}
            inactiveSlideOpacity={0.75}
            sliderWidth={width}
            itemWidth={width*0.63}
            slideStyle={{display: 'flex', alignItems: 'center'}}
          />
        </View>
        
      </View>
        
      </SafeAreaView>
    </View>
    </ScrollView>
  )
}
