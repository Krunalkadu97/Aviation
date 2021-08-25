//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import HeaderBar from '../../Components/HeaderBar/Header';
import { COLORS } from './../../constants/theme';
import {MaterialCommunityIcons} from 'react-native-vector-icons'
// create a component
const UserRating = ({navigation}) => {
    const [privates,setPrivate] =useState(0);
    const [instrument,setInstrument] =useState(0);
    const [commercial,setCommercial] =useState(0);
    const [cfi,setCfi] =useState(0);
    const [cfii,setCfii] =useState(0);
    const lo =`${privates},${instrument},${commercial},${cfi},${cfii}`

    console.log(lo)
    return (
        <View style={styles.container}>
            <HeaderBar onPress={()=>navigation.goBack()}/>
            <View style={{ position: 'absolute', top: 60, left: 80, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{
                    color: COLORS.white, fontSize: 18, fontWeight: 'bold',
                    textAlign: 'center', textTransform: 'uppercase'
                }}>USER RATING FORM </Text>
            </View>
            <Text style={styles.Htext}>RATING</Text>
            <View style={{flex:1,padding:15,paddingLeft:25}}>
            <TouchableOpacity onPress={()=>{setPrivate(!privates)}}
            style={styles.fDs}>
            {
                privates ? <MaterialCommunityIcons name='checkbox-marked' size={25} color={COLORS.white}/>:
                <MaterialCommunityIcons name='checkbox-blank-outline' size={25} color={COLORS.white}/>
            }
                
                <Text style={styles.tBs}>Private Pilot</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{setInstrument(!instrument)}}
            style={styles.fDs}>
            {
                instrument ? <MaterialCommunityIcons name='checkbox-marked' size={25} color={COLORS.white}/>:
                <MaterialCommunityIcons name='checkbox-blank-outline' size={25} color={COLORS.white}/>
            }
                
                <Text style={styles.tBs}>Instrument Rating</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{setCommercial(!commercial)}}
            style={styles.fDs}>
            {
                commercial ? <MaterialCommunityIcons name='checkbox-marked' size={25} color={COLORS.white}/>:
                <MaterialCommunityIcons name='checkbox-blank-outline' size={25} color={COLORS.white}/>
            }
                
                <Text style={styles.tBs}>Commercial Pilot</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{setCfi(!cfi)}}
            style={styles.fDs}>
            {
                cfi ? <MaterialCommunityIcons name='checkbox-marked' size={25} color={COLORS.white}/>:
                <MaterialCommunityIcons name='checkbox-blank-outline' size={25} color={COLORS.white}/>
            }
                
                <Text style={styles.tBs}>CFI</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{setCfii(!cfii)}}
            style={styles.fDs}>
            {
                cfii ? <MaterialCommunityIcons name='checkbox-marked' size={25} color={COLORS.white}/>:
                <MaterialCommunityIcons name='checkbox-blank-outline' size={25} color={COLORS.white}/>
            }
                
                <Text style={styles.tBs}>CFII</Text>
            </TouchableOpacity>

            <View style={[styles.SectionStyle, { justifyContent: 'space-around', alignItems: 'center',marginTop:35 }]}>
                        <TouchableOpacity style={[styles.btnStyle, { height: 35, backgroundColor: COLORS.white, marginHorizontal: 30 }]}
                        onPress={()=>{}}>
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
    Htext: {
        color: COLORS.white,
        fontWeight: 'bold', marginLeft: 25,
        fontSize: 15,
        marginTop: 20
    },
    fDs:{
        flexDirection:'row',
        alignItems:'center',
        marginLeft:10,
        margin:10
    },
    tBs:{
        color:COLORS.lightyellow,
        marginLeft:15,
        fontSize:15
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 15,
        marginRight: 15,
        margin: 10,
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
export default UserRating;
