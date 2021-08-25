//import liraries
import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import HeaderBar from '../../Components/HeaderBar/Header';
import { COLORS } from './../../constants/theme';
import { Ionicons } from 'react-native-vector-icons'
// create a component
const InvoicePay = ({navigation,route}) => {
    const [data,setData] = useState('');
    const [mode, setMode] = useState('Cash');
    useEffect(()=>{
        let {item} = route.params;

        setData(item);
    },[])
    return (
        <View style={styles.container}>
            <HeaderBar onPress={()=>navigation.goBack()}/>
            <View style={{ position: 'absolute', top: 60, left: 80, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{
                    color: COLORS.white, fontSize: 16, fontWeight: 'bold',
                    textAlign: 'center', textTransform: 'uppercase'
                }}>PAYMENT</Text>
            </View>
            <View style={{flex:1,padding:10}}>
            <View style={[styles.teCon,{marginTop:20,paddingHorizontal:25,backgroundColor:COLORS.lightgray,
            padding:5,marginHorizontal:35}]}>
                                <Text style={styles.bText}>Invoice # </Text>
                                <Text style={styles.sText}>{data.ino}</Text>
            </View>
            <View style={[styles.teCon,{marginTop:6,paddingHorizontal:25,backgroundColor:COLORS.lightgray,
            padding:5,marginHorizontal:35}]}>
                                <Text style={styles.bText}>Invoice Date: </Text>
                                <Text style={styles.sText}>{data.date}</Text>
            </View>

            <Text style={styles.hText}>NAME</Text>
            <View style={[styles.inputStyle]}>
            <Text style={{ color: 'gray',textAlign: 'center',fontSize:15}}>{data.name}</Text>
            </View>
            <Text style={styles.hText}>DUE AMOUNT</Text>
            <View style={[styles.inputStyle]}>
            <Text style={{ color: 'gray',textAlign: 'center',fontSize:15}}>{data.amount}</Text>
            </View>
            <Text style={styles.hText}>PAYMENT MODE</Text>
            <View style={[styles.SectionStyle, { justifyContent: 'space-around', marginRight: 45, marginTop: 1 }]}>
                        <TouchableOpacity style={styles.radBtn}
                            onPress={() => { setMode('Cash') }}>
                            {
                                mode === 'Cash' ? <Ionicons name='radio-button-on' color={COLORS.lightyellow} size={16} /> :
                                    <Ionicons name='radio-button-off' color='gray' size={16} />
                            }
                            <Text style={{ color: mode === 'Cash' ? COLORS.white : 'gray', marginLeft: 10, fontWeight: mode === 'Cash' ? 'bold' : '500', fontSize: mode === 'Cash' ? 16 : 14 }}>Cash</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.radBtn}
                            onPress={() => { setMode('Wallet') }}>
                            {
                                mode === 'Wallet' ? <Ionicons name='radio-button-on' color={COLORS.lightyellow} size={16} /> :
                                    <Ionicons name='radio-button-off' color='gray' size={16} />
                            }
                            <Text style={{ color: mode === 'Wallet' ? COLORS.white : 'gray', marginLeft: 10, fontWeight: mode === 'Wallet' ? 'bold' : '500', fontSize: mode === 'Wallet' ? 16 : 14 }}>Wallet</Text>
                        </TouchableOpacity>
                        
                    </View>

            <View style={[styles.SectionStyle, { justifyContent: 'space-around', alignItems: 'center' }]}>
                        <TouchableOpacity style={[styles.btnStyle, { height: 35, backgroundColor: COLORS.white }]}
                        onPress={()=>navigation.goBack()}>
                            <Text style={{ color: COLORS.dark, fontWeight: 'bold' }}> ADD</Text>
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
        backgroundColor:COLORS.lightdark,
    },
    hText: { color: COLORS.white, fontWeight: 'bold', marginLeft: 16, fontSize: 16 ,marginTop:15},
    bText: {
        color: COLORS.white,
        fontWeight: 'bold', fontSize: 16
    },
    sText: {
        color: 'gray',
        fontWeight: '200', fontSize: 14
    },
    teCon: {
        flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center', paddingHorizontal: 20, marginVertical: 2,
        marginHorizontal:10
    },
    inputStyle: {
        flex: 1,
        color: 'gray',
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'gray',
        maxHeight:40,
        alignItems:'center',
        justifyContent:'center',
        marginHorizontal:10,
        marginTop:10
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 15,
        marginRight: 15,
        margin: 10,
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
export default InvoicePay;
