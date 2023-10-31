import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";

const { width, height } = Dimensions.get("window");
const CompletedOrder = ({ item }) => {
  return (
    <View
      style={styles.container}
      className="flex-row items-center bg-white p-3 rounded-3xl shadow-2xl mb-3 mx-2"
    >
      <View>
        <View className="flex-row">
          <Text style={styles.fromTo}>From : </Text>
          <Text style={styles.addressText}>{item.stop1}</Text>
        </View>
        <View className="flex-row">
          <Text style={styles.fromTo}>To : </Text>
          <Text style={styles.addressText}>{item.stop2}</Text>
        </View>
        <View className="flex-row">
          <Text style={styles.fromTo}>Started at : </Text>
          <Text style={styles.dateTime}>{new Date(item.createdAt).toLocaleString()}</Text>
        </View>
        <View className="flex-row">
          <Text style={styles.fromTo}>Delivery Fee : </Text>
          <Text style={styles.dateTime}>{item.fee}</Text>
        </View>
        <View className="flex-row">
          <Text style={styles.fromTo}>Finished At : </Text>
          <Text style={styles.dateTime}>{new Date(item.updatedAt).toLocaleString()}</Text>
        </View>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
  },
  addressText: {
    fontSize: 18,
    fontWeight : '600'
  },
  fromTo: {
    fontSize: 16,
  },
  dateTime : {
    fontSize  :16 ,
    fontWeight : '500'
  }
});

export default CompletedOrder;
