import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions, Alert } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const {width , height } = Dimensions.get('window') ;

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [customer ,setCustomer] = useState({}) ;
  const isFocused = useIsFocused() ;
  useEffect(()=>{
    if(isFocused){
      getCustomer() ;

    }
  },[isFocused]) ;

  const  getCustomer = async()=>{
    const id = await AsyncStorage.getItem('customer') ;
    await axios
    .get(`http://${window.ip}:5000/customer/get/${id}`).then((res)=>{
      setCustomer(res.data) ;
    }).catch((err)=>{
      console.log(err) ;
    })
  }

  const logout = async() =>{
    Alert.alert("You have been logged out") ;
    await AsyncStorage.removeItem('customer') ;
    await AsyncStorage.removeItem('token') ;
    navigation.navigate('Welcome') ;
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
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>Profile</Text>

          <View style={{ marginTop: 20  , minHeight : height *0.8 }}>
            <Text style={{ fontSize: 20 }}>Name: {customer.name} </Text>
            <Text style={{ fontSize: 20, marginTop: 10 }}>
              Email: {customer.email}
            </Text>
            <Text style={{ fontSize: 20, marginTop: 10 }}>
              Contact Number: {customer.contact}
            </Text>
            <Text style={{ fontSize: 20, marginTop: 10, }}>
              Address: {customer.address}
            </Text>
            <Text style={{ fontSize: 20, marginTop: 10 }}>
              Longitude: {customer.longitude}
            </Text>
            <Text style={{ fontSize: 20, marginTop: 10, marginBottom: 50 }}>
              Latitude: {customer.latitude}
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
                Update Profile
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
