import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused() ;

  const [laundry ,setLaundry] = useState({}) ;

  useEffect(()=>{
    if (isFocused){
      getLaundry() ;

    }
  },[isFocused]) ;

  const logout = async() =>{
    Alert.alert("You have been logged out") ;
    await AsyncStorage.removeItem('laundry') ;
    await AsyncStorage.removeItem('token') ;
    navigation.navigate('Welcome') ;
  }


  const getLaundry = async() =>{
    let id = await AsyncStorage.getItem('laundry') ;
    await axios 
    .get(`http://${window.ip}:5000/laundry/get/${id}`).then((res)=>{
    setLaundry(res.data) ;

    }).catch((err)=>{
      console.log(err)
    })
  }

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
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>Laundry Owner Profile</Text>

          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 20 }}>Laundry Name: {laundry.name} </Text>
            <Text style={{ fontSize: 20, marginTop: 10 }}>
              Email Address: {laundry.email}
            </Text>
            <Text style={{ fontSize: 20, marginTop: 10 }}>
              Physical Address: {laundry.address}
            </Text>
            <Text style={{ fontSize: 20, marginTop: 10 }}>
              Operating Hours: {laundry.operatingHours}
            </Text>
            <Text style={{ fontSize: 20, marginTop: 10 }}>
              Wash Dry Fold Pricing: {laundry.washDryFold}
            </Text>
            <Text style={{ fontSize: 20, marginTop: 10 }}>
              Wash Iron Pricing: $ {laundry.washIron}
            </Text>
            <Text style={{ fontSize: 20, marginTop: 10 }}>
              Dry Clean Pricing: $ {laundry.dryClean}
            </Text>
            <Text style={{ fontSize: 20, marginTop: 10 }}>
              Payment Methods: {laundry.paymentMethods} 
            </Text>
            <Text style={{ fontSize: 20, marginTop: 10 }}>
              Turnaround Time: {laundry.turnAroundTime}
            </Text>
            <Text style={{ fontSize: 20, marginTop: 10}}>
              Contact Number: {laundry.contact}
            </Text>
            <Text style={{ fontSize: 20, marginTop: 10 }}>
              Longitude : {laundry.longitude}
            </Text>
            <Text style={{ fontSize: 20, marginTop: 10}}>
              Longitude : {laundry.latitude}
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate("EditProfile")}
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#031828",
                paddingVertical: 12,
                paddingHorizontal: 20,
                borderRadius: 30,
                marginTop: 20,
                marginRight: 140,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.3,
                shadowRadius: 4.65,
                elevation: 8,
              }}
            >
              <Icon.Edit2 strokeWidth={3} stroke="#FFF" />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 18,
                  color: "#FFF",
                  fontWeight: "bold",
                }}
              >
                Update Details
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={logout}
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#FF5733",
                paddingVertical: 12,
                paddingHorizontal: 20,
                borderRadius: 30,
                marginTop: 20,
                marginRight: 140,
                shadowColor: "##FF5733",
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.3,
                shadowRadius: 4.65,
                elevation: 8,
                marginBottom : 20 ,
              }}
            >
              <Icon.Edit2 strokeWidth={3} stroke="#FFF" />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 18,
                  color: "#FFF",
                  fontWeight: "bold",
                }}
              >
                Log Out
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
