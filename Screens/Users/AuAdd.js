//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ScrollView, TextInput } from 'react-native';
import { COLORS } from './../../constants/theme';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons, Entypo } from 'react-native-vector-icons'
import HeaderBar from '../../Components/HeaderBar/Header';
// create a component
const AddUAddress = ({navigation,route}) => {
    const [user,setUser] = useState('')
    const [isHome, setIsHome] = useState(true);
    const [isOffice, setIsOffice] = useState(false);
    const [type, setType] = useState('Home');

    useEffect(()=>{
        let {item} = route.params;

        setUser(item.US_RO_ID);
    },[]);
    return (
        <View style={styles.container}>
        <HeaderBar onPress={()=>navigation.goBack()}/>
        <View style={{ position: 'absolute', top: 60, left: 80, height: 40, justifyContent: 'center', alignItems: 'center' }}>
            {
                user ? <View>
                {
                    user === '3' ?  <Text style={{color:COLORS.white,fontSize:16,fontWeight:'bold'}}>INSTRUCTOR  ADDRESS FORM</Text>:
                    <View>
                    {
                    user === '4' ? 
                            <Text style={{color:COLORS.white,fontSize:16,fontWeight:'bold'}}>STUDENT ADDRESS FORM</Text>:
                            <View>
                    {
                    user === '5' ? 
                            <Text style={{color:COLORS.white,fontSize:16,fontWeight:'bold'}}>RENTER ADDRESS FORM</Text>:
                            <Text style={{color:COLORS.white,fontSize:16,fontWeight:'bold'}}> ADMIN ADDRESS FORM</Text>
                    }
                    </View>
                        }
                    </View>
                }
                        
                </View>:
                <Text style={{color:COLORS.white,fontSize:16,fontWeight:'bold'}}>USER ADDRESS FORM</Text>
            }
        </View>
        
            <View style={{ marginTop: 5, flex: 1, padding: 10 }}>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{
                        justifyContent: 'center',
                        alignContent: 'center',
                    }}>
                    <KeyboardAvoidingView enabled>
                        <View style={[styles.SectionStyle]}>
                            <View style={styles.SectionStyleIn}>
                                <Text style={styles.texC}>Address type</Text>
                                <View style={[styles.SectionInput, { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }]}>
                                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}
                                        onPress={() => {
                                            setType('Home');
                                        }}>
                                        <Text style={{ color: (type==='Home') ? COLORS.dark : COLORS.white, fontWeight: 'bold', fontSize: 15 }}>
                                            {type==='Home' ? <Ionicons name='radio-button-on' color={COLORS.dark} size={18} /> :
                                                <Ionicons name='radio-button-off' color={COLORS.white} size={18} />}{' '} Home</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginLeft: 20 }}>
                                        <Text style={{ color:(type==='Office')? COLORS.dark : COLORS.white, fontWeight: 'bold', fontSize: 15 }}
                                            onPress={() => {
                                                setType('Office');
                                            }}>
                                            {type==='Office' ? <Ionicons name='radio-button-on' color={COLORS.dark} size={18} /> :
                                                <Ionicons name='radio-button-off' color={COLORS.white} size={18} />}{' '} Office</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.SectionStyle]}>
                            <View style={styles.SectionStyleIn}>
                                <Text style={styles.texC}>Address</Text>
                                <View style={[styles.SectionInput, { height: 80 }]}>
                                    <TextInput
                                        style={[styles.inputStyle]}
                                        placeholder="Enter Address"
                                        placeholderTextColor='gray'
                                        blurOnSubmit={false}
                                        numberOfLines={3}
                                        multiline={true}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={[styles.SectionStyle, { justifyContent: 'space-between' }]}>
                            <View style={styles.SectionStyleIn}>
                                <Text style={styles.texC}>City</Text>
                                <View style={styles.SectionInput}>
                                    <TextInput
                                        style={styles.inputStyle}
                                        placeholder="Enter City"
                                        placeholderTextColor='gray'
                                        blurOnSubmit={false}
                                    />
                                </View>
                            </View>
                            <View style={styles.SectionStyleIn}>
                                <Text style={styles.texC}>State</Text>
                                <View style={styles.SectionInput}>
                                    <TextInput
                                        style={styles.inputStyle}
                                        placeholder="Enter State"
                                        placeholderTextColor='gray'
                                        blurOnSubmit={false}
                                    />
                                </View>

                            </View>
                        </View>
                        <View style={[styles.SectionStyle, { justifyContent: 'space-between' }]}>
                            <View style={styles.SectionStyleIn}>
                                <Text style={styles.texC}>Country</Text>
                                <View style={styles.SectionInput}>
                                    <TextInput
                                        style={styles.inputStyle}
                                        placeholder="Enter Country"
                                        placeholderTextColor='gray'
                                        blurOnSubmit={false}
                                    />
                                </View>
                            </View>
                            <View style={styles.SectionStyleIn}>
                                <Text style={styles.texC}>Zip Code</Text>
                                <View style={styles.SectionInput}>
                                    <TextInput
                                        style={styles.inputStyle}
                                        placeholder="Enter ZIP Code"
                                        placeholderTextColor='gray'
                                        blurOnSubmit={false}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'row', justifyContent: 'center',
                            alignItems: 'center', marginTop: 50
                        }}>
                            <TouchableOpacity style={{
                               flex:1,height:35, marginHorizontal: 40, borderRadius: 10,
                                backgroundColor: COLORS.white, justifyContent: 'center',
                                alignItems: 'center'
                            }} onPress={()=>navigation.goBack()}>
                                <Text style={{
                                    color: COLORS.lightdark, fontWeight: 'bold',
                                    fontSize: 16, textTransform: 'uppercase'
                                }}>Add</Text>
                            </TouchableOpacity>
                          
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>

            </View>
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
    headTex: {
        color: COLORS.lightyellow,
        fontWeight: 'bold', fontSize: 16,
        textTransform: 'uppercase', letterSpacing: 1
    },
    SectionStyle: {
        flexDirection: 'row',
        marginTop: 20,
        marginLeft: 15,
        marginRight: 15,
        margin: 10,
    },
    SectionStyleIn: {
        flexDirection: 'column',
        margin: 1,
        flex: 1
    },
    inputStyle: {
        flex: 1,
        color: 'gray',
        paddingLeft: 20,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'gray',
        marginRight: 5
    },
    SectionInput: {
        height: 40,
    },
    texC: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 15,
        marginLeft: 5,
        textTransform: 'uppercase',
        paddingBottom: 8
    }
});

//make this component available to the app
export default AddUAddress;
