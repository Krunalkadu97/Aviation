//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import HeaderBar from '../../Components/HeaderBar/Header';
import { COLORS, SIZES } from './../../constants/theme';
import { BASE_URL } from './../../base';
import Loader from './../Loader';
import { MaterialIcons, FontAwesome } from 'react-native-vector-icons'
import { useSelector } from 'react-redux';
// create a component
const AircraftDetails = ({ navigation, route }) => {
    const [air, setAir] = useState('');
    const [doc, setDoc] = useState('');
    const [loading, setLoading] = useState(true);
    const userCo = useSelector(state => state.coid);
    const [error,setError]= useState('');
    const [dos,setDos]= useState('');
    const userRole = useSelector(state => state.role);
    const getAird = (e) => {
        const myHeaders = new Headers();

        const formdata = new FormData();
        formdata.append("AI_ID", e);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(BASE_URL + "/apis/general/get_aircraft_detail", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.response) {
                    setAir(result.aircarft_data);
                    setDoc(result.aircraft_document_data);
                } else {
                    setAir('');
                    setDoc('');
                }
            })
            .catch(error => console.error('error', error))
            .finally(() => setLoading(false))
            .finally(setLoading.bind(undefined, false));
    }

    useEffect(() => {
        let { item } = route.params;
        
        getAird(item.AI_ID);
        setDos(item.AI_ID);
        const unsubscribe = navigation.addListener('focus', () => {
            getAird(dos||item.AI_ID);
        });
        return unsubscribe;
    }, [navigation]);

    const DeleteDoc = (e) => {
        const myHeadersd = new Headers();
       
        const formdatad = new FormData();
        formdatad.append("AID_ID", e.AID_ID);
        formdatad.append("USER_CO_ID", userCo);

        const requestOptionsd = {
            method: 'POST',
            headers: myHeadersd,
            body: formdatad,
            redirect: 'follow'
        };

        fetch(BASE_URL+"/apis/admin/delete_aircraft_document", requestOptionsd)
            .then(response => response.json())
            .then(result => {
                if(result.response===true){
                    getAird(dos);
                }else{
                    setError(result.message);
                }
            })
            .catch(error => console.log('error', error));
    }

    const renderItem = ({ item }) => (
        <View style={[styles.inBox, { flex: 1, width: SIZES.width * 0.88, marginRight: 4 }]}>
            <Text style={[styles.htext, { fontSize: 18, fontWeight: '800', paddingVertical: 4 }]}>{item.AID_NAME}</Text>
            <View style={{ flexDirection: 'row' }}>
                {
                    item.AID_FILE === null ?
                        <Image
                            source={{ uri: 'https://png.pngtree.com/png-clipart/20191107/ourmid/pngtree-blue-gradient-vintage-hand-drawn-certificate-border-png-image_1934770.jpg' }}
                            style={{
                                width: '35%',
                                height: 100,
                                marginTop: 8,
                                backgroundColor:COLORS.lightdark
                            }}
                            resizeMode='contain'
                        /> :
                        <Image
                            source={{ uri: item.AID_FILE }}
                            style={{
                                width: '35%',
                                height: 100,
                                marginTop: 8
                            }}
                            resizeMode='contain'
                        />
                }
                <View>
                    <Text style={[styles.sText, { fontWeight: 'bold' }]}>Document Number</Text>
                    <Text style={[styles.sText, { fontWeight: '200', fontSize: 14, color: 'gray' }]}>{item.AID_DOCUMENT_NO}</Text>
                    <Text style={[styles.sText, { fontWeight: 'bold' }]}>Issue Date </Text>
                    <Text style={[styles.sText, { fontWeight: '200', fontSize: 14, color: 'gray' }]}>{item.AID_ISSUE_DATE}</Text>
                    <Text style={[styles.sText, { fontWeight: 'bold' }]}>Expiry  Date</Text>
                    <Text style={[styles.sText, { fontWeight: '200', fontSize: 14, color: 'gray' }]}>{item.AID_EXPIRY_DATE}</Text>
                </View>
                {
                    userRole==='2' ?<View style={{ position: 'absolute', top: -25, right: 0 }}>
                    <TouchableOpacity style={{
                        borderRadius: 6, justifyContent: 'center',
                        alignItems: 'center', backgroundColor: COLORS.lightgray,
                        padding: 5
                    }}
                    onPress={() => navigation.navigate('editadoc', { item: air.AI_ID,dosc:item })}>
                        <FontAwesome name='edit' color={COLORS.white} size={25} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        borderRadius: 6, justifyContent: 'center',
                        alignItems: 'center', backgroundColor: COLORS.lightgray,
                        padding: 5, marginTop: 20
                    }} onPress={() => DeleteDoc(item)}>
                        <MaterialIcons name='delete' color={COLORS.dark} size={25} />
                    </TouchableOpacity>
                </View>:
                <View/>
                }
                
            </View>
        </View>
    )
    return (
        <View style={styles.container}>
            <Loader loading={loading} />
            <HeaderBar onPress={() => navigation.goBack()} />
            <View style={{ position: 'absolute', top: 60, left: 80, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{
                    color: COLORS.white, fontSize: 18, fontWeight: 'bold',
                    textAlign: 'center', textTransform: 'uppercase'
                }}>AIRCRAFT </Text>
            </View>
            <Text style={{color:COLORS.dark}}>{error}</Text>
            <ScrollView style={{ flex: 1 }}>
                {
                    air ? <View style={{ flex: 1 }}>
                        {air.AI_PHOTO === null ?
                            <Image
                                source={{ uri: 'https://images.unsplash.com/photo-1605667170199-8fab72fb871b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80' }}
                                style={{
                                    flex: 1,
                                    height: SIZES.height * 0.3,
                                    borderWidth: 1,
                                    borderColor: COLORS.lightgray,
                                    margin: 5
                                }}
                                resizeMode='contain'
                            /> :
                            <Image
                                source={{ uri: air.AI_PHOTO }}
                                style={{
                                    flex: 1,
                                    height: SIZES.height * 0.3,
                                    borderWidth: 1,
                                    borderColor: COLORS.lightgray,
                                    margin: 5
                                }}
                                resizeMode='contain'
                            />
                        }
                        <View style={styles.con}>
                            <Text style={styles.htext}>{air.AI_NAME}</Text>
                            {
                                userRole==='2' ? <TouchableOpacity style={{
                                position: 'absolute', right: 15, top: 10
                            }}
                            onPress={()=>navigation.navigate('editaircraft',{item:air})}>
                                <FontAwesome name='edit' color={COLORS.white} size={25} />
                            </TouchableOpacity>:
                            <View/>
                            }
                            
                            <View style={styles.inBox}>
                                <View style={styles.bBox}>
                                    <View style={styles.bBox}>
                                        <View style={styles.image}>
                                            <Image
                                                source={{ uri: 'https://s3.us-west-2.amazonaws.com/airleasecorp/s3_airleasecorp/map_markers/alc_tail_airarabia.png' }}
                                                style={{
                                                    width: '80%',
                                                    height: '80%',
                                                    borderRadius: 8
                                                }}
                                            />
                                        </View>
                                        <Text style={styles.sText}>Tail No - </Text>
                                    </View>
                                    <Text style={styles.sText}>{air.AI_TAIL_NO} </Text>
                                </View>
                                <View style={styles.bBox}>
                                    <View style={styles.bBox}>
                                        <View style={styles.image}>
                                            <Image
                                                source={{ uri: 'https://www.pngkit.com/png/full/131-1313683_3d-airplane-icon.png' }}
                                                style={{
                                                    width: '80%',
                                                    height: '80%',
                                                    borderRadius: 8
                                                }}
                                            />
                                        </View>
                                        <Text style={styles.sText}>Model - </Text>
                                    </View>

                                    <Text style={styles.sText}>{air.AI_MODEL} </Text>
                                </View>
                                <View style={styles.bBox}>
                                    <View style={styles.bBox}>
                                        <View style={styles.image}>
                                            <Image
                                                source={{ uri: 'https://static.thenounproject.com/png/108751-200.png' }}
                                                style={{
                                                    width: '80%',
                                                    height: '80%',
                                                    borderRadius: 8
                                                }}
                                                resizeMode='contain'
                                            />
                                        </View>
                                        <Text style={styles.sText}>Engine Type - </Text>
                                    </View>
                                    <Text style={styles.sText}>{air.AI_ENGINE_TYPE} </Text>
                                </View>
                                <View style={styles.bBox}>
                                    <View style={styles.bBox}>
                                        <View style={styles.image}>
                                            {
                                                air.AI_STATUS === 'Active' ?
                                                    <MaterialIcons name='check-circle' color='green' size={25} /> :
                                                    <MaterialIcons name='cancel' color={COLORS.dark} size={25} />
                                            }
                                        </View>
                                        <Text style={styles.sText}>Status - </Text>
                                    </View>
                                    <Text style={styles.sText}>{air.AI_STATUS} </Text>
                                </View>
                            </View>
                        </View>
                    </View> : <View />
                }
                <View style={styles.con}>
                    <Text style={[styles.htext, { fontSize: 18 }]}>AIRCRAFT DOCUMENTS</Text>
                    <View style={styles.sep} />
                    {
                        userRole==='2' ?  <TouchableOpacity style={styles.btn}
                        onPress={() => navigation.navigate('adocadd', { item: air.AI_ID })}>
                        <Text style={[styles.sText, { marginLeft: 0, fontWeight: 'bold' }]}>ADD</Text>
                    </TouchableOpacity>:<View/>
                    }
                   
                    {
                        doc ? <View>
                            {
                                doc.length < 1 ?
                                    <Text style={{ color: COLORS.white, textAlign: 'center' }}>No Data Yet</Text> :
                                    <View style={{ marginTop: 5 }}>
                                        <FlatList
                                            data={doc}
                                            keyExtractor={item => `${item.AID_ID}`}
                                            renderItem={renderItem}
                                            horizontal
                                            showsHorizontalScrollIndicator={false}
                                            contentContainerStyle={{ paddingVertical: 5 }}
                                        />
                                    </View>
                            }
                        </View> :
                            <View />
                    }
                </View>
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
    con: {
        flex: 1, marginTop: 5,
        backgroundColor: COLORS.darkgray,
        padding: 10, marginHorizontal: 5
    },
    inBox: {
        backgroundColor: COLORS.lightdark,
        padding: 10, borderRadius: 15
    },
    bBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 2
    },
    image: {
        width: 40,
        height: 30,
        backgroundColor: COLORS.lightgray,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    htext: {
        color: COLORS.white,
        fontWeight: 'bold', fontSize: 22,
        textAlign: 'center'
    },
    sText: {
        color: COLORS.white,
        fontSize: 16, marginLeft: 15,
        fontWeight: '100'
    },
    sep: {
        height: 1,
        backgroundColor: COLORS.white
    },
    btn: {
        height: 35,
        width: 90,
        borderWidth: 0.4,
        borderColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        alignSelf: 'flex-end',
        borderRadius: 6,
        elevation: 60,
    }
});

//make this component available to the app
export default AircraftDetails;
