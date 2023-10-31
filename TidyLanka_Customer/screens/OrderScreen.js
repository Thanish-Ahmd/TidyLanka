import { View, Text, TextInput, TouchableOpacity, Image, Dimensions, Platform } from 'react-native'
import React, { useState } from 'react'
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

const { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';


export default function FavouriteScreen(props) {
    const item = props.route.params;
    const laundry =  props.route.params.laundry ;

    console.log(laundry);
    const [size, setSize] = useState('small');

    const [weight , setWeight] = useState("") ;
    const [total , setTotal] = useState(0) ;
    const navigation = useNavigation();
    return (
        <View className="flex-1">
            <StatusBar style="light" />
            <Image
                source={require('../assets/images/background5.jpg')}
                style={{ height: 300, borderBottomLeftRadius: 50, borderBottomRightRadius: 50 }}
                className="w-full absolute" />
            <SafeAreaView className="space-y-3 flex-1">
                <View className="mx-4 flex-row justify-between items-center">
                    <TouchableOpacity className=" rounded-full " onPress={() => navigation.goBack()}>
                        <ArrowLeftCircleIcon size="50" strokeWidth={1.2} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity className=" rounded-full border-2 border-white p-2">
                        <HeartIcon size="24" color="white" />
                    </TouchableOpacity>
                </View>


                <View className="px-4 flex-row justify-between items-center">
                    <View>

                        <View className="px-4 flex-row justify-between items-center">
                            <Text style={{ marginTop: 30, color: themeColors.text2 }} className="text-4xl font-semibold">
                                {item.name}
                            </Text>
                        </View>

                        <View className="px-4 space-y-2">

                            <Text style={{ color: themeColors.text2 }} className="text-lg font-bold">
                                {item.price} Per Kg
                            </Text>

                        </View>
                    </View>
                    <View
                        style={{
                            shadowColor: 'black',
                            shadowRadius: 30,
                            shadowOffset: { width: 0, height: 40 },
                            shadowOpacity: 0.8,
                            marginRight: 30,

                        }}
                        className="flex-row justify-center">
                        <Image
                            source={item.image}
                            className="h-20 w-20"
                        />
                    </View>
                </View>

                
                <View className="flex-1 bg-white px-8 pt-20"
                    style={{marginTop:30, borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
                >
                    <View className="form space-y-2">
                        <Text className=" text-lg text-gray-700 ml-4">Enter weight of clothes(kg) </Text>
                        <TextInput
                            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                            placeholder='eg:2.5'
                            onChangeText={(text)=>{
                                setWeight(text) ;
                                setTotal(parseFloat(text) * parseInt(item.price))
                                
                            }}
                            keyboardType='numeric'
                            returnKeyType="done"
                        />
                        <Text className="text-lg text-gray-700 ml-4">Total Cost in Lkr</Text>


                        <Text  className="p-8 px-8 bg-gray-100 text-gray-700 rounded-2xl mb-3">{total}
                        </Text>
                        
                    </View>
                    <View className="space-y-4">
                        
                <TouchableOpacity
                    onPress={()=> navigation.navigate('Pickup' , {total ,item , weight , laundry})}
                    style={{marginTop:150,backgroundColor: "#031828", marginLeft: 50, marginRight: 30}}
                    className="py-3  mx-7 rounded-xl">
                        <Text 
                            className="text-xl font-bold text-center text-white"
                        >
                            Proceed
                        </Text>
                        
                    
                </TouchableOpacity>
                </View>
                
                </View>
                


            </SafeAreaView>



        </View>
    )
}
