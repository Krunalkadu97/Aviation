//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ScrollView, TextInput } from 'react-native';
import { COLORS } from './../../constants/theme';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons, Entypo } from 'react-native-vector-icons'
// create a component
const AddAddress = ({navigation}) => {
    const userInfo = useSelector(state => state.users);
    const userRole = useSelector(state => state.role);
    const [isHome, setIsHome] = useState(true);
    const [isOffice, setIsOffice] = useState(false);
    const [type, setType] = useState('Home');
    return (
        <View style={styles.container}>
            <View style={{ height: 50, marginHorizontal: 10, backgroundColor: COLORS.darkgray, borderRadius: 15, justifyContent: 'center', paddingLeft: 25 }}>
                {
                    userRole === '2' ? <Text style={styles.headTex}>Admin Address Form</Text> :
                        <View>
                            {
                                userRole === '3' ? <Text style={styles.headTex}>Instructor Address Form</Text> :
                                    <View>
                                        {
                                            userRole === '4' ? <Text style={styles.headTex}>Student Address Form</Text> :
                                                <Text style={styles.headTex}>Renter Address Form</Text>
                                        }
                                    </View>
                            }
                        </View>
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
                                            setIsOffice(false);
                                            setIsHome(true);
                                            setType('Home');
                                        }}>
                                        <Text style={{ color: isHome ? COLORS.dark : COLORS.lightyellow, fontWeight: 'bold', fontSize: 15 }}>
                                            {isHome ? <Ionicons name='radio-button-on' color={COLORS.dark} size={18} /> :
                                                <Ionicons name='radio-button-off' color={COLORS.lightyellow} size={18} />}{' '} Home</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginLeft: 20 }}>
                                        <Text style={{ color: isOffice ? COLORS.dark : COLORS.lightyellow, fontWeight: 'bold', fontSize: 15 }}
                                            onPress={() => {
                                                setIsOffice(true);
                                                setIsHome(false);
                                                setType('Office');
                                            }}>
                                            {isOffice ? <Ionicons name='radio-button-on' color={COLORS.dark} size={18} /> :
                                                <Ionicons name='radio-button-off' color={COLORS.lightyellow} size={18} />}{' '} Office</Text>
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
                                        placeholderTextColor={COLORS.lightyellow}
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
                                        placeholderTextColor={COLORS.lightyellow}
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
                                        placeholderTextColor={COLORS.lightyellow}
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
                                        placeholderTextColor={COLORS.lightyellow}
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
                                        placeholderTextColor={COLORS.lightyellow}
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
                                height: 40, width: 100, marginHorizontal: 10, borderRadius: 10,
                                backgroundColor: COLORS.lightyellow, justifyContent: 'center',
                                alignItems: 'center'
                            }} onPress={()=>navigation.goBack()}>
                                <Text style={{
                                    color: COLORS.lightdark, fontWeight: 'bold',
                                    fontSize: 16, textTransform: 'uppercase'
                                }}>Add</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                height: 40, width: 100, marginHorizontal: 10, borderRadius: 10,
                                backgroundColor: COLORS.dark,justifyContent: 'center',
                                alignItems: 'center'
                            }} onPress={()=>navigation.goBack()}>
                                <Text style={{
                                    color: COLORS.white, fontWeight: 'bold',
                                    fontSize: 16, textTransform: 'uppercase'
                                }}>Back</Text>
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
        color: COLORS.lightyellow,
        paddingLeft: 20,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: COLORS.lightyellow,
        marginRight: 5
    },
    SectionInput: {
        height: 40,
    },
    texC: {
        color: COLORS.lightyellow,
        fontWeight: 'bold',
        fontSize: 15,
        marginLeft: 5,
        textTransform: 'uppercase',
        paddingBottom: 8
    }
});

//make this component available to the app
export default AddAddress;
