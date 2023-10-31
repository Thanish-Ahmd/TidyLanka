import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  MinusIcon,
  PlusIcon,
} from "react-native-heroicons/outline";

import { themeColors } from "../theme";

export default function RegisterScreen2(props) {

  const user = props.route.params ;
  console.log(user) ;
  const navigation = useNavigation();

  return (
    <>
      <ScrollView>
        <View className="relative">
          <Image
            className="w-full h-72"
            source={require("../assets/images/background5.jpg")}
            style={{
              height: 250,
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
            }}
          />
          <TouchableOpacity
            className=" rounded-full "
            onPress={() => navigation.goBack()}
          >
            <ArrowLeftCircleIcon size="50" strokeWidth={1.2} color="white" />
          </TouchableOpacity>
          <Text
            style={{ marginTop: 20 }}
            className="absolute top-20 left-10 text-2xl font-bold text-white"
          >
            Here is what you need to do to complete Registration
          </Text>
        </View>
        <View
          style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
          className="bg-white -mt-12 pt-6"
        >
          <View className="px-5">
            <Text className="text-xl font-medium">Remaining Steps</Text>

            <TouchableOpacity
              style={{ backgroundColor: "#D0D0D0", borderRadius: 10 }}
              className=" p-7  mt-4 flex-row"
              onPress={() => navigation.navigate("BackgroundCheck" , {user})}
            >
              <View>
                <Text className="text-xl">Background Check</Text>
                <Text className="text-sm">Recommended next step</Text>
              </View>
              <ArrowRightCircleIcon style={{marginLeft:100}}size="50" strokeWidth={1.2} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
            disabled={true}
              style={{ backgroundColor: "#D0D0D0", borderRadius: 10 }}
              className=" p-7  mt-4 flex-row"
              onPress={() => navigation.navigate("DriversLicense")}
            >
                <View>
              <Text className="text-xl">Driver’s License</Text>
              <Text className="text-sm">Get Started</Text>
              </View>
              <ArrowRightCircleIcon style={{marginLeft:125}}size="50" strokeWidth={1.2} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
            disabled={true}
              style={{ backgroundColor: "#D0D0D0", borderRadius: 10 }}
              className=" p-7  mt-4 mb-4 flex-row"
              onPress={() => navigation.navigate("VehicleRegistration")}
            >
                <View>
              <Text className="text-xl">Vehicle Registration</Text>
              <Text className="text-sm">Get Started</Text>
              </View>
              <ArrowRightCircleIcon style={{marginLeft:95}}size="50" strokeWidth={1.2} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
              className=" p-3 rounded text-white text-center"
              style={{
                backgroundColor: "#031828",
                borderRadius: 20,
                marginLeft: 220,
                marginRight: 20,
              }}
              onPress={() => navigation.navigate("RegistrationSuccessful")}
            >
              <Text style={{ marginLeft: 20 }} className=" text-xl text-white ">
                NEXT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
