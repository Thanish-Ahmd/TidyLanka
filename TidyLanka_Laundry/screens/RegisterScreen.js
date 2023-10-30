import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { ScrollView } from "react-native";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [contact , setContact] = useState("")
  const [address, setAddress] = useState("");
  const [operatingHours, setOperatingHours] = useState("");
  const [paymentMethods, setPaymentMethods] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    return emailRegex.test(email);
  };

  const validatePassword = (tpassword) => {
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    return pattern.test(tpassword);
  };

  const validatePhone = (phn) => {
    const phoneNumberPattern = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    return phoneNumberPattern.test(phn);
  };
  
  const navigation = useNavigation();
  const handleRegister = () => {
    const laundry = {
      name,
      contact,
      password,
      email,
      operatingHours,
      paymentMethods,

    }

    // navigation.navigate("Register2" , {laundry} )

    if(validateEmail(email)) {
      if(validatePhone(contact)) {
        if(validatePassword(password)){

          if( name == "" || operatingHours =="" || paymentMethods =="") {
            Alert.alert("Can not have empty fields") ;
          }else {
            navigation.navigate("Register2" , {laundry} )
      
          }
      

        }else{
          Alert.alert( "Password must conatin 8 characters including 1 lower case letter , one upper case letter , one number and atleast one special character") ;
        }
      }else{
        Alert.alert("Invalid Contact Number")
      }
    }else {
      Alert.alert("Invalid Email") ;
    }


   
    
    
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center"}}
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

          <ScrollView>

          

      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              marginTop: 30,
              color: "#041E42",
            }}
          >
            Register to your Account
          </Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#D0D0D0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 0,
            }}
          >
            <Ionicons
              name="ios-person"
              size={24}
              color="gray"
              style={{ marginLeft: 8 }}
            />
            <TextInput
              defaultValue={name}
              onChangeText={(text) => setName(text)}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: name ? 16 : 16,
              }}
              placeholder="Enter laundry name"
            />
          </View>


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
            <Ionicons
              name="call"
              size={24}
              color="gray"
              style={{ marginLeft: 8 }}
            />
            <TextInput
              defaultValue={contact}
              onChangeText={(text) => setContact(text)}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: name ? 16 : 16,
              }}
              placeholder="Enter your contact Number"
              keyboardType="numeric" 
              returnKeyType="done"
            />
          </View>



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
            <MaterialIcons
              style={{ marginLeft: 8 }}
              name="email"
              size={24}
              color="gray"
            />

            <TextInput
              defaultValue={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: password ? 16 : 16,
              }}
              placeholder="enter your Email"
            />
          </View>


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
            <MaterialIcons
              style={{ marginLeft: 8 }}
              name="watch"
              size={24}
              color="gray"
            />

            <TextInput
              defaultValue={operatingHours}
              onChangeText={(text) => setOperatingHours(text)}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: password ? 16 : 16,
              }}
              placeholder="Operating Hours (in Hours)"
            />
          </View>


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
            <MaterialIcons
              style={{ marginLeft: 8 }}
              name="money"
              size={24}
              color="gray"
            />

            <TextInput
              defaultValue={paymentMethods}
              onChangeText={(text) => setPaymentMethods(text)}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: password ? 16 : 16,
              }}
              placeholder="Payment Methods cash/card"
            />
          </View>
        </View>

        <View>
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
                fontSize: email ? 16 : 16,
              }}
              placeholder="enter your Password"
            />
          </View>
        </View>


        <View style={{ marginTop: 50 }} />

        <Pressable
          onPress={handleRegister }
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
            Continue
          </Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.goBack()}
          style={{ marginTop: 15 }}
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
            Already have an account? Sign In
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
      </ScrollView>
      
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});


