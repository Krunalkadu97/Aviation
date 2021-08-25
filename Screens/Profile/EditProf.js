//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from './../../constants/theme';

// create a component
const EditProfile = () => {
    return (
        <View style={styles.container}>
            <Text>EditProfile</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.lightdark,
    },
});

//make this component available to the app
export default EditProfile;
