//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { COLORS,SIZES } from './../../constants/theme';
import HeaderBar from './../../Components/HeaderBar/Header';
import { FontAwesome, Entypo } from 'react-native-vector-icons';
// create a component
const RatingPrice = ({ navigation }) => {
    const [data, setData] = useState([
        {
            id: '1',
            activity: 'Renting',
            rname: 'Private Pilot',
            rtype: 'Fly Multi Engine With Instructor',
            fprice: '$350.00	',
            bprice: '$250.00',
            gprice: '$0.00',
            status: 'Active'
        },
        {
            id: '2',
            activity: 'Training',
            rname: 'Instrument Rating',
            rtype: 'Fly Single Engine Solo',
            fprice: '$350.00	',
            bprice: '$0.00',
            gprice: '$0.00',
            status: 'Active'
        },
        {
            id: '3',
            activity: 'Checkout',
            rname: 'Private Pilot',
            rtype: 'Fly Single Engine Solo',
            fprice: '$400.00	',
            bprice: '$0.00',
            gprice: '$0.00',
            status: 'Active'
        },
        {
            id: '4',
            activity: 'Discovery',
            rname: 'Private Pilot',
            rtype: 'Fly Single Engine With Instructor',
            fprice: '$135.00	',
            bprice: '$50.00',
            gprice: '$0.00',
            status: 'Active'
        },
    ])
    return (
        <View style={styles.container}>
            <HeaderBar onPress={() => navigation.goBack()} />
            <View style={styles.SeB}>
                <TextInput
                    placeholder='Search Here'
                    placeholderTextColor={COLORS.white}
                    style={styles.teIn}
                />
            </View>
            <View style={styles.hBCon}>
                <Text style={styles.hText}>RATING PRICE</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity style={styles.btn}
                    onPress={()=>navigation.navigate('ratpadd')}
                    >
                        <Text style={{ color: COLORS.lightdark, fontWeight: 'bold', fontSize: 14 }}>ADD</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.sep} />
            <ScrollView style={{ backgroundColor: COLORS.darkgray, margin: 10, padding: 5 }}>
                <FlatList
                    data={data}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item, index }) => (
                        <View style={[styles.inBox,{marginBottom:(index === data.length -1)?15:0}]} key={index}>
                            <Text style={{
                                color: COLORS.white, fontWeight: 'bold',
                                fontSize: 15, paddingBottom: 1,textAlign:'center'
                            }}>ACTIVITY : {item.activity}</Text>
                            <View style={styles.sep}/>
                            <View style={styles.teCon}>
                    <Text style={styles.bText}>RATING NAME </Text>
                    <Text style={styles.sText}>{item.rname}</Text>
                    </View>
                    <View style={styles.teCon}>
                    <Text style={styles.bText}>RATING TYPE </Text>
                    <Text style={styles.sText}>{item.rtype}</Text>
                    </View>
                    <View style={[styles.teCon,{padding:5,marginHorizontal:10,backgroundColor:COLORS.lightgray}]}>
                        <View>
                        <Text style={styles.bText}>FLY PRICE </Text>
                    <Text style={styles.sText}>{item.fprice}</Text> 
                        </View>
                        <View>
                        <Text style={styles.bText}>BRIEFING PRICE </Text>
                    <Text style={styles.sText}>{item.bprice}</Text> 
                        </View>
                        <View>
                        <Text style={styles.bText}>GROUND PRICE </Text>
                    <Text style={styles.sText}>{item.gprice}</Text> 
                        </View>
                    </View>
                    <View style={styles.teCon}>
                    <Text style={styles.bText}>STATUS </Text>
                    <Text style={styles.sText}>{item.status}</Text>
                    </View>

                    <View style={{alignItems:'center',flexDirection:'row',justifyContent:'center',marginTop:5,backgroundColor:COLORS.darkgray,padding:4}}>
                    <TouchableOpacity
                                    onPress={()=>navigation.navigate('ratpaed',{item})}
                                    style={{marginHorizontal:10}}>
                                    <FontAwesome name='edit' color={COLORS.white} size={25} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{marginHorizontal:10}}>
                                                        <FontAwesome name='trash' color={COLORS.white} size={25} />
                                    </TouchableOpacity>
                    </View>
                        </View>
                    )} />
            </ScrollView>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: COLORS.lightdark,
    },
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: COLORS.lightdark,
    },
    sep: {
        height: 1,
        backgroundColor: COLORS.white,
        marginVertical: 4,
        marginHorizontal: 10
    },
    SeB: {
        position: 'absolute', top: 60, left: 60,
        borderWidth: 1, borderColor: COLORS.lightgray, width: '80%',
        height: 40, borderRadius: 15
    },
    hBCon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', paddingHorizontal: 15
    },
    hText: {
        color: COLORS.white,
        fontWeight: 'bold', fontSize: 16
    },
    btn: {
        height: 35, justifyContent: 'center', alignItems: 'center',
        borderRadius: 15, paddingHorizontal: 20, marginRight: 10,
        backgroundColor: COLORS.lightyellow
    },
    teIn: {
        flex: 1,
        paddingLeft: 15,
        color: COLORS.white
    },
    inBox: {
        width: SIZES.width * 0.9,
        backgroundColor: COLORS.lightdark,
        padding: 10, borderRadius: 16,
        margin: 4,
    },
    bText: {
        color: COLORS.white,
        fontWeight: 'bold', fontSize: 14
    },
    sText: {
        color: 'gray',
        fontWeight: '200', fontSize: 14
    },
    teCon:{
        flexDirection:'row',justifyContent:'space-between',
        alignItems:'center',paddingHorizontal:10,marginVertical:2
    }
});

//make this component available to the app
export default RatingPrice;
