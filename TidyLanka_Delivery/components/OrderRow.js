import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native'
import React, {useEffect, useState} from 'react'

import { themeColors } from '../theme';
import * as Icon from "react-native-feather";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';



export default function OrderRow({item}) {

    const [laundry , setLaundry] = useState({}) ;
    const [customer ,setCustomer] = useState({}) ;


    const getLaundry = async() =>{
        await axios.get(`http://${window.ip}:5000/laundry/get/${item.laundry}`).then((res)=>{
            setLaundry(res.data) ;
        }).catch((err)=>{
            console.log(err) ;
        })
    }

    const getCustomer = async() =>{
        await axios.get(`http://${window.ip}:5000/customer/get/${item.customer}`).then((res)=>{
            setCustomer(res.data) ;
        }).catch((err)=>{
            console.log(err) ;
        })
    }

    const navigation  = useNavigation() ;

    useEffect(()=>{
        getLaundry() ;
        getCustomer() ;
        getLaundry() ;
    },[]) ;
   
  return (
    <>
            <View className="flex-row items-center bg-white p-3 rounded-3xl shadow-2xl mb-3 mx-2">
                
                <View className="flex flex-1 space-y-3">
                    <View className="pl-3">
                        <Text className="text-xl">{item.laundryName}</Text>
                        {item.status == "Accepted" ? <>
                        <Text>From : {customer.address}</Text>
                        <Text>To : {laundry.address}</Text>
                        <Text>Pick up Date : {item.pickupDate}</Text>
                        </> 
                        : <>
                         <Text>From : {laundry.address}</Text>
                        <Text>To : {customer.address}</Text>
                        <Text>Pick up Date : {item.deliveryDate}</Text>
                        </>}
                        

                        {item.status == ""}
                    </View>
                    <View className="flex-row pl-3 justify-between items-center">
                        <View>
                        <Text>Laundry Fee : {item.laundryFee}</Text>
                        <Text>Delivery Fee : {parseFloat(item.deliveryFee)/2}</Text>
                        <Text className="text-gray-700 text-lg font-bold">
                        Total {parseFloat(item.laundryFee)+ parseFloat(item.deliveryFee)} Lkr
                        </Text>

                        </View>
                        <View className="justify-between items-center mx-5 rounded-full p-4 py-3 ">
                            <View className="p-2 px-4 rounded-full">
                                <Text className="text-gray-500 text-lg font-bold" >Order Status
                                </Text>
                                <Text>{item.status}
                                </Text>
                            </View>

                            {item.status == "Accepted" ? <>
                            <TouchableOpacity style={style.acceptBtn} onPress={async()=>{
                                const rider = await AsyncStorage.getItem('rider') ;
                                const order = item._id;
                                const stop1 = customer.address ;
                                const stop1Latitude = customer.latitude ;
                                const stop1Longitude = customer.longitude ; 
                                const stop2 = laundry.address ;
                                const stop2Latitude = laundry.latitude ;
                                const stop2Longitude = laundry.longitude ; 
                                const date = new Date() ;
                                const pickupType = "Customer To Laundry"
                                const fee = parseFloat(item.deliveryFee)/2 ;
                            const pickup = {
                                rider, order, stop1 , stop1Latitude , stop1Longitude , stop2 , stop2Latitude , stop2Longitude, date, pickupType , fee
                            }
                            axios 
                            .post(`http://${window.ip}:5000/pickup/add` , pickup).then(()=>{
                                Alert.alert('Pickup Selected') ;
                                navigation.navigate('CurrentOrder') ;
                            }).catch((err)=>{
                                console.log(err) ;
                            })
                            
                        }}>
                        <Text style={style.deleteText}>Select Order</Text>
                    </TouchableOpacity>

                            </> : <>

                            <TouchableOpacity style={style.acceptBtn} onPress={async()=>{
                                const rider = await AsyncStorage.getItem('rider') ;
                                const order = item._id;
                                const stop2 = customer.address ;
                                const stop2Latitude = customer.latitude ;
                                const stop2Longitude = customer.longitude ; 
                                const stop1 = laundry.address ;
                                const stop1Latitude = laundry.latitude ;
                                const stop1Longitude = laundry.longitude ; 
                                const date = new Date() ;
                                const pickupType = "Laundry To Customer"
                                const fee = parseFloat(item.deliveryFee)/2 ;
                            const pickup = {
                                rider, order, stop1 , stop1Latitude , stop1Longitude , stop2 , stop2Latitude , stop2Longitude, date , pickupType , fee
                            }
                            axios 
                            .post(`http://${window.ip}:5000/pickup/add` , pickup).then(()=>{
                                Alert.alert('Pickup Selected') ;
                                navigation.navigate('CurrentOrder') ;
                            }).catch((err)=>{
                                console.log(err) ;
                            })
                           
                        }}>
                        <Text style={style.deleteText}>Select Order</Text>
                    </TouchableOpacity>

                            </>}

                         
                           
                        </View>
                        
                        
                    </View>
                </View>
            </View>
    </>
    
    
  )
}

const style = StyleSheet.create({
    deleteBtn : {
        backgroundColor : 'red',
        paddingVertical : 5 ,
        borderRadius : 5 ,
        paddingHorizontal : 10 


    },
    deleteText : {
        color : '#fff',
        fontSize : 18
    },
    acceptBtn : {
        backgroundColor : 'green',
        padding : 5 ,
        borderRadius : 5 ,
        marginVertical : 20
    },
})