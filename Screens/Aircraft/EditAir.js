//import liraries
import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, ScrollView,
    TextInput, KeyboardAvoidingView
} from 'react-native';
import { COLORS } from './../../constants/theme';
import HeaderBar from './../../Components/HeaderBar/Header';
import { Ionicons } from 'react-native-vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { BASE_URL } from './../../base';
import { useDispatch, useSelector } from 'react-redux';
// create a component
const EditAircraft = ({ navigation,route }) => {
    const [Bname, setBname] = useState('');
    const [model, setModel] = useState('');
    const [tno, setTno] = useState('');
    const [engine, setEngine] = useState('Single Engine');
    const [status, setStatus] = useState('Active');
    const [image, setImage] = useState(null);
    const userCo = useSelector(state => state.coid);
    const userRo = useSelector(state => state.role);
    const userid = useSelector(state => state.users);

    
    useEffect(() => {
        let {item} = route.params;
        setBname(item.AI_NAME);
        setModel(item.AI_MODEL);
        setEngine(item.AI_ENGINE_TYPE);
        setStatus(item.AI_STATUS);
        setTno(item.AI_TAIL_NO);
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

    const Submit = () => {
        
    }

    return (
        <View style={styles.container}>
            <HeaderBar onPress={() => navigation.goBack()} />
            <View style={{ position: 'absolute', top: 60, left: 80, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{
                    color: COLORS.white, fontSize: 18, fontWeight: 'bold',
                    textAlign: 'center', textTransform: 'uppercase'
                }}>AIRCRAFT FORM </Text>
            </View>
            <ScrollView style={{ flex: 1 }}>
                <KeyboardAvoidingView enabled>
                    <Text style={[styles.Htext, { marginTop: 20 }]}>BRAND NAME*</Text>
                    <View style={[styles.SectionStyle, { marginTop: 5 }]}>
                        <TextInput
                            style={[styles.inputStyle, { marginRight: 5 }]}
                            value={Bname}
                            onChangeText={(e) => setBname(e)}
                            keyboardType="email-address"
                            placeholder="Enter Brand Name"
                            placeholderTextColor="gray"
                            autoCapitalize="sentences"
                        />
                    </View>
                    <Text style={[styles.Htext]}>MODEL*</Text>
                    <View style={[styles.SectionStyle, { marginTop: 5 }]}>
                        <TextInput
                            style={[styles.inputStyle, { marginRight: 5 }]}
                            value={model}
                            onChangeText={(e) => setModel(e)}
                            keyboardType="email-address"
                            placeholder="Enter MODEL"
                            placeholderTextColor="gray"
                            autoCapitalize="sentences"
                        />
                    </View>
                    <Text style={[styles.Htext]}>TAIL NUMBER*</Text>
                    <View style={[styles.SectionStyle, { marginTop: 5 }]}>
                        <TextInput
                            style={[styles.inputStyle, { marginRight: 5 }]}
                            value={tno}
                            onChangeText={(e) => setTno(e)}
                            keyboardType="email-address"
                            placeholder="Enter Tail Number"
                            placeholderTextColor="gray"
                            autoCapitalize="sentences"
                        />
                    </View>
                    <Text style={[styles.Htext]}>PHOTO</Text>
                    <View style={[styles.SectionStyle, { marginTop: 5 }]}>
                        <TouchableOpacity style={[styles.inputStyle, { justifyContent: 'center', alignItems: 'center' }]}
                            onPress={pickImage}>
                            <Text style={[styles.Htext, { marginTop: 0, marginLeft: 0 }]}>Select Photo</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.Htext]}>ENGINE TYPE*</Text>
                    <View style={[styles.SectionStyle, { justifyContent: 'space-evenly', marginRight: 15, marginTop: 1 }]}>
                        <TouchableOpacity style={styles.radBtn}
                            onPress={() => { setEngine('Single Engine') }}>
                            {
                                engine === 'Single Engine' ? <Ionicons name='radio-button-on' color={COLORS.lightyellow} size={16} /> :
                                    <Ionicons name='radio-button-off' color='gray' size={16} />
                            }
                            <Text style={{ color: engine === 'Single Engine' ? COLORS.white : 'gray', marginLeft: 5, fontWeight: engine === 'Single Engine' ? 'bold' : '500', fontSize: engine === 'Single Engine' ? 14 : 12 }}>Single Engine</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.radBtn}
                            onPress={() => { setEngine('Multi Engine') }}>
                            {
                                engine === 'Multi Engine' ? <Ionicons name='radio-button-on' color={COLORS.lightyellow} size={16} /> :
                                    <Ionicons name='radio-button-off' color='gray' size={16} />
                            }
                            <Text style={{ color: engine === 'Multi Engine' ? COLORS.white : 'gray', marginLeft: 5, fontWeight: engine === 'Multi Engine' ? 'bold' : '500', fontSize: engine === 'Multi Engine' ? 14 : 12 }}>Multi Engine</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.radBtn}
                            onPress={() => { setEngine('Complex Engine') }}>
                            {
                                engine === 'Complex Engine' ? <Ionicons name='radio-button-on' color={COLORS.lightyellow} size={16} /> :
                                    <Ionicons name='radio-button-off' color='gray' size={16} />
                            }
                            <Text style={{ color: engine === 'Complex Engine' ? COLORS.white : 'gray', marginLeft: 5, fontWeight: engine === 'Complex Engine' ? 'bold' : '500', fontSize: engine === 'Complex Engine' ? 14 : 12 }}>Complex Engine</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ color: COLORS.white, fontWeight: 'bold', marginLeft: 16, fontSize: 13 }}>STATUS*</Text>
                    <View style={[styles.SectionStyle, { justifyContent: 'flex-start', marginRight: 45, marginTop: 1 }]}>
                        <TouchableOpacity style={[styles.radBtn, { marginLeft: 15 }]}
                            onPress={() => { setStatus('Active') }}>
                            {
                                status === 'Active' ? <Ionicons name='radio-button-on' color={COLORS.lightyellow} size={16} /> :
                                    <Ionicons name='radio-button-off' color='gray' size={16} />
                            }
                            <Text style={{ color: status === 'Active' ? COLORS.white : 'gray', marginLeft: 10, fontWeight: status === 'Active' ? 'bold' : '500', fontSize: status === 'Active' ? 14 : 12 }}>Active</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.radBtn, { marginLeft: 20 }]}
                            onPress={() => { setStatus('Inactive') }}>
                            {
                                status === 'Inactive' ? <Ionicons name='radio-button-on' color={COLORS.lightyellow} size={16} /> :
                                    <Ionicons name='radio-button-off' color='gray' size={16} />
                            }
                            <Text style={{ color: status === 'Inactive' ? COLORS.white : 'gray', marginLeft: 10, fontWeight: status === 'Inactive' ? 'bold' : '500', fontSize: status === 'Inactive' ? 14 : 12 }}>Inactive</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.SectionStyle, { justifyContent: 'space-around', alignItems: 'center' }]}>
                        <TouchableOpacity style={[styles.btnStyle, { height: 35, backgroundColor: COLORS.white, marginHorizontal: 30 }]}
                        onPress={Submit}>
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
});

//make this component available to the app
export default EditAircraft;

