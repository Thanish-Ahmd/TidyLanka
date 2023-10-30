import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";

const Carousell = () => {
    const images = [ 
        require('../assets/images/carousell1.png'),
        require('../assets/images/carousell2.png'),
        require('../assets/images/carousell3.png'),
    ];

    return (
        <View >
            <SliderBox 
            
             
                sliderBoxHeight={150}
                images={images}
                autoPlay
                autoplayInterval={3000}
                circleLoop
                dotColor="#13274F"
                inactiveDotColor="#90A4AE"
                ImageComponentStyle={{
                    borderRadius: 6,
                    width: "94%"
                }}
            />
        </View>
    );
};

export default Carousell;

const styles = StyleSheet.create({});