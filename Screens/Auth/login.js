//import liraries
import React, { useState } from 'react';
import {
    View, Text, StyleSheet, Image, TextInput, KeyboardAvoidingView,
    ScrollView, TouchableOpacity
} from 'react-native';
import { COLORS, FONTS } from './../../constants/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux'
import { ADD_CO_ID, ADD_USER, ADD_USER_ROLE } from './../../Redux/UserReducer';
import {BASE_URL} from '../../base';
// create a component
const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const [passwordvisible, setPasswordvisible] = useState(true);
    const onSubmit = () => {
        const myHeaders = new Headers();

        const formdata = new FormData();
        formdata.append("US_USER_NAME", email);
        formdata.append("US_PASSWORD", password);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(BASE_URL+"/apis/general/login", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.response === true) {
                    AsyncStorage.setItem('user_id', result.data.US_ID);
                    AsyncStorage.setItem('user_toid', result.data.US_RO_ID);
                    AsyncStorage.setItem('user_coid', result.data.US_CO_ID);
                    dispatch({ type: ADD_USER, payload: result.data.US_ID });
                    dispatch({ type: ADD_USER_ROLE, payload: result.data.US_RO_ID });
                    dispatch({ type: ADD_CO_ID, payload: result.data.US_CO_ID });
                    navigation.replace('Drawer');
                } else {
                    setError(result.message);
                    alert('Please check your email id or password');
                }
            })
            .catch(error => console.log('error', error));
    }
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://i.pinimg.com/originals/55/64/ee/5564ee8db9a7689db37efe6ae7141fe4.png' }}
                style={{ width: '100%', height: 250 }}
                resizeMode='contain'
            />
            <Text style={{ color: COLORS.lightyellow, textAlign: 'center', fontWeight: 'bold', ...FONTS.largeTitle }}>Welcome to Aviation</Text>
            <KeyboardAvoidingView enabled>
                <View style={styles.SectionStyle}>
                    <TextInput
                        placeholder='Enter User Name'
                        placeholderTextColor={COLORS.lightyellow}
                        style={styles.inputStyle}
                        onChangeText={(userEmail) => setEmail(userEmail)}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>
                <View style={styles.SectionStyle}>
                    <View style={[styles.inputStyle, { flexDirection: 'row', alignItems: 'center' }]}>
                        <TextInput
                            placeholder='Enter Password'
                            placeholderTextColor={COLORS.lightyellow}
                            onChangeText={(userPass) => setPassword(userPass)}
                            style={{
                                flex: 1,
                                height: '95%',
                                color: COLORS.lightyellow,
                                backgroundColor: COLORS.lightgray
                            }}
                            secureTextEntry={passwordvisible}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                setPasswordvisible(!passwordvisible)
                            }}
                            style={{ paddingRight: 10 }}>
                            {
                                passwordvisible ? <FontAwesome name='eye' size={20} color={COLORS.lightyellow} /> :
                                    <FontAwesome name='eye-slash' size={20} color={COLORS.dark} />
                            }

                        </TouchableOpacity>
                    </View>
                </View>
               
                {error != '' ? (
                    <Text style={styles.errorTextStyle}>
                        {error}
                    </Text>
                ) : null}
                <TouchableOpacity style={[styles.shadow, styles.outerBox, { elevation: 60,marginTop:40 }]}
                    onPress={onSubmit}>
                    <Text style={styles.bText}>Login</Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>


        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: COLORS.lightdark,
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 25,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    inputStyle: {
        flex: 1,
        color: COLORS.lightyellow,
        paddingLeft: 20,
        paddingRight: 15,
        borderWidth: 0.3,
        borderRadius: 10,
        borderColor: COLORS.lightyellow,
        backgroundColor: COLORS.lightgray
    },
    outerBox: {
        height: 40,
        marginHorizontal: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: COLORS.lightyellow
    },
    innerBox: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 20,
        borderRadius: 15,
    },
    shadow: {
        shadowColor: COLORS.white,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10
    },
    bText: {
        color: COLORS.lightdark,
        fontWeight: 'bold',
        fontSize: 15
    },
    errorTextStyle: {
        color: COLORS.dark,
        textAlign: 'center',
        fontSize: 14,
    },
});

//make this component available to the app
export default Login;
