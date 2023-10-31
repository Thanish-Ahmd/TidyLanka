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
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const BackgroundCheckScreen = (props) => {
  const name = props.route.params.user.user.name ;
  const password = props.route.params.user.user.password ;
  const email = props.route.params.user.user.email ;

  console.log(props.route.params) ;
  const [nicPassport, setNicPassport] = useState("");
  const [accountDetails, setAccountDetails] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigation = useNavigation();

  const handleNext = () => {
    const user = {
      name,
      email ,
      password ,
      nicPassport,
      contact,
      address

    };

    if(validatePhone(contact)) {
      navigation.navigate('DriversLicense' , {user}) ;
    }else {
      Alert.alert("Invalid Contact")
    }
    
  };

  const validatePhone = (phn) => {
    const phoneNumberPattern = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    return phoneNumberPattern.test(phn);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
      
    

      <View style={{
        flexDirection: "row",
        gap: 5,
        backgroundColor: "#031828",
        paddingVertical: 20,
        paddingHorizontal: 120,
        marginTop: 20, 
        borderRadius: 10
      }}>
        <View>
          <Text style={{ textAlign: "center", color: "white", fontSize: 20 }}>
          Background Check
          </Text>
        </View>
      </View>

      <KeyboardAvoidingView>
        <InputField 
          icon={<MaterialIcons name="person" size={24} color="gray" />} 
          value={nicPassport} 
          onChangeText={setNicPassport} 
          placeholder="Upload NIC / Passport"
        />

       

        <InputField 
          icon={<MaterialIcons name="home" size={24} color="gray" />} 
          value={address} 
          onChangeText={setAddress} 
          placeholder="Enter Address"
        />

      

    

        <InputFieldNumber 
          icon={<MaterialIcons name="phone" size={24} color="gray" />} 
          value={phoneNumber} 
          onChangeText={setContact} 
          placeholder="Enter Phone Number"
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
      keyboardType="numeric"
      returnKeyType="Done"
    />
  </View>
);


export default BackgroundCheckScreen;
