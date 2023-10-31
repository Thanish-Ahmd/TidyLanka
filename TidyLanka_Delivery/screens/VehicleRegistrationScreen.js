import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Pressable,
  KeyboardAvoidingView,
  TextInput,
  Alert
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const VehicleRegistrationScreen = (props) => {
  const [vehicleNo, setVihicleNo] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleRegistration, setVehicleRegistration] = useState("");
  const [insuranceDocument, setInsuranceDocument] = useState("");
  const [vehicleEmission, setVehicleEmission] = useState("");
  const [vehicleImage, setVehicleImage] = useState("");


  const usr = props.route.params.user ;
  console.log(usr) ;
  const name =  props.route.params.user.name ;
  const email =  props.route.params.user.email ;
  const password =  props.route.params.user.password ;
  const address =  props.route.params.user.address ;
  const contact =  props.route.params.user.contact ;
  const nicPassport =  props.route.params.user.nicPassport ;
  const licenseExpiryDate =props.route.params.user.licenseExpiryDate ;
  const licenseIssueDate =props.route.params.user.licenseIssueDate ;
  const licenseNo  =props.route.params.user.licenseNo ;

  const navigation = useNavigation();

  const handleNext = async() => {
    const rider = {
      name,
      email,
      password,
      address,
      contact,
      nicPassport,
      licenseExpiryDate,
      licenseIssueDate,
      licenseNo,
      vehicleNo,
      vehicleModel
    };
    await axios.post(`http://${window.ip}:5000/rider/add` , rider).then((res)=>{
      Alert.alert("Rider Added Successfully") ;
      navigation.navigate('Login') ;
    }).catch((err)=>{
      console.log(err)
    })
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
      

      <View style={{
        flexDirection: "row",
        gap: 5,
        backgroundColor: "#031828",
        paddingVertical: 20,
        paddingHorizontal: 120,
        marginTop: 40,
      }}>
        <View>
          <Text style={{ textAlign: "center", color: "white", fontSize: 20 }}>
          Vehicle Registration
          </Text>
        </View>
      </View>

      <KeyboardAvoidingView>
        <InputField 
          icon={<MaterialIcons name="drive-eta" size={24} color="gray" />} 
          value={vehicleNo} 
          onChangeText={setVihicleNo} 
          placeholder="Enter Registration Number"
        />

        <InputField 
          icon={<MaterialIcons name="directions-car" size={24} color="gray" />} 
          value={vehicleModel} 
          onChangeText={setVehicleModel} 
          placeholder="Enter Vehicle Model"
        />

        <View style={{ marginTop: 50 }}>
          <Pressable onPress={handleNext} style={{
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
        </View>
      </KeyboardAvoidingView>
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
      defaultValue={value}
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

export default VehicleRegistrationScreen;
