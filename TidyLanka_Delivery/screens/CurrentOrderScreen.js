import { View, Text, StatusBar, ScrollView, Image, TouchableOpacity , Linking, Alert, StyleSheet } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import OrderRow from '../components/OrderRow';
import { useDispatch, useSelector } from 'react-redux';

import * as Icon from "react-native-feather";
import { themeColors } from '../theme';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CurrentOrderScreen() {
    const navigation = useNavigation();
    const { params } = useRoute();
    let item = params;

    const [pickup  ,setPickup ] = useState(null) ;
    const [order  ,setOrder ] = useState({}) ;
    const [customer  ,setCustomer ] = useState({}) ;


    const isFocused = useIsFocused()

    useEffect(()=>{
        getCurrentOrder() ;
    },[isFocused])


    const getCurrentOrder  = async() =>{
        const id = await AsyncStorage.getItem('rider') ;
       await axios .get(`http://${window.ip}:5000/pickup/riderPickup/${id}`).then(async(res)=>{
        setPickup(res.data) ;

        await axios .get(`http://${window.ip}:5000/order/get/${res.data.order}`).then(async(res1)=>{
            setOrder(res1.data) ;
            console.log(res1.data) 


            await axios .get(`http://${window.ip}:5000/customer/get/${res1.data.customer}`).then((res2)=>{
                setCustomer(res2.data) ;
            }).catch((err1)=>{
                console.log(err1) ;
            })

        }).catch((err1)=>{
            console.log(err1) ;
        })

        


       
       }).catch((err)=>{
        console.log(err) ;
       })
    }


    const getOrder = async() =>{
    
    }

    return (
        <>

            <ScrollView style={style.container}  >
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
                        <Text className="text-3xl font-bold">Current Order</Text>

                        <View className="flex-row space-x-2 my-1">

                            <View className="flex-row items-center space-x-1">
                                <View>

                                    {pickup == null ? <>
                                    <Text>No Current Drives</Text>
                                    </> :
                                    <View>
                                        <Text className="text-gray-600 text-lg  ">Delivery Fee/per ride : {pickup.fee}</Text>
                                        <Text className="text-gray-600 text-lg   ">Laundry Fee  :{order.laundryFee}</Text>
                                        <Text className="text-gray-600 text-lg font-bold mb-10">Total {parseFloat(order.laundryFee)+ parseFloat(order.deliveryFee)} Lkr</Text>
                                    <Text className="text-gray-700 text-lg font-bold ">Stop 1 :{pickup.stop1}</Text>
                                    <TouchableOpacity style={style.stop1Container}  onPress={()=>{
                                        Linking.openURL(`https://www.google.com/maps?q=${pickup.stop1Latitude},${pickup.stop1Longitude}`)
                                    }}>
                                        <Text style={style.stop1Text}>Get Stop 1 Location</Text>
                                    </TouchableOpacity>


                                    <Text className="text-gray-700  text-lg font-bold">Stop 2 :{pickup.stop2}</Text>

                                  

                                    <TouchableOpacity style={style.stop1Container} onPress={()=>{
                                          Linking.openURL(`https://www.google.com/maps?q=${pickup.stop2Latitude},${pickup.stop2Longitude}`)
                                    }}>
                                        <Text style={style.stop1Text}>Get Stop 2 Location</Text>
                                    </TouchableOpacity>
                                    <Text style={style.otherText}>Completed Your Ride ? Press the Finish ride</Text>
                                    <TouchableOpacity style={style.finishContainer} onPress={async()=>{
                                         await axios .put(`http://${window.ip}:5000/pickup/completeRide/${pickup._id}/${pickup.order}/${order.status}`).then((res2)=>{
                                            Alert.alert("Ride Finished") ;
                                            navigation.navigate("CompletedOrder") ;
                                        }).catch((err1)=>{
                                            console.log(err1) ;
                                        })

                                        
                                    }}>
                                        <Text   style={style.finishText} >Finish Ride</Text>
                                    </TouchableOpacity>
                                  
                                    </View>}
                                

                                </View>
                            </View>
                        </View>



                    </View>

                </View>
               

            </ScrollView>
        </>

    )
}


const style = StyleSheet.create({
    stop1Container : {
        backgroundColor  :'green',
        borderRadius : 20,
        paddingVertical : 10 ,
        paddingHorizontal : 20 ,
        marginBottom : 40
        
    } ,
    stop1Text  :{
        color  : '#fff',
        fontSize : 20 ,
        textAlign : 'center' 
    } ,
    finishContainer : {
        backgroundColor  :'#FFBF00',
        borderRadius : 20,
        paddingVertical : 10 ,
        paddingHorizontal : 20 ,
        marginBottom : 40
        
    } ,
    finishText  :{
        color  : '	#000',
        fontSize : 20 ,
        textAlign : 'center' ,

    },
    otherText : {
        color : '#424242'
    },
    container : {
        minHeight : 400,
        backgroundColor : '#fff'
    }
})