import { View, Text, Image, Dimensions, Platform, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Carousell from "../components/Carousell";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';

function RevenueCard({ title, amount }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardAmount}>${amount}</Text>
    </View>
  );
}

function OrdersCard({ title, count }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardCount}>{count}</Text>
    </View>
  );
}

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState(1);
  const dailyRevenue = 1000; 
  const monthlyRevenue = 30000; 
  const dailyCompletedOrders = 15; 
  const dailyAcceptedOrders = 20; 

  const [rider, setRider] = useState({})

  useEffect(()=>{
    getRider()
  },[]) ;


  const getRider = async() =>{
    let id = await AsyncStorage.getItem('rider') ;
    await axios 
    .get(`http://${window.ip}:5000/rider/get/${id}`).then((res)=>{
    setRider(res.data) ;

    }).catch((err)=>{
      console.log(err)
    })
  }
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Tidy Lanka - Delivery Rider</Text>
      <StatusBar />

      <View style={{
              flexDirection: "row",
              gap: 5,
              backgroundColor: "#031828",
              paddingVertical: 20,
              paddingHorizontal: 120,
              marginTop: 20,
          }}>
              <View>
                  <Text style={{  marginLeft: -110, color: "white", fontSize: 20 }}>
                      Welcome Back, 
                  </Text>
                  <Text style={{ marginLeft: -110, color: "white", fontSize: 24 }}>
                      {rider.name}
                  </Text>
              </View>
          </View>

      <Image
        source={require('../assets/images/background1.jpg')}
        style={{ height: height * 0.98 }}
        className="w-full absolute -top-5 opacity-10" />
      <SafeAreaView className={ios ? '-mb-8' : ''}>

        <View>
          <Carousell />
        </View>

        <View style={styles.revenueContainer}>
          <RevenueCard title="Daily Revenue" amount={dailyRevenue} />
          <RevenueCard title="Monthly Revenue" amount={monthlyRevenue} />
        </View>

        <View style={styles.ordersContainer}>
          <OrdersCard title="Completed Orders" count={dailyCompletedOrders} />
          <OrdersCard title="Accepted Orders" count={dailyAcceptedOrders} />
        </View>

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
  headerText: {
    marginTop: 50,
    marginLeft: 30,
    fontSize: 22,
    fontWeight: "bold",
    color: "#041E42",
  },
  card: {
    flex: 1,
    padding: 15,
    margin: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    width: (width - 60) / 2, 
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#041E42',
  },
  cardCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#041E42',
  },
  revenueContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  ordersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
});

