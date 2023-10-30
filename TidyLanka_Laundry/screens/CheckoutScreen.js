import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    Pressable,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";



const CheckoutScreen = () => {

  
   
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
                                    Item Total
                                </Text>
                                <Text style={{ fontSize: 18, fontWeight: "400" }}>
                                    Lkr
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
                                    Delivery Fee 
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 18,
                                        fontWeight: "400",
                                        color: "#088F8F",
                                    }}
                                >
                                </Text>
                            </View>

                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                
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
                                    marginVertical: 10,
                                }}
                            >
                                <Text
                                    style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                                >
                                    selected Date
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 18,
                                        fontWeight: "400",
                                        color: "#088F8F",
                                    }}
                                >
                                    
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
                                    No Of Days
                                </Text>

                                <Text
                                    style={{
                                        fontSize: 18,
                                        fontWeight: "400",
                                        color: "#088F8F",
                                    }}
                                >
                                    
                                </Text>
                            </View>

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
                                    selected Pick Up Time
                                </Text>

                                <Text
                                    style={{
                                        fontSize: 18,
                                        fontWeight: "400",
                                        color: "#088F8F",
                                    }}
                                >
                                    
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
                                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                                    To Pay
                                </Text>
                                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                                    
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

                    <Pressable onPress={()=> navigation.navigate('Confirm')}>
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