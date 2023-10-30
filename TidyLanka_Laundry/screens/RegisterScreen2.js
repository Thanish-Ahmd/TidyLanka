import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  KeyboardAvoidingView,
  TextInput,
  Alert,
} from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Dimensions } from "react-native";
import { useEffect } from "react";
import { ScrollView } from "react-native";

const { width, height } = Dimensions.get('window');



const RegisterScreen = (props) => {

    let laund = props.route.params.laundry ;
    console.log(laund) ;
    const [address, setAddress] = useState("");

    const [pricingInfo, setPricingInfo] = useState("");
    const [contact , setContact] = useState(laund.contact) ;
    const [email , setEmail] = useState(laund.email) ;
    const [operatingHours , setOperatingHours] = useState(laund.operatingHours) ;
    const [password , setPassword] = useState(laund.password) ;
    const [paymentMethods , setPaymentMethods] = useState(laund.paymentMethods) ;
    const [washDryFold, setWashDryFold] = useState("");
    const [washIron, setWashIron] = useState("");
    const [dryClean, setDryClean] = useState("");
    const [turnAroundTime, setTurnaroundTime] = useState("");
    const [name ,setName] = useState(laund.name) ;
  
    const navigation = useNavigation();

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

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
        setLongitude(location.coords.longitude)
      })();
  },[])

  const handleMapPress = event => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setLongitude(longitude) ;
    setLatitude(latitude) ;
  };
  
    const handleRegister =async () => {
      const laundry = {
        name,
        contact,
        email,
        password,
        address,
        operatingHours,
        pricingInfo,
        paymentMethods,
        turnAroundTime,
        washDryFold,
        dryClean,
        washIron,
        longitude,
        latitude
      };

      await
      axios.post(`http://${window.ip}:5000/laundry/add`, laundry).then((res)=>{
        Alert.alert("Registered Successfully") ;
        navigation.navigate('Login') ;
      }).catch((err)=>{
        console.log(err)
      })
      
  
      
      console.log(laundry);
    };

   
  
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
          <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 22, fontWeight: "bold", marginTop: 20, color: "#041E42" }}>
                  Laundry Owner Account
              </Text>
          </View>
  
          <View style={{
              flexDirection: "row",
              gap: 5,
              backgroundColor: "#031828",
              paddingVertical: 20,
              paddingHorizontal: 120,
              marginTop: 20,
          }}>
              <View>
                  <Text style={{ textAlign: "center", color: "white", fontSize: 20 }}>
                      Enter Details
                  </Text>
              </View>
          </View>
          
          <ScrollView>

         
          <KeyboardAvoidingView>
              <InputFieldNumber 
                  icon={<MaterialIcons name="watch" size={24} color="gray" />} 
                  value={turnAroundTime} 
                  onChangeText={setTurnaroundTime} 
                  placeholder="Enter turn around time"
              />
  
              <InputField 
                  icon={<AntDesign name="clockcircle" size={24} color="gray" />} 
                  value={address} 
                  onChangeText={setAddress} 
                  placeholder="Enter Address"
              />
  
              <InputFieldNumber 
                  icon={<MaterialIcons name="attach-money" size={24} color="gray" />} 
                  value={washDryFold} 
                  onChangeText={setWashDryFold} 
                  placeholder="Wash Dry Fold Price"
                
                  
                  
              />
               <InputFieldNumber 
                  icon={<MaterialIcons name="attach-money" size={24} color="gray" />} 
                  value={dryClean} 
                  onChangeText={setDryClean} 
                  placeholder="Dry Clean Price"
                
                  
              />
  
  <InputFieldNumber 
                  icon={<MaterialIcons name="attach-money" size={24} color="gray" />} 
                  value={washIron} 
                  onChangeText={setWashIron} 
                  placeholder="Wash & Iron Price"
                
                  
              />
            <Text>Select Your location</Text>
{longitude ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: latitude,
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
  
  
           

  
              <View style={{ marginTop: 50 }}>
                  <Pressable onPress={handleRegister} style={{
                      width: 200,
                      backgroundColor: "#031828",
                      borderRadius: 6,
                      marginLeft: "auto",
                      marginRight: "auto",
                      padding: 15,
                  }}>
                      <Text style={{ textAlign: "center", color: "white", fontSize: 16, fontWeight: "bold" }}>
                          Register
                      </Text>
                  </Pressable>
  
                  <Pressable onPress={() => navigation.goBack()} style={{ marginTop: 15 }}>
                      <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
                          Already have an account? Sign In
                      </Text>
                  </Pressable>
              </View>
          </KeyboardAvoidingView>

          </ScrollView>
      </SafeAreaView>
    );
  };
  
  const InputField = ({ icon, value, onChangeText, placeholder }) => (
    <View style={{
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      backgroundColor: "#D0D0D0",
      paddingVertical: 5,
      borderRadius: 5,
      marginTop: 30,
      paddingLeft: 8,
    }}>
      {icon}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={{
          color: "gray",
          marginVertical: 10,
          width: 300,
          fontSize: 16,
          marginLeft: 5,
        }}
        placeholder={placeholder}
      />
    </View>
  );

  const InputFieldNumber = ({ icon, value, onChangeText, placeholder }) => (
    <View style={{
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      backgroundColor: "#D0D0D0",
      paddingVertical: 5,
      borderRadius: 5,
      marginTop: 30,
      paddingLeft: 8,
    }}>
      {icon}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={{
          color: "gray",
          marginVertical: 10,
          width: 300,
          fontSize: 16,
          marginLeft: 5,
        }}
        placeholder={placeholder}
        keyboardType="numeric"
        returnKeyType="done"
      />
    </View>
  );


  const styles = StyleSheet.create({
    container: {
        flex: 1,
        width : width * 0.9
      },
      map: {
        flex: 1,
        width :width * 0.9 ,
        height : width * 0.9 ,
        marginTop : 20,

      },
  })
  
  
  export default RegisterScreen;
  