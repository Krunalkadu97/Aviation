//import liraries
import React, { useEffect,useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,TextInput,
ScrollView,KeyboardAvoidingView
 } from 'react-native';
import HeaderBar from '../../Components/HeaderBar/Header';
import { COLORS } from './../../constants/theme';

// create a component
const Iprice = ({navigation,route}) => {
    const [auser,setAuser] = useState('');
    const [sip,setSip] = useState('');
    const [mip,setMip] = useState('');
    const [cip,setCip] = useState('');
    const [bi,setBi] = useState('');
    const [gi,setGi] = useState('');

    useEffect(()=>{
     let {item} = route.params;

     setAuser(item);
     setSip(item.US_INSTRUCTOR_FLY_PRICE_SINGLE_ENGINE);
     setMip(item.US_INSTRUCTOR_FLY_PRICE_MULTI_ENGINE);
     setCip(item.US_INSTRUCTOR_FLY_PRICE_COMPLEX_ENGINE);
     setBi(item.US_INSTRUCTOR_BRIEFING_PRICE);
     setGi(item.US_INSTRUCTOR_GROUND_PRICE);
    },[]);
    return (
        <View style={styles.container}>
            <HeaderBar onPress={()=>navigation.goBack()}/>
            <View style={{ position: 'absolute', top: 60, left: 80, height: 40, justifyContent: 'center', alignItems: 'center' }}>
               {
                   auser ? <Text style={{
                    color: COLORS.white, fontSize: 16, fontWeight: 'bold',
                    textAlign: 'center', textTransform: 'uppercase'
                }}>Price of Instructor {auser.US_FIRST_NAME} </Text>:
                <Text style={{
                    color: COLORS.white, fontSize: 16, fontWeight: 'bold',
                    textAlign: 'center', textTransform: 'uppercase'
                }}>Price of Instructor </Text>
               } 
            </View>

            <ScrollView style={{ flex: 1 }}>
                <KeyboardAvoidingView enabled>
                    <Text style={[styles.Htext, { marginTop: 20 }]}>FLY PRICE PER HOUR FOR SINGLE ENGINE:</Text>
                    <View style={[styles.SectionStyle, { marginTop: 5 }]}>
                        <TextInput
                            style={[styles.inputStyle]}
                            onChangeText={(e) => setSip(e)}
                            value={sip}
                            keyboardType="numeric"
                            placeholder="FLY PRICE PER HOUR FOR SINGLE ENGINE"
                            placeholderTextColor="gray"
                            autoCapitalize="sentences"
                        />
                    </View>
                    <Text style={[styles.Htext, { marginTop: 20 }]}>FLY PRICE PER HOUR FOR MULTI ENGINE:</Text>
                    <View style={[styles.SectionStyle, { marginTop: 5 }]}>
                        <TextInput
                            style={[styles.inputStyle]}
                            onChangeText={(e) => setMip(e)}
                            value={mip}
                            keyboardType="numeric"
                            placeholder="FLY PRICE PER HOUR FOR MULTI ENGINE"
                            placeholderTextColor="gray"
                            autoCapitalize="sentences"
                        />
                    </View>
                    <Text style={[styles.Htext, { marginTop: 20 }]}>FLY PRICE PER HOUR FOR COMPLEX ENGINE:</Text>
                    <View style={[styles.SectionStyle, { marginTop: 5 }]}>
                        <TextInput
                            style={[styles.inputStyle]}
                            onChangeText={(e) => setCip(e)}
                            value={cip}
                            keyboardType='numeric'
                            placeholder="FLY PRICE PER HOUR FOR COMPLEX ENGINE"
                            placeholderTextColor="gray"
                            autoCapitalize="sentences"
                        />
                    </View>
                    <Text style={[styles.Htext, { marginTop: 20 }]}>BRIEFING PRICE PER HOUR:</Text>
                    <View style={[styles.SectionStyle, { marginTop: 5 }]}>
                        <TextInput
                            style={[styles.inputStyle]}
                            onChangeText={(e) => setBi(e)}
                            value={bi}
                            keyboardType='numeric'
                            placeholder="BRIEFING PRICE PER HOUR"
                            placeholderTextColor="gray"
                            autoCapitalize="sentences"
                        />
                    </View>
                    <Text style={[styles.Htext, { marginTop: 20 }]}>GROUND PRICE PER HOUR:</Text>
                    <View style={[styles.SectionStyle, { marginTop: 5 }]}>
                        <TextInput
                            style={[styles.inputStyle]}
                            onChangeText={(e) => setGi(e)}
                            value={gi}
                            keyboardType='numeric'
                            placeholder="GROUND PRICE PER HOUR"
                            placeholderTextColor="gray"
                            autoCapitalize="sentences"
                        />
                    </View>
                    <View style={[styles.SectionStyle, { justifyContent: 'space-around', alignItems: 'center' }]}>
                        <TouchableOpacity style={[styles.btnStyle, { height: 35, backgroundColor: COLORS.white, marginHorizontal: 30 }]}
                        onPress={()=>navigation.goBack()}>
                            <Text style={{ color: COLORS.lightdark, fontWeight: 'bold' }}> UPDATE</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
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
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 15,
        marginRight: 15,
        margin: 10,
    },
    inputStyle: {
        flex: 1,
        color: 'gray',
        paddingLeft: 15,
        paddingRight: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'gray',
        margin:10,
        height: 40,
    },
    Htext: {
        color: COLORS.white,
        fontWeight: 'bold', marginLeft: 30,
        fontSize: 13,
        marginTop: 6
    },
    radBtn: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
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
export default Iprice;
