//import liraries
import React, { useState ,useEffect} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView,
FlatList } from 'react-native';
import HeaderBar from '../../Components/HeaderBar/Header';
import { COLORS, SIZES } from './../../constants/theme';
import { Ionicons,Entypo,FontAwesome } from 'react-native-vector-icons'
import {  useSelector } from 'react-redux';

// create a component
const Reservations = ({ navigation}) => {
    const [isView,setIsView]=useState(false);
    const [data,setData]=useState([
        {
            id:'1',
            activity:'Renting',
            aircraft:'SURYAAN,007,SK-007',
            user:'Rajkumar Gautam',
            rating:'Private Pilot',
            rtype:'Fly Single Engine Solo',
            instructor:'',
            date:'2021-8-23',
            time:'11:33 am-11:45 am',
            shobb:'1004.00',
            ehobb:'1006.00',
            hobbt:'2.00',
            stach:'202.00',
            etach:'204.00',
            tach:'2.00',
            tobrt:'0.00',
            gtm:'0.00',
            rtopr:'600.00',
            status:'Invoice Generated',
            ifpph:'0.00',
            igpph:'0.00',
            itopr:'0.00',
            rfpph:'300.00',
            rbpph:'0.00',
            rgpph:'0.00'
        }
    ]);
    const userRole = useSelector(state => state.role);

  
    return (
        <View style={styles.container}>
            <HeaderBar onPress={() => navigation.goBack()} />
            <View style={styles.SeB}>
                <TextInput
                    placeholder='Search Here'
                    placeholderTextColor={COLORS.white}
                    style={styles.teIn}
                />
            </View>
            <View style={styles.hBCon}>
                <Text style={styles.hText}>RESERVATION</Text>
                <TouchableOpacity style={styles.btn}
                onPress={()=>navigation.navigate('resadd')}
                >
                    <Text style={{ color: COLORS.lightdark, fontWeight: 'bold', fontSize: 16 }}>ADD</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.sep} />
            <ScrollView style={{ backgroundColor: COLORS.darkgray, margin: 10, padding: 5 }}>
            <FlatList
                data={data}
                keyExtractor={item=>`${item.id}`}
                renderItem={({item,index})=>(
                    <View style={styles.inBox} key={index}>
                    <View style={styles.hBCon}>
                        <Text style={[styles.hText, { fontSize: 18 }]}>{item.activity}</Text>
                        <TouchableOpacity onPress={()=>{setIsView(!isView)}}>
                            <Ionicons name='ios-apps-sharp' color={COLORS.white} size={22} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.sep} />
                    <View style={styles.teCon}>
                    <Text style={styles.bText}>AIRCRAFT </Text>
                    <Text style={styles.sText}>{item.aircraft} </Text>
                    </View>
                    <View style={styles.teCon}>
                    <Text style={styles.bText}>USER </Text>
                    <Text style={styles.sText}>{item.user}</Text>
                    </View>
                    <View style={styles.teCon}>
                    <Text style={styles.bText}>RATING TYPE </Text>
                    <Text style={styles.sText}>{item.rtype}</Text>
                    </View>
                    <View style={styles.teCon}>
                    <Text style={styles.bText}>RATING </Text>
                    <Text style={styles.sText}>{item.rating}</Text>
                    </View>
                    <View style={styles.teCon}>
                    <Text style={styles.bText}>INSTRUCTOR </Text>
                    <Text style={styles.sText}>{item.instructor}</Text>
                    </View>
                    <View style={styles.teCon}>
                    <View style={styles.teCon}>
                    <Text style={styles.bText}>DATE </Text>
                    <Text style={styles.sText}>{item.date}</Text>
                    </View>
                    <View style={styles.teCon}>
                    <Text style={styles.bText}>TIME </Text>
                    <Text style={styles.sText}>{item.time}</Text>
                    </View>
                    </View>
                    <View style={styles.teCon}>
                    <View style={styles.teCon}>
                    <Text style={styles.bText}>START HOBB  </Text>
                    <Text style={styles.sText}>{item.shobb}</Text>
                    </View>
                    <View style={styles.teCon}>
                    <Text style={styles.bText}>END HOBB </Text>
                    <Text style={styles.sText}>{item.ehobb} </Text>
                    </View>
                    </View>
                    {
                        isView ? 
                        <View>
                        <View style={styles.sep}/>

                      
                    <View style={[styles.teCon,{justifyContent:'flex-start',marginLeft:10}]}>
                    <Text style={styles.bText}>HOBB TIME    </Text>
                    <Text style={styles.sText}>{item.hobbt}</Text>
                    </View>
                    <View style={styles.teCon}>
                    <View style={styles.teCon}>
                    <Text style={styles.bText}>START TACH  </Text>
                    <Text style={styles.sText}>{item.stach}</Text>
                    </View>
                    <View style={styles.teCon}>
                    <Text style={styles.bText}>END TACH </Text>
                    <Text style={styles.sText}>{item.etach}</Text>
                    </View>
                    </View>
                    <View style={[styles.teCon,{justifyContent:'flex-start',marginLeft:10}]}>
                    <Text style={styles.bText}>TACH TIME    </Text>
                    <Text style={styles.sText}>{item.tach}</Text>
                    </View>
                    <View style={[styles.teCon,{justifyContent:'flex-start',marginLeft:10}]}>
                    <Text style={styles.bText}>TOTAL BRIEFING TIME </Text>
                    <Text style={styles.sText}>{' ' }{item.tobrt}</Text>
                    </View>
                    <View style={[styles.teCon,{justifyContent:'flex-start',marginLeft:10}]}>
                    <Text style={styles.bText}>GROUND TIME</Text>
                    <Text style={styles.sText}>{' '}{item.gtm}</Text>
                    </View>
                    {
                        userRole === '2'||userRole === '3' ? 
                        <View>
                        <View style={[styles.teCon,{justifyContent:'flex-start',marginLeft:10}]}>
                    <Text style={styles.bText}>INSTRUCTOR FLY PRICE PER HOUR</Text>
                    <Text style={styles.sText}>{' '}${item.ifpph}	</Text>
                    </View>
                    <View style={[styles.teCon,{justifyContent:'flex-start',marginLeft:10}]}>
                    <Text style={styles.bText}>INSTRUCTOR GROUND PRICE PER HOUR</Text>
                    <Text style={styles.sText}>{' '}${item.igpph}</Text>
                    </View>
                    <View style={[styles.teCon,{justifyContent:'flex-start',marginLeft:10}]}>
                    <Text style={styles.bText}>INSTRUCTOR TOTAL PRICE</Text>
                    <Text style={styles.sText}>{' '}${item.itopr}</Text>
                    </View>
                    <View style={[styles.teCon,{justifyContent:'flex-start',marginLeft:10}]}>
                    <Text style={styles.bText}>RESERVATION FLY PRICE PER HOUR </Text>
                    <Text style={styles.sText}>{' '}${item.rfpph}</Text>
                    </View>
                    <View style={[styles.teCon,{justifyContent:'flex-start',marginLeft:10}]}>
                    <Text style={styles.bText}>RESERVATION BRIEFING PRICE PER HOUR  </Text>
                    <Text style={styles.sText}>{' '}${item.rbpph}</Text>
                    </View>
                    <View style={[styles.teCon,{justifyContent:'flex-start',marginLeft:10}]}>
                    <Text style={styles.bText}>RESERVATION GROUND PRICE PER HOUR </Text>
                    <Text style={styles.sText}>{' '}${item.rgpph}</Text>
                    </View>
                        </View>:
                        <View/>
                    }
                   
                    <View style={[styles.teCon,{justifyContent:'flex-start',marginLeft:10}]}>
                    <Text style={styles.bText}>RESERVATION TOTAL PRICE </Text>
                    <Text style={styles.sText}>{' '}${item.rtopr}</Text>
                    </View>
                    <View style={[styles.teCon,{justifyContent:'flex-start',marginLeft:10}]}>
                    <Text style={styles.bText}>STATUS</Text>
                    <Text style={styles.sText}>{' '}{item.status}</Text>
                    </View>
                    <View style={[styles.teCon,{justifyContent:'flex-start',marginLeft:10}]}>
                    <Text style={styles.bText}>ACTION</Text>
                    {
                        userRole === '2'||userRole === '3' ?
                        <View style={[styles.teCon,{justifyContent:'flex-start',marginLeft:10}]}>
                        <TouchableOpacity style={{backgroundColor:COLORS.darkgray,padding:5,paddingLeft:8,borderRadius:8,marginLeft:6}}
                        onPress={()=>navigation.navigate('resedt',{item})}>
                        <FontAwesome name='edit' color={COLORS.white} size={22} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor:COLORS.lightred,padding:5,borderRadius:8,marginLeft:6}}>
                        <Entypo name='trash' color={COLORS.lightdark} size={19} />
                    </TouchableOpacity>
                        </View>:
                        <View>
                            {
                                userRole === '4' ? 
                                <TouchableOpacity style={{backgroundColor:COLORS.darkgray,padding:5,paddingLeft:8,borderRadius:8,marginLeft:6}}
                                onPress={()=>navigation.navigate('resedt',{item})}>
                        <FontAwesome name='edit' color={COLORS.white} size={22} />
                    </TouchableOpacity>:<View/>
                            }
                        </View>
                    }
                   
                    </View>
                        </View>:<View/>
                    }
                </View>
                )}
            />
              

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
    sep: {
        height: 1,
        backgroundColor: COLORS.white,
        marginVertical: 4,
        marginHorizontal: 10
    }, SeB: {
        position: 'absolute', top: 60, left: 60,
        borderWidth: 1, borderColor: COLORS.lightgray, width: '80%',
        height: 40, borderRadius: 15
    },
    teIn: {
        flex: 1,
        paddingLeft: 15,
        color: COLORS.white
    },
    btn: {
        height: 35, justifyContent: 'center', alignItems: 'center',
        borderRadius: 15, paddingHorizontal: 20, marginRight: 18,
        backgroundColor: COLORS.lightyellow
    },
    inBox: {
        width: SIZES.width * 0.92,
        backgroundColor: COLORS.lightdark,
        padding: 10,borderRadius:16
    },
    hBCon: {
        flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center', paddingHorizontal: 15
    },
    hText: {
        color: COLORS.white,
        fontWeight: 'bold', fontSize: 16
    },
    bText: {
        color: COLORS.white,
        fontWeight: 'bold', fontSize: 14
    },
    sText: {
        color: 'gray',
        fontWeight: '200', fontSize: 14
    },
    teCon:{
        flexDirection:'row',justifyContent:'space-between',
        alignItems:'center',paddingHorizontal:10,marginVertical:2
    }
});

//make this component available to the app
export default Reservations;
