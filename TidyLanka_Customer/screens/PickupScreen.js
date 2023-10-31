import React, { useState } from 'react';
import {
  View,
    Text,
    SafeAreaView,
    TextInput,
    Pressable,
    ScrollView,
    TouchableOpacity,
    Image,
    StatusBar,
    styles
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeftCircleIcon } from 'react-native-heroicons/outline';
import HorizontalDatepicker from '@awrminkhodaei/react-native-horizontal-datepicker';

const PickupScreen = (props) => {
  let total = props.route.params.total ;
  let item = props.route.params.item ;
  let laundry = props.route.params.laundry
  let weight = props.route.params.weight ;
  console.log(laundry) ;
  const currentDate = new Date() ;
  
  const nextMonth = new Date(currentDate);
  nextMonth.setMonth(currentDate.getMonth() + 1);

  const nextDay= new Date(currentDate) ;
  nextDay.setDate(nextDay.getDate()+2) ;



  console.log(total) ;

  const [pickupDate ,setPickupDate] = useState(new Date()) ;
  const [pickupDate2 ,setPickupDate2] = useState(new Date()) ;


  const [deliveryDate , setDeliveryDate] = useState(nextDay) ;

    const navigation = useNavigation();

    const deliveryTime = [
      {
        id: "0",
        name: "2-3 Days",
      },
      {
        id: "1",
        name: "3-4 Days",
      },
      {
        id: "2",
        name: "4-5 Days",
      },
      {
        id: "3",
        name: "5-6 Days",
      },
      {
        id: "4",
        name: "Tommorrow",
      },
      {
        id: "5",
        name: "Today",
      },
    ];
  
    const times = [
      {
        id: "0",
        time: "11:00 PM",
      },
      {
        id: "1",
        time: "12:00 PM",
      },
      {
        id: "2",
        time: "1:00 PM",
      },
      {
        id: "2",
        time: "2:00 PM",
      },
      {
        id: "4",
        time: "3:00 PM",
      },
      {
        id: "5",
        time: "4:00 PM",
      },
    ];

    return (
        <SafeAreaView className="flex-1">
            <StatusBar translucent backgroundColor="transparent" />
            <View className="relative h-1/6">
                <Image
                    source={require('../assets/images/background5.jpg')}
                    className="absolute inset-0 w-full h-full"
                    style={{borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}
                    resizeMode="cover"
                />
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="absolute top-3 left-1">
                    <ArrowLeftCircleIcon size={50} color="white" />
                </TouchableOpacity>
                <Text style={{marginLeft: 110, marginTop: 20}}className="absolute  left-4 text-4xl text-white font-bold">
                    Checkout
                </Text>
            </View>

            <ScrollView className="mt-5 px-4">
            <View style={{ marginTop: 30, padding: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "500", marginLeft:10 }}>Your Total</Text>
          <TextInput
            style={{
              marginTop:10,
              padding: 30,
              backgroundColor: "#ececec",
  
              
              marginBottom: 10,
            }}
            value={total.toString()}
            placeholder="eg: 2.5"
          />

          

          <Text
            style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}
          >
            Pick Up Date
          </Text>
          <HorizontalDatepicker
            mode="gregorian"
            startDate={currentDate}
            endDate={nextMonth}
            initialSelectedDate={currentDate}
            selectedItemWidth={170}
            unselectedItemWidth={38}
            itemHeight={38}
            itemRadius={10}
            onSelectedDateChange={(value)=>{
              setPickupDate(value) ;
              setPickupDate2(value) ;
            }}
            selectedItemBackgroundColor="#222831"
            unselectedItemBackgroundColor="#ececec"
        
          />
           <Text
            style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 , marginTop :30 }}
          >
            Delivery Date
          </Text>

<HorizontalDatepicker
            mode="gregorian"
            startDate={pickupDate2.setDate(pickupDate2.getDate())}
            endDate={nextMonth}
            selectedItemWidth={170}
            unselectedItemWidth={38}
            initialSelectedDate={nextDay}
            itemHeight={38}
            itemRadius={10}
            onSelectedDateChange={(value)=>{
              setDeliveryDate(value)
            }}
            selectedItemBackgroundColor="#222831"
            unselectedItemBackgroundColor="#ececec"
           
          />

          {/* <Text
            style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}
          >
            Select Time
          </Text> */}

          {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {times.map((item, index) => (
              <Pressable
                style={{
                  margin: 10,
                  borderRadius: 7,
                  padding: 15,
                  borderColor: "gray",
                  borderWidth: 0.7,
                }}
              >
                <Text>{item.time}</Text>
              </Pressable>
            ))}
          </ScrollView>
          <Text
            style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}
          >
            Delivery Date
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {deliveryTime.map((item, i) => (
              <Pressable
                style={{
                  margin: 10,
                  borderRadius: 7,
                  padding: 15,
                  borderColor: "gray",
                  borderWidth: 0.7,
                }}
              >
                <Text>{item.name}</Text>
              </Pressable>
            ))}
          </ScrollView> */}
        </View>
            </ScrollView>
            {/* navigation.navigate('Checkout') */}
            <TouchableOpacity
                onPress={() =>{
                 
                  const order = {
                    laundry : item.laundry ,
                    name : item.name ,
                    price : item.price ,
                    total : total ,
                    pickup : pickupDate.toDateString() ,
                    delivery : deliveryDate.toDateString(),
                    weight : weight,
                    laundryName : laundry.name,
                    address : laundry.address ,
                    longitude : laundry.longitude ,
                    latitude  :laundry.latitude ,
                  }
                  console.log(order) ;
                  navigation.navigate('Checkout', {order})
                } }
                style={{backgroundColor: "#031828", borderRadius: 20}}
                className="  my-8 py-4 mx-7 rounded-xl">
                <Text className="text-xl text-white font-bold text-center">
                    Proceed to PickUp
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default PickupScreen;
