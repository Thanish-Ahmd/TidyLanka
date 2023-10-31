import { View, Text, StatusBar, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import OrderRow from '../components/OrderRow';
import { useDispatch, useSelector } from 'react-redux';

import * as Icon from "react-native-feather";
import { themeColors } from '../theme';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import CompletedOrder from '../components/CompletedOrder';

export default function CurrentOrderScreen() {
    const navigation = useNavigation();
    const { params } = useRoute();
    let item = params;
    const [orders , setOrders ] = useState([]) ;

    const isFocused = useIsFocused()

    const getOrders = async() =>{
        const id = await AsyncStorage.getItem('rider') ;

        await axios .get(`http://${window.ip}:5000/pickup/riderOrders/${id}`).then((res)=>{
            setOrders(res.data) ;
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        getOrders() ;
    },[isFocused]) ;

    return (
        <>

            <ScrollView  >
                <View className="relative">
                    <Image className="w-full h-72" source={require('../assets/images/background5.jpg')}/>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="absolute top-14 left-4 bg-gray-50 p-2 rounded-full shadow">
                        <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)} />
                    </TouchableOpacity>
                </View>
                <View
                    style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
                    className="bg-white -mt-12 pt-6">
                    <View className="px-5">
                        <Text className="text-3xl font-bold">Completed Orders</Text>

                        <View className="flex-row space-x-2 my-1">

                            <View className="flex-column items-center space-x-1">

                                {orders.map((order)=>(

                                  
                                        <CompletedOrder item={order} />
                                       
                                   
                                ))}
                            </View>
                        </View>



                    </View>

                </View>
                <View className="pb-36 bg-white">
                   
                    {/* orders */}
                            
                   
                </View>

            </ScrollView>
        </>

    )
}