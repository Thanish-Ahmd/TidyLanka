import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

const ConfirmScreen = () => {
    const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <LottieView
        source={require("../assets/success.json")}
        style={{
          height: 360,
          width: 300,
          alignSelf: "center",
          marginTop: 10,
          justifyContent: "center",
        }}
        autoPlay={true}
        loop={false}
        speed={0.7}
      />

      <Text
        style={{
          marginTop: 40,
          fontSize: 19,
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        Registration successful
      </Text>

      <Pressable
        style={{ marginTop: 20, padding: 25, backgroundColor: "#031828", borderRadius: 5 }}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={{ fontSize: 20, color: "white", fontWeight: "bold", textAlign: "center" }}>
          Start Riding
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default ConfirmScreen;

const styles = StyleSheet.create({});
