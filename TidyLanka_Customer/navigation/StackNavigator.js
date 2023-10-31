import { StyleSheet, Text, View, Dimensions, LogBox, Platform } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import OrderScreen from '../screens/OrderScreen';
import PickupScreen from '../screens/PickupScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import ConfirmScreen from '../screens/ConfirmScreen';
import CurrentOrderScreen from '../screens/CurrentOrderScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import { themeColors } from '../theme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {HomeIcon as HomeOutline, ClockIcon as ClockOutline, UserIcon as UserOutline , QuestionMarkCircleIcon as QuestionMarlCircleOutline } from 'react-native-heroicons/outline';
import {HomeIcon as HomeSolid, ClockIcon as ClockSolid,  CheckCircleIcon as CheckCircleSolid, UserIcon as UserSolid , QuestionMarkCircleIcon as QuestionMarlCircleSolid} from 'react-native-heroicons/solid';
import CompletedOrderScreen from '../screens/CompletedOrderScreen';
import RejectedOrderScreen from '../screens/RejectedOrderScreen';


const Tab = createBottomTabNavigator();
const ios = Platform.OS == 'ios';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const StackNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
        contentStyle: {backgroundColor: 'white'}
      }}>
                <Stack.Screen name="Welcome" options={{headerShown: false}} component={WelcomeScreen} />
                <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
                <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}}/>
                <Stack.Screen name="Home" options={{headerShown: false}} component={HomeTabs} />
                <Stack.Screen name="Product" options={{headerShown: false}} component={ProductScreen} />
                <Stack.Screen name="Order" options={{headerShown: false}} component={OrderScreen} />
                <Stack.Screen name="Pickup" options={{headerShown: false}} component={PickupScreen} />
                <Stack.Screen name="Checkout" options={{headerShown: false}} component={CheckoutScreen} />
                <Stack.Screen name="Confirm" options={{headerShown: false}} component={ConfirmScreen} />
                <Stack.Screen name="CurrentOrder" options={{headerShown: false}} component={CurrentOrderScreen} />
                <Stack.Screen name="AcceptedOrder" options={{headerShown: false}} component={CompletedOrderScreen} />
                <Stack.Screen name="Profile" options={{headerShown: false}} component={ProfileScreen} />
                <Stack.Screen name="EditProfile" options={{headerShown: false}} component={EditProfileScreen} />
                <Stack.Screen name="RejectedOrder" options={{headerShown: false}} component={RejectedOrderScreen} />

        
                
            </Stack.Navigator>
        </NavigationContainer>
    )
}

function HomeTabs(){
    return (
      <Tab.Navigator screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => menuIcons(route, focused),
          tabBarStyle: {
            marginBottom: 20,
            height: 65,
            alignItems: 'center',
            
            borderRadius: 100,
            marginHorizontal: 20,
            backgroundColor: themeColors.bgLight,
  
          },
          tabBarItemStyle: {
            marginTop: ios? 30: 0,
            
          }
        })}
        
        >
        <Tab.Screen name="home" component={HomeScreen} />
        <Tab.Screen name="clock" component={CurrentOrderScreen} />
        <Tab.Screen name="accepted" component={CompletedOrderScreen} />
        <Tab.Screen name="rejected" component={RejectedOrderScreen} />
        <Tab.Screen name="user" component={ProfileScreen} />
      </Tab.Navigator> 
    )
  }
  
  const menuIcons = (route, focused)=> {
    let icon;
    
  
    if (route.name === 'home') {
      icon =  focused? <HomeSolid size="30" color={themeColors.bgLight} /> : <HomeOutline size="30" strokeWidth={2} color="white" />
    } else if (route.name === 'clock') {
      icon =  focused? <ClockSolid size="30" color={themeColors.bgLight} /> : <ClockOutline size="30" strokeWidth={2} color="white" />
    }else if(route.name==='user'){
      icon =  focused? <UserSolid size="30" color={themeColors.bgLight} /> : <UserOutline size="30" strokeWidth={2} color="white" />
    }else if(route.name==='accepted'){
      icon =  focused? <CheckCircleSolid size="30" color={themeColors.bgLight} /> : <CheckCircleSolid size="30" strokeWidth={2} color="white" />
    }else if(route.name==='rejected'){
      icon =  focused? <QuestionMarlCircleSolid size="30" color={themeColors.bgLight} /> : <QuestionMarlCircleSolid size="30" strokeWidth={2} color="white" />
    }
  
    
    let buttonClass = focused? "bg-white": "";
    return (
      <View className={"flex items-center rounded-full p-3 shadow " + buttonClass}>
        {icon}
      </View>
    )
  }

export default StackNavigator

const styles = StyleSheet.create({})