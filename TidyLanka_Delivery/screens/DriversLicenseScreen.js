import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Pressable,
  KeyboardAvoidingView,
  TextInput
} from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const DriversLicenseScreen = (props) => {
  const usr =props.route.params.user ;
  const name =  props.route.params.user.name ;
  const email =  props.route.params.user.email ;
  const password =  props.route.params.user.password ;
  const address =  props.route.params.user.address ;
  const contact =  props.route.params.user.contact ;
  const nicPassport =  props.route.params.user.nicPassport ;

  console.log(usr) ;
  const [licenseIssueDate, setLicenseIssueDate] = useState("");
  const [licenseExpiryDate, setLicenseExpiryDate] = useState("");
  const [licenseNo, setLicenseNumber] = useState("");
  const [licenseFront, setLicenseFront] = useState("");
  const [licenseBack, setLicenseBack] = useState("");

  const navigation = useNavigation();

  const handleNext = () => {
    const user = {
      name,
      email,
      password,
      address,
      nicPassport,
      contact ,
      licenseIssueDate,
      licenseExpiryDate,
      licenseNo,
      
    };
    navigation.navigate('VehicleRegistration' , {user}) ;
  };

  return (
    <SafeAreaView style={{  flex: 1, backgroundColor: "white", alignItems: "center" }}>
      

      <View style={{
        flexDirection: "row",
        gap: 5,
        backgroundColor: "#031828",
        paddingVertical: 20,
        paddingHorizontal: 120,
        marginTop: 40,
        marginBottom: 20,
        borderRadius: 10
      }}>
        <View>
          <Text style={{ textAlign: "center", color: "white", fontSize: 20 }}>
          Driver’s License
          </Text>
        </View>
      </View>

      <KeyboardAvoidingView>
        <InputField 
          icon={<MaterialIcons name="calendar-today" size={24} color="gray" />} 
          value={licenseIssueDate} 
          onChangeText={setLicenseIssueDate} 
          placeholder="Enter Driver’s License Issue Date"
        />

        <InputField 
          icon={<MaterialIcons name="calendar-today" size={24} color="gray" />} 
          value={licenseExpiryDate} 
          onChangeText={setLicenseExpiryDate} 
          placeholder="Enter Driver’s License Expiry Date"
        />

        <InputField 
          icon={<MaterialIcons name="info" size={24} color="gray" />} 
          value={licenseNo} 
          onChangeText={setLicenseNumber} 
          placeholder="Enter License NO"
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
              NEXT
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

export default DriversLicenseScreen;
