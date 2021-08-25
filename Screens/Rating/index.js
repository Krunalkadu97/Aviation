//import liraries
import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { COLORS,SIZES } from './../../constants/theme';
import HeaderBar from './../../Components/HeaderBar/Header';
import { FontAwesome, Entypo } from 'react-native-vector-icons';
// create a component
const Rating = ({navigation}) => {
    const [data,setData] = useState([
        {
            id:'1',
            name:'Private Pilot',
            status:'Active'
        },
        {
            id:'2',
            name:'Instrument Rating',
            status:'Active'
        },
        {
            id:'3',
            name:'Commercial Pilot',
            status:'Active'
        },
        {
            id:'4',
            name:'CFI',
            status:'Active'
        },
        {
            id:'5',
            name:'CFII',
            status:'Active'
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
                <Text style={styles.hText}>RATING</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity style={styles.btn}
                    onPress={()=>navigation.navigate('ratadd')}
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
                        <View style={styles.inBox} key={index}>
                            <View style={{flex:1,padding:5}}>
                                <Text style={{color:COLORS.white,fontWeight:'bold',
                                fontSize:16,paddingBottom:5}}>{item.name}</Text>
                                 <Text style={{color:COLORS.white,fontWeight:'200',
                                fontSize:16}}>STATUS : {item.status}</Text>
                            </View>
                            <View style={{width:60,alignItems:'center'}}>
                                    <TouchableOpacity
                                    onPress={()=>navigation.navigate('rated',{item})}>
                                    <FontAwesome name='edit' color={COLORS.white} size={25} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{marginTop:6}}>
                                                        <FontAwesome name='trash' color={COLORS.white} size={25} />
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
       paddingTop:50,
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
        height: 40, borderRadius: 8
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
        margin: 4,flexDirection:'row'
    },
});

//make this component available to the app
export default Rating;
