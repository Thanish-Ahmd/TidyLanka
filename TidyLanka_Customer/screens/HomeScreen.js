import { View, Text, Image, TouchableOpacity, TextInput, FlatList, Dimensions, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { themeColors } from '../theme';
import { StatusBar } from 'expo-status-bar';
import { categories, laundryItems } from '../constants';
import Carousel from 'react-native-snap-carousel';
import LaundryCard from "../components/LaundryCard";
import Carousell from "../components/Carousell";
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';




const { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';
export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState(1);

  const [laundries ,setLaundries] = useState([]) ;

  const isFocused = useIsFocused() ;

  useEffect(()=>{
    if(isFocused){
      getLaundries() ;

    }
  },[isFocused]) ;


  const getLaundries = async()=>{
    await axios 
    .get(`http://${window.ip}:5000/laundry/`).then((res)=>{
      setLaundries(res.data) ;
      console.log(res.data)
    }).catch((err)=>{
      console.log(err) ;
    })
  } 

  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = laundries.filter((item) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(lowerCaseQuery) ||
      item.address.toLowerCase().includes(lowerCaseQuery)
    );
  });
  return (
    <View className="flex-1 relative bg-white">
      <Text style={{
        marginTop: 50, marginLeft: 30, fontSize: 22, fontWeight: "bold",
        color: "#041E42",
      }}>Tidy Lanka</Text>
      <StatusBar />

      <Image
        source={require('../assets/images/background1.jpg')}
        style={{ height: height * 0.98 }}
        className="w-full absolute -top-5 opacity-10" />
      <SafeAreaView className={ios ? '-mb-8' : ''}>

        {/* search bar */}
        <View className="mx-3 shadow" >
          <View className="flex-row items-center rounded-full p-1 bg-[#e6e6e6]">
            <TextInput placeholder='Search' className="p-4 flex-1 font-semibold text-gray-700" onChangeText={setSearchQuery} />
            <TouchableOpacity
              className="rounded-full p-2"
              style={{ backgroundColor: themeColors.bgLight }}>
              <MagnifyingGlassIcon size="25" strokeWidth={2} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        {/* Image slider Component */}
        <View style={{ paddingTop: 10 }} >
          <Carousell />
        </View>





      </SafeAreaView>

      {/* Laundry cards */}
      <View className={`overflow-visible flex justify-center flex-1 ${ios ? 'mt-10' : ''}`}>
        <View>
          <Carousel
            containerCustomStyle={{ overflow: 'visible' }}
            data={filteredData}
            renderItem={({ item }) => <LaundryCard item={item} />}
            firstItem={1}
            loop={false}
            inactiveSlideScale={0.75}
            inactiveSlideOpacity={0.75}
            sliderWidth={width}
            itemWidth={width * 0.63}
            slideStyle={{ display: 'flex', alignItems: 'center' }}
          />
        </View>

      </View>




    </View>
  )
}