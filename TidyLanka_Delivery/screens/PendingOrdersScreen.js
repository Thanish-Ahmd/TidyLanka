import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import axios from "axios";
import OrderRow from "../components/OrderRow";

export default function PendingOrdersScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused() ;

  const [orders, setOrders] = useState([]) ;


  const getPendingAndCompltedOrders =async () =>{
    axios
    .get(`http://${window.ip}:5000/order/riderOrders`).then((res)=>{
      setOrders(res.data) ;
      console.log(res.data) ;
    }).catch((err)=>{
      console.log(err) 
    })
  }

  useEffect(()=>{
    getPendingAndCompltedOrders() ;
  },[isFocused]) ;

  return (
    <>
      <ScrollView>
        <View style={{ position: "relative" }}>
          <Image
            style={{ width: "100%", height: 270 }}
            source={require("../assets/images/background5.jpg")}
          />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              position: "absolute",
              top: 50,
              left: 10,
              backgroundColor: "#F0F0F0",
              padding: 10,
              borderRadius: 30,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
            }}
          >
            <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            backgroundColor: "white",
            marginTop: -30,
            paddingTop: 20,
            paddingHorizontal: 20,
          }}
        >
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>Select An Order</Text>

          <View style={{ marginTop: 20  , minHeight : 600}}>

            {orders.map((order)=>(
              <OrderRow item={order} />
            ))}
            
        
          </View>
        </View>
      </ScrollView>
    </>
  );
}
