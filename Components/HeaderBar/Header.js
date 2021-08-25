//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';

import {Ionicons} from 'react-native-vector-icons'
import { COLORS, SIZES } from './../../constants/theme';
import { FONTS } from './../../constants/theme';
// create a component
const HeaderBar = ({titleText,iconType,...rest}) => {
    return (
        <View style={styles.container}>
            <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}> 
            <TouchableOpacity style={[styles.icon, styles.shadow]}
                       {...rest}>
                        <View style={styles.iconView}>
                        <Ionicons name='arrow-back' color={COLORS.white} size={25}/>
                        </View>
                    </TouchableOpacity>
               
                <Text style={{...FONTS.h2,marginHorizontal:20,color:COLORS.lightyellow}}>{titleText}</Text>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        height:60,
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%',
        paddingHorizontal:10
    },
    buttonContainer:{
        width:SIZES.padding*1.6,
        height:SIZES.padding*1.3,
        borderRadius:SIZES.radius,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:COLORS.black,
        marginRight:10
    },
    icon: {
        width: 40, height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.darkgray,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.1,
        borderColor: COLORS.limegray,
        elevation: 5,
        shadowOffset: { width: -2, height: -2 },
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowColor: '#1d1d1d',
        marginLeft:5
    },
   
    iconView: {
        backgroundColor: COLORS.lightdark,
        width: 36, height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowColor: '#3f3f3f',
    },
    shadow: {
        shadowColor: COLORS.limegray,
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 5
    },
});

//make this component available to the app
export default HeaderBar;
