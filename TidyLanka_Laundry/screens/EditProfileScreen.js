import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

export default function EditProfileScreen() {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, SetContact] = useState("");
  const [address, setAddress] = useState("");
  const [operatingHours, setOperatingHours] = useState("");
  const [washIron, setWashIron] = useState("");
  const [dryClean, setDryClean] = useState("");
  const [washDryFold, setWashDryFold] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [paymentMethods, setPaymentMethods] = useState("");
  const [turnAroundTime, setTurnaroundTime] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    getLaundry();

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);


  const handleMapPress = event => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setLongitude(longitude) ;
    setLatitude(latitude) ;
  };

  const getLaundry = async () => {
    let id = await AsyncStorage.getItem("laundry");
    await axios
      .get(`http://${window.ip}:5000/laundry/get/${id}`)
      .then((res) => {
        setName(res.data.name);
        SetContact(res.data.contact);
        setEmail(res.data.email);
        setAddress(res.data.address);
        setWashDryFold(res.data.washDryFold);
        setOperatingHours(res.data.operatingHours);
        setWashIron(res.data.washIron);
        setDryClean(res.data.dryClean);
        setPaymentMethods(res.data.paymentMethods);
        setTurnaroundTime(res.data.turnAroundTime);
        setLongitude(res.data.longitude);
        setLatitude(res.data.latitude);
        setPassword(res.data.password);
        setConfirmPassword(res.data.password);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateLaundry = async () => {
    let id = await AsyncStorage.getItem("laundry");

    const updatedLaundry = {
      name,
      address,
      email,
      contact,
      longitude,
      latitude,
      washDryFold,
      dryClean,
      washIron,
      turnAroundTime,
      password,
      operatingHours,
    };
    await axios
      .put(`http://${window.ip}:5000/laundry/update/${id}`, updatedLaundry)
      .then(async (res) => {
        console.log(res);
        Alert.alert("Profile Updated");
        navigation.navigate("Home");
      })
      .catch((err) => {
        Alert.alert("Errorin updating laundry profile.");
      });
  };

  return (
    <>
      <ScrollView>
        <View style={styles.relativeContainer}>
          <Image
            style={styles.imageStyle}
            source={require("../assets/images/background5.jpg")}
          />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.goBackButton}
          >
            <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileContainer}>
          <Text style={styles.headerText}>Edit Laundry Owner Profile</Text>

          <View style={styles.detailsContainer}>
            {renderTextInput("Laundry Name", name, setName)}
            {renderTextInput("Email Address", email, setEmail)}
            {renderTextInput("Contact", contact.toString(), SetContact)}
            {renderTextInput("Physical Address", address, setAddress)}
            {renderTextInput(
              "Operating Hours",
              operatingHours,
              setOperatingHours
            )}
            {renderTextInput(
              "Wash Dry Fold",
              washDryFold.toString(),
              setWashDryFold
            )}
            {renderTextInput("Wash Iron", washIron.toString(), setWashIron)}
            {renderTextInput("Dry Clean", dryClean.toString(), setDryClean)}
            {renderTextInput(
              "Payment Methods",
              paymentMethods,
              setPaymentMethods
            )}
            {renderTextInput(
              "Turnaround Time",
              turnAroundTime.toString(),
              setTurnaroundTime
            )}
            {renderTextInput("Longitude", longitude.toString(), setLongitude)}
            {renderTextInput("Latitude", latitude.toString(), setLatitude)}

            {renderTextInput("Password", password, setPassword)}
            {renderTextInput(
              "Confirm Password",
              confirmPassword,
              setConfirmPassword
            )}

{longitude != "" ? (
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

            <TouchableOpacity
              onPress={updateLaundry}
              style={styles.updateButton}
            >
              <Text style={styles.updateButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

function renderTextInput(label, value, setValue) {
  return (
    <>
      <Text style={styles.labelText}>{label}</Text>
      <TextInput
        defaultValue={value}
        onChangeText={setValue}
        style={styles.inputField}
      />
    </>
  );
}

function renderNumberInput(label, value, setValue) {
  return (
    <>
      <Text style={styles.labelText}>{label}</Text>
      <TextInput
        defaultValue={value}
        onChangeText={setValue}
        style={styles.inputField}
        keyboardType="numeric"
      />
    </>
  );
}

const styles = StyleSheet.create({
  relativeContainer: {
    position: "relative",
  },
  imageStyle: {
    width: "100%",
    height: 130,
  },
  goBackButton: {
    position: "absolute",
    top: 50,
    left: 10,
    backgroundColor: "#F0F0F0",
    padding: 10,
    borderRadius: 30,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  profileContainer: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "white",
    marginTop: -30,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  detailsContainer: {
    marginTop: 20,
  },
  labelText: {
    fontSize: 20,
    marginBottom: 5,
  },
  inputField: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 15,
    fontSize: 18,
  },
  updateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#031828",
    paddingVertical: 12,
    borderRadius: 30,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  updateButtonText: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    width : width * 0.9
  },
  map: {
    flex: 1,
    width :width * 0.9 ,
    height : width * 0.9 ,
  },
});
