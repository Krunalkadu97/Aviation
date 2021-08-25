//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image,
TextInput } from 'react-native';
import { COLORS, SIZES } from './../../constants/theme';
import { Entypo, FontAwesome } from 'react-native-vector-icons'
import { useSelector } from 'react-redux';
import Loader from '../Loader';
import { TabRouter, useIsFocused } from '@react-navigation/native';
import { BASE_URL } from './../../base';
import DateTimePicker from '@react-native-community/datetimepicker';
// create a component
const Wallet = ({ navigation }) => {
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);
    const [btype, setBtype] = useState('');
    const userInfo = useSelector(state => state.users);
    const isFocused = useIsFocused();
    const [fdate, setFdate] = useState(new Date());
    const [tdate, setTdate] = useState(new Date());
    const [fshow, setFShow] = useState(false);
    const [tshow, setTShow] = useState(false);

    const fdDate = fdate.getFullYear() + "-" + (fdate.getMonth() + 1) + "-" + fdate.getDate();
    const tdDate = tdate.getFullYear() + "-" + (tdate.getMonth() + 1) + "-" + tdate.getDate();

    const onFChange = (event, selectedDate) => {
        const currentDate = selectedDate || fdate;
        setFdate(currentDate);
        setFShow(false);
    };

    const onTChange = (event, selectedDate) => {
        const currentDate = selectedDate || tdate;
        setTdate(currentDate);
        setTShow(false);
    };
    
    const showFMode = (currentMode) => {
        setFShow(true);
    };

    const showFDatepicker = () => {
        showFMode('date');
    };

    const showTMode = (currentMode) => {
        setTShow(true);
    };

    const showTDatepicker = () => {
        showTMode('date');
    };


    const getUser = () => {
        const myHeaders = new Headers();

        const formdata = new FormData();
        formdata.append("US_ID", userInfo);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(BASE_URL + "/apis/general/get_profile", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.response === true) {
                    setUser(result.user_data);
                } else {
                    setUser('');
                }
            })
            .catch(error => console.log('error', error))
            .finally(() => setLoading(false))
            .finally(setLoading.bind(undefined, false));
    }

    useEffect(() => {
        getUser();
    }, [isFocused, navigation]);
    return (
        <View style={styles.container}>
            <Loader loading={loading} />
            <View style={{ flexDirection: 'row', paddingLeft: 20, justifyContent: 'flex-start', alignItems: 'center' }}>
                <TouchableOpacity style={styles.icon}
                    onPress={() => { navigation.openDrawer(); }}>
                    <View style={styles.iconView}>
                        <Entypo name='menu' color={COLORS.lightyellow} size={30} />
                    </View>
                </TouchableOpacity>
                <Text style={styles.header}>Wallet</Text>
            </View>
            {
                user ? <View style={styles.hCon}>
                    <View style={styles.inCon}>
                        <TouchableOpacity style={styles.hBtn}
                            onPress={() => navigation.navigate('addMoney')}>
                            <Text style={{ color: COLORS.dark, fontWeight: 'bold' }}>
                                <FontAwesome name='plus' color={COLORS.dark} size={15} />{' '}ADD</Text>
                        </TouchableOpacity>
                        <View style={{
                            flexDirection: 'row', justifyContent: 'flex-start',
                            alignItems: 'center'
                        }}>
                            <Image
                                source={{ uri: user.US_PHOTO || 'https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-1.png' }}
                                style={{ width: 40, height: 40, borderRadius: 20, borderWidth: 0.4, borderColor: COLORS.limegray }}
                                resizeMode='cover'
                            />
                            <Text style={{ fontWeight: '800', fontSize: 18, paddingLeft: 20, color: COLORS.lightyellow }}>{user.US_FIRST_NAME}{' '}{user.US_MIDDLE_NAME}{' '}{user.US_LAST_NAME}</Text>
                        </View>
                        <View style={styles.sep} />
                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: COLORS.lightgray }}>Current Balance</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 22, color: COLORS.lightyellow, paddingLeft: 15, paddingTop: 8 }}>{'$ '}{user.US_WALLET}</Text>
                    </View>
                </View> :
                    <View style={styles.hCon}>
                        <View style={styles.inCon}>
                            <TouchableOpacity style={styles.hBtn}
                                onPress={() => navigation.navigate('addMoney')}>
                                <Text style={{ color: COLORS.dark, fontWeight: 'bold' }}>
                                    <FontAwesome name='plus' color={COLORS.dark} size={15} />{' '}ADD</Text>
                            </TouchableOpacity>
                            <View style={{
                                flexDirection: 'row', justifyContent: 'flex-start',
                                alignItems: 'center'
                            }}>
                                <Image
                                    source={{ uri: 'https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-1.png' }}
                                    style={{ width: 40, height: 40, borderRadius: 20, borderWidth: 0.4, borderColor: COLORS.limegray }}
                                    resizeMode='cover'
                                />
                                <Text style={{ fontWeight: '800', fontSize: 18, paddingLeft: 20, color: COLORS.lightyellow }}>Krunal Kadu</Text>
                            </View>
                            <View style={styles.sep} />
                            <Text style={{ fontWeight: 'bold', fontSize: 18, color: COLORS.lightgray }}>Current Balance</Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 22, color: COLORS.lightyellow, paddingLeft: 15, paddingTop: 8 }}>{'$ '}{' '}0</Text>
                        </View>
                    </View>
            }

            <View style={{ flex: 1, backgroundColor: COLORS.darkgray, padding: 10, margin: 10, borderTopLeftRadius: 25, borderTopRightRadius: 25 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 10 }}>
                    <Text style={{
                        fontWeight: 'bold', fontSize: 18, color: COLORS.white,
                        paddingLeft: 10, paddingTop: 1
                    }}>Latest Transactions</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity style={{ marginHorizontal: 6, padding: 5, borderRadius: 10, backgroundColor: 'rgba(0,0,0,0.84)' }}
                            onPress={() => { setBtype('Filter') }}>
                            <Entypo name='list' color={COLORS.white} size={25} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginHorizontal: 6, padding: 8, borderRadius: 10, backgroundColor: 'rgba(0,0,0,0.84)' }}
                            onPress={() => { setBtype('Search') }}>
                            <FontAwesome name='search' color={COLORS.white} size={20} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.sep} />
                <View>
                    {
                        btype === 'Filter' ?
                            <View style={{ backgroundColor: COLORS.lightdark, margin: 5, 
                            width: SIZES.width * 0.86, alignSelf: 'center',padding:8,
                            borderRadius:15}}>
                                <TouchableOpacity style={{ alignSelf: 'flex-end', margin: 5, marginRight: 10 }}
                                    onPress={() => setBtype('')}>
                                    <Entypo name='squared-cross' color={COLORS.white} size={25} />
                                </TouchableOpacity>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 5, paddingHorizontal: 10 }}>
                                    <View>
                                        <Text style={{ color: COLORS.white, fontWeight: 'bold', paddingLeft: 10, fontSize: 15,paddingBottom:5}}>From</Text>
                                        <TouchableOpacity style={{
                                            height: 30, width: 100,
                                            borderWidth: 0.3, borderColor: COLORS.white, borderRadius: 8,
                                            justifyContent: 'center', alignItems: 'center'
                                        }}
                                        onPress={showFDatepicker}>
                                        {
                                            fdDate ?<Text style={{ color: COLORS.white }}>{fdDate}</Text>:
                                            <Text style={{ color: COLORS.white }}>Date</Text>
                                        }
                                            
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <Text style={{ color: COLORS.white, fontWeight: 'bold', paddingLeft: 10, fontSize: 15,paddingBottom:5 }}>To</Text>
                                        <TouchableOpacity style={{
                                            height: 30, width: 100,
                                            borderWidth: 0.3, borderColor: COLORS.white, borderRadius: 8,
                                            justifyContent: 'center', alignItems: 'center'
                                        }}
                                        onPress={showTDatepicker}>
                                            {
                                            tdDate ?<Text style={{ color: COLORS.white }}>{tdDate}</Text>:
                                            <Text style={{ color: COLORS.white }}>Date</Text>
                                        }
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity style={{
                                        height: 30, paddingHorizontal: 10,
                                        borderRadius: 8, justifyContent: 'center', alignItems: 'center',
                                        backgroundColor: COLORS.lightyellow
                                    }}>
                                        <Text style={{ color: COLORS.lightdark, fontWeight: 'bold', textTransform: 'uppercase' }}>Filter</Text>
                                    </TouchableOpacity>
                                </View>
                                {fshow && (
                        <DateTimePicker
                            mode="date"
                            value={new Date()}
                            display="calendar"
                            onChange={onFChange}
                        />
                    )}
                    {tshow && (
                        <DateTimePicker
                            mode="date"
                            value={new Date()}
                            display="calendar"
                            onChange={onTChange}
                        />
                    )}
                            </View> :
                            <View>
                                {
                                    btype === 'Search' ?
                                        <View style={{ backgroundColor: COLORS.lightdark, margin: 5,
                                        padding:8,width: SIZES.width * 0.86, alignSelf: 'center',flexDirection:'row',
                                        borderRadius:6,alignItems:'center'}}>
                                        <View style={{flex:1,maxHeight:35}}>
                                            <TextInput
                                                style={{
                                                    height:34,
                                                    borderWidth:0.3,
                                                    borderColor:COLORS.white,
                                                    borderRadius:6
                                                }}
                                            />
                                        </View>
                                            <TouchableOpacity style={{ alignSelf: 'flex-end', margin: 5, marginRight: 10 }}
                                                onPress={() => setBtype('')}>
                                                <Entypo name='circle-with-cross' color={COLORS.white} size={30} />
                                            </TouchableOpacity>
                                        </View> : <View />
                                }
                            </View>

                    }
                </View>
                <View style={{ backgroundColor: COLORS.lightdark, flexDirection: 'row', borderRadius: 12, paddingHorizontal: 10, justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: 6, marginTop: 8 }}>
                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: COLORS.limegray, paddingTop: 1 }}>Recieved Cash Amount To Admin</Text>
                        <Text style={{ fontWeight: '600', fontSize: 13, color: COLORS.lightred, paddingTop: 1 }}>Date : 2021-08-05</Text>
                        <Text style={{ fontWeight: '600', fontSize: 13, color: COLORS.white, paddingTop: 1 }}>Mode : CASH</Text>
                    </View>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, color: COLORS.dark, paddingRight: 10, paddingTop: 1 }}>$ 150</Text>
                </View>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightdark,
        paddingTop: 50,
    },
    icon: {
        width: 42, height: 42,
        borderRadius: 22,
        backgroundColor: COLORS.lightyellow,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.1,
        borderColor: COLORS.limegray,
        elevation: 5,
        shadowOffset: { width: -6, height: -6 },
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowColor: '#1d1d1d',
    },
    iconView: {
        backgroundColor: COLORS.lightdark,
        width: 38, height: 38,
        borderRadius: 19,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowColor: '#3f3f3f',
    },
    header: {
        color: COLORS.lightyellow, fontWeight: 'bold',
        fontSize: 22, paddingLeft: 30,
        textTransform: 'uppercase',
        letterSpacing: 1
    },
    hCon: {
        margin: 10,
        padding: 2, backgroundColor: COLORS.lightgray,
        borderRadius: 20, width: SIZES.width * 0.94, elevation: 5,
        alignSelf: 'center'
    },
    inCon: {
        margin: 1,
        padding: 15, backgroundColor: COLORS.lightdark,
        borderRadius: 20, elevation: 30
    },
    hBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center', height: 35,
        width: 80, borderWidth: 0.5,
        borderColor: COLORS.dark,
        alignSelf: 'flex-end', borderRadius: 8
    },
    sep: {
        height: 1,
        backgroundColor: COLORS.lightyellow,
        marginVertical: 4
    }

});

//make this component available to the app
export default Wallet;
