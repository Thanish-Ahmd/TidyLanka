import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StackNavigator from "./navigation/StackNavigator";
import { ScrollView } from "react-native";

import io from "socket.io-client";
import { useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert } from "react-native";



const socket = io("http://172.20.10.5:5000");
export default function App() {
  window.ip = "172.20.10.5";


  useEffect(()=>{
    socket.on('connect', () => {
      console.log('Connected to the server');
    });

    socket.on("update", async(newDocument) => {
      // Display an alert or take any other action to notify the user
      const id = await AsyncStorage.getItem('customer') ;
      console.log(newDocument)


        await axios 
        .get(`http://${window.ip}:5000/order/get/${newDocument}`).then((res)=>{
          
          const cu = res.data.customer ;

          if(id == cu) {
            Alert.alert("Your order has been updated.")
          }
        }).catch((err)=>{
          console.log(err) ;
        })
      
    });
  },[]) ;
  return (
    <>

    <StackNavigator />

  
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
