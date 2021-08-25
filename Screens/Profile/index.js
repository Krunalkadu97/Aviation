//import liraries
import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList, Alert,
  RefreshControl
} from 'react-native';
import { COLORS, SIZES } from './../../constants/theme';
import { useDispatch, useSelector } from 'react-redux'
import Loader from './../Loader';
import { Ionicons, FontAwesome, MaterialCommunityIcons, Fontisto, FontAwesome5 } from 'react-native-vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../base';
import { TabRouter, useIsFocused } from '@react-navigation/native'
import { MaterialIcons,AntDesign } from 'react-native-vector-icons';
import { Entypo } from 'react-native-vector-icons';
// create a component
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
const Profile = ({ navigation, props }) => {
  const [user, setUser] = useState('');
  const [address, setAddress] = useState('');
  const [document, setDocument] = useState('');
  const userInfo = useSelector(state => state.users);
  const userRole = useSelector(state => state.role);
  const [loading, setLoading] = useState(true);
  const [isAdd, setIsAdd] = useState(false);
  const [isDoc, setIsDoc] = useState(false);
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
 
  const getUser = () => {
    const myHeaders = new Headers();

    const formdata = new FormData();
    formdata.append("US_ID", userInfo);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch(BASE_URL + "/apis/general/get_profile", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.response === true) {
          setUser(result.user_data);
          setAddress(result.user_address_data);
          setDocument(result.user_document_data);
        } else {
          setUser('');
          setAddress('');
          setDocument('');
        }
      })
      .catch(error => console.log('error', error))
      .finally(() => setLoading(false))
      .finally(setLoading.bind(undefined, false));
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
      getUser();
    });

  }, []);
  useEffect(() => {
    getUser();
  }, [isFocused, navigation]);

  const onLogOut = () => {
    AsyncStorage.clear();
    navigation.replace('Auth');
  }
  const renderItem = ({ item }) => {
    return (
      <View style={{ flex: 1, padding: 5, backgroundColor: COLORS.lightdark, margin: 5 }}>
        <Text style={styles.stext}>{item.USD_NAME}</Text>
        <View style={styles.sep}/>
        <View style={{ flexDirection: 'row' }}>
          <View>

            <Image
              source={{ uri: item.USD_FILE }}
              style={{ width: 100, height: 100, marginTop: 5, borderRadius: 15 }}
              resizeMode='cover'
            />
            <View style={{ position: 'absolute', top: 60, right: 0 }}>
              {
                item.USD_STATUS === 'Rejected' ?
                  <MaterialCommunityIcons name='hammer-wrench' size={50} color={COLORS.dark} /> :
                  <View>
                    {
                      item.USD_STATUS === 'Approved' ? <MaterialCommunityIcons name='check-decagram' size={50} color='green' />:
                      <MaterialCommunityIcons name='credit-card-clock' size={50} color={COLORS.lightgray} />
                    }
                  </View>
                  
              }
            </View>
            
          </View>
          <View style={{ padding: 5 }}>
            <Text style={[styles.stext, { width: '100%' }]}> Document Number :</Text>
            <Text style={[styles.stext, { paddingLeft: 20, color: COLORS.limegray, fontWeight: '700' }]}> {item.USD_DOCUMENT_NO}</Text>
            <Text style={[styles.stext, { width: '100%' }]}> Document Issued Date :</Text>
            <Text style={[styles.stext, { paddingLeft: 20, color: COLORS.limegray, fontWeight: '700' }]}> {item.USD_ISSUE_DATE}</Text>
            <Text style={[styles.stext, { width: '100%' }]}> Document Expiry Date :</Text>
            <Text style={[styles.stext, { paddingLeft: 20, color: COLORS.limegray, fontWeight: '700' }]}> {item.USD_EXPIRY_DATE}</Text>
          </View>
        </View>
        <View style={{height:25,backgroundColor:COLORS.lightgray,flexDirection:'row',
        alignItems:'center',justifyContent:'center'}}>
            {
              item.USD_STATUS === 'Rejected' ? 
              <View style={{flexDirection:'row'}}>
                  <Text style={{ color: COLORS.white, fontWeight: 'bold', textAlign: 'center' }}>STATUS : </Text>
                  <Text style={{ color: COLORS.dark, fontWeight: 'bold', textAlign: 'center', fontSize: 16 }}>Rejected</Text> 
                  </View>:
              <View>
                {
                  item.USD_STATUS === 'Approved' ? 
                  <View style={{flexDirection:'row'}}>
                  <Text style={{ color: COLORS.white, fontWeight: 'bold', textAlign: 'center' }}>STATUS : </Text>
                  <Text style={{ color: 'green', fontWeight: 'bold', textAlign: 'center' }}>Approved</Text>
                  </View>:
                  <View style={{flexDirection:'row'}}>
                  <Text style={{ color: COLORS.white, fontWeight: 'bold', textAlign: 'center' }}>STATUS : </Text>
                  <Text style={{ color: COLORS.lightyellow, fontWeight: 'bold', textAlign: 'center' }}>Pending</Text>
                  <TouchableOpacity style={{marginLeft:6}}>
                    <AntDesign name='checkcircle' color='green' size={18}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={{marginLeft:6}}>
                  <AntDesign name='closecircle' color={COLORS.dark} size={18}/>
                  </TouchableOpacity>
                  </View>
                }
              </View>
                
            }
        </View>
        <View style={{flexDirection:'row',
        alignItems:'center',justifyContent:'center',marginVertical:6}}>
             <TouchableOpacity style={{marginRight:15}}
             onPress={() => navigation.navigate('Edudoc', { dosc:item })}>
                           <FontAwesome name='edit' size={25} color={COLORS.white} />
                           </TouchableOpacity>
                           <TouchableOpacity>
                           <MaterialIcons name='delete' size={25} color={COLORS.white} />
                           </TouchableOpacity>
        </View>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Loader loading={loading} />
      <ScrollView style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        {
          user === '' || undefined ? <View style={{ flex: 1 }}>
            <View style={{
              flex: 1, backgroundColor: COLORS.lightgray, padding: 10, margin: 10, marginTop: 50, marginHorizontal: 25,
              borderRadius: 15, elevation: 4
            }}>
              <Image
                source={{ uri: 'https://www.freeiconspng.com/thumbs/profile-icon-png/user-icon-png-person-user-profile-icon-20.png' }}
                style={{
                  width: 120, height: 120, borderRadius: 60, alignSelf: 'center', borderWidth: 0.5,
                  borderColor: COLORS.lightyellow
                }}
                resizeMode='cover'
              />
              <View style={{ width: 30, height: 30, marginTop: -16, alignSelf: 'center', justifyContent: 'center' }}>

                <Fontisto name='radio-btn-active' size={25} color={COLORS.dark} />

              </View>
              <Text style={styles.ptext}>First Name{' '}Middle Name{' '}Last Name</Text>
              <Text style={[styles.ptext, { paddingVertical: 2, fontWeight: '600' }]}><Ionicons name='mail' size={16} color={COLORS.lightred} />{' '}Email Address</Text>
            </View>
          </View> :
            <View style={{ flex: 1 }}>

              <View style={{
                flex: 1, backgroundColor: COLORS.lightgray, padding: 10, margin: 10, marginTop: 50, marginHorizontal: 25,
                borderRadius: 15, elevation: 4
              }}>
                <Image
                  source={{ uri: user.US_PHOTO }}
                  style={{
                    width: 120, height: 120, borderRadius: 60, alignSelf: 'center', borderWidth: 0.5,
                    borderColor: COLORS.lightyellow
                  }}
                  resizeMode='cover'
                />
                <View style={{ width: 30, height: 30, marginTop: -16, alignSelf: 'center', justifyContent: 'center' }}>
                  {
                    user.US_STATUS === 'Active' ? <Fontisto name='radio-btn-active' size={25} color='green' /> :
                      <Fontisto name='radio-btn-active' size={25} color={COLORS.dark} />
                  }
                </View>
                <Text style={styles.ptext}>{user.US_FIRST_NAME}{' '}{user.US_MIDDLE_NAME}{' '}{user.US_LAST_NAME}</Text>
                <Text style={[styles.ptext, { paddingVertical: 2, fontWeight: '600' }]}><Ionicons name='mail' size={16} color={COLORS.lightred} />{' '}{user.US_EMAIL}</Text>
                <TouchableOpacity
                  style={{
                    width: 40, height: 40, borderRadius: 8,
                    justifyContent: 'center', alignItems: 'center', position: 'absolute',
                    top: 10, right: 15, borderWidth: 1, borderColor: COLORS.white
                  }}
                  onPress={() => navigation.navigate('edituser', { role: user.US_RO_ID, item: user })}>
                  <FontAwesome5 name='user-edit' size={20} color={COLORS.white} />
                </TouchableOpacity>
              </View>
              <View style={{
                flex: 1, backgroundColor: COLORS.darkgray, padding: 10, margin: 10, marginTop: 10, marginHorizontal: 25,
                borderRadius: 15, elevation: 4
              }}>
                {
                  userRole === '2' ? <Text style={[styles.stext, { fontSize: 16, paddingLeft: 10 }]}>Admin Details </Text> :
                    <View>
                      {
                        userRole === '3' ? <Text style={[styles.stext, { fontSize: 16, paddingLeft: 10 }]}>Instructor Details</Text> :
                          <View>
                            {
                              userRole === '4' ? <Text style={[styles.stext, { fontSize: 16, paddingLeft: 10 }]}>Student Details </Text> :
                                <Text style={[styles.stext, { fontSize: 16, paddingLeft: 10 }]}>Renter Details</Text>
                            }
                          </View>
                      }
                    </View>
                }

                <Text style={[styles.stext]}>Contact Number : {' '}
                  <Text style={[styles.stext, { fontWeight: '400', color: COLORS.lightred }]}>{user.US_COUNTRY_CODE}{'-'}{user.US_PHONE_NO}</Text>
                </Text>
                <Text style={[styles.stext]}>Gender : {' '}
                  <Text style={[styles.stext, { fontWeight: '400', color: COLORS.lightred }]}>
                    {
                      user.US_GENDER === 'Male' ? <Ionicons name='male' size={16} color={COLORS.limegray} /> :
                        <View>
                          {
                            user.US_GENDER === 'Female' ? <Ionicons name='female' size={16} color={COLORS.limegray} /> :
                              <Ionicons name='md-male-female' size={16} color={COLORS.limegray} />
                          }
                        </View>

                    }
                    {' '}
                    {user.US_GENDER}</Text>
                </Text>
                <Text style={[styles.stext]}>Date of Birth : {' '}
                  <Text style={[styles.stext, { fontWeight: '400', color: COLORS.lightred }]}>{user.US_DATE_OF_BIRTH}</Text>
                </Text>
                <Text style={[styles.stext]}>Registration Number : {' '}
                  <Text style={[styles.stext, { fontWeight: '400', color: COLORS.lightred }]}>{user.US_REGISTRATION_NO}</Text>
                </Text>
                <Text style={[styles.stext]}>Wallet Amount : {' '}
                  <Text style={[styles.stext, { fontWeight: '400', color: COLORS.lightred }]}>{'$ '}{user.US_WALLET}</Text>
                </Text>
              </View>
            </View>
        }
        <View style={{
          flex: 1, backgroundColor: COLORS.darkgray, marginTop: 10, marginHorizontal: 25,
          borderRadius: 15, elevation: 4
        }}>
          <TouchableOpacity onPress={() => { setIsAdd(!isAdd) }} style={{ backgroundColor: COLORS.lightgray, borderRadius: 6, padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={[styles.stext, { fontSize: 16, paddingLeft: 10 }]}>Address Details </Text>
            {
              isAdd ? <FontAwesome name='chevron-down' size={22} color={COLORS.lightred} /> :
                <FontAwesome name='chevron-right' size={22} color={COLORS.lightred} />
            }

          </TouchableOpacity>

          {
            isAdd ? <View style={{ backgroundColor: COLORS.lightgray,  borderRadius: 6,flex:1,padding:5}}>
              <View style={[styles.sep, { marginTop: -10, marginBottom: 5 }]} />
              <TouchableOpacity style={styles.bbTn}
                onPress={() => navigation.navigate('Addua', { item: user })}>
                <Text style={{ color: COLORS.dark, fontWeight: 'bold' }}>Add</Text>
              </TouchableOpacity>
              {
                address.length < 1 ? <View style={{ backgroundColor: COLORS.lightdark, marginTop: 5, padding: 10, borderRadius: 6 }}>

                  <Text style={[styles.stext, { textAlign: 'center' }]}> Address Data Not Available</Text>
                </View> :
                  <View style={{flex:1}}>
                    <FlatList
                      data={address}
                      keyExtractor={item => item.USA_ID}
                      renderItem={({ item, index }) => (
                        <View style={[styles.card, { flex: 1, width: SIZES.width * 0.79, marginRight: 4 }]}
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
                           onPress={() => navigation.navigate('eduAdds', {item,role:user })}>
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
                      contentContainerStyle={{ paddingVertical: 18 }}
                    />

                  </View>
              }

            </View> :
              <View />
          }
        </View>
        <View style={{
          flex: 1, backgroundColor: COLORS.darkgray, marginTop: 5, marginHorizontal: 25,
          borderRadius: 15, elevation: 4
        }}>
          <TouchableOpacity onPress={() => { setIsDoc(!isDoc) }} style={{
            backgroundColor: COLORS.lightgray,
            borderRadius: 6, padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <Text style={[styles.stext, { fontSize: 16, paddingLeft: 10 }]}>Document Details </Text>
            {
              isDoc ? <FontAwesome name='chevron-down' size={22} color={COLORS.lightred} /> :
                <FontAwesome name='chevron-right' size={22} color={COLORS.lightred} />
            }

          </TouchableOpacity>

          {
            isDoc ? <View style={{ backgroundColor: COLORS.lightgray, padding: 10, borderRadius: 6 }}>
              <View style={[styles.sep, { marginTop: -10, marginBottom: 5 }]} />
              <TouchableOpacity style={styles.bbTn}
                onPress={() => navigation.navigate('Addudoc', { item: user })}>
                <Text style={{ color: COLORS.dark, fontWeight: 'bold' }}>Add</Text>
              </TouchableOpacity>
              {
                document.length <1 ?<View style={[styles.card,{marginTop:6}]}>
                <Text style={[styles.stext]}>Data Not Avialable </Text>
                </View>  :
                  <FlatList
                    data={document}
                    keyExtractor={item => `${item.USD_DOCUMENT_NO}`}
                    renderItem={renderItem}
                    horizontal
                      showsHorizontalScrollIndicator={false}
                  />
              }
            </View> :
              <View />
          }
        </View>
        <View>
          <TouchableOpacity style={{
            height: 40, borderWidth: 0.6, borderColor: COLORS.dark, marginHorizontal: 80,
            elevation: 5, marginTop: 60, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 20
          }}
            onPress={onLogOut}>
            <Text style={{ fontWeight: 'bold', fontSize: 15, color: COLORS.dark }}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightdark,
  },
  ptext: {
    color: COLORS.lightyellow,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
    paddingVertical: 10
  },
  stext: {
    color: COLORS.lightyellow,
    fontWeight: 'bold',
    fontSize: 14,
    paddingLeft: 15
  },
  sep: {
    height: 0.5,
    backgroundColor: COLORS.lightred,
    marginHorizontal: 5,
    width: '98%'
  },
  bbTn: {
    height: 30, width: 70,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1, borderColor: COLORS.dark,
    alignSelf: 'flex-end'
  },
  card: {
    backgroundColor: COLORS.lightdark,
    margin: 2, padding: 10,
    borderRadius: 6, flex: 1,
  },
});

//make this component available to the app
export default Profile;
