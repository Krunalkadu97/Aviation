//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './../Screens/Home/index';
import { COLORS } from './../constants/theme';
import Navigator from './Navigation';
import { DrawerContent } from './DrawerContent';
// create a component
const Drawer = createDrawerNavigator();

const Drawers = (props) => {
    return (
        <Drawer.Navigator 
          screenOptions={{headerShown: false}}
          drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen 
        name="homeScreenStack"
        options={{drawerLabel: ''}}
        component={Navigator} />
      </Drawer.Navigator>
      
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default Drawers;
