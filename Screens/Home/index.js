//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform, FlatList } from 'react-native';
import { COLORS, SIZES } from './../../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './../Loader';
import { BASE_URL } from './../../base';
import FlipCard from 'react-native-flip-card';
import {Ionicons,FontAwesome,MaterialCommunityIcons,Fontisto,FontAwesome5,Entypo} from 'react-native-vector-icons'
// create a component
const Home = ({ navigation }) => {
    
    const [company, setCompany] = useState('');
    const [companyAd, setCompanyAd] = useState('');
    const [companyDoc, setCompanyDoc] = useState('');
    const [loading, setLoading] = useState(true);
    const userCo = useSelector(state => state.coid);
    const getData = async () => {
        try {
          await AsyncStorage.getItem('user_coid').then((value) =>
          getCompany(value)
          );          
        } catch(e) {
          // error reading value
          console.error(e)
        }
      }
    const getCompany = (e) => {
           
        const myHeaders = new Headers();

        const formdata = new FormData();
        formdata.append("CO_ID", e);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(BASE_URL + "/apis/general/get_company_detail", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.response === true) {
                    setCompany(result.company_data);
                    setCompanyAd(result.company_address_data);
                    setCompanyDoc(result.company_document_data);
                } else {
                    setCompany('');
                    setCompanyAd('');
                    setCompanyDoc('');
                }
            })
            .catch(error => console.log('error', error))
            .finally(() => setLoading(false))
            .finally(setLoading.bind(undefined, false));
    }
    useEffect(() => {
       
        getData();
    }, [])
    const renderItem=({item})=>{
        return(
          <View style={{padding:10,backgroundColor:COLORS.lightdark,margin:1,width:SIZES.width*0.88,borderRadius:15}}>
            <Text style={[styles.stext,{fontSize:18}]}>{item.COD_NAME}</Text>
            <View style={{flexDirection:'row'}}>
            <View>
              <Image
                source={{uri:item.COD_FILE}}
                style={{width:100,height:120,borderWidth:1,borderColor:COLORS.lightyellow,marginTop:5,borderRadius:15}}
                resizeMode='cover'
              />
            </View>
            <View style={{padding:5}}>
            <Text style={[styles.stext,{width:'100%'}]}> Document Number :</Text>
            <Text style={[styles.stext,{paddingLeft:20,color:COLORS.limegray,fontWeight:'700'}]}> {item.COD_DOCUMENT_NO}</Text>
            <Text style={[styles.stext,{width:'100%'}]}> Document Issued Date :</Text>
            <Text style={[styles.stext,{paddingLeft:20,color:COLORS.limegray,fontWeight:'700'}]}> {item.COD_ISSUE_DATE}</Text>
            <Text style={[styles.stext,{width:'100%'}]}> Document Expiry Date :</Text>
            <Text style={[styles.stext,{paddingLeft:20,color:COLORS.limegray,fontWeight:'700'}]}> {item.COD_EXPIRY_DATE}</Text>
            </View>
            </View>
          </View>
        )
        }
    return (
        <View style={styles.container}>
            <Loader loading={loading} />
            <ScrollView style={styles.container}>
                <View style={styles.head}>
                    <TouchableOpacity style={[styles.icon, styles.shadow]}
                        onPress={() => { navigation.openDrawer(); }}>
                        <View style={styles.iconView}>
                            <Entypo name='menu' color={COLORS.lightyellow} size={30} />
                        </View>
                    </TouchableOpacity>
                </View>
                {
                    company ? <View>
                        {
                            company.length < 1 ? <Text>No data found</Text>:
                            <View style={styles.hBox}>
                    <Image
                        source={{ uri: 'https://image.shutterstock.com/image-vector/vector-logo-design-illustration-tour-260nw-1013353189.jpg' }}
                        style={{
                            width: '30%',
                            height: 150
                        }}
                    />

                    <FlipCard
                        style={[styles.shadow, styles.flipD]}
                        friction={6}
                        perspective={1000}
                        flipHorizontal={true}
                        flipVertical={false}
                        flip={false}
                        clickable={true}
                        onFlipEnd={(isFlipEnd) => { console.log('isFlipEnd', isFlipEnd) }}
                    >
                        {/* Face Side */}
                        <View style={[{
                            flex: 1,
                            backgroundColor: COLORS.lightdark,
                        }]}>
                            <Text style={{ color: COLORS.lightyellow, fontWeight: 'bold', fontSize: 22, paddingVertical: 8 }}>{company.CO_NAME}</Text>
                            <Text style={{ color: COLORS.lightred, fontWeight: '600', fontSize: 18, paddingVertical: 5 }}>About Company :</Text>
                            <Text style={{ color: COLORS.lightred, fontWeight: '400', fontSize: 13 }}>{company.CO_ABOUT}</Text>
                            <Text style={{ color: COLORS.dark, fontWeight: '200', fontSize: 13, marginLeft: 6 }}>view more</Text>
                        </View>
                        {/* Back Side */}
                        <View style={{
                            flex: 1, width: '100%',
                            height: '100%', backgroundColor: COLORS.lightdark
                        }}>

                            <Text style={{ color: COLORS.lightred, fontWeight: '600', fontSize: 18 }}>Registration Number :</Text>
                            <Text style={{ color: COLORS.lightred, fontWeight: '400', fontSize: 13 }}>{company.CO_REGISTRATION_NO}</Text>
                            <Text style={{ color: COLORS.lightred, fontWeight: '600', fontSize: 18 }}>Website  :</Text>
                            <Text style={{ color: COLORS.dark, fontWeight: '400', fontSize: 13 }}>{company.CO_WEBSITE}</Text>
                            <Text style={{ color: COLORS.lightred, fontWeight: '600', fontSize: 18 }}>Reach Us At :</Text>
                            <Text style={{ color: COLORS.lightred, fontWeight: '400', fontSize: 13 }}>Email - {company.CO_EMAIL}</Text>
                            <Text style={{ color: COLORS.lightred, fontWeight: '400', fontSize: 13 }}>Mobile - {company.CO_COUNTRY_CODE}{' '}{company.CO_PHONE_NO}</Text>
                        </View>
                    </FlipCard>
                </View>

                        }
                    </View>:null
                }
                
                <Text style={{ color: COLORS.white, fontWeight: 'bold', fontSize: 18, marginLeft: 10 }}>COMPANY ADDRESS</Text>
                <View style={styles.hBox}>
                    {
                        companyAd ? <View>
                            {
                                companyAd.length < 1 ?
                                    <Text style={{ color: COLORS.lightyellow, fontWeight: '600', fontSize: 16 }}> Currently No Data Avialavle</Text> :
                                    <Text style={{ color: COLORS.lightred, fontWeight: '600', fontSize: 18 }}> data found</Text>
                            }
                        </View> :
                            null
                    }
                </View>
                <Text style={{ color: COLORS.white, fontWeight: 'bold', fontSize: 18, marginLeft: 10 }}>COMPANY DOCUMENTS</Text>
                <View style={styles.hBox}>
                    {
                        companyDoc ? <View>
                            {
                                companyDoc.length < 1 ?
                                    <Text style={{ color: COLORS.lightyellow, fontWeight: '600', fontSize: 16 }}> Currently No Data Avialavle</Text> :
                                    <FlatList
                                        data={companyDoc}
                                        keyExtractor={item => `${item.COD_DOCUMENT_NO}`}
                                        renderItem={renderItem}
                                    />

                            }
                        </View> :
                            null
                    }
                </View>
            </ScrollView>
        </View>
    );
};
/* <TouchableOpacity style={styles.icon}
                       onPress={() => navigation.navigate('Profile')}>
                       <View style={styles.iconView}>
                           <FontAwesome name='user' color={COLORS.lightyellow} size={25} />
                       </View>

                   </TouchableOpacity>*/
// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightdark,
    },
    head: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 40,
        marginHorizontal: 5,
        paddingHorizontal: 15
    },
    icon: {
        width: 50, height: 50,
        borderRadius: 25,
        backgroundColor: COLORS.darkgray,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.1,
        borderColor: COLORS.limegray,
        elevation: 5,
        shadowOffset: { width: -6, height: -6 },
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowColor: '#1d1d1d',
    },
    stext: {
        color: COLORS.lightyellow,
        fontWeight: 'bold',
        fontSize: 14,
        paddingLeft:15
      },
    iconView: {
        backgroundColor: COLORS.lightdark,
        width: 46, height: 46,
        borderRadius: 23,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowColor: '#3f3f3f',
    },
    shadow: {
        shadowColor: COLORS.limegray,
        shadowOffset: {
            width: 0,
            height: 16
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 5
    },
    hBox: {
        flex: 1, backgroundColor: COLORS.lightgray,
        margin: 10, padding: 10,
        flexDirection: 'row'
    },
    flipD: {
        marginLeft: 5,
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        backgroundColor: COLORS.lightdark,
        padding: 5
    }
});

//make this component available to the app
export default Home;
