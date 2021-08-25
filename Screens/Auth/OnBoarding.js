//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,ImageBackground,TouchableOpacity} from 'react-native';
import { COLORS, SIZES } from './../../constants/theme';
import { airplane } from './../../constants/images';

// create a component
const OnBoarding = ({navigation}) => {
    return (
        <ImageBackground 
        source={{uri:'https://i.pinimg.com/originals/f9/53/86/f95386f5d831b8ca9bf518032641212e.jpg'}}
        style={{flex:1,justifyContent:'center'}}>
        <View style={{flex:1,maxHeight:SIZES.height*0.3,padding:15,
        margin:20,backgroundColor:'rgba(255,255,255,0.09)',borderRadius:15,position:'absolute',bottom:0,left:0,width:'90%',height:SIZES.height*0.3}}>
    <Text style={{fontWeight:'bold',color:COLORS.lightyellow,fontSize:25,paddingLeft:15,
    textShadowColor:COLORS.dark,textShadowOffset:{width:0.5,height:1},textShadowRadius:3.56}}>Aviation</Text>
            <Text style={{fontWeight:'600',color:COLORS.limegray,fontSize:16,paddingLeft:15}}>Let's start your journey to sky</Text>
            <Text style={{fontWeight:'200',color:COLORS.limegray,fontSize:14,paddingLeft:15}}>Aviation is the activities surrounding mechanical flight and the aircraft industry.Aircraft includes fixed-wing and rotary-wing types, morphable wings.</Text>
            <TouchableOpacity style={{height:40,borderRadius:10,backgroundColor:COLORS.limegray,width:100,justifyContent:'center',alignItems:'center',position:'absolute',
            bottom:15,right:15,elevation:60}}
            onPress={()=>navigation.navigate('login')}>
                <Text style={{fontWeight:'bold',color:COLORS.lightdark,fontSize:16,
                textShadowColor:COLORS.white,textShadowOffset:{width:0.5,height:0.2},textShadowRadius:3.56}}>Next</Text>
            </TouchableOpacity>
        </View>
        </ImageBackground>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,        
        backgroundColor: COLORS.lightdark,
    },
});

//make this component available to the app
export default OnBoarding;
