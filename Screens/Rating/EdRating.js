//import liraries
import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet,ScrollView,KeyboardAvoidingView,TouchableOpacity,
    Modal } from 'react-native';
import HeaderBar from '../../Components/HeaderBar/Header';
import { COLORS } from './../../constants/theme';
import {Ionicons} from 'react-native-vector-icons'
// create a component
const RatingEd = ({navigation,route}) => {
    const [status, setStatus] = useState('Active');
    const [rName, setRname] = useState([
        {
            id: '1',
            name: 'Private Pilot',
            status: 'Active'
        },
        {
            id: '2',
            name: 'Instrument Rating',
            status: 'Active'
        },
        {
            id: '3',
            name: 'Commercial Pilot',
            status: 'Active'
        },
        {
            id: '4',
            name: 'CFI',
            status: 'Active'
        },
        {
            id: '5',
            name: 'CFII',
            status: 'Active'
        },
        {
            id: '6',
            name: 'MEI',
            status: 'Active'
        }
    ]);
    const [selectedName, setSelectedName] = useState('Select Rating');
    const [isRatingVisible, setisRatingVisible] = useState(false);
    const changeRatingVisibility = (bool) => {
        setisRatingVisible(bool)
    }
    const setRat = (option) => {
        setSelectedName(option)
    }

    useEffect(()=>{
        let {item} = route.params;

        setSelectedName(item.name);
        setStatus(item.status);
    },[])
    return (
        <View style={styles.container}>
            <HeaderBar onPress={()=>navigation.goBack()}/>
            <View style={styles.SeB}>
                <Text style={styles.hText}>RATING FORM</Text>
            </View>
            <ScrollView style={{flex:1,padding:10}}>
                <KeyboardAvoidingView enabled>
                <Text style={[styles.Htext, { marginTop: 20 }]}>RATING NAME*</Text>
                <View style={[styles.SectionStyle, { marginTop: 10 }]}>
                        <TouchableOpacity
                            style={[styles.inputStyle, { justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }]}
                            onPress={() => changeRatingVisibility(true)}>
                            <Text style={{ color: 'gray' }}>{selectedName}</Text>
                        </TouchableOpacity>
                        <Modal
                            transparent={true}
                            animationType='fade'
                            visible={isRatingVisible}
                            nRequestClose={() => changeRatingVisibility(false)}>
                            <TouchableOpacity
                                onPress={() => changeRatingVisibility(false)}
                                style={styles.mCon}>
                                <ScrollView style={[styles.modal, { width: '90%', height: '25%', marginHorizontal: 25,maxHeight:'30%' }]}>
                                    {
                                        rName.map((item, index) => (
                                            <TouchableOpacity
                                                style={styles.option}
                                                key={index}
                                                onPress={() => {
                                                    changeRatingVisibility(false);
                                                    setRat(item.name)
                                                }}>
                                                <Text style={{ color: COLORS.white, paddingVertical: 6, textAlign: 'center' }}>{item.name}</Text>
                                            </TouchableOpacity>
                                        ))
                                    }
                                </ScrollView>
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
                            <Text style={{ color: COLORS.dark, fontWeight: 'bold' }}> Update</Text>
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
export default RatingEd;
