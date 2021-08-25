//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet,Image,TextInput,KeyboardAvoidingView,TouchableOpacity} from 'react-native';
import { COLORS } from './../../constants/theme';

// create a component
const ForgotPassword = ({navigation}) => {
    const [email,setEmail] = useState('');
    const onSubmit=()=>{
        navigation.navigate('login')
    }
    return (
        <View style={styles.container}>
         <Image
                source={{ uri: 'https://i.pinimg.com/originals/55/64/ee/5564ee8db9a7689db37efe6ae7141fe4.png' }}
                style={{ width: '100%', height: 250 }}
                resizeMode='contain'
            />
           <Text style={{fontSize:25,color:COLORS.lightyellow,fontWeight:'bold',
           textAlign:'center'}}>Reset Password</Text>
           <Text style={{fontSize:16,color:COLORS.limegray,fontWeight:'200',
           textAlign:'center',paddingVertical:10}}>Enter an email address you use to sign in.</Text>
           <KeyboardAvoidingView enabled>
           <View style={styles.SectionStyle}>
                    <TextInput
                        placeholder='Enter Email Address'
                        placeholderTextColor={COLORS.lightyellow}
                        style={styles.inputStyle}
                        onChangeText={(userEmail) => setEmail(userEmail)}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>
                <TouchableOpacity style={[styles.shadow, styles.outerBox, { elevation: 60 }]}
                    onPress={onSubmit}>
                        <Text style={styles.bText}>Reset Password</Text>
                    </TouchableOpacity>
           </KeyboardAvoidingView>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:40,
        backgroundColor: COLORS.lightdark,
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 25,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    inputStyle: {
        flex: 1,
        color: COLORS.lightyellow,
        paddingLeft: 20,
        paddingRight: 15,
        borderWidth: 0.3,
        borderRadius: 10,
        borderColor: COLORS.lightyellow,
        backgroundColor: COLORS.lightgray
    },
    outerBox: {
        height: 40,
        marginHorizontal: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor:COLORS.lightyellow,
        marginTop:50,
    },
    bText: {
        color: COLORS.lightdark,
        fontWeight: 'bold',
        fontSize: 15
    }
});

//make this component available to the app
export default ForgotPassword;
