import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

const ConfirmScreen = () => {
  const navigation = useNavigation();
  useEffect(()=>{
    const delay = 5000;

    // Execute the code after the specified delay
    const timerId = setTimeout(() => {
      // Code to be executed after the delay
      navigation.navigate('Home') ;
    }, delay);

    // Clear the timer if the component unmounts to avoid memory leaks
    return () => {
      clearTimeout(timerId);
    };
  },[])
  return (
    <SafeAreaView>
      <LottieView
        source={require("../assets/success.json")}
        style={{
          height: 360,
          width:300,
          alignSelf: "center",
          marginTop: 40,
          justifyContent: "center",
         
        }}
        autoPlay={true}
        loop={false}
        speed={0.7}
      />

      <Text
        style={{
          marginTop: 70,
          fontSize: 19,
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        Your order has been successfully placed
      </Text>

      
    </SafeAreaView>
  );
};

export default ConfirmScreen;

const styles = StyleSheet.create({});