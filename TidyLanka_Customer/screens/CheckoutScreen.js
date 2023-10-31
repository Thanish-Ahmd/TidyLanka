import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";

import * as geolib from "geolib";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CheckoutScreen = (props) => {
  const [customer, setCustomer] = useState({});
  const [deliveryFee, setDeliveryFee] = useState(0);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    let id = await AsyncStorage.getItem("customer");
    await axios
      .get(`http://${window.ip}:5000/customer/get/${id}`)
      .then((res) => {
        setCustomer(res.data);
        // console.log(res.data) ;

        const location1 = {
          latitude: laundry.latitude,
          longitude: laundry.longitude,
        }; // Coordinates for New York City
        const location2 = {
          latitude: res.data.latitude,
          longitude: res.data.longitude,
        };

        const calculatedDistance = geolib.getDistance(location1, location2);
        const fee = (calculatedDistance * 75) / 1000;
        setDeliveryFee(fee);
        // console.log(fee) ;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addOrder = async () => {
    const customerID = customer._id;
    const laundryID = laundry._id;
    const customerName = customer.name;
    const laundryName = laundry.name;
    const customerAddress = customer.address;
    const laundryAddress = laundry.address;
    const customerlongitude = customer.longitude;
    const customerlatitude = customer.latitude;
    const service = order.name;
    const weight = order.weight;
    const laundrylongitude = laundry.longitude;
    const laundrylatitude = laundry.latitude;
    const deliveryAmount = deliveryFee;
    const laundryFee = order.total;
    const pickupDate = order.pickup;
    const deliveryDate = order.delivery;

    const newOrder = {
      customerID,
      laundryID,
      customerName,
      laundryName,
      customerAddress,
      laundryAddress,
      customerlongitude,
      customerlatitude,
      service,
      weight,
      laundrylatitude,
      laundrylongitude,
      deliveryAmount,
      laundryFee,
      pickupDate,
      deliveryDate,
    };
    await axios
      .post(`http://${window.ip}:5000/order/add`, newOrder)
      .then((res) => {
        navigation.navigate("Confirm");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let order = props.route.params.order;
  let laundry = order.laundry;
//   console.log(order);

  const navigation = useNavigation();

  return (
    <>
      <ScrollView style={{ marginTop: 50 }}>
        <>
          <View style={{ marginHorizontal: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 30 }}>
              Billing Details
            </Text>
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 7,
                padding: 10,
                marginTop: 15,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: "400", color: "gray" }}
                >
                  Weight
                </Text>
                <Text style={{ fontSize: 18, fontWeight: "400" }}>
                  {order.weight} Kg
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: "400", color: "gray" }}
                >
                  Service
                </Text>
                <Text style={{ fontSize: 18, fontWeight: "400" }}>
                  {order.name}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: "400", color: "gray" }}
                >
                  Price per Kg
                </Text>
                <Text style={{ fontSize: 18, fontWeight: "400" }}>
                  {order.price} Lkr
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: "400", color: "gray" }}
                >
                  Total
                </Text>
                <Text style={{ fontSize: 18, fontWeight: "400" }}>
                  {order.total} Lkr
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: "400", color: "gray" }}
                >
                  Deliver Fee
                </Text>
                <Text style={{ fontSize: 18, fontWeight: "400" }}>
                  {deliveryFee} Lkr
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginVertical: 8,
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: "400", color: "gray" }}
                >
                  Total Fee
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "400",
                    color: "#088F8F",
                  }}
                >
                  {" "}
                  {parseFloat(order.total) + parseFloat(deliveryFee)}
                </Text>
              </View>

              <View
                style={{ flexDirection: "row", alignItems: "center" }}
              ></View>

              <View
                style={{
                  borderColor: "gray",
                  height: 1,
                  borderWidth: 0.5,
                  marginTop: 10,
                }}
              />

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginVertical: 10,
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                >
                  Pick up Date
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "400",
                    color: "#088F8F",
                  }}
                >
                  {order.pickup}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                >
                  Delivery Date
                </Text>

                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "400",
                    color: "#088F8F",
                  }}
                >
                  {order.delivery}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                >
                  Laundry Name
                </Text>

                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "400",
                    color: "#088F8F",
                  }}
                >
                  {order.laundry.name}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                >
                  Laundry Address
                </Text>

                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "400",
                    color: "#088F8F",
                  }}
                >
                  {order.laundry.address}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                >
                  Customer Name
                </Text>

                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "400",
                    color: "#088F8F",
                  }}
                >
                  {customer.name}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                >
                  Customer Address
                </Text>

                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "400",
                    color: "#088F8F",
                  }}
                >
                  {customer.address}
                </Text>
              </View>
              <View
                style={{
                  borderColor: "gray",
                  height: 1,
                  borderWidth: 0.5,
                  marginTop: 10,
                }}
              />

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginVertical: 8,
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>To Pay</Text>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  {parseFloat(order.total) + parseFloat(deliveryFee)}
                </Text>
              </View>
            </View>
          </View>
        </>
      </ScrollView>

      <Pressable
        style={{
          backgroundColor: "#031828",
          marginTop: "auto",
          padding: 10,
          marginBottom: 40,
          margin: 15,
          borderRadius: 7,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
            items |
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "400",
              color: "white",
              marginVertical: 6,
            }}
          >
            Extra charges might apply
          </Text>
        </View>

        <Pressable
          onPress={() => {
            addOrder();
            // navigation.navigate('Confirm')
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
            Place Order
          </Text>
        </Pressable>
      </Pressable>
    </>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({});
