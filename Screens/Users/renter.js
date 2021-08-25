//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { COLORS,SIZES,FONTS} from './../../constants/theme';
import Loader from '../Loader';
import { BASE_URL } from './../../base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderBar from '../../Components/HeaderBar/Header';
import { Ionicons, FontAwesome, MaterialIcons } from 'react-native-vector-icons';
import {  useSelector } from 'react-redux'
// create a component
const RenterUser = ({ navigation }) => {
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [ind, setInd] = useState('');
    const [action, setAction] = useState(false);
    const [fdata, setFdata] = useState('');
    const userRole = useSelector(state => state.role);

    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource and update FilteredDataSource
            const newData = fdata.filter(function (item) {
                // Applying filter for the inserted text in search bar
                let name = `${item.US_FIRST_NAME},${item.US_MIDDLE_NAME},${item.US_LAST_NAME},`
                const itemData = name
                    ? name.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setData(newData);
            setSearch(text);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setData(fdata);
            setSearch(text);
        }
    };

    const getData = async () => {
        try {
            await AsyncStorage.getItem('user_coid').then((value) =>
                getUserData(value)
            );
        } catch (e) {
            // error reading value
            console.error(e)
        }
    }

    const getUserData = (e) => {
        const myHeaders = new Headers();

        const formdata = new FormData();
        formdata.append("CO_ID", e);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(BASE_URL + "/apis/admin/get_users", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.response === true) {
                    setData(result.users_data);
                    setFdata(result.users_data);
                } else {
                    setData('');
                    setFdata('');
                }
            })
            .catch(error => console.log('error', error))
            .finally(() => setLoading(false))
            .finally(setLoading.bind(undefined, false));
    }

    useEffect(() => {

        getData();
    }, [])

    return (
        <View style={styles.container}>
            <Loader loading={loading} />
            <HeaderBar onPress={() => navigation.goBack()} />
            <View style={{
                position: 'absolute', top: 60, left: 60,
                borderWidth: 1, borderColor: COLORS.lightgray, width: '75%', height: 40, borderRadius: 15
            }}>
                <TextInput
                    placeholder='Search Here'
                    placeholderTextColor={COLORS.white}
                    onChangeText={(text) => searchFilterFunction(text)}
                    value={search}
                    style={{
                        flex: 1,
                        paddingLeft: 15,
                        color: COLORS.white
                    }}
                />
            </View>
           
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15 }}>
                <Text style={{ color: COLORS.white, fontWeight: 'bold', fontSize: 20 }}>Renter</Text>
                <TouchableOpacity style={{
                    height: 35, justifyContent: 'center', alignItems: 'center',
                    borderWidth: 1, borderColor: COLORS.lightgray, borderRadius: 15, paddingHorizontal: 20, marginRight: 18
                }}
                onPress={()=>navigation.navigate('adduser',{role:'5'})}>
                    <Text style={{ color: COLORS.white, fontWeight: 'bold', fontSize: 16 }}>ADD</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={{ flex: 1, backgroundColor: COLORS.darkgray, margin: 10, padding: 5 }}>
                {
                    data ? <View>
                        {
                            data.filter(e => e.US_RO_ID === '5').map((item, index) => (
                                <View style={{ flex: 1, backgroundColor: COLORS.lightdark, margin: 2, padding: 10, borderRadius: 15 }} key={index}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={{ color: COLORS.lightyellow, fontWeight: 'bold', fontSize: 16 }}>{item.US_FIRST_NAME}{' '}{item.US_MIDDLE_NAME}{' '}{item.US_LAST_NAME}</Text>
                                        <TouchableOpacity onPress={() => { setInd(index); setAction(!action) }}>
                                            <MaterialIcons name='view-list' color={COLORS.white} size={30} />
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 15 }}>
                                        <Text style={{ color: 'gray', fontWeight: '600', fontSize: 14, paddingVertical: 6 }}>
                                            <Ionicons name='mail' color='gray' size={16} />{' '}{item.US_EMAIL}</Text>
                                        <Text style={{ color: 'gray', fontWeight: '600', fontSize: 14, paddingVertical: 6 }}>
                                            <Ionicons name='ios-phone-portrait-sharp' color='gray' size={16} />
                                            {' '}{item.US_COUNTRY_CODE}{' '}{item.US_PHONE_NO}</Text>
                                    </View>
                                    <Text style={{ color: 'gray', fontWeight: '600', fontSize: 14, paddingVertical: 2 }}>
                                        <Ionicons name='person' color='gray' size={16} />{' '}{item.US_USER_NAME}</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 15 }}>
                                        <Text style={{ color: 'gray', fontWeight: '600', fontSize: 14, paddingVertical: 6 }}>
                                            <FontAwesome name='birthday-cake' color='gray' size={16} />{' '}{item.US_DATE_OF_BIRTH}</Text>
                                        <Text style={{ color: 'gray', fontWeight: '600', fontSize: 14, paddingVertical: 6 }}>
                                            {
                                                item.US_GENDER === 'Male' ? <Ionicons name='male' color='gray' size={16} /> :
                                                    <Ionicons name='female' color='gray' size={16} />
                                            }
                                            {' '}{item.US_GENDER}</Text>
                                    </View>
                                    {
                                        ind === index && action ?
                                            <View>
                                                <View style={styles.sep} />
                                                <View>
                                                    {
                                                        userRole==='2' ? <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
                                                    <TouchableOpacity 
                                                    onPress={()=>navigation.navigate('edituser',{role:'5',item})}>
                                                        <FontAwesome name='edit' color={COLORS.white} size={25} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity 
                                                    onPress={()=>navigation.navigate('udetail',{item})}>
                                                        <Ionicons name='apps-sharp' color={COLORS.white} size={25} />
                                                    </TouchableOpacity>
                                                    
                                                    <TouchableOpacity 
                                                    onPress={()=>navigation.navigate('addMoney')}>
                                                        <Ionicons name='cash-sharp' color={COLORS.white} size={25} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity 
                                                    onPress={()=>navigation.navigate('urating')}>
                                                        <Ionicons name='star-half-sharp' color={COLORS.white} size={25} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity >
                                                        <MaterialIcons name='delete' color={COLORS.dark} size={25} />
                                                    </TouchableOpacity>
                                                </View>:
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: 10,paddingHorizontal:30 }}>
                                                    <TouchableOpacity 
                                                    onPress={()=>navigation.navigate('edituser',{role:'5',item})}>
                                                        <FontAwesome name='edit' color={COLORS.white} size={25} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity 
                                                    onPress={()=>navigation.navigate('udetail',{item})}>
                                                        <Ionicons name='apps-sharp' color={COLORS.white} size={25} />
                                                    </TouchableOpacity>
                                                   
                                                    <TouchableOpacity >
                                                        <MaterialIcons name='delete' color={COLORS.dark} size={25} />
                                                    </TouchableOpacity>
                                                </View>
                                                    }
                                                </View>
                                               
                                            </View>
                                            : <View />
                                    }
                                </View>
                            ))
                        }
                        {
                            data.filter(e => e.US_RO_ID === '5').length < 1 ?
                                <Text style={{ color: COLORS.white ,textAlign:'center',fontSize:18,paddingVertical:15,fontWeight:'bold' }}>No Matching Data Found</Text> : null
                        }
                    </View> : <Text style={{color:COLORS.white}}>No Data Found</Text>
                }
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
        backgroundColor: COLORS.lightyellow,
        marginVertical: 4,
    }
});

//make this component available to the app
export default RenterUser;
