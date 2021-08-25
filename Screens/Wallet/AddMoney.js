//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TextInput,TouchableOpacity} from 'react-native';
import { COLORS, SIZES } from './../../constants/theme';
import HeaderBar from '../../Components/HeaderBar/Header';
// create a component
const AddMoney = ({navigation}) => {
    return (
        <View style={styles.container}>
           <HeaderBar onPress={()=>navigation.goBack()}/>
           <View style={{ position: 'absolute', top: 60, left: 80, height: 40, justifyContent: 'center', alignItems: 'center' }}>               
                <Text style={styles.hTe}>ADD MONEY </Text>
            </View>
            <View style={{flex:1,paddingTop:SIZES.height*0.2}}>
            <Text style={[styles.Htext, {fontSize:16 }]}>ENTER AMOUNT</Text>
            <View style={[styles.SectionStyle]}>
                        <TextInput
                            style={[styles.inputStyle, { marginRight: 5 }]}
                            placeholder="Enter Amount"
                            placeholderTextColor="gray"
                            autoCapitalize="sentences"
                            keyboardType='numeric'
                        />
            </View>
            <View style={[styles.SectionStyle, { justifyContent: 'space-around', alignItems: 'center' }]}>
                        <TouchableOpacity style={[styles.btnStyle, { height: 35, backgroundColor: COLORS.white, marginHorizontal: 30 }]}
                        onPress={()=>navigation.goBack()}>
                            <Text style={{ color: COLORS.lightdark, fontWeight: 'bold' }}> ADD</Text>
                        </TouchableOpacity>
                    </View>
            </View>
           
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:50,
        backgroundColor: COLORS.lightdark,
    },
    hTe:{
        color: COLORS.white, fontSize: 16, fontWeight: 'bold',
        textAlign: 'center', textTransform: 'uppercase'
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginHorizontal:30,
        margin: 10,
    },
    inputStyle: {
        flex: 1,
        color: 'gray',
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'gray',
    },
    Htext: {
        color: COLORS.white,
        fontWeight: 'bold', marginLeft: 35,
        fontSize: 13,
        marginTop: 6
    },
    btnStyle: {
        flex: 1,
        backgroundColor: COLORS.lightyellow,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 10,
        justifyContent: 'center', alignItems: 'center',
        marginHorizontal: 10
    },
});

//make this component available to the app
export default AddMoney;
