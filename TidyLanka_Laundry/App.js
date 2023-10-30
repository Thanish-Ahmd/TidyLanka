import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StackNavigator from "./navigation/StackNavigator";

import io from "socket.io-client";
import { useEffect } from "react";
import { Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


const socket = io("http://172.20.10.5:5000");

export default function App() {
  window.ip = "172.20.10.5";

  useEffect(()=>{
    socket.on('connect', () => {
      console.log('Connected to the server');
    });

    socket.on("newDocument", async(newDocument) => {
      // Display an alert or take any other action to notify the user
      const id = await AsyncStorage.getItem('laundry') ;

      
      if(newDocument.laundry == id ) {
        Alert.alert(`New Order Available`);
    
      }
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
