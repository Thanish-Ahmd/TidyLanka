import { View, Text, TouchableOpacity, Image,  Alert } from 'react-native'
import React, {useState} from 'react'

import { themeColors } from '../theme';
import * as Icon from "react-native-feather";
import axios from 'axios';
import { StyleSheet } from 'react-native';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'


export default function OrderRowAccepted({item}) {

    const navigation = useNavigation() ;
  
 
  return (
    <>
            <View className="flex-row items-center bg-white p-3 rounded-3xl shadow-2xl mb-3 mx-2">
                
                <View className="flex flex-1 space-y-3">
                    <View className="pl-3">
                        <Text className="text-xl">{item.laundryName}</Text>
                        <Text className="text-gray-700">Service  :{item.service}</Text>
                        <Text className="text-gray-700">Pickup Date  :{item.pickupDate}</Text>
                        <Text className="text-gray-700">Delivery Date  :{item.deliveryDate}</Text>
                        <Text className="text-gray-700">Laundry Fee  :{item.laundryFee} LKr</Text>
                        <Text className="text-gray-700">Delivery Fee  :{item.deliveryFee} LKr</Text>
                    </View>
                    <View className="flex-row pl-3 justify-between items-center">
                        <Text className="text-gray-700 text-lg font-bold">
                           Total {parseFloat(item.laundryFee)+ parseFloat(item.deliveryFee)} Lkr  
                        </Text>
                       
                        <View className="justify-between items-center mx-5 rounded-full p-4 py-3 ">
                            <View className="p-2 px-4 rounded-full flex-row justify-end ">
                                <Text className="text-gray-700 font-bold">Order Status 
                                </Text>
                                
                            </View>

                            {item.status == "Done" ? <>
                            <TouchableOpacity style={style.deleteBtn} onPress={()=>{
                                            axios 
                                            .put(`http://${window.ip}:5000/order/receiveOrder/${item._id}`).then(()=>{
                                                Alert.alert('Order Received') ;
                                                navigation.navigate('Home') ;
                                            }).catch((err)=>{
                                                console.log(err) ;
                                            })
                                        }}>
                                            <Text style={style.deleteText}>Received</Text>
                                        </TouchableOpacity>
                            </> : item.status == "Received" ? <>
                                    <View style={style.receivedContainer}>
                                        <Text style={style.recievedText}>{item.status}</Text>
                                    </View>
                            </> : <>
                            <View style={style.otherContainer}>
                                        <Text style={style.otherText}>{item.status}</Text>
                                    </View>
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

    receivedContainer : {
        backgroundColor  : 'green' ,
        borderRadius : 10 ,
        paddingHorizontal : 10 ,
        paddingVertical :5 ,
    },
    recievedText : {
        color : '#fff' ,
        fontSize : 20
    },
    otherContainer : {
        backgroundColor  : '#FFBF00' ,
        borderRadius : 10 ,
        paddingHorizontal : 10 ,
        paddingVertical :5 ,
    },
    otherText : {
        color : '#000' ,
        fontSize : 16
    }
})