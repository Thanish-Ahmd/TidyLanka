import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    KeyboardAvoidingView,
    TextInput,
    Pressable,
  } from "react-native";
  import React, { useState,useEffect } from "react";
  import { MaterialIcons } from "@expo/vector-icons";
  import { AntDesign } from "@expo/vector-icons";
  import { useNavigation } from "@react-navigation/native";
  import axios from "axios";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { Alert } from 'react-native';
  
  const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();
    useEffect(() => {
      const checkLoginStatus = async () => {
        try {
          const token = await AsyncStorage.getItem("authToken");
  
          if (token) {
            navigation.replace("Main");
          }
        } catch (err) {
          console.log("error message", err);
        }
      };
      checkLoginStatus();
    }, []);
    const handleLogin = () => {
      const laundry = {
        email,
        password
      };
  
      axios
        .post(`http://${window.ip}:5000/laundry/login`, laundry)
        .then(async(res) => {
          if (res.data.rst === "success") {
            await AsyncStorage.setItem('token' , res.data.tok) ;
            await AsyncStorage.setItem('laundry' , res.data.data._id) ;
            navigation.navigate("Home")
            Alert.alert("Login Succesfull")
          }else if(res.data.rst === "incorrect password") {
            Alert.alert("Incorrect Password") ;
          }else if(res.data.rst === "invalid laundry user"){
            Alert.alert("Invalid User") ;
          }
        })
        .catch((error) => {
          Alert.alert("Login Error", "Invalid Email");
          console.log(error);
        });
    };
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "white", alignItems: "center",marginTop:50 }}
      >
        
      <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              marginTop: 20,
              color: "#041E42",
            }}
          >
            Laundry Owner Account
          </Text>
        </View>
        <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          backgroundColor: "#031828",
          paddingVertical: 50,
          paddingHorizontal: 150,
          marginTop: 20,
        }}
      >
        <MaterialIcons style={{ marginLeft: 8 }} name="local-laundry-service" size={70} color="white" />

        <View style={{
          flexDirection: "column" }} >
        <Text style={{ textAlign: "left", color: "white", fontSize: 30 }}>
          Tidy 
        </Text>
        <Text style={{ textAlign: "center", color: "white", fontSize: 30 }}>
          Lanka
        </Text>
        </View>
      </View>
       
  
        <KeyboardAvoidingView>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                marginTop: 50,
                fontSize: 22,
                fontWeight: "bold",
                color: "#041E42",
               
              }}
            >
              Login to your Account
            </Text>
          </View>
  
          <View style={{ marginTop: 50 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#D0D0D0",
                paddingVertical: 5,
                borderRadius: 5,
                
              }}
            >
              <MaterialIcons
                style={{ marginLeft: 8 }}
                name="email"
                size={24}
                color="gray"
              />
  
              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: email ? 16 : 16,
                }}
                placeholder="enter your Email"
              />
            </View>
          </View>
  
          <View >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#D0D0D0",
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 30,
              }}
            >
              <AntDesign
                name="lock1"
                size={24}
                color="gray"
                style={{ marginLeft: 8 }}
              />
  
              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: password ? 16 : 16,
                }}
                placeholder="Enter your Password"
              />
            </View>
          </View>
  
          <View
            style={{
              marginTop: 12,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text>Keep me logged in</Text>
  
            <Text style={{ color: "#007FFF", fontWeight: "500" }}>
              Forgot Password
            </Text>
          </View>
  
          <View style={{ marginTop: 80 }} />
  
          <Pressable
            onPress={handleLogin}
            // onPress={() => navigation.navigate("Home")}
            style={{
              width: 200,
              backgroundColor: "#031828",
              borderRadius: 6,
              marginLeft: "auto",
              marginRight: "auto",
              padding: 15,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Login
            </Text>
          </Pressable>
    
          <Pressable
            onPress={() => navigation.navigate("Register")}
            style={{ marginTop: 15 }}
          >
            <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
              Don't have an account? Sign Up
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };
  
  export default LoginScreen;
  
  const styles = StyleSheet.create({});