//import liraries
import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet,ScrollView,KeyboardAvoidingView,TouchableOpacity,
    Modal } from 'react-native';
import HeaderBar from '../../Components/HeaderBar/Header';
import { COLORS } from './../../constants/theme';
import {Ionicons} from 'react-native-vector-icons'
// create a component
const RatingTypeAdd = ({navigation}) => {
    const [status, setStatus] = useState('Active');
    const [rType, setType] = useState([
        {
            id: '1',
            name: 'Fly Single Engine Solo',
            status: 'Active'
        },
        {
            id: '2',
            name: 'Fly Single Engine With Instructor',
            status: 'Active'
        },
        {
            id: '3',
            name: 'Fly Multi Engine With Instructor',
            status: 'Active'
        },
        {
            id: '4',
            name: 'Ground With Instructor',
            status: 'Active'
        },
        {
            id: '5',
            name: 'Sharing Fly Single Engine',
            status: 'Active'
        },
        {
            id: '6',
            name: 'Fly Complex Engine Solo',
            status: 'Active'
        },
        {
            id: '7',
            name: 'Fly Complex Engine With Instructor',
            status: 'Active'
        },
        {
            id: '8',
            name: 'Sharing Fly Complex Engine',
            status: 'Active'
        },
    ]);
    const [selectedType, setSelectedType] = useState('Select Rating Type');
    const [isTypeVisible, setisTypeVisible] = useState(false);
    const changeTypeVisibility = (bool) => {
        setisTypeVisible(bool)
    }
    const setTyp = (option) => {
        setSelectedType(option)
    }
    return (
        <View style={styles.container}>
            <HeaderBar onPress={()=>navigation.goBack()}/>
            <View style={styles.SeB}>
                <Text style={styles.hText}>RATING TYPE FORM</Text>
            </View>
            <ScrollView style={{flex:1,padding:10}}>
                <KeyboardAvoidingView enabled>
                <Text style={[styles.Htext, { marginTop: 20 }]}>RATING TYPE NAME*</Text>
                <View style={[styles.SectionStyle, { marginTop: 10 }]}>
                        <TouchableOpacity
                            style={[styles.inputStyle, { justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }]}
                            onPress={() => changeTypeVisibility(true)}>
                            <Text style={{ color: 'gray' }}>{selectedType}</Text>
                        </TouchableOpacity>
                        <Modal
                            transparent={true}
                            animationType='fade'
                            visible={isTypeVisible}
                            nRequestClose={() => changeTypeVisibility(false)}>
                            <TouchableOpacity
                                onPress={() => changeTypeVisibility(false)}
                                style={styles.mCon}>
                                {
                                    rType ? 
                                    <ScrollView style={[styles.modal, { width: '90%', height: '25%', marginHorizontal: 25,maxHeight:'30%' }]}>
                                    {
                                        rType.map((item, index) => (
                                            <TouchableOpacity
                                                style={styles.option}
                                                key={index}
                                                onPress={() => {
                                                    changeTypeVisibility(false);
                                                    setTyp(item.name)
                                                }}>
                                                <Text style={{ color: COLORS.white, paddingVertical: 6, textAlign: 'center',marginBottom:(index === rType.length-1)? 15:2 }}>{item.name}</Text>
                                            </TouchableOpacity>
                                        ))
                                    }
                                </ScrollView>:
                                <Text style={{ color: COLORS.white, paddingVertical: 6, textAlign: 'center' }}>No Data </Text>
                                }
                                
                            </TouchableOpacity>
                        </Modal>
                    </View>
                
                <Text style={[styles.Htext, { marginTop: 20 }]}>STATUS*</Text>
                <View style={[styles.SectionStyle, { justifyContent: 'flex-start', marginLeft:30, marginTop: 1 }]}>
                        <TouchableOpacity style={styles.radBtn}
                            onPress={() => { setStatus('Active') }}>
                            {
                                status === 'Active' ? <Ionicons name='radio-button-on' color={COLORS.lightyellow} size={16} /> :
                                    <Ionicons name='radio-button-off' color='gray' size={16} />
                            }
                            <Text style={{ color: status === 'Active' ? COLORS.white : 'gray', marginLeft: 10, fontWeight: status === 'Active' ? 'bold' : '500', fontSize: status === 'Active' ? 15 : 14 }}>Active</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.radBtn,{marginLeft:15}]}
                            onPress={() => { setStatus('Inactive') }}>
                            {
                                status === 'Inactive' ? <Ionicons name='radio-button-on' color={COLORS.lightyellow} size={16} /> :
                                    <Ionicons name='radio-button-off' color='gray' size={16} />
                            }
                            <Text style={{ color: status === 'Inactive' ? COLORS.white : 'gray', marginLeft: 10, fontWeight: status === 'Inactive' ? 'bold' : '500', fontSize: status === 'Inactive' ? 15 : 14 }}>Inactive</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.SectionStyle, { justifyContent: 'space-around', alignItems: 'center' }]}>
                        <TouchableOpacity style={[styles.btnStyle, { height: 35, backgroundColor: COLORS.white }]}
                        onPress={()=>navigation.goBack()}>
                            <Text style={{ color: COLORS.dark, fontWeight: 'bold' }}> ADD</Text>
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
    SeB: {
        position: 'absolute', top: 60, left: 80, 
        height: 40, justifyContent: 'center', 
        alignItems: 'center'
        },
   hText: {
       color: COLORS.white,
       fontWeight: 'bold', fontSize: 16
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
radBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
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
});

//make this component available to the app
export default RatingTypeAdd;
