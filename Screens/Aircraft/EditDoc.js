//import liraries
import React, { useEffect, useState } from 'react';
import {
    View, Text, StyleSheet, ScrollView,
    TouchableOpacity, KeyboardAvoidingView, TextInput, Platform,Modal
} from 'react-native';
import { COLORS } from './../../constants/theme';
import HeaderBar from '../../Components/HeaderBar/Header';
import { BASE_URL } from './../../base';
import Loader from './../Loader';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux';
// create a component
const EditADoc = ({ navigation,route }) => {
    const [dtyp, setDtyp] = useState([]);
    const [selectedDoc, setSelectedDoc] = useState('Select Document Type');
    const [isDocVisible, setisDocVisible] = useState(false);
    const [dno, setDno] = useState('');
    const [idat, setIdat] = useState(new Date());
    const [edat, setEdat] = useState(new Date());
    const [image, setImage] = useState(null);
    const [mode, setMode] = useState('date');
    const [loading, setLoading] = useState(true);
    const [ishow, setIShow] = useState(false);
    const [eshow, setEShow] = useState(false);
    const [aid,setAid] = useState('');
    const userCo = useSelector(state => state.coid);
    const userRo = useSelector(state => state.role);
    const userid = useSelector(state => state.users);
   
    const formattedIDate = idat.getFullYear() + "-" + (idat.getMonth() + 1) + "-" + idat.getDate();
    const formattedEDate = edat.getFullYear() + "-" + (edat.getMonth() + 1) + "-" + edat.getDate();

    const onIChange = (event, selectedDate) => {
        const currentDate = selectedDate || idat;
        setIdat(currentDate);
        setIShow(false)
    };
    const showIMode = (currentMode) => {
        setIShow(true);
        setMode(currentMode);
    };

    const showIDatepicker = () => {
        showIMode('date');
    };

    const onEChange = (event, selectedDate) => {
        const currentDate = selectedDate || edat;
        setEdat(currentDate);
        setEShow(false)
    };
    const showEMode = (currentMode) => {
        setEShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showEMode('date');
    };

    const getDoctype = () => {
        const myHeaders = new Headers();

        const formdata = new FormData();
        formdata.append("DO_RELATED_TO", "Aircraft");

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(BASE_URL + "/apis/general/get_document_types", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.response === true) {
                    setDtyp(result.document_type_data);
                } else {
                    setDtyp('')
                }
            })
            .catch(error => console.log('error', error))
            .finally(() => setLoading(false))
            .finally(setLoading.bind(undefined, false));
    }

    useEffect(() => {
        let { item, dosc } = route.params;

        setAid(item);
        setSelectedDoc(dosc.AID_NAME);
        setDno(dosc.AID_DOCUMENT_NO);
        setIdat(new Date(dosc.AID_ISSUE_DATE));
        setEdat(new Date(dosc.AID_EXPIRY_DATE));
        setImage(dosc.AID_FILE);
        getDoctype();
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

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

    const changeDocVisibility = (bool) => {
        setisDocVisible(bool)
    }

    const setDos = (option) => {
        setSelectedDoc(option)
    }


    const onSubmit = () => {
        const myHeaderss = new Headers();
       
        const formdatas = new FormData();
        formdatas.append("USER_ID", userid);
        formdatas.append("USER_CO_ID", userCo);
        formdatas.append("AID_ID", "");
        formdatas.append("AI_ID", aid);
        formdatas.append("AID_NAME", selectedDoc);
        formdatas.append("AID_DOCUMENT_NO", dno);
        formdatas.append("AID_ISSUE_DATE", formattedIDate);
        formdatas.append("AID_EXPIRY_DATE", formattedEDate);
        formdatas.append("image", image);

        const requestOptionss = {
            method: 'POST',
            headers: myHeaderss,
            body: formdatas,
            redirect: 'follow'
        };

        fetch(BASE_URL+"/apis/admin/add_aircraft_document", requestOptionss)
            .then(response => response.json())
            .then(result => {
                if(result.response){
                    navigation.navigate('aircraftdetails');
                }else{
                    setError(result.message)
                }
            })
            .catch(error => console.log('error', error));
    }

    return (
        <View style={styles.container}>
            <Loader loading={loading} />
            <HeaderBar onPress={() => navigation.goBack()} />
            <View style={{ position: 'absolute', top: 60, left: 80, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{
                    color: COLORS.white, fontSize: 16, fontWeight: 'bold',
                    textAlign: 'center', textTransform: 'uppercase'
                }}>AIRCRAFT DOCUMENT FORM </Text>
            </View>
            <ScrollView style={{ flex: 1 }}>
                <KeyboardAvoidingView enabled>
                    <Text style={[styles.Htext, { marginTop: 20 }]}>DOCUMENT TYPE*</Text>
                    <View style={[styles.SectionStyle, { marginTop: 10 }]}>
                        <TouchableOpacity
                            style={[styles.inputStyle, { justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }]}
                            onPress={() => changeDocVisibility(true)}>
                            <Text style={{ color: 'gray' }}>{selectedDoc}</Text>
                        </TouchableOpacity>
                        <Modal
                            transparent={true}
                            animationType='fade'
                            visible={isDocVisible}
                            nRequestClose={() => changeDocVisibility(false)}>
                            <TouchableOpacity
                                onPress={() => changeDocVisibility(false)}
                                style={styles.mCon}>
                                <ScrollView style={[styles.modal, { width: '90%', height: '25%', marginHorizontal: 25,maxHeight:'30%' }]}>
                                    {
                                        dtyp.map((item, index) => (
                                            <TouchableOpacity
                                                style={styles.option}
                                                key={index}
                                                onPress={() => {
                                                    changeDocVisibility(false);
                                                    setDos(item.DO_NAME);
                                                }}>
                                                <Text style={{ color: COLORS.white, paddingVertical: 6, textAlign: 'center',marginBottom:(index === dtyp.length-1)? 15:2  }}>{item.DO_NAME}</Text>
                                            </TouchableOpacity>
                                        ))
                                    }
                                </ScrollView>
                            </TouchableOpacity>
                        </Modal>
                    </View>
                    <Text style={[styles.Htext, { marginTop: 20 }]}>DOCUMENT NUMBER</Text>
                    <View style={[styles.SectionStyle, { marginTop: 5 }]}>
                        <TextInput
                            style={[styles.inputStyle, { marginRight: 5 }]}
                            onChangeText={(e) => setDno(e)}
                            value={dno}
                            placeholder="Enter Document Number"
                            placeholderTextColor="gray"
                            autoCapitalize="sentences"
                        />
                    </View>
                    <View style={[styles.SectionStyle, { justifyContent: 'flex-start', maxHeight: 15, marginTop: 20, marginLeft: 4 }]}>
                        <Text style={{ color: COLORS.white, fontWeight: 'bold', marginLeft: 16, fontSize: 13, width: '45%' }}>ISSUE DATE*</Text>
                        <Text style={{ color: COLORS.white, fontWeight: 'bold', marginLeft: 16, fontSize: 13, textAlign: 'left' }}>EXPIRY DATE*</Text>
                    </View>
                    <View style={[styles.SectionStyle, { marginTop: 5 }]}>
                        <TouchableOpacity style={[styles.inputStyle, { justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }]}
                            onPress={showIDatepicker}>
                            {
                                formattedIDate ? <Text style={{ color: COLORS.white, fontWeight: 'bold' }}>{formattedIDate}</Text> :
                                    <Text style={{ color: COLORS.white, fontWeight: 'bold' }}> ISSUE Date </Text>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.inputStyle, { justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }]}
                            onPress={showDatepicker}>
                            {
                                formattedEDate ? <Text style={{ color: COLORS.white, fontWeight: 'bold' }}>{formattedEDate}</Text> :
                                    <Text style={{ color: COLORS.white, fontWeight: 'bold' }}> EXPIRY Date </Text>
                            }
                        </TouchableOpacity>
                    </View>
                    {ishow && (
                        <DateTimePicker
                            mode="date"
                            value={new Date()}
                            display="calendar"
                            onChange={onIChange}
                        />
                    )}
                    {eshow && (
                        <DateTimePicker
                            mode="date"
                            value={new Date()}
                            display="calendar"
                            onChange={onEChange}
                        />
                    )}
                    <Text style={[styles.Htext, { marginTop: 20 }]}>UPLOAD DOCUMENT*</Text>
                    <View style={[styles.SectionStyle, { marginTop: 5 }]}>
                        <TouchableOpacity style={[styles.inputStyle, { justifyContent: 'center', alignItems: 'center' }]}
                            onPress={pickImage}>
                            <Text style={[styles.Htext, { marginTop: 0, marginLeft: 0 }]}>Select Document</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.SectionStyle, { justifyContent: 'space-around', alignItems: 'center' }]}>
                        <TouchableOpacity style={[styles.btnStyle, { height: 35, backgroundColor: COLORS.white, marginHorizontal: 30 }]}
                        onPress={onSubmit}>
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
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'gray',
    },
    Htext: {
        color: COLORS.white,
        fontWeight: 'bold', marginLeft: 20,
        fontSize: 13,
        marginTop: 6
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
export default EditADoc;
