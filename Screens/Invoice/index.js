//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import HeaderBar from '../../Components/HeaderBar/Header';
import { COLORS, SIZES } from './../../constants/theme';
import { FontAwesome, Entypo } from 'react-native-vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {  useSelector } from 'react-redux';
// create a component
const InvoiceList = ({ navigation }) => {
    const [isFilter, setFilter] = useState(false);
    const [type, settype] = useState('Send');
    const userRole = useSelector(state => state.role);

    const [invo, setInvo] = useState([
        {
            id: '1',
            ino: '1008',
            name: 'Rajkumar',
            amount: '600.00',
            status: 'Paid',
            date: '2021-06-14',
            ddate: '2021-07-14',
            istat: ''
        },
        {
            id: '2',
            ino: '1016',
            name: 'Raghav',
            amount: '600.00',
            status: 'Due',
            date: '2021-07-20',
            ddate: '2021-08-19',
            istat: 'Sent'
        },
    ]);
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
                <Text style={styles.hText}>INVOICES LIST</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  {
                      userRole === '2'|| userRole==='3' ? <TouchableOpacity style={styles.btn}
                    onPress={()=>navigation.navigate('inCr')}
                    >
                        <Text style={{ color: COLORS.lightdark, fontWeight: 'bold', fontSize: 14 }}>ADD</Text>
                    </TouchableOpacity>:
                    <View/>
                  }  
                    <TouchableOpacity style={{ padding: 5 }}
                        onPress={() => { setFilter(!isFilter) }}
                    >
                        <FontAwesome name='sliders' color={COLORS.white} size={25} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.sep} />
            {
                isFilter ?
                    <View style={{
                        backgroundColor: COLORS.darkgray, margin: 5,
                        width: SIZES.width * 0.86, alignSelf: 'center', padding: 8,
                        borderRadius: 15
                    }}>
                        <TouchableOpacity style={{ alignSelf: 'flex-end', margin: 5, marginRight: 10 }}
                            onPress={() => setFilter(false)}>
                            <Entypo name='squared-cross' color={COLORS.white} size={25} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 5, paddingHorizontal: 10 }}>
                            <View>
                                <Text style={{ color: COLORS.white, fontWeight: 'bold', paddingLeft: 10, fontSize: 15, paddingBottom: 5 }}>From</Text>
                                <TouchableOpacity style={{
                                    height: 30, width: 100,
                                    borderWidth: 0.3, borderColor: COLORS.white, borderRadius: 8,
                                    justifyContent: 'center', alignItems: 'center'
                                }}
                                    onPress={showFDatepicker}>
                                    {
                                        fdDate ? <Text style={{ color: COLORS.white }}>{fdDate}</Text> :
                                            <Text style={{ color: COLORS.white }}>Date</Text>
                                    }

                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={{ color: COLORS.white, fontWeight: 'bold', paddingLeft: 10, fontSize: 15, paddingBottom: 5 }}>To</Text>
                                <TouchableOpacity style={{
                                    height: 30, width: 100,
                                    borderWidth: 0.3, borderColor: COLORS.white, borderRadius: 8,
                                    justifyContent: 'center', alignItems: 'center'
                                }}
                                    onPress={showTDatepicker}>
                                    {
                                        tdDate ? <Text style={{ color: COLORS.white }}>{tdDate}</Text> :
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
                    </View>
                    :
                    <View />
            }
            <ScrollView style={{ backgroundColor: COLORS.darkgray, margin: 10, padding: 5 }}>
                <FlatList
                    data={invo}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item, index }) => (
                        <View style={styles.inBox} key={index}>
                            <Text style={[styles.hText, { textAlign: 'center', fontSize: 14, color: COLORS.lightyellow }]}>INVOICE NUMBER : {item.ino}</Text>
                            <View style={styles.sep} />
                            <View style={styles.teCon}>
                                <Text style={styles.bText}>CUSTOMER </Text>
                                <Text style={styles.sText}>{item.name}</Text>
                            </View>
                            <View style={styles.teCon}>
                                <Text style={styles.bText}>TOTAL AMOUNT </Text>
                                <Text style={styles.sText}>{item.amount}</Text>
                            </View>
                            <View style={styles.teCon}>
                                <Text style={styles.bText}>STATUS </Text>
                                <Text style={styles.sText}>{item.status}</Text>
                            </View>
                            <View style={styles.teCon}>
                                <Text style={styles.bText}>Date </Text>
                                <Text style={styles.sText}>{item.date}</Text>
                            </View>
                            <View style={styles.teCon}>
                                <Text style={styles.bText}>Due Date </Text>
                                <Text style={styles.sText}>{item.ddate}</Text>
                            </View>
                            <View style={styles.sep} />
                            <View style={{
                                flexDirection: 'row', padding: 5,
                                marginHorizontal: 15,justifyContent:'space-around'
                            }}>
                                {
                                    item.status === 'Paid' ?
                                        <TouchableOpacity>
                                            <FontAwesome name='th-list' color={COLORS.white} size={25} />
                                        </TouchableOpacity> :
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                                            <TouchableOpacity>
                                                <FontAwesome name='th-list' color={COLORS.white} size={25} />
                                            </TouchableOpacity>
                                            {
                                                item.istat === 'Send' ?
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                                                    <TouchableOpacity style={{marginHorizontal:8}}>
                                                        <FontAwesome name='send' color='green' size={22} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{marginHorizontal:8}}>
                                                        <FontAwesome name='edit' color={COLORS.white} size={25} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{marginHorizontal:8}}>
                                                        <FontAwesome name='trash' color={COLORS.white} size={25} />
                                                    </TouchableOpacity>
                                                    </View> :
                                                    <TouchableOpacity style={{marginHorizontal:8}}
                                                    onPress={()=>navigation.navigate('inPay',{item})}>
                                                        <FontAwesome name='money' color='green' size={25} />
                                                    </TouchableOpacity>
                                            }
                                           
                                        </View>
                                }
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
        padding: 10, borderRadius: 16,
        margin: 4
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
    teCon: {
        flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center', paddingHorizontal: 10, marginVertical: 2
    }
});

//make this component available to the app
export default InvoiceList;
