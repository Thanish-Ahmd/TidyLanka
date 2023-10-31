import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View } from 'react-native';
import StackNavigator from './navigation/StackNavigator';
import io from "socket.io-client";
import { useEffect } from 'react';
import axios from 'axios';


const socket = io("http://172.20.10.5:5000");

export default function App() {

  window.ip = "172.20.10.5" ;

  useEffect(()=>{
    socket.on('connect', () => {
      console.log('Connected to the server');
    });

    socket.on("update", async(newDocument) => {
      // Display an alert or take any other action to notify the user

      console.log(newDocument)


        await axios 
        .get(`http://${window.ip}:5000/order/get/${newDocument}`).then((res)=>{
          
          const st = res.data.status ;

          if(st == "Accepted" || st == "Completed") {
            Alert.alert("New Orders Available")
          }
        }).catch((err)=>{
          console.log(err) ;
        })
      
    });
  },[]) ;
  
  return (
    <>
      <StackNavigator/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
