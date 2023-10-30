import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, {useState} from 'react'

import { themeColors } from '../theme';
import * as Icon from "react-native-feather";
import { StyleSheet } from 'react-native';
import axios from 'axios';
import { Alert } from 'react-native';


export default function OrderRow({item}) {
   
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
                            <View className="p-2 px-4 rounded-full">
                                <Text>Order Status
                                </Text>
                                <Text>
                                {item.status}
                                </Text>
                            </View>

                            <View>
                             <TouchableOpacity style={style.acceptBtn} onPress={()=>{
                            axios 
                            .put(`http://${window.ip}:5000/order/acceptOrder/${item._id}`).then(()=>{
                                Alert.alert('Order Accepted') ;
                                navigation.navigate('AcceptedOrder') ;
                            }).catch((err)=>{
                                console.log(err) ;
                            })
                        }}>
                            <Text style={style.deleteText}>Accept</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={style.deleteBtn} onPress={()=>{
                            axios 
                            .put(`http://${window.ip}:5000/order/rejectOrder/${item._id}`).then(()=>{
                                Alert.alert('Order Rejected') ;
                                navigation.navigate('Home') ;
                            }).catch((err)=>{
                                console.log(err) ;
                            })
                        }}>
                            <Text style={style.deleteText}>Reject</Text>
                        </TouchableOpacity>

                            </View>

                           
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