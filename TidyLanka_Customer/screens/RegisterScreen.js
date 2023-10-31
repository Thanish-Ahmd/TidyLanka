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
import { useIsFocused, useNavigation } from "@react-navigation/native";
import axios from "axios";
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Dimensions } from "react-native";
import { useEffect } from "react";
import { ScrollView } from "react-native";

const { width, height } = Dimensions.get('window');

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const navigation = useNavigation();
  

    const isFocused = useIsFocused()


    useEffect(()=>{
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        setLatitude(location.coords.latitude) ;
        setLongitude(location.coords.longitude) ;
      })();
    },[isFocused]) ;

    const handleMapPress = event => {
      const { latitude, longitude } = event.nativeEvent.coordinate;
      setLongitude(longitude) ;
      setLatitude(latitude) ;
    };

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

    const handleRegister = () => {

      if(password == confirmPassword) {

        const user = {
          name,
          email,
          contact,
          address,
          longitude,
          latitude,
          password
        };


        if( validateEmail(email)) {
          if(validatePhone(contact)){
            if(validatePassword(password)) {

              axios
          .post(`http://${window.ip}:5000/customer/add`, user)
          .then((response) => {
            console.log(response);
            Alert.alert(
              "Registration successful",
              "You have been registered Successfully"
            );
            navigation.navigate("Login") ;
          })
          .catch((error) => {
            Alert.alert(
              "Registration Error",
              "An error occurred while registering"
            );
            console.log("registration failed", error);
          });

            }else{
              Alert.alert( "Password must conatin 8 characters including 1 lower case letter , one upper case letter , one number and atleast one special character") ;
            }
          }else {
            Alert.alert("Invalid Contact")
          }
        }else{
          Alert.alert("Invalid Email") ;
        }



    
        
        
      }else {
        Alert.alert("Passwords does not match") ;
      }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center", marginTop: 10 }}
    >

     

      

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          backgroundColor: "#031828",
          paddingVertical: 50,
          paddingHorizontal: 150,
          marginTop: 60,
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
              placeholder="Enter your name"
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
              keyboardType="numeric"
              returnKeyType="done"
              placeholder="Enter your contact Number"
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
              name="home"
              size={24}
              color="gray"
            />

            <TextInput
              defaultValue={address}
              onChangeText={(text) => setAddress(text)}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: password ? 16 : 16,
              }}
              placeholder="enter your address"
            />
          </View>

              <Text style={{marginTop :20}}>Set Your Location</Text>
          {longitude != "" ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude:latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}

          onPress={handleMapPress}
        >
          <Marker
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
            title="Your Location"
            description="You are here"
          />
        </MapView>
      ) : (
        <Text>Loading...</Text>
      )}
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
              defaultValue={password}
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
              defaultValue={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              secureTextEntry={true}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: email ? 16 : 16,
              }}
              placeholder="confirm Password"
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

        <View style={{ marginTop: 50 }} />

        <Pressable
          style={{
            width: 200,
            backgroundColor: "#031828",
            borderRadius: 6,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 15,
          }}
          onPress={handleRegister}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Register
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width : width * 0.9 ,
    
  },
  map: {
    flex: 1,
    width :width * 0.9 ,
    height : width * 0.9 ,
    marginTop :20 ,
  },
});


