//import liraries
import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Modal,ScrollView,KeyboardAvoidingView } from 'react-native';
import HeaderBar from '../../Components/HeaderBar/Header';
import { COLORS, SIZES } from './../../constants/theme';

// create a component
const InvoiceCreate = ({navigation}) => {
    const [user, setUser] = useState([
        {
            id: '1',
            name: 'Krunal',
            status: 'Active'
        },
        {
            id: '2',
            name: 'SK',
            status: 'Active'
        },
       
    ]);
    const [selectedUser, setSelectedUser] = useState('Select User');
    const [isUserVisible, setisUserVisible] = useState(false);

    const changeUserVisibility = (bool) => {
        setisUserVisible(bool)
    }
    const setUs = (option) => {
        setSelectedUser(option)
    }
    return (
        <View style={styles.container}>
            <HeaderBar onPress={()=>navigation.goBack()}/>
            <View style={{ position: 'absolute', top: 60, left: 80, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{
                    color: COLORS.white, fontSize: 16, fontWeight: 'bold',
                    textAlign: 'center', textTransform: 'uppercase'
                }}>GENERATE FORM</Text>
            </View>
            <ScrollView style={{flex:1}}>
                <KeyboardAvoidingView enabled>
                <Text style={[styles.Htext, { marginTop: 20 }]}>USER*</Text>
                    <View style={[styles.SectionStyle, { marginTop: 10 }]}>
                        <TouchableOpacity
                            style={[styles.inputStyle, { justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }]}
                            onPress={() => changeUserVisibility(true)}>
                            <Text style={{ color: 'gray' }}>{selectedUser}</Text>
                        </TouchableOpacity>
                        <Modal
                            transparent={true}
                            animationType='fade'
                            visible={isUserVisible}
                            nRequestClose={() => changeUserVisibility(false)}>
                            <TouchableOpacity
                                onPress={() => changeUserVisibility(false)}
                                style={styles.mCon}>
                                {
                                    user ? 
                                    <ScrollView style={[styles.modal, { width: '90%', height: '25%', marginHorizontal: 25,maxHeight:'30%' }]}>
                                    {
                                        user.map((item, index) => (
                                            <TouchableOpacity
                                                style={styles.option}
                                                key={index}
                                                onPress={() => {
                                                    changeUserVisibility(false);
                                                    setUs(item.name)
                                                }}>
                                                <Text style={{ color: COLORS.white, paddingVertical: 6, textAlign: 'center',marginBottom:(index === user.length-1)? 15:2  }}>{item.name}</Text>
                                            </TouchableOpacity>
                                        ))
                                    }
                                </ScrollView>:
                                <Text style={{ color: COLORS.white, paddingVertical: 6, textAlign: 'center' }}>No Data </Text>
                                }
                                
                            </TouchableOpacity>
                        </Modal>
                    </View>
                    <Text style={[styles.Htext, { marginTop: 20 }]}>RESERVATIONS*</Text>
                    <View style={{height:SIZES.height*0.35}}>
                    <View style={[styles.SectionStyle, { 
                        marginTop: 10,justifyContent:'space-around',alignItems:'center',
                        borderTopWidth:0.6,borderBottomWidth:0.6,borderTopColor:COLORS.white,
                        borderBottomColor:COLORS.white}]}>
                    <Text style={{ color: COLORS.white, paddingVertical: 6, textAlign: 'center',fontWeight:'bold' }}>#</Text>
                    <Text style={{ color: COLORS.white, paddingVertical: 6, textAlign: 'center' ,fontWeight:'bold'}}>Service</Text>
                    <Text style={{ color: COLORS.white, paddingVertical: 6, textAlign: 'center',fontWeight:'bold' }}>Description</Text>
                    <Text style={{ color: COLORS.white, paddingVertical: 6, textAlign: 'center' ,fontWeight:'bold'}}>Amount</Text>
                    </View>
                    </View>
                   
                    <View style={[styles.SectionStyle, { justifyContent: 'space-around', alignItems: 'center' }]}>
                        <TouchableOpacity style={[styles.btnStyle, { height: 35, backgroundColor: COLORS.white, marginHorizontal: 30 }]}
                        onPress={()=>navigation.goBack()}>
                            <Text style={{ color: COLORS.lightdark, fontWeight: 'bold' }}> ADD</Text>
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
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'gray',
    },
    Htext: {
        color: COLORS.white,
        fontWeight: 'bold', marginLeft: 25,
        fontSize: 15,
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
    mCon: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modal: {
        backgroundColor: COLORS.lightgray,
        borderRadius: 10,
        padding: 10,
        backgroundColor: COLORS.lightgray,
        marginHorizontal: 10
    },
    option: {
        alignItems: 'center',
        paddingLeft: 15,
        borderBottomWidth: 1
    },
    sep:{
        height:1,
        backgroundColor:COLORS.white
    }
});

//make this component available to the app
export default InvoiceCreate;
