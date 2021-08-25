//import liraries
import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView,FlatList } from 'react-native';
import HeaderBar from '../../Components/HeaderBar/Header';
import { COLORS,SIZES } from './../../constants/theme';
import { FontAwesome,Entypo } from 'react-native-vector-icons';

// create a component
const Maintenance = ({navigation}) => {
    const [data,setData]=useState([
        {
            id:'1',
            type:'VOR',
            air:'SURYAAN,007,SK-007',
            status:'Maintenance',
            mdate:'2021-08-23 09:37:17 '
        },
        {
            id:'2',
            type:'ETL',
            air:'SURYAAN,007,SK-019',
            status:'Maintenance',
            mdate:'2021-08-26 10:37:17 '
        },
    ])
    return (
        <View style={styles.container}>
            <HeaderBar onPress={()=>navigation.goBack()}/>
            <View style={styles.SeB}>
                <TextInput
                    placeholder='Search Here'
                    placeholderTextColor={COLORS.white}
                    style={styles.teIn}
                />
            </View>
            <View style={styles.hBCon}>
                <Text style={styles.hText}>MAINTENANCE LIST</Text>
                <TouchableOpacity style={styles.btn}
                onPress={()=>navigation.navigate('amaint')}
                >
                    <Text style={{ color: COLORS.lightdark, fontWeight: 'bold', fontSize: 14 }}>ADD</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.sep} />
            <ScrollView style={{ backgroundColor: COLORS.darkgray, margin: 10, padding: 5 }}>
            <FlatList
                data={data}
                keyExtractor={item=>`${item.id}`}
                renderItem={({item,index})=>(
<View style={styles.inBox} key={index}>
                <View style={[styles.hBCon,{justifyContent:'space-around',backgroundColor:COLORS.lightgray,
                marginHorizontal:15,padding:6,marginVertical:4}]}>
                        <Text style={[styles.hText, { fontSize: 15 }]}>STATUS</Text>
                        <Text style={[styles.hText, { fontSize: 15,fontWeight:'bold',color:'gray' }]}>{item.status}</Text>
                    </View>
                    <View style={styles.teCon}>
                    <Text style={styles.bText}>MAINTENANCE TYPE </Text>
                    <Text style={styles.sText}>{item.type}</Text>
                    </View>
                    <View style={styles.teCon}>
                    <Text style={styles.bText}>AIRCRAFT </Text>
                    <Text style={styles.sText}>{item.air} </Text>
                    </View>
                    <View style={styles.teCon}>
                    <Text style={styles.bText}>MAINTENANCE DATE </Text>
                    <Text style={styles.sText}>{item.mdate}</Text>
                    </View>
                    <View style={styles.sep} />
                    <View style={[styles.hBCon,{justifyContent:'center',
                marginHorizontal:15,padding:6,marginVertical:4}]}>
                        <TouchableOpacity style={{marginHorizontal:10}}
                        onPress={()=>navigation.navigate('edmaint',{item})}>
                            <FontAwesome name='edit' size={25} color={COLORS.white}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginHorizontal:10}}>
                        <Entypo name='trash' color={COLORS.white} size={20} />
                        </TouchableOpacity>
                    </View>
                </View>
                )}
            />
                
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
    sep: {
        height: 1,
        backgroundColor: COLORS.white,
        marginVertical: 4,
        marginHorizontal: 10
    }, SeB: {
        position: 'absolute', top: 60, left: 60,
        borderWidth: 1, borderColor: COLORS.lightgray, width: '80%',
        height: 40, borderRadius: 15
    },
    teIn: {
        flex: 1,
        paddingLeft: 15,
        color: COLORS.white
    },
    btn: {
        height: 35, justifyContent: 'center', alignItems: 'center',
        borderRadius: 15, paddingHorizontal: 20, marginRight: 18,
        backgroundColor: COLORS.lightyellow
    },
    inBox: {
        width: SIZES.width * 0.92,
        backgroundColor: COLORS.lightdark,
        padding: 10,borderRadius:16,
        marginTop:3
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
export default Maintenance;
