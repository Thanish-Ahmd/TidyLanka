import { StyleSheet, Text, View, Dimensions, LogBox, Platform } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RegisterScreen2 from '../screens/RegisterScreen2';
import VehicleRegistrationScreen from '../screens/VehicleRegistrationScreen';
import DriversLicenseScreen from '../screens/DriversLicenseScreen';
import BackgroundCheckScreen from '../screens/BackgroundCheckScreen';
import RegistrationSuccessfulScreen from '../screens/RegistrationSuccessfulScreen';
import CompletedOrderScreen from '../screens/CompletedOrderScreen';
import CurrentOrderScreen from '../screens/CurrentOrderScreen';

import { themeColors } from '../theme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {HomeIcon as HomeOutline,  ClockIcon as ClockOutline, CheckCircleIcon as CheckCircleOutline, UserIcon as UserOutline, QueueListIcon as QueueListOutline } from 'react-native-heroicons/outline';
import {HomeIcon as HomeSolid,  ClockIcon as ClockSolid,CheckCircleIcon as CheckCircleSolid, UserIcon as UserSolid , QueueListIcon as QueueListSolid} from 'react-native-heroicons/solid';
import PendingOrdersScreen from '../screens/PendingOrdersScreen';
import EditProfileScreen from '../screens/EditProfileScreen';



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
                <Stack.Screen name="Profile" options={{headerShown: false}} component={ProfileScreen} />
                <Stack.Screen name="Register2" options={{headerShown: false}} component={RegisterScreen2} />
                <Stack.Screen name="BackgroundCheck" options={{headerShown: false}} component={BackgroundCheckScreen} />
                <Stack.Screen name="DriversLicense" options={{headerShown: false}} component={DriversLicenseScreen} />
                <Stack.Screen name="VehicleRegistration" options={{headerShown: false}} component={VehicleRegistrationScreen} />
                <Stack.Screen name="RegistrationSuccessful" options={{headerShown: false}} component={RegistrationSuccessfulScreen} />
                <Stack.Screen name="CompletedOrder" options={{headerShown: false}} component={CompletedOrderScreen} />
                <Stack.Screen name="CurrentOrder" options={{headerShown: false}} component={CurrentOrderScreen} />
                <Stack.Screen name="PendingOrders" options={{headerShown: false}} component={PendingOrdersScreen} />
                <Stack.Screen name="EditProfile" options={{headerShown: false}} component={EditProfileScreen} />
                

        
                
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
        <Tab.Screen name="pending" component={PendingOrdersScreen} />
        <Tab.Screen name="clock" component={CurrentOrderScreen} />
        <Tab.Screen name="checkCircle" component={CompletedOrderScreen} />
       
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
    } else if (route.name === 'checkCircle') {
      icon =  focused? <CheckCircleSolid size="30" color={themeColors.bgLight} /> : <CheckCircleOutline size="30" strokeWidth={2} color="white" />
    }else if(route.name ==='pending'){
      icon =  focused? <QueueListSolid size="30" color={themeColors.bgLight} /> : <QueueListOutline size="30" strokeWidth={2} color="white" />
    }else if(route.name==='user'){
      icon =  focused? <UserSolid size="30" color={themeColors.bgLight} /> : <UserOutline size="30" strokeWidth={2} color="white" />
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