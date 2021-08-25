//import liraries
import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet,TextInput,TouchableOpacity,ScrollView,Image} from 'react-native';
import { COLORS } from './../../constants/theme';
import HeaderBar from './../../Components/HeaderBar/Header';
import OnBoarding from './../Auth/OnBoarding';
import { Ionicons, FontAwesome, MaterialIcons,Entypo } from 'react-native-vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from './../../base';
import {  useSelector } from 'react-redux'
// create a component
const Aircraft = ({navigation}) => {
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [ind, setInd] = useState('');
    const [action, setAction] = useState(false);
    const [fdata, setFdata] = useState('');
    const [error,setError]= useState('');
    const userRole = useSelector(state => state.role);
    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource and update FilteredDataSource
            const newData = fdata.filter(function (item) {
                // Applying filter for the inserted text in search bar
                let name = `${item.AI_NAME}`
                const itemData = name
                    ? name.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setData(newData);
            setSearch(text);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setData(fdata);
            setSearch(text);
        }
    };

    const getData = async () => {
        try {
            await AsyncStorage.getItem('user_coid').then((value) =>
            getAircraftData(value)
            );
        } catch (e) {
            // error reading value
            console.error(e)
        }
    }

    const getAircraftData = (e) => {
        const myHeaders = new Headers();

        const formdata = new FormData();
        formdata.append("AI_CO_ID", e);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(BASE_URL + "/apis/admin/get_aircarft_list", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.response === true) {
                    setData(result.aircraft_list);
                    setFdata(result.aircraft_list);
                } else {
                    setData('');
                    setFdata('');
                }
            })
            .catch(error => console.log('error', error))
            .finally(() => setLoading(false))
            .finally(setLoading.bind(undefined, false));
    }

    useEffect(() => {
        getData();
        const unsubscribe = navigation.addListener('focus', () => {
            getData();
          });
          return unsubscribe;
    }, [navigation]);

    const AddPress=()=>{
        if(data.length <2){
            navigation.navigate('addaircraft')
        }else{
            setError('Sorry! You Can Not Add More Aircraft. Aircraft Limit Is 2');
        }
    }
   
    return (
        <View style={styles.container}>
           <HeaderBar onPress={()=>{navigation.goBack();}}/> 
           <View style={{
                position: 'absolute', top: 60, left: 60,
                borderWidth: 1, borderColor: COLORS.lightgray, width: '75%', height: 40, borderRadius: 15
            }}>
                <TextInput
                    placeholder='Search Here'
                    placeholderTextColor={COLORS.white}
                    onChangeText={(text) => searchFilterFunction(text)}
                    value={search}
                    style={{
                        flex: 1,
                        paddingLeft: 15,
                        color: COLORS.white
                    }}
                />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15 }}>
                <Text style={{ color: COLORS.white, fontWeight: 'bold', fontSize: 20 }}>AIRCRAFT LIST</Text>
                {
                    userRole==='2' ? <TouchableOpacity style={{
                    height: 35, justifyContent: 'center', alignItems: 'center',
                    borderWidth: 1, borderColor: COLORS.lightgray, borderRadius: 15, paddingHorizontal: 20, marginRight: 18
                }}
                onPress={AddPress}>
                    <Text style={{ color: COLORS.white, fontWeight: 'bold', fontSize: 16 }}>ADD</Text>
                </TouchableOpacity>:
                <View/>
                }
            </View>
            {
                error ?  <View style={{  backgroundColor: COLORS.dark, margin: 10,marginHorizontal:25, padding: 5 }}>
               <TouchableOpacity style={{alignItems:'flex-end',paddingRight:10}}
               onPress={()=>{setError('')}}>
                <Entypo name='cross' color={COLORS.white} size={25} />
               </TouchableOpacity>
               <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',position:'absolute',top:1,left:10}}>
               <MaterialIcons name='error-outline' color={COLORS.white} size={23} />
               <Text style={{color:COLORS.white,fontSize:20,alignItems:'center',fontWeight:'bold'}}>
                    {' '}Error!
               </Text> 
               </View>
               <Text style={{color:COLORS.white,paddingHorizontal:10}}>{error}</Text>
            </View>:
            <View/>
            }
           
            <ScrollView style={{ flex: 1, backgroundColor: COLORS.darkgray, margin: 10, padding: 5 }}>
                {
                    data ? <View>
                            {
                                data.length < 1 ?  <Text style={{ color: COLORS.white ,textAlign:'center',fontSize:18,paddingVertical:15,fontWeight:'bold' }}>No matching records found</Text>:
                                <View>
                                    {
                                        data.map((item,index)=>(
                                            <View style={{ flex: 1, flexDirection:'row',backgroundColor: COLORS.lightdark, margin: 2, padding: 10, borderRadius: 15 }} key={index}>
                                            {
                                                item.AI_PHOTO ===null ?<Image
                                                source={{uri:'https://static.vecteezy.com/system/resources/thumbnails/000/620/372/small/aviation_logo-22.jpg'}}
                                                style={{
                                                    width:'35%',
                                                    height:110,
                                                    borderRadius:15,
                                                    marginTop:8
                                                }}
                                            />:
                                            <Image
                                                source={{uri:item.AI_PHOTO}}
                                                style={{
                                                    width:'35%',
                                                    height:110,
                                                    borderRadius:15,
                                                    marginTop:8
                                                }}
                                            />}
                                            <View style={{padding:8}}>
                                            
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={{color:COLORS.lightyellow,fontWeight:'bold',fontSize:16}}>{item.AI_NAME}</Text>
                                        {
                                            userRole==='2'? <TouchableOpacity onPress={() => { setInd(index); setAction(!action) }}>
                                        
                                        <MaterialIcons name='view-list' color={COLORS.white} size={30} />
                                    </TouchableOpacity>: <TouchableOpacity onPress={()=>navigation.navigate('aircraftdetails',{item})}>
                                                        <Ionicons name='apps-sharp' color={COLORS.white} size={25} />
                                                    </TouchableOpacity>

                                        }
                                        
                                    </View>
                                                
                                                <Text style={{color:COLORS.lightyellow,fontWeight:'600',fontSize:14}}>MODEL : {item.AI_MODEL}</Text>
                                                <Text style={{color:COLORS.lightyellow,fontWeight:'600',fontSize:14}}>ENGINE TYPE : {item.AI_ENGINE_TYPE}</Text>
                                                <Text style={{color:COLORS.lightyellow,fontWeight:'600',fontSize:14}}>TAIL NUMBER : {item.AI_TAIL_NO}</Text>
                                                {
                                                    item.AI_STATUS === 'Active' ? <Text style={{color:COLORS.lightyellow,fontWeight:'600',fontSize:14}}>STATUS : 
                                                    {' '}<Text style={{color:'green',fontWeight:'bold',fontSize:14,textTransform:'uppercase'}}>{item.AI_STATUS}</Text></Text>:
                                                    <Text style={{color:COLORS.lightyellow,fontWeight:'600',fontSize:14}}>STATUS :  {' '}
                                                    <Text style={{color:COLORS.dark,fontWeight:'bold',fontSize:14,textTransform:'uppercase'}}>{item.AI_STATUS}</Text>
                                                    </Text>
                                                    }
                                                    {
                                        ind === index && action ?
                                            <View>
                                                <View style={styles.sep} />
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
                                                    <TouchableOpacity onPress={()=>navigation.navigate('editaircraft',{item})}>
                                                        <FontAwesome name='edit' color={COLORS.white} size={25} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={()=>navigation.navigate('aircraftdetails',{item})}>
                                                        <Ionicons name='apps-sharp' color={COLORS.white} size={25} />
                                                    </TouchableOpacity>
                                                    
                                                    <TouchableOpacity >
                                                        <MaterialIcons name='delete' color={COLORS.dark} size={25} />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            : <View />
                                    }
                                                
                                            </View>
                                            
                                            </View>
                                        ))
                                    }
                                </View>
                            }
                    </View>:null
                }
            </ScrollView>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:50,
        backgroundColor: COLORS.lightdark,
    },
    sep: {
        height: 1,
        backgroundColor: COLORS.lightyellow,
        marginVertical: 4,
    }
});

//make this component available to the app
export default Aircraft;
