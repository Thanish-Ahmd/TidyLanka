import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function ProfileScreen() {
  const navigation = useNavigation();

  const [rider ,setRider] = useState({}) ;

  const isFocused = useIsFocused()


  useEffect(()=>{
    getRider()
  },[isFocused]) ;

  const getRider = async()=>{
    const id = await AsyncStorage.getItem('rider')
    await axios.get(`http://${window.ip}:5000/rider/get/${id}`).then((res)=>{
    console.log(res.data) ;
    setRider(res.data) ;
    }).catch((err)=>{
      console.log(err) ;
    })
  }

  const logout = async() =>{
    Alert.alert("You have been logged out") ;
    await AsyncStorage.removeItem('rider') ;
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
          <Text style={{ fontSize: 30, fontWeight: "bold"  }}>Rider Profile</Text>

          <View  style={{ marginTop: 20,  minHeight: 600 }}>

            <Text style={{ fontSize: 20, marginTop: 10 }}>Rider Id : {rider._id}</Text>
            <Text style={{ fontSize: 20, marginTop: 10 }}>Name : {rider.name}</Text>
            <Text style={{ fontSize: 20, marginTop: 10 }}>Address : {rider.address}</Text>
            <Text style={{ fontSize: 20, marginTop: 10 }}>contact : {rider.contact}</Text>
            <Text style={{ fontSize: 20, marginTop: 10 }}>Nic/Passport : {rider.nicPassport}</Text>
            <Text style={{ fontSize: 20, marginTop: 10 }}>license No : {rider.licenseNo}</Text>
            <Text style={{ fontSize: 20, marginTop: 10 }}>license Issue Date : {rider.licenseIssueDate}</Text>
            <Text style={{ fontSize: 20, marginTop: 10 }}>license Expiry Date : {rider.licenseExpiryDate}</Text>
            <Text style={{ fontSize: 20, marginTop: 10 }}>Vehicle No : {rider.vehicleNo}</Text>
            <Text style={{ fontSize: 20, marginTop: 10 }}>Vehicle No : {rider.vehicleModel}</Text>
            <Text style={{ fontSize: 20, marginTop: 10 , marginBottom : 40}}>Password : {rider.password}</Text>
            
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
