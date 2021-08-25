//import liraries
import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, TextInput,
    TouchableOpacity, Platform,Modal
} from 'react-native';
import { COLORS } from './../../constants/theme';
import HeaderBar from '../../Components/HeaderBar/Header';
import { Ionicons } from 'react-native-vector-icons'
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

// create a component
const EditUser = ({ navigation, route }) => {
    const [role, setRole] = useState('');
    const [gender, setGender] = useState('Male');
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [fname, setFname] = useState('');
    const [mname, setMname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [pcode, setPcode] = useState('');
    const [coun_code, setCCode] = useState([
        {
            id: '1',
            val: '+91',
            country: 'India'
        },
        {
            id: '2',
            val: '+1',
            country: 'US'
        },
        {
            id: '3',
            val: '+123',
            country: 'UK'
        },
    ]);
    const [selectedPc, setSelectedPc] = useState('Country Code');
    const [isPcVisible, setisPcVisible] = useState(false);
    const [company, setCompany] = useState([
        {
            id: '1',
            name: 'Suryaan Enterprises',
        },
        {
            id: '2',
            name: 'IndiGo.',
        },
    ]);
    const [selectedCom, setSelectedCom] = useState('Select Company');
    const [isComVisible, setisComVisible] = useState(false);
    const [phone, setPhone] = useState('');
    const [cname, setCname] = useState('');
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState('Active');
    const formattedDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

  

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setShow(false)
    };
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    useEffect(() => {
        let { role,item } = route.params;

        setRole(role);
        setSelectedCom('Suryaan Enterprises')
        setFname(item.US_FIRST_NAME);
        setMname(item.US_MIDDLE_NAME);
        setLname(item.US_LAST_NAME);
        setEmail(item.US_EMAIL);
        setDate(new Date(item.US_DATE_OF_BIRTH));
        setPhone(item.US_PHONE_NO);
        setGender(item.US_GENDER);
        setStatus(item.US_STATUS);
        setSelectedPc(item.US_COUNTRY_CODE);
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, [])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const changePcVisibility = (bool) => {
        setisPcVisible(bool)
    }
    const changeComVisibility = (bool) => {
        setisComVisible(bool)
    }
    const setPhCo = (option) => {
        setSelectedPc(option)
    }
    const setComp = (option) => {
        setSelectedCom(option)
    }

   
    return (
        <View style={styles.container}>
            <HeaderBar onPress={() => navigation.goBack()} />
            <View style={{ position: 'absolute', top: 60, left: 80, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                {
                    role === '3' ? <Text style={{
                        color: COLORS.white, fontSize: 18, fontWeight: 'bold',
                        textAlign: 'center', textTransform: 'uppercase'
                    }}>Instructor Form </Text> :
                        <View>
                            {
                                role === '4' ? <Text style={{
                                    color: COLORS.white, fontSize: 18, fontWeight: 'bold',
                                    textAlign: 'center', textTransform: 'uppercase'
                                }}>Student Form </Text> :
                                    <Text style={{
                                        color: COLORS.white, fontSize: 18, fontWeight: 'bold',
                                        textAlign: 'center', textTransform: 'uppercase'
                                    }}>Renter Form </Text>
                            }
                        </View>
                }
            </View>
            <ScrollView style={{ flex: 1 }}>
                <KeyboardAvoidingView enabled>
                    <View style={[styles.SectionStyle, { justifyContent: 'flex-start', maxHeight: 15, marginTop: 10, marginLeft: 8, alignSelf: 'center' }]}>
                        <Text style={{ color: COLORS.white, fontWeight: 'bold', marginLeft: 16, fontSize: 13, width: '30%' }}>FIRST NAME*</Text>
                        <Text style={{ color: COLORS.white, fontWeight: 'bold', marginLeft: 16, fontSize: 13, width: '30%' }}>MIDDLE NAME</Text>
                        <Text style={{ color: COLORS.white, fontWeight: 'bold', marginLeft: 16, fontSize: 13 }}>LAST NAME*</Text>
                    </View>
                    <View style={[styles.SectionStyle, { justifyContent: 'space-around', marginTop: 1 }]}>
                        <TextInput
                            style={[styles.inputStyle, { marginRight: 2 }]}
                            onChangeText={(UserName) => setFname(UserName)}
                            value={fname}
                            placeholder="First Name"
                            placeholderTextColor="gray"
                            autoCapitalize="sentences"
                        />
                        <TextInput
                            style={[styles.inputStyle, { marginRight: 2 }]}
                            onChangeText={(UserName) => setMname(UserName)}
                            value={mname}
                            placeholder="Middle Name"
                            placeholderTextColor="gray"
                            autoCapitalize="sentences"
                        />
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(UserName) => setLname(UserName)}
                            value={lname}
                            placeholder="Last Name"
                            placeholderTextColor="gray"
                            autoCapitalize="sentences"
                        />
                    </View>
                    <View style={[styles.SectionStyle, { justifyContent: 'flex-start', maxHeight: 15, marginTop: 1, marginLeft: 4 }]}>
                        <Text style={{ color: COLORS.white, fontWeight: 'bold', marginLeft: 16, fontSize: 13, width: '45%' }}>EMAIL*</Text>
                        <Text style={{ color: COLORS.white, fontWeight: 'bold', marginLeft: 16, fontSize: 13, textAlign: 'left' }}>DOB</Text>
                    </View>
                    <View style={[styles.SectionStyle, { justifyContent: 'space-between', marginTop: 1 }]}>
                        <TextInput
                            style={[styles.inputStyle, { marginRight: 5 }]}
                            onChangeText={(UserName) => setEmail(UserName)}
                            value={email}
                            keyboardType="email-address"
                            placeholder="Email Address"
                            placeholderTextColor="gray"
                            autoCapitalize="sentences"
                        />
                        <TouchableOpacity style={[styles.inputStyle, { justifyContent: 'center', alignItems: 'center' }]}
                            onPress={showDatepicker}>
                            {
                                formattedDate ? <Text style={{ color: COLORS.white, fontWeight: 'bold' }}>{formattedDate}</Text> :
                                    <Text style={{ color: COLORS.white, fontWeight: 'bold' }}> Date of Birth</Text>
                            }


                        </TouchableOpacity>
                    </View>
                    {show && (
                        <DateTimePicker
                            mode="date"
                            value={new Date()}
                            display="calendar"
                            onChange={onChange}
                        />
                    )}
                    <View style={[styles.SectionStyle, { justifyContent: 'flex-start', maxHeight: 15, marginTop: 1, marginLeft: 4 }]}>
                        <Text style={{ color: COLORS.white, fontWeight: 'bold', marginLeft: 16, fontSize: 13, width: '30%' }}>PHONE CODE*</Text>
                        <Text style={{ color: COLORS.white, fontWeight: 'bold', marginLeft: 16, fontSize: 13 }}>PHONE*</Text>

                    </View>
                    <View style={[styles.SectionStyle, { justifyContent: 'space-around', marginTop: 1 }]}>
                       
                    <View style={{width:'30%'}}>
                        <TouchableOpacity
                            style={[styles.inputStyle, { justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }]}
                            onPress={() => changePcVisibility(true)}>
                            <Text style={{ color: 'gray' }}>{selectedPc}</Text>
                        </TouchableOpacity>
                        <Modal
                            transparent={true}
                            animationType='fade'
                            visible={isPcVisible}
                            nRequestClose={() => changePcVisibility(false)}>
                            <TouchableOpacity
                                onPress={() => changePcVisibility(false)}
                                style={styles.mCon}>
                                <ScrollView style={[styles.modal, { width: '90%', height: '25%', marginHorizontal: 25,maxHeight:'30%' }]}>
                                    {
                                        coun_code.map((item, index) => (
                                            <TouchableOpacity
                                                style={styles.option}
                                                key={index}
                                                onPress={() => {
                                                    changePcVisibility(false);
                                                    setPhCo(item.val);
                                                }}>
                                                <Text style={{ color: COLORS.white, paddingVertical: 6, textAlign: 'center',marginBottom:(index === coun_code.length-1)? 15:2  }}>{item.val}</Text>
                                            </TouchableOpacity>
                                        ))
                                    }
                                </ScrollView>
                            </TouchableOpacity>
                        </Modal>
                    </View>
                       
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(e) => setPhone(e)}
                            placeholder="Enter Mobile Number"
                            value={phone}
                            keyboardType="numeric"
                            placeholderTextColor="gray"
                        />
                    </View>
                    <Text style={{ color: COLORS.white, fontWeight: 'bold', marginLeft: 16, fontSize: 13 }}>GENDER</Text>
                    <View style={[styles.SectionStyle, { justifyContent: 'space-around', marginRight: 45, marginTop: 1 }]}>
                        <TouchableOpacity style={styles.radBtn}
                            onPress={() => { setGender('Male') }}>
                            {
                                gender === 'Male' ? <Ionicons name='radio-button-on' color={COLORS.lightyellow} size={16} /> :
                                    <Ionicons name='radio-button-off' color='gray' size={16} />
                            }
                            <Text style={{ color: gender === 'Male' ? COLORS.white : 'gray', marginLeft: 10, fontWeight: gender === 'Male' ? 'bold' : '500', fontSize: gender === 'Male' ? 16 : 14 }}>Male</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.radBtn}
                            onPress={() => { setGender('Female') }}>
                            {
                                gender === 'Female' ? <Ionicons name='radio-button-on' color={COLORS.lightyellow} size={16} /> :
                                    <Ionicons name='radio-button-off' color='gray' size={16} />
                            }
                            <Text style={{ color: gender === 'Female' ? COLORS.white : 'gray', marginLeft: 10, fontWeight: gender === 'Female' ? 'bold' : '500', fontSize: gender === 'Female' ? 16 : 14 }}>Female</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.radBtn}
                            onPress={() => { setGender('Other') }}>
                            {
                                gender === 'Other' ? <Ionicons name='radio-button-on' color={COLORS.lightyellow} size={16} /> :
                                    <Ionicons name='radio-button-off' color='gray' size={16} />
                            }
                            <Text style={{ color: gender === 'Other' ? COLORS.white : 'gray', marginLeft: 10, fontWeight: gender === 'Other' ? 'bold' : '500', fontSize: gender === 'Other' ? 16 : 14 }}>Other</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ color: COLORS.white, fontWeight: 'bold', marginLeft: 16, fontSize: 13 }}>ROLE*</Text>
                    <View style={[styles.SectionStyle, { marginTop: 1, marginLeft: 36 }]}>
                        <TouchableOpacity style={styles.radBtn}
                            disabled={true}>
                            {
                                role ? <Ionicons name='radio-button-on' color={COLORS.lightyellow} size={16} /> :
                                    <Ionicons name='radio-button-off' color='gray' size={16} />
                            }

                            <Text style={{ color: role ? COLORS.white : 'gray', marginLeft: 10, fontWeight: role ? 'bold' : '500', fontSize: role ? 16 : 14 }}>
                                {
                                    role === '3' ? <Text style={{ color: role ? COLORS.white : 'gray', marginLeft: 10, fontWeight: role ? 'bold' : '500', fontSize: role ? 16 : 14 }}>Instructor</Text> :
                                        <Text>
                                            {
                                                role === '4' ?
                                                    <Text style={{ color: role ? COLORS.white : 'gray', marginLeft: 10, fontWeight: role ? 'bold' : '500', fontSize: role ? 16 : 14 }}>Student</Text> :
                                                    <Text style={{ color: role ? COLORS.white : 'gray', marginLeft: 10, fontWeight: role ? 'bold' : '500', fontSize: role ? 16 : 14 }}>Renter  </Text>
                                            }
                                        </Text>
                                }</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ color: COLORS.white, fontWeight: 'bold', marginLeft: 16, fontSize: 13 }}>COMPANY*</Text>
                    <View style={[styles.SectionStyle, { marginTop: 10 }]}>
                        <TouchableOpacity
                            style={[styles.inputStyle, { justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }]}
                            onPress={() => changeComVisibility(true)}>
                            <Text style={{ color: 'gray' }}>{selectedCom}</Text>
                        </TouchableOpacity>
                        <Modal
                            transparent={true}
                            animationType='fade'
                            visible={isComVisible}
                            nRequestClose={() => changeComVisibility(false)}>
                            <TouchableOpacity
                                onPress={() => changeComVisibility(false)}
                                style={styles.mCon}>
                                <ScrollView style={[styles.modal, { width: '90%', height: '25%', marginHorizontal: 25,maxHeight:'30%' }]}>
                                    {
                                        company.map((item, index) => (
                                            <TouchableOpacity
                                                style={styles.option}
                                                key={index}
                                                onPress={() => {
                                                    changeComVisibility(false);
                                                    setComp(item.name);
                                                }}>
                                                <Text style={{ color: COLORS.white, paddingVertical: 6, textAlign: 'center',marginBottom:(index === company.length-1)? 15:2  }}>{item.name}</Text>
                                            </TouchableOpacity>
                                        ))
                                    }
                                </ScrollView>
                            </TouchableOpacity>
                        </Modal>
                    </View>
                    <Text style={{ color: COLORS.white, fontWeight: 'bold', marginLeft: 16, fontSize: 13 }}>UPLOAD PHOTO</Text>
                    <View style={[styles.SectionStyle, { justifyContent: 'space-around', marginRight: 15, marginTop: 6 }]}>
                        <TouchableOpacity style={[styles.inputStyle, { justifyContent: 'center', alignItems: 'center' }]}
                            onPress={pickImage}>
                            <Text style={{ color: 'gray' }}> Select Photo</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ color: COLORS.white, fontWeight: 'bold', marginLeft: 16, fontSize: 13 }}>STATUS*</Text>
                    <View style={[styles.SectionStyle, { justifyContent: 'flex-start', marginRight: 45, marginTop: 1 }]}>
                        <TouchableOpacity style={[styles.radBtn, { marginLeft: 25 }]}
                            onPress={() => { setStatus('Active') }}>
                            {
                                status === 'Active' ? <Ionicons name='radio-button-on' color={COLORS.lightyellow} size={16} /> :
                                    <Ionicons name='radio-button-off' color='gray' size={16} />
                            }
                            <Text style={{ color: status === 'Active' ? COLORS.white : 'gray', marginLeft: 10, fontWeight: status === 'Active' ? 'bold' : '500', fontSize: status === 'Active' ? 16 : 14 }}>Active</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.radBtn, { marginLeft: 20 }]}
                            onPress={() => { setStatus('Inactive') }}>
                            {
                                status === 'Inactive' ? <Ionicons name='radio-button-on' color={COLORS.lightyellow} size={16} /> :
                                    <Ionicons name='radio-button-off' color='gray' size={16} />
                            }
                            <Text style={{ color: status === 'Inactive' ? COLORS.white : 'gray', marginLeft: 10, fontWeight: status === 'Inactive' ? 'bold' : '500', fontSize: status === 'Inactive' ? 16 : 14 }}>Inactive</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.SectionStyle, { justifyContent: 'space-around', alignItems: 'center' }]}>
                        <TouchableOpacity style={[styles.btnStyle, { height: 35, backgroundColor: COLORS.white }]}
                        onPress={()=>navigation.goBack()}>
                            <Text style={{ color: COLORS.dark, fontWeight: 'bold' }}> UPDATE</Text>
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
        paddingTop: 50,
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
        paddingLeft: 20,
        paddingRight: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'gray',
    },
    radBtn: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
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
});

//make this component available to the app
export default EditUser;
