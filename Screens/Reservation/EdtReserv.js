//import liraries
import React, { useState,useEffect} from 'react';
import { View, Text, StyleSheet,TouchableOpacity,ScrollView,KeyboardAvoidingView,
Modal,TextInput} from 'react-native';
import HeaderBar from '../../Components/HeaderBar/Header';
import { COLORS } from './../../constants/theme';
import DateTimePicker from '@react-native-community/datetimepicker';
// create a component
const EdReservation = ({navigation,route}) => {
    const [date, setDate] = useState(new Date());
    const [stime, setStime] = useState(new Date());
    const [etime, setEtime] = useState(new Date());
    const [show, setShow] = useState(false);
    const [sshow, setSShow] = useState(false);
    const [eshow, setEShow] = useState(false);
    const foDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    const soTime = stime.getHours() + ":" + stime.getMinutes();
    const eoTime = etime.getHours() + ":" + etime.getMinutes();
    const [sHobb,setSHobb] = useState('');
    const [eHobb,setEHobb] = useState('');
    const [sTach,setSTach] = useState('');
    const [eTach,setETach] = useState('');

    useEffect(()=>{
        let {item} = route.params;

        setDate(new Date(item.date));
        setSelectedActivity(item.activity);
        setSelectedName(item.rating);
        setSelectedType(item.rtype);
        setSelectedUser(item.user);
        setSelectedAirc(item.aircraft);
        setSelectedInstructor(item.instructor);
        setSHobb(item.shobb);
        setEHobb(item.ehobb);
        setSTach(item.stach);
        setETach(item.etach);
    },[]);


    const [activity, setActivity] = useState([
        {
            id: '1',
            name: 'Renting',
            status: 'Active'
        },
        {
            id: '2',
            name: 'Training',
            status: 'Active'
        },
        {
            id: '3',
            name: 'Checkout',
            status: 'Active'
        },
        {
            id: '4',
            name: 'Discovery',
            status: 'Active'
        }
    ]);
    const [selectedActivity, setSelectedActivity] = useState('Select Activity')
    const [rName, setRname] = useState([
        {
            id: '1',
            name: 'Private Pilot',
            status: 'Active'
        },
        {
            id: '2',
            name: 'Instrument Rating',
            status: 'Active'
        },
        {
            id: '3',
            name: 'Commercial Pilot',
            status: 'Active'
        },
        {
            id: '4',
            name: 'CFI',
            status: 'Active'
        },
        {
            id: '5',
            name: 'CFII',
            status: 'Active'
        }
    ]);
    const [selectedName, setSelectedName] = useState('Select Rating');
    const [rType, setType] = useState([
        {
            id: '1',
            name: 'Fly Single Engine Solo',
            status: 'Active'
        },
        {
            id: '2',
            name: 'Fly Single Engine With Instructor',
            status: 'Active'
        },
        {
            id: '3',
            name: 'Fly Multi Engine With Instructor',
            status: 'Active'
        },
        {
            id: '4',
            name: 'Ground With Instructor',
            status: 'Active'
        },
        {
            id: '5',
            name: 'Sharing Fly Single Engine',
            status: 'Active'
        },
    ]);
    const [selectedType, setSelectedType] = useState('Select Rating Type');
    const [user, setUser] = useState([
        {
            id: '1',
            name: 'Krunal',
            status: 'Active'
        },
        {
            id: '2',
            name: 'SK',
            status: 'Active'
        },
       
    ]);
    const [selectedUser, setSelectedUser] = useState('Select User');
    const [airc, setAirc] = useState([
        {
            id: '1',
            name: 'SURYAAN,007,SK-007',
            status: 'Active'
        },
        {
            id: '2',
            name: 'SURYAAN,007,SK-019',
            status: 'Active'
        },
       
    ]);
    const [selectedAirc, setSelectedAirc] = useState('Select Aircraft');
    const [inst, setInst] = useState([
        {
            id: '1',
            name: 'Krunal kadu',
            status: 'Active'
        },
        {
            id: '2',
            name: 'Surendra',
            status: 'Active'
        },
       
    ]);
    const [selectedInstructor, setSelectedInstructor] = useState('Select Instructor');
   
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setShow(false);
    };
    const datePick = (currentMode) => {
        setShow(true);
    };
    const onSTChange = (event, selectedDate) => {
        const currentDate = selectedDate || stime;
        setStime(currentDate);
        setSShow(false);
    };
    const eTimePick = (currentMode) => {
        setEShow(true);
    };
    const onETChange = (event, selectedDate) => {
        const currentDate = selectedDate || etime;
        setEtime(currentDate);
        setEShow(false);
    };
    const sTimePick = (currentMode) => {
        setSShow(true);
    };

    const [isActivityVisible, setisActivityVisible] = useState(false);
    const [isRatingVisible, setisRatingVisible] = useState(false);
    const [isTypeVisible, setisTypeVisible] = useState(false);
    const [isUserVisible, setisUserVisible] = useState(false);
    const [isInstVisible, setisInstVisible] = useState(false);
    const [isAircVisible, setisAircVisible] = useState(false);
    const changeActivityVisibility = (bool) => {
        setisActivityVisible(bool)
    }
    const changeRatingVisibility = (bool) => {
        setisRatingVisible(bool)
    }
    const changeTypeVisibility = (bool) => {
        setisTypeVisible(bool)
    }
    const changeAircVisibility = (bool) => {
        setisAircVisible(bool)
    }
    const changeInstVisibility = (bool) => {
        setisInstVisible(bool)
    }
    const changeUserVisibility = (bool) => {
        setisUserVisible(bool)
    }
    const setActi = (option) => {
        setSelectedActivity(option)
    }
    const setRat = (option) => {
        setSelectedName(option)
    }
    const setTyp = (option) => {
        setSelectedType(option)
    }
    const setAif = (option) => {
        setSelectedAirc(option)
    }
    const setIn = (option) => {
        setSelectedInstructor(option)
    }
    const setUs = (option) => {
        setSelectedUser(option)
    }

   

    return (
        <View style={styles.container}>
           <HeaderBar onPress={()=>{navigation.goBack()}}/>
           <View style={{ position: 'absolute', top: 60, left: 80, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{
                    color: COLORS.white, fontSize: 18, fontWeight: 'bold',
                    textAlign: 'center', textTransform: 'uppercase'
                }}>RESERVATION FORM </Text>
            </View>
            <ScrollView style={{flex:1}}>
                <KeyboardAvoidingView enabled>
                <Text style={[styles.Htext, { marginTop: 20 }]}>DATE*</Text>
                <View style={[styles.SectionStyle, { marginTop: 10 }]}>
                <TouchableOpacity style={[styles.inputStyle, { justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }]}
                            onPress={datePick}>
                            {
                                foDate ? <Text style={{ color: COLORS.white, fontWeight: 'bold' }}>{foDate}</Text> :
                                    <Text style={{ color: COLORS.white, fontWeight: 'bold' }}>  Date </Text>
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

                    <View style={[styles.SectionStyle, { justifyContent: 'flex-start', marginTop: 1, marginLeft: 4 }]}>
                    <Text style={[styles.Htext, { marginTop: 10,width:'50%' }]}>START TIME*</Text>
                    <Text style={[styles.Htext, { marginTop: 10,width:'50%' }]}>END  TIME*</Text>
                    </View>
                    <View style={[styles.SectionStyle, { marginTop: 1 }]}>
                    <TouchableOpacity style={[styles.inputStyle, { justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }]}
                            onPress={sTimePick}>
                            {
                                soTime ? 
                                <Text style={{ color: COLORS.white, fontWeight: 'bold' }}>{soTime}</Text>:
                                <Text style={{ color: COLORS.white, fontWeight: 'bold' }}>  Time </Text>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.inputStyle, { justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }]}
                            onPress={eTimePick}>
                            {
                                eoTime ? 
                                <Text style={{ color: COLORS.white, fontWeight: 'bold' }}>{eoTime}</Text>:
                                <Text style={{ color: COLORS.white, fontWeight: 'bold' }}>  Time </Text>
                            }
                        </TouchableOpacity>
                    </View>
                {sshow && (
                        <DateTimePicker
                            mode="time"
                            value={new Date()}
                            is24Hour={true}
                            display="default"
                            timeZoneOffsetInSeconds={3600}
                            onChange={onSTChange}
                        />
                    )}
                    {eshow && (
                        <DateTimePicker
                            mode="time"
                            value={new Date()}
                            is24Hour={true}
                            display="default"
                            timeZoneOffsetInSeconds={3600}
                            onChange={onETChange}
                        />
                    )}
                    <Text style={[styles.Htext, { marginTop: 10 }]}>ACTIVITY*</Text>
                    <View style={[styles.SectionStyle, { marginTop: 10 }]}>
                        <TouchableOpacity
                            style={[styles.inputStyle, { justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }]}
                            onPress={() => changeActivityVisibility(true)}>
                            <Text style={{ color: 'gray' }}>{selectedActivity}</Text>
                        </TouchableOpacity>
                        <Modal
                            transparent={true}
                            animationType='fade'
                            visible={isActivityVisible}
                            nRequestClose={() => changeActivityVisibility(false)}>
                            <TouchableOpacity
                                onPress={() => changeActivityVisibility(false)}
                                style={styles.mCon}>
                                <ScrollView style={[styles.modal, { width: '90%', height: '25%', marginHorizontal: 25,maxHeight:'30%' }]}>
                                    {
                                        activity.map((item, index) => (
                                            <TouchableOpacity
                                                style={styles.option}
                                                key={index}
                                                onPress={() => {
                                                    changeActivityVisibility(false);
                                                    setActi(item.name)
                                                }}>
                                                <Text style={{ color: COLORS.white, paddingVertical: 6, textAlign: 'center',marginBottom:(index === activity.length-1)? 15:2  }}>{item.name}</Text>
                                            </TouchableOpacity>
                                        ))
                                    }
                                </ScrollView>
                            </TouchableOpacity>
                        </Modal>
                    </View>
                <Text style={[styles.Htext, { marginTop: 10 }]}>RATING*</Text>
                <View style={[styles.SectionStyle, { marginTop: 10 }]}>
                        <TouchableOpacity
                            style={[styles.inputStyle, { justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }]}
                            onPress={() => changeRatingVisibility(true)}>
                            <Text style={{ color: 'gray' }}>{selectedName}</Text>
                        </TouchableOpacity>
                        <Modal
                            transparent={true}
                            animationType='fade'
                            visible={isRatingVisible}
                            nRequestClose={() => changeRatingVisibility(false)}>
                            <TouchableOpacity
                                onPress={() => changeRatingVisibility(false)}
                                style={styles.mCon}>
                                <ScrollView style={[styles.modal, { width: '90%', height: '25%', marginHorizontal: 25,maxHeight:'30%' }]}>
                                    {
                                        rName.map((item, index) => (
                                            <TouchableOpacity
                                                style={styles.option}
                                                key={index}
                                                onPress={() => {
                                                    changeRatingVisibility(false);
                                                    setRat(item.name)
                                                }}>
                                                <Text style={{ color: COLORS.white, paddingVertical: 6, textAlign: 'center',marginBottom:(index === rName.length-1)? 15:2  }}>{item.name}</Text>
                                            </TouchableOpacity>
                                        ))
                                    }
                                </ScrollView>
                            </TouchableOpacity>
                        </Modal>
                    </View>
                <Text style={[styles.Htext, { marginTop: 10 }]}>RATING TYPE*</Text>
                <View style={[styles.SectionStyle, { marginTop: 10 }]}>
                        <TouchableOpacity
                            style={[styles.inputStyle, { justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }]}
                            onPress={() => changeTypeVisibility(true)}>
                            <Text style={{ color: 'gray' }}>{selectedType}</Text>
                        </TouchableOpacity>
                        <Modal
                            transparent={true}
                            animationType='fade'
                            visible={isTypeVisible}
                            nRequestClose={() => changeTypeVisibility(false)}>
                            <TouchableOpacity
                                onPress={() => changeTypeVisibility(false)}
                                style={styles.mCon}>
                                {
                                    rType ? 
                                    <ScrollView style={[styles.modal, { width: '90%', height: '25%', marginHorizontal: 25,maxHeight:'30%' }]}>
                                    {
                                        rType.map((item, index) => (
                                            <TouchableOpacity
                                                style={styles.option}
                                                key={index}
                                                onPress={() => {
                                                    changeTypeVisibility(false);
                                                    setTyp(item.name)
                                                }}>
                                                <Text style={{ color: COLORS.white, paddingVertical: 6, textAlign: 'center',marginBottom:(index === rType.length-1)? 15:2  }}>{item.name}</Text>
                                            </TouchableOpacity>
                                        ))
                                    }
                                </ScrollView>:
                                <Text style={{ color: COLORS.white, paddingVertical: 6, textAlign: 'center' }}>No Data </Text>
                                }
                                
                            </TouchableOpacity>
                        </Modal>
                    </View>
                    <Text style={[styles.Htext, { marginTop: 10 }]}>USER*</Text>
                    <View style={[styles.SectionStyle, { marginTop: 10 }]}>
                        <TouchableOpacity
                            style={[styles.inputStyle, { justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }]}
                            onPress={() => changeUserVisibility(true)}>
                            <Text style={{ color: 'gray' }}>{selectedUser}</Text>
                        </TouchableOpacity>
                        <Modal
                            transparent={true}
                            animationType='fade'
                            visible={isUserVisible}
                            nRequestClose={() => changeUserVisibility(false)}>
                            <TouchableOpacity
                                onPress={() => changeUserVisibility(false)}
                                style={styles.mCon}>
                                {
                                    user ? 
                                    <ScrollView style={[styles.modal, { width: '90%', height: '25%', marginHorizontal: 25,maxHeight:'30%' }]}>
                                    {
                                        user.map((item, index) => (
                                            <TouchableOpacity
                                                style={styles.option}
                                                key={index}
                                                onPress={() => {
                                                    changeUserVisibility(false);
                                                    setUs(item.name)
                                                }}>
                                                <Text style={{ color: COLORS.white, paddingVertical: 6, textAlign: 'center',marginBottom:(index === user.length-1)? 15:2  }}>{item.name}</Text>
                                            </TouchableOpacity>
                                        ))
                                    }
                                </ScrollView>:
                                <Text style={{ color: COLORS.white, paddingVertical: 6, textAlign: 'center' }}>No Data </Text>
                                }
                                
                            </TouchableOpacity>
                        </Modal>
                    </View>
                    {
                        selectedType==='Ground With Instructor' ? 
                        <View>
                        <Text style={[styles.Htext, { marginTop: 20 }]}>INSTRUCTOR*</Text>
                        <View style={[styles.SectionStyle, { marginTop: 10 }]}>
                        <TouchableOpacity
                            style={[styles.inputStyle, { justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }]}
                            onPress={() => changeInstVisibility(true)}>
                            <Text style={{ color: 'gray' }}>{selectedInstructor}</Text>
                        </TouchableOpacity>
                        <Modal
                            transparent={true}
                            animationType='fade'
                            visible={isInstVisible}
                            nRequestClose={() => changeInstVisibility(false)}>
                            <TouchableOpacity
                                onPress={() => changeInstVisibility(false)}
                                style={styles.mCon}>
                                <ScrollView style={[styles.modal, { width: '90%', height: '25%', marginHorizontal: 25,maxHeight:'30%' }]}>
                                    {
                                        inst.map((item, index) => (
                                            <TouchableOpacity
                                                style={styles.option}
                                                key={index}
                                                onPress={() => {
                                                    changeInstVisibility(false);
                                                    setIn(item.name)
                                                }}>
                                                <Text style={{ color: COLORS.white, paddingVertical: 6, textAlign: 'center',marginBottom:(index === inst.length-1)? 15:2  }}>{item.name}</Text>
                                            </TouchableOpacity>
                                        ))
                                    }
                                </ScrollView>
                            </TouchableOpacity>
                        </Modal>
                    </View>
                        </View>
                        :
                        <View/>
                    }
                    {
                                selectedType ==='Fly Single Engine Solo'||selectedType ==='Sharing Fly Single Engine' ? 
                                <View>
                                <Text style={[styles.Htext, { marginTop: 20 }]}>AIRCRAFT*</Text>
                                <View style={[styles.SectionStyle, { marginTop: 10 }]}>
                        <TouchableOpacity
                            style={[styles.inputStyle, { justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }]}
                            onPress={() => changeAircVisibility(true)}>
                            <Text style={{ color: 'gray' }}>{selectedAirc}</Text>
                        </TouchableOpacity>
                        <Modal
                            transparent={true}
                            animationType='fade'
                            visible={isAircVisible}
                            nRequestClose={() => changeAircVisibility(false)}>
                            <TouchableOpacity
                                onPress={() => changeAircVisibility(false)}
                                style={styles.mCon}>
                                <ScrollView style={[styles.modal, { width: '90%', height: '25%', marginHorizontal: 25,maxHeight:'30%' }]}>
                                    {
                                        airc.map((item, index) => (
                                            <TouchableOpacity
                                                style={styles.option}
                                                key={index}
                                                onPress={() => {
                                                    changeAircVisibility(false);
                                                    setAif(item.name)
                                                }}>
                                                <Text style={{ color: COLORS.white, paddingVertical: 6, textAlign: 'center',marginBottom:(index === airc.length-1)? 15:2  }}>{item.name}</Text>
                                            </TouchableOpacity>
                                        ))
                                    }
                                </ScrollView>
                            </TouchableOpacity>
                        </Modal>
                    </View>
                                </View>:
                                <View/>
                            }

                            {
                                selectedType ==='Fly Multi Engine With Instructor'||selectedType ==='Fly Single Engine With Instructor' ? 
                                <View>
                               
                                <Text style={[styles.Htext, { marginTop: 20 }]}>INSTRUCTOR*</Text>
                                <View style={[styles.SectionStyle, { marginTop: 10 }]}>
                        <TouchableOpacity
                            style={[styles.inputStyle, { justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }]}
                            onPress={() => changeInstVisibility(true)}>
                            <Text style={{ color: 'gray' }}>{selectedInstructor}</Text>
                        </TouchableOpacity>
                        <Modal
                            transparent={true}
                            animationType='fade'
                            visible={isInstVisible}
                            nRequestClose={() => changeInstVisibility(false)}>
                            <TouchableOpacity
                                onPress={() => changeInstVisibility(false)}
                                style={styles.mCon}>
                                <ScrollView style={[styles.modal, { width: '90%', height: '25%', marginHorizontal: 25,maxHeight:'30%' }]}>
                                    {
                                        inst.map((item, index) => (
                                            <TouchableOpacity
                                                style={styles.option}
                                                key={index}
                                                onPress={() => {
                                                    changeInstVisibility(false);
                                                    setIn(item.name)
                                                }}>
                                                <Text style={{ color: COLORS.white, paddingVertical: 6, textAlign: 'center',marginBottom:(index === inst.length-1)? 15:2  }}>{item.name}</Text>
                                            </TouchableOpacity>
                                        ))
                                    }
                                </ScrollView>
                            </TouchableOpacity>
                        </Modal>
                    </View>
                <Text style={[styles.Htext, { marginTop: 20 }]}>AIRCRAFT*</Text>
                <View style={[styles.SectionStyle, { marginTop: 10 }]}>
                        <TouchableOpacity
                            style={[styles.inputStyle, { justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }]}
                            onPress={() => changeAircVisibility(true)}>
                            <Text style={{ color: 'gray' }}>{selectedAirc}</Text>
                        </TouchableOpacity>
                        <Modal
                            transparent={true}
                            animationType='fade'
                            visible={isAircVisible}
                            nRequestClose={() => changeAircVisibility(false)}>
                            <TouchableOpacity
                                onPress={() => changeAircVisibility(false)}
                                style={styles.mCon}>
                                <ScrollView style={[styles.modal, { width: '90%', height: '25%', marginHorizontal: 25,maxHeight:'30%' }]}>
                                    {
                                        airc.map((item, index) => (
                                            <TouchableOpacity
                                                style={styles.option}
                                                key={index}
                                                onPress={() => {
                                                    changeAircVisibility(false);
                                                    setAif(item.name)
                                                }}>
                                                <Text style={{ color: COLORS.white, paddingVertical: 6, textAlign: 'center',marginBottom:(index === airc.length-1)? 15:2  }}>{item.name}</Text>
                                            </TouchableOpacity>
                                        ))
                                    }
                                </ScrollView>
                            </TouchableOpacity>
                        </Modal>
                    </View>
                                </View>:
                                <View/>
                            }
                            <View style={[styles.SectionStyle, { justifyContent: 'flex-start', maxHeight: 15, marginTop: 10, marginLeft: 8}]}>
                        <Text style={{ color: COLORS.white, fontWeight: 'bold', marginLeft: 16, fontSize: 13, width: '50%' }}>START HOBB</Text>
                        
                        <Text style={{ color: COLORS.white, fontWeight: 'bold', marginLeft: 16, fontSize: 13 }}>END HOBB</Text>
                    </View>
                    <View style={[styles.SectionStyle, { justifyContent: 'space-around', marginTop: 1 ,marginHorizontal:10,paddingHorizontal:10}]}>
                        <TextInput
                            style={[styles.inputStyle, { marginRight: 4 }]}
                            onChangeText={(e) => setSHobb(e)}
                            value={sHobb}
                            placeholder="Start Hobb"
                            placeholderTextColor="gray"
                            autoCapitalize="sentences"
                        />
                        
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(UserName) => setEHobb(UserName)}
                            value={eHobb}
                            placeholder="End Hobb"
                            placeholderTextColor="gray"
                            autoCapitalize="sentences"
                        />
                    </View>
                    <View style={[styles.SectionStyle, { justifyContent: 'flex-start', maxHeight: 15, marginTop: 10, marginLeft: 8}]}>
                        <Text style={{ color: COLORS.white, fontWeight: 'bold', marginLeft: 16, fontSize: 13, width: '50%' }}>START TACH</Text>
                        
                        <Text style={{ color: COLORS.white, fontWeight: 'bold', marginLeft: 16, fontSize: 13 }}>END TACH</Text>
                    </View>
                    <View style={[styles.SectionStyle, { justifyContent: 'space-around', marginTop: 1 ,marginHorizontal:10,paddingHorizontal:10}]}>
                        <TextInput
                            style={[styles.inputStyle, { marginRight: 4 }]}
                            onChangeText={(e) => setSTach(e)}
                            value={sTach}
                            placeholder="Start Tach"
                            placeholderTextColor="gray"
                            autoCapitalize="sentences"
                        />
                        
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(UserName) => setETach(UserName)}
                            value={eTach}
                            placeholder="End Tach"
                            placeholderTextColor="gray"
                            autoCapitalize="sentences"
                        />
                    </View>
                <View style={[styles.SectionStyle, { justifyContent: 'space-around', alignItems: 'center' }]}>
                        <TouchableOpacity style={[styles.btnStyle, { height: 35, backgroundColor: COLORS.white, marginHorizontal: 30 }]}
                        onPress={()=>navigation.goBack()}>
                            <Text style={{ color: COLORS.lightdark, fontWeight: 'bold' }}> UPDATE</Text>
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
        paddingTop:50,
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
        fontWeight: 'bold', marginLeft: 25,
        fontSize: 15,
        marginTop: 6
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
export default EdReservation;
