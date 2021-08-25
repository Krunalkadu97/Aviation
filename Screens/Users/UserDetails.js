//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet,ScrollView,
TouchableOpacity,Image,FlatList} from 'react-native';
import HeaderBar from '../../Components/HeaderBar/Header';
import { COLORS, SIZES } from './../../constants/theme';
import { BASE_URL } from './../../base';
import Loader from '../Loader';
import {FontAwesome5,FontAwesome,MaterialIcons} from 'react-native-vector-icons'
// create a component
const UserDetails = ({ navigation, route }) => {
    const [udet, setUdet] = useState('');
    const [address, setAddress] = useState('');
    const [doc, setDoc] = useState('');
    const [loading, setLoading] = useState(true);

    const getUser = (e) => {
        const formdata = new FormData();
        formdata.append("US_ID", e);

        const requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch(BASE_URL+"/apis/admin/get_user_detail", requestOptions)
            .then(response => response.json())
            .then(result => {
                if(result.response===true){
                    setUdet(result.user_data);
                    setAddress(result.user_address_data);
                    setDoc(result.user_document_data);
                }else{
                    setUdet('');
                    setAddress('');
                    setDoc('');
                }
            })
            .catch(error => console.log('error', error))
            .finally(() => setLoading(false))
            .finally(setLoading.bind(undefined, false));
    }

    useEffect(() => {
        let { item } = route.params;

        getUser(item.US_ID);
    }, []);

    const renderItem = ({ item }) => (
        <View style={[styles.inBox, { flex: 1, width: SIZES.width * 0.88, marginRight: 4 }]}>
            <Text style={[styles.mT, { fontSize: 18, fontWeight: 'bold', paddingVertical: 4 }]}>{item.USD_NAME}</Text>
            <View style={{ flexDirection: 'row' }}>
            <View style={{width:'35%'}}>
                {
                    item.USD_FILE === null ?
                        <Image
                            source={{ uri: 'https://png.pngtree.com/png-clipart/20191107/ourmid/pngtree-blue-gradient-vintage-hand-drawn-certificate-border-png-image_1934770.jpg' }}
                            style={{
                                width: '100%',
                                height: 120,
                                marginTop: 8,
                                backgroundColor:COLORS.lightdark
                            }}
                            resizeMode='cover'
                        /> :
                        <Image
                            source={{ uri: item.USD_FILE }}
                            style={{
                                width: '100%',
                                height: 120,
                                marginTop: 8
                            }}
                            resizeMode='cover'
                        />
                }
                <Text style={styles.mT}>Status :{' '} </Text>
                <Text style={styles.sT}>{item.USD_STATUS}</Text>
                </View>
                <View style={{paddingLeft:8}}>
                    <Text style={styles.mT}>Document Number</Text>
                    <Text style={[styles.mT, { fontWeight: '200', fontSize: 14, color: 'gray' }]}>{item.USD_DOCUMENT_NO}</Text>
                    <Text style={[styles.mT, { fontWeight: 'bold' }]}>Issue Date </Text>
                    <Text style={[styles.mT, { fontWeight: '200', fontSize: 14, color: 'gray' }]}>{item.USD_ISSUE_DATE}</Text>
                    <Text style={[styles.mT, { fontWeight: 'bold' }]}>Expiry  Date</Text>
                    <Text style={[styles.mT, { fontWeight: '200', fontSize: 14, color: 'gray' }]}>{item.USD_EXPIRY_DATE}</Text>
                </View>
                <View style={{ position: 'absolute', top: -25, right: 0 }}>
                    <TouchableOpacity style={{
                        borderRadius: 6, justifyContent: 'center',
                        alignItems: 'center', backgroundColor: COLORS.lightgray,
                        padding: 5
                    }}
                    onPress={() => navigation.navigate('Edudoc', { dosc:item,ro:udet.US_RO_ID })}
                    >
                        <FontAwesome name='edit' color={COLORS.white} size={25} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        borderRadius: 6, justifyContent: 'center',
                        alignItems: 'center', backgroundColor: COLORS.lightgray,
                        padding: 5, marginTop: 20
                    }} 
                    //onPress={() => DeleteDoc(item)}
                    >
                        <MaterialIcons name='delete' color={COLORS.dark} size={25} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
    return (
        <View style={styles.container}>
        <Loader loading={loading} />
            <HeaderBar onPress={() => navigation.goBack()} />
            <View style={{ position: 'absolute', top: 60, left: 80, height: 40, justifyContent: 'center', alignItems: 'center' }}>
               {
                   udet ? <View>
                       {
                        udet.US_RO_ID === '3' ?
                        <Text style={styles.hTe}>INSTRUCTOR DETAILS </Text>:
                        <View>
                        {
                        udet.US_RO_ID === '4' ?
                        <Text style={styles.hTe}>STUDENT DETAILS </Text>:
                        <Text style={styles.hTe}>RENTER DETAILS </Text>
                        }
                        </View>
                       }
                   </View>:
                <Text style={styles.hTe}>USER DETAILS </Text>
               } 
            </View>
            <ScrollView style={{flex:1}}>
            {
                udet ? 
                <View>
                {
                    udet.US_PHOTO === null ? <Image
                        source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJUAPGQ-wCoHskfNpXjR4_TohIvgXbbnlYuw&usqp=CAU'}}
                        style={styles.img}
                        resizeMode='cover'
                    />:
                    <Image
                        source={{uri:udet.US_PHOTO}}
                        style={styles.img}
                        resizeMode='cover'
                    />
                }
                <Text style={styles.tH}>{udet.US_FIRST_NAME}{' '}{udet.US_MIDDLE_NAME}{' '}{udet.US_LAST_NAME}</Text>  
                <View style={{position:'absolute',top:10,right:20}}
                >
                <TouchableOpacity style={{padding:8,backgroundColor:COLORS.darkgray,borderRadius:6}}
                onPress={()=>navigation.navigate('edituser',{role:udet.US_RO_ID,item:udet})}>
                <FontAwesome5 name='user-edit' color={COLORS.white} size={25}/>
                </TouchableOpacity>
                <TouchableOpacity 
                style={{marginTop:15,padding:8,backgroundColor:COLORS.darkgray,borderRadius:6}}
                onPress={()=>navigation.navigate('Wallet')}>
                <FontAwesome5 name='wallet' color={COLORS.white} size={25}/>
                </TouchableOpacity>
                </View>  
                <View style={styles.oBox}>
                    <View style={styles.inBox}>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                            <Text style={styles.mT}>Gender :{' '}<Text style={styles.sT}>{udet.US_GENDER}</Text> </Text>
                            <Text style={styles.mT}>D.O.B : {' '}<Text style={styles.sT}>{udet.US_DATE_OF_BIRTH}</Text></Text>
                        </View>
                        <Text style={styles.mT}>Registration Number  :{' '}<Text style={styles.sT}>{udet.US_REGISTRATION_NO}</Text> </Text>
                        <Text style={styles.mT}>Email   :{' '}<Text style={styles.sT}>{udet.US_EMAIL}</Text> </Text>
                        <Text style={styles.mT}>Phone   :{' '}<Text style={styles.sT}>{udet.US_COUNTRY_CODE}{' - '}{udet.US_PHONE_NO}</Text> </Text>
                        <Text style={styles.mT}>Username    :{' '}<Text style={styles.sT}>{udet.US_USER_NAME}</Text> </Text>
                        <Text style={styles.mT}>Wallet Amount    :{' '}<Text style={styles.sT}>{udet.US_BALANCE ||0}</Text> </Text>
                    </View>
                </View>
                <View style={[styles.oBox,{borderRadius:8,padding:5}]}>
                {
                   udet ? <View>
                       {
                        udet.US_RO_ID === '3' ?
                        <Text style={[styles.tH,{padding:5}]}>INSTRUCTOR ADDRESS</Text>:
                        
                        <View>
                        {
                        udet.US_RO_ID === '4' ?
                        <Text style={[styles.tH,{padding:5}]}>STUDENT ADDRESS </Text>:
                        <Text style={[styles.tH,{padding:5}]}>RENTER ADDRESS </Text>
                        }
                        </View>
                       }
                   </View>:
                <Text style={styles.tH}>USER ADDRESS </Text>
               } 
                
                <View style={styles.sep}/>
                    <TouchableOpacity style={styles.btn}
                    onPress={()=>navigation.navigate('Addua',{item:udet})}>
                        <Text style={{color:COLORS.white,fontWeight:'bold'}}>ADD</Text>
                    </TouchableOpacity>
                    {
                        address ? <View>
                            {
                                address.length < 1 ? <View style={[styles.inBox,{borderRadius:0}]}>
                                <Text style={{color:COLORS.white,fontWeight:'bold',textAlign:'center',padding:10}}>Data Not Available</Text>
                                </View>:
                                <FlatList
                    data={address}
                    keyExtractor={item => `${item.USA_ID}`}
                    renderItem={({ item, index }) => (
                        <View style={[styles.inBox, { flex: 1, width: SIZES.width * 0.83, marginRight: 4 }]}
                        key={index}>
                        <Text style={{color:COLORS.white,fontWeight:'bold',fontSize:16,textAlign:'center'}}>ADDRESS TYPE : {item.USA_ADDRESS_TYPE}</Text>
                        <View style={styles.sep}/>
                        <View style={{padding:10}}>
                        <Text style={{color:COLORS.white,fontSize:14}}>ADDRESS : {item.USA_ADDRESS}</Text>
                            <Text style={{color:COLORS.white,fontSize:14}}>City : {item.USA_CITY}</Text>
                            <Text style={{color:COLORS.white,fontSize:14}}>State  : {item.USA_STATE}</Text>
                            <Text style={{color:COLORS.white,fontSize:14}}>Country  : {item.USA_COUNTRY}</Text>
                            <Text style={{color:COLORS.white,fontSize:14}}>ZIP Code : {item.USA_ZIPCODE}</Text>
                        </View>
                        <View style={styles.sep}/>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',padding:5}}>
                           <TouchableOpacity style={{marginRight:15}}
                           onPress={() => navigation.navigate('eduAdds', {item,role:udet })}>
                           <FontAwesome name='edit' size={25} color={COLORS.white} />
                           </TouchableOpacity>
                           <TouchableOpacity>
                           <MaterialIcons name='delete' size={25} color={COLORS.white} />
                           </TouchableOpacity>
                         </View>
                        </View>
                    )}
                    horizontal
                      showsHorizontalScrollIndicator={false}
                  />
                            }
                        </View>:<View/>
                    }
                </View>
                <View style={[styles.oBox,{borderRadius:8,padding:5}]}>
                {
                   udet ? <View>
                       {
                        udet.US_RO_ID === '3' ?
                        <Text style={[styles.tH,{padding:5}]}>INSTRUCTOR DOCUMENT</Text>:
                        
                        <View>
                        {
                        udet.US_RO_ID === '4' ?
                        <Text style={[styles.tH,{padding:5}]}>STUDENT DOCUMENT </Text>:
                        <Text style={[styles.tH,{padding:5}]}>RENTER DOCUMENT </Text>
                        }
                        </View>
                       }
                   </View>:
                <Text style={styles.hTe}>USER DOCUMENT </Text>
               } 
                
                <View style={styles.sep}/>
                    <TouchableOpacity style={styles.btn}
                    onPress={()=>navigation.navigate('Addudoc',{item:udet})}>
                        <Text style={{color:COLORS.white,fontWeight:'bold'}}>ADD</Text>
                    </TouchableOpacity>
                    {
                        doc ? <View>
                            {
                                doc.length < 1 ? <View style={[styles.inBox,{borderRadius:0}]}>
                                <Text style={{color:COLORS.white,fontWeight:'bold',textAlign:'center',padding:10}}>Data Not Available</Text>
                                </View>:
                                <View style={{ marginTop: 5 }}>
                                        <FlatList
                                            data={doc}
                                            keyExtractor={item => `${item.USD_DOCUMENT_NO}`}
                                            renderItem={renderItem}
                                            horizontal
                                            showsHorizontalScrollIndicator={false}
                                            contentContainerStyle={{ paddingVertical: 5 }}
                                        />
                                </View>
                            }
                        </View>:<View/>
                    }
                </View>
                
                </View>:
                <View/>
            }
                

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
    hTe:{
        color: COLORS.white, fontSize: 16, fontWeight: 'bold',
        textAlign: 'center', textTransform: 'uppercase'
    },
    img:{
        width:140,height:140,
        borderRadius:70,
        alignSelf:'center'
    },
    tH:{
        color:COLORS.white,textAlign:'center',
        fontSize:16,padding:10,
        fontWeight:'bold'
    },
    oBox:{
        flex:1,width:SIZES.width*0.94,
        backgroundColor:COLORS.darkgray,
        alignSelf:'center',
        marginVertical:4
    },
    mT:{
        color:COLORS.white,fontWeight:'bold',
        fontSize:14,
        paddingVertical:4
    },
    sT:{
        color:COLORS.white,
        fontWeight:'400',fontSize:13
    },
    sep:{
        height:1,
        backgroundColor:COLORS.white,
        marginVertical:2,
        marginHorizontal:5
    },
    btn:{
        flex:1,height:35,
        width:90,justifyContent:'center',
        alignItems:'center',borderWidth:1,
        borderColor:COLORS.white,borderRadius:10,marginTop:5,
        alignSelf:'flex-end',marginRight:10 
    },
    inBox:{ 
        flex:1,backgroundColor:COLORS.lightdark
        ,padding:10,margin:5,borderRadius:15
    }

});

//make this component available to the app
export default UserDetails;
