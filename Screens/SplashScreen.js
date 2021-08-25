
import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,Text,
  StyleSheet,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, FONTS } from './../constants/theme';
import { c } from './../constants/images';
import { useDispatch, useSelector } from 'react-redux'
import { ADD_CO_ID, ADD_USER,ADD_USER_ROLE } from '../Redux/UserReducer';

const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      await AsyncStorage.getItem('user_id').then((value) =>
      navigation.replace(
        value === null ? 'Auth' : 'Drawer'
      ));
      const datam=await AsyncStorage.getItem('user_toid');
      const datc=await AsyncStorage.getItem('user_id');
      const co_data=await AsyncStorage.getItem('user_coid');

      dispatch({ type: ADD_USER, payload: datc });
      dispatch({ type: ADD_USER_ROLE, payload: datam });
      dispatch({ type: ADD_CO_ID, payload: co_data });
    } catch(e) {
      // error reading value
      console.error(e)
    }
  }
  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      getData();
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={{uri:'https://monophy.com/media/hT6xvGNNQX52SF5Etu/monophy.gif'}}
        style={{width: '90%',height:'30%', resizeMode: 'contain', margin: 30}}
      />
      <Text style={{...FONTS.largeTitle,paddingVertical:10,color:COLORS.dark,fontWeight:'bold'}}>Welcome to Aviation</Text>
      <ActivityIndicator
        animating={animating}
        color={COLORS.dark}
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.lightdark
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});