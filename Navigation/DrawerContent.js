import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform, Share, Alert } from 'react-native'

import { Entypo, MaterialCommunityIcons, FontAwesome5, Feather, Ionicons, FontAwesome } from 'react-native-vector-icons'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { COLORS } from './../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from './../base';
const onShare = () => {
    let text = 'hello'
    if (Platform.OS === 'android')
        text = text.concat('http://dentistlive247.com/')
    else
        text = text.concat('http://dentistlive247.com/')
    Share.share({
        subect: 'Dentist Live',
        title: 'Dentist Live',
        message: text,
        url: 'app://dentist_live',

    }, {
        //android
        dialogTitle: 'Please Like Share and Subscribe !!!',
        //IOS
        excludedActivityTypes: []
    })
}

export function DrawerContent(props) {
    const [user, setUser] = useState('');
    const [isUser, setIsUser] = useState(false);
    const [isConf, setIsConf] = useState(false);
    const userInfo = useSelector(state => state.users);
    const userRole = useSelector(state => state.role);

    const getData = async () => {
        try {
            await AsyncStorage.getItem('user_id').then((value) =>
            getUser(value));
           
          } catch(e) {
            // error reading value
            console.error(e)
          }
    }

    const getUser = (e) => {
        const myHeaders = new Headers();

        const formdata = new FormData();
        formdata.append("US_ID", e);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(BASE_URL+"/apis/general/get_profile", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.response === true) {
                    setUser(result.user_data);
                } else {
                    setUser('');
                }
            })
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        getData();
    }, []);
    return (
        <View style={{ flex: 1, marginVertical: 10, backgroundColor: COLORS.lightgray }}>
            <TouchableOpacity style={styles.header}
                onPress={() => { props.navigation.closeDrawer(); }}>
                <Entypo name='cross' size={30} color={COLORS.white} />
            </TouchableOpacity>
            <DrawerContentScrollView {...props}>
                {
                    user === '' || undefined ? <View>
                        <View style={styles.profile}>
                            <Image
                                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcaHa76x9Ub4pBpc2Oth_fVuYn5gJ3zfkgpQ&usqp=CAU' }}
                                style={styles.image}
                            />
                            <Text style={styles.h1}>Abc def</Text>
                        </View>
                        <View style={styles.flo}>
                            <MaterialCommunityIcons name='email' size={20} color='grey' />
                            <Text style={styles.h2}>abc@gmail.com</Text>
                        </View>
                        <View style={[styles.flo, { borderBottomWidth: 1, borderBottomColor: 'grey', marginHorizontal: 6 }]}>
                            <FontAwesome5 name='phone-alt' size={18} color='grey' />
                            <Text style={styles.h2}>+91 1234567890</Text>
                        </View>

                    </View> :
                        <View>
                            <View style={styles.profile}>
                                <Image
                                    source={{ uri: user.US_PHOTO }}
                                    style={styles.image}
                                />
                                <Text style={styles.h1}>{user.US_FIRST_NAME}{' '}{user.US_LAST_NAME}</Text>
                            </View>
                            <View style={styles.flo}>
                                <MaterialCommunityIcons name='email' size={20} color='grey' />
                                <Text style={styles.h2}>{' '}{user.US_EMAIL}</Text>
                            </View>
                            <View style={[styles.flo, { borderBottomWidth: 1, borderBottomColor: 'grey', marginHorizontal: 6 }]}>
                                <FontAwesome5 name='phone-alt' size={18} color='grey' />
                                <Text style={styles.h2}>{user.US_COUNTRY_CODE}{'-'}{user.US_PHONE_NO}</Text>
                            </View>

                        </View>
                }

                {
                    userRole === '2' ?
                        <View style={{ marginVertical: 10, borderBottomWidth: 1, borderBottomColor: 'grey', marginHorizontal: 6 }}>
                            <DrawerItem
                                icon={() => (
                                    <FontAwesome name='bank' size={18} color='grey' />
                                )}
                                label='My Company'
                                labelStyle={{ color: COLORS.lightred, fontSize: 15 }}
                                onPress={() => props.navigation.navigate('Home')}
                            />
                            <TouchableOpacity style={{
                                flexDirection: 'row', justifyContent: 'space-between',
                                alignItems: 'center', marginVertical: 10,
                            }}
                                onPress={() => { setIsUser(!isUser) }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: 18 }}>
                                    <FontAwesome5 name='user-alt' size={18} color='grey' />
                                    <Text style={{ color: COLORS.lightred, fontSize: 15, marginLeft: 32 }}>Users</Text>
                                </View>
                                <View style={{ marginRight: 25 }}>
                                    {
                                        isUser ? <Ionicons name='chevron-down' size={18} color={COLORS.lightred} /> :
                                            <Ionicons name='chevron-forward' size={18} color={COLORS.lightred} />
                                    }

                                </View>
                            </TouchableOpacity>
                            {
                                isUser ? <View style={{ marginLeft: 10 }}>
                                    <View style={styles.sep} />
                                    <DrawerItem
                                        icon={() => (
                                            <Ionicons name='md-person-circle' size={18} color='grey' />
                                        )}
                                        label='Instructor'
                                        labelStyle={{ color: COLORS.lightred, fontSize: 15 }}
                                        onPress={() => props.navigation.navigate('useri')}
                                    />
                                    <DrawerItem
                                        icon={() => (
                                            <Ionicons name='md-person-circle' size={18} color='grey' />
                                        )}
                                        label='Student'
                                        labelStyle={{ color: COLORS.lightred, fontSize: 15 }}
                                        onPress={() => props.navigation.navigate('userst')}
                                    />
                                    <DrawerItem
                                        icon={() => (
                                            <Ionicons name='md-person-circle' size={18} color='grey' />
                                        )}
                                        label='Renter'
                                        labelStyle={{ color: COLORS.lightred, fontSize: 15 }}
                                        onPress={() => props.navigation.navigate('userre')}
                                    /><View style={styles.sep} />
                                </View> : <View />
                            }
                            <DrawerItem
                                icon={() => (
                                    <Ionicons name='airplane' size={18} color='grey' />
                                )}
                                label='Aircraft'
                                labelStyle={{ color: COLORS.lightred, fontSize: 15 }}
                                onPress={() => props.navigation.navigate('aircraft')}
                            />
                            <TouchableOpacity style={{
                                flexDirection: 'row', justifyContent: 'space-between',
                                alignItems: 'center', marginVertical: 10
                            }}
                                onPress={() => { setIsConf(!isConf) }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: 18 }}>
                                    <FontAwesome5 name='cogs' size={18} color='grey' />
                                    <Text style={{ color: COLORS.lightred, fontSize: 15, marginLeft: 27 }}>Configuration</Text>
                                </View>
                                <View style={{ marginRight: 25 }}>
                                    {
                                        isConf ? <Ionicons name='chevron-down' size={18} color={COLORS.lightred} /> :
                                            <Ionicons name='chevron-forward' size={18} color={COLORS.lightred} />
                                    }

                                </View>
                            </TouchableOpacity>
                            {
                                isConf ? <View style={{ marginLeft: 10 }}>
                                    <View style={styles.sep} />
                                    <DrawerItem
                                        icon={() => (
                                            <Ionicons name='link' size={18} color='grey' />
                                        )}
                                        label='Rating'
                                        labelStyle={{ color: COLORS.lightred, fontSize: 15 }}
                                        onPress={() => props.navigation.navigate('rat')}
                                    />
                                    <DrawerItem
                                        icon={() => (
                                            <Ionicons name='link' size={18} color='grey' />
                                        )}
                                        label='Rating Type'
                                        labelStyle={{ color: COLORS.lightred, fontSize: 15 }}
                                        onPress={() => props.navigation.navigate('ratty')}
                                    />
                                    <DrawerItem
                                        icon={() => (
                                            <Ionicons name='link' size={18} color='grey' />
                                        )}
                                        label='Rating Price'
                                        labelStyle={{ color: COLORS.lightred, fontSize: 15 }}
                                        onPress={() => props.navigation.navigate('ratpr')}
                                    />
                                    <View style={styles.sep} />
                                </View> :
                                    <View />
                            }
                            <DrawerItem
                                icon={() => (
                                    <FontAwesome5 name='calendar-check' size={18} color='grey' />
                                )}
                                label='Reservation'
                                labelStyle={{ color: COLORS.lightred, fontSize: 15 }}
                                onPress={() => props.navigation.navigate('reservation')}
                            />
                            <DrawerItem
                                icon={() => (
                                    <FontAwesome5 name='tools' size={18} color='grey' />
                                )}
                                label='Maintenance'
                                labelStyle={{ color: COLORS.lightred, fontSize: 15 }}
                                onPress={() => props.navigation.navigate('maint')}
                            />
                            <DrawerItem
                                icon={() => (
                                    <FontAwesome5 name='file-invoice-dollar' size={18} color='grey' />
                                )}
                                label='Invoice List'
                                labelStyle={{ color: COLORS.lightred, fontSize: 15 }}
                                onPress={() => props.navigation.navigate('inList')}
                            />
                        </View> :
                        <View>
                            {
                                userRole === '3' ? <View style={{ marginVertical: 10, borderBottomWidth: 1, borderBottomColor: 'grey', marginHorizontal: 6 }}>
                                    <DrawerItem
                                        icon={() => (
                                            <FontAwesome name='bank' size={18} color='grey' />
                                        )}
                                        label='My Company'
                                        labelStyle={{ color: COLORS.lightred, fontSize: 15 }}
                                        onPress={() => props.navigation.navigate('Home')}
                                    />
                                    <DrawerItem
                                        icon={() => (
                                            <Ionicons name='airplane' size={18} color='grey' />
                                        )}
                                        label='Aircraft'
                                        labelStyle={{ color: COLORS.lightred, fontSize: 15 }}
                                        onPress={() => props.navigation.navigate('aircraft')}
                                    />
                                    <TouchableOpacity style={{
                                        flexDirection: 'row', justifyContent: 'space-between',
                                        alignItems: 'center', marginVertical: 10,
                                    }}
                                        onPress={() => { setIsUser(!isUser) }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: 18 }}>
                                            <FontAwesome5 name='user-alt' size={18} color='grey' />
                                            <Text style={{ color: COLORS.lightred, fontSize: 15, marginLeft: 32 }}>Users</Text>
                                        </View>
                                        <View style={{ marginRight: 25 }}>
                                            {
                                                isUser ? <Ionicons name='chevron-down' size={18} color={COLORS.lightred} /> :
                                                    <Ionicons name='chevron-forward' size={18} color={COLORS.lightred} />
                                            }

                                        </View>
                                    </TouchableOpacity>
                                    {
                                        isUser ? <View style={{ marginLeft: 10 }}>
                                            <View style={styles.sep} />

                                            <DrawerItem
                                                icon={() => (
                                                    <Ionicons name='md-person-circle' size={18} color='grey' />
                                                )}
                                                label='Student'
                                                labelStyle={{ color: COLORS.lightred, fontSize: 15 }}
                                                onPress={() => props.navigation.navigate('userst')}
                                            />
                                            <DrawerItem
                                                icon={() => (
                                                    <Ionicons name='md-person-circle' size={18} color='grey' />
                                                )}
                                                label='Renter'
                                                labelStyle={{ color: COLORS.lightred, fontSize: 15 }}
                                                onPress={() => props.navigation.navigate('userre')}
                                            /><View style={styles.sep} />
                                        </View> : <View />
                                    }
                                    <DrawerItem
                                        icon={() => (
                                            <FontAwesome5 name='calendar-check' size={18} color='grey' />
                                        )}
                                        label='Reservation'
                                        labelStyle={{ color: COLORS.lightred, fontSize: 15 }}
                                        onPress={() => props.navigation.navigate('reservation')}
                                    />
                                    <DrawerItem
                                        icon={() => (
                                            <FontAwesome5 name='file-invoice-dollar' size={18} color='grey' />
                                        )}
                                        label='Invoice List'
                                        labelStyle={{ color: COLORS.lightred, fontSize: 15 }}
                                        onPress={() => props.navigation.navigate('inList')}
                                    />
                                </View> :
                                    <View style={{ marginVertical: 10, borderBottomWidth: 1, borderBottomColor: 'grey', marginHorizontal: 6 }}>
                                        <DrawerItem
                                            icon={() => (
                                                <FontAwesome name='bank' size={18} color='grey' />
                                            )}
                                            label='My Company'
                                            labelStyle={{ color: COLORS.lightred, fontSize: 15 }}
                                            onPress={() => props.navigation.navigate('Home')}
                                        />
                                        <DrawerItem
                                            icon={() => (
                                                <Ionicons name='airplane' size={18} color='grey' />
                                            )}
                                            label='Aircraft'
                                            labelStyle={{ color: COLORS.lightred, fontSize: 15 }}
                                            onPress={() => props.navigation.navigate('aircraft')}
                                        />
                                        <DrawerItem
                                            icon={() => (
                                                <FontAwesome5 name='calendar-check' size={18} color='grey' />
                                            )}
                                            label='Reservation'
                                            labelStyle={{ color: COLORS.lightred, fontSize: 15 }}
                                            onPress={() => props.navigation.navigate('reservation')}
                                        />
                                        <DrawerItem
                                            icon={() => (
                                                <FontAwesome5 name='file-invoice-dollar' size={18} color='grey' />
                                            )}
                                            label='Invoice List'
                                            labelStyle={{ color: COLORS.lightred, fontSize: 15 }}
                                            onPress={() => props.navigation.navigate('inList')}
                                        />
                                    </View>
                            }
                        </View>
                }




                <View style={{ marginVertical: 10 }}>
                    <DrawerItem
                        icon={() => (
                            <FontAwesome5 name='sign-out-alt' size={18} color='grey' />
                        )}
                        label='Logout'
                        labelStyle={{ color: COLORS.lightred, fontSize: 15 }}
                        onPress={() => {
                            props.navigation.toggleDrawer();
                            Alert.alert(
                                'Logout',
                                'Are you sure? You want to logout?',
                                [
                                    {
                                        text: 'Cancel',
                                        onPress: () => {
                                            return null;
                                        },
                                    },
                                    {
                                        text: 'Confirm',
                                        onPress: () => {
                                            AsyncStorage.clear();
                                            props.navigation.replace('Auth');
                                        },
                                    },
                                ],
                                { cancelable: false },
                            );
                        }}
                    />
                </View>
            </DrawerContentScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'flex-end',
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    profile: {
        alignItems: 'center',
        marginTop: 5,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: 'grey'
    },
    h1: {
        marginVertical: 5,
        fontWeight: 'bold',
        fontSize: 16,
        color: COLORS.white
    },
    flo: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 6
    },
    h2: {
        marginVertical: 5,
        fontWeight: '800',
        fontSize: 14,
        color: COLORS.lightyellow,
        marginLeft: 15
    },
    sep: {
        height: 1,
        backgroundColor: COLORS.lightred,
        marginVertical: 4,
        marginHorizontal: 20,
        marginTop: 10
    }
})