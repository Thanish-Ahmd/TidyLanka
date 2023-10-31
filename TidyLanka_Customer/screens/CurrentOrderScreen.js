import { View, Text, StatusBar, ScrollView, Image, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import OrderRow from '../components/OrderRow';
import { useDispatch, useSelector } from 'react-redux';

import * as Icon from "react-native-feather";
import { themeColors } from '../theme';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const { width, height } = Dimensions.get("window");

export default function CurrentOrderScreen() {
    const navigation = useNavigation();
    const { params } = useRoute();

    const [orders ,setOrders] = useState([]) ;

    const isFocused = useIsFocused()


    useEffect(()=>{
        getOrder() ;
    },[isFocused]) ;


    const getOrder =async  () =>{
        const id = await AsyncStorage.getItem('customer') ;
        await
        axios
        .get(`http://${window.ip}:5000/order/pendingCustomers/${id}`).then((res)=>{
            setOrders(res.data)
            console.log(res.data)
        }).catch((err)=>{
            console.log(err) ;
        })
    }
    let item = params;

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
                        <Text className="text-3xl font-bold">Pending Orders</Text>

                        <View className="flex-row space-x-2 my-1">

                            <View className="flex-column items-center space-x-1">
                               
                            </View>
                        </View>



                    </View>

                </View>
                <View className="pb-36 bg-white min-h-screen">

                    <ScrollView>

                {orders.map((order)=>(
                    
                            <OrderRow  item={order}/>              
                         

                          // <View className="flex-row" style={style.orderContainer}>
                                        //     <View>
                                        //         <Text style={style.text1}>Order id :{order._id}</Text>
                                        //         <Text style={style.text2}>{order.laundryName}</Text>
                                        //         <Text>Service Type :{order.service}</Text>
                                        //         <Text>Pickup Date : {order.pickupDate}</Text>
                                        //         <Text>Delivery Date : {order.deliveryDate}</Text>
                                        //         <Text style={style.text2}>Status : {order.status}</Text>
                                        //         <Text style={style.text3}>Total : {parseFloat(order.laundryFee)+parseFloat(order.deliveryFee)} LKR</Text>
                                        //         <Text>Laundry : {order.laundryFee}</Text>
                                        //         <Text>Delivery : {order.deliveryFee}</Text>

                                        //     </View>

                                        // <TouchableOpacity style={style.deleteBtn} onPress={()=>{
                                        //     axios 
                                        //     .delete(`http://${window.ip}:5000/order/delete/${order._id}`).then(()=>{
                                        //         Alert.alert('Order Deleted') ;
                                        //         navigation.navigate('Home') ;
                                        //     }).catch((err)=>{
                                        //         console.log(err) ;
                                        //     })
                                        // }}>
                                        //     <Text style={style.deleteText}>Delete</Text>
                                        // </TouchableOpacity>
                                        // </View>
                                ))}
                    </ScrollView>
                   
                            
                   
                </View>

            </ScrollView>
        </>

    ) 
}


const style= StyleSheet.create({
    deleteBtn : {
        backgroundColor : 'red',
        padding : 5 ,
        borderRadius : 5 
    },
    deleteText : {
        color : '#fff'
    },
    orderContainer : {
        display : 'flex',
        flexDirection : 'row' ,
        alignItems : 'center' ,
        justifyContent : 'space-between' ,
        width : width * 0.8 ,
        marginLeft : width * 0.1 ,
        backgroundColor : '#fff' ,
        marginVertical : 10 ,
        borderRadius : 10,
        shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
      
    },
    paddingVertical :10 ,
    paddingHorizontal : 10
    },
    text1 : {
        fontSize : 14 ,
        color : '#aeaeae'
    },
    text2 :{
        fontSize : 18  ,
        fontWeight : '500'
    },
    text3 : {
        fontSize : 18 ,
        color : '#aeaeae',
        fontWeight : '600'
    },
})