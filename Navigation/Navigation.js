//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../Screens/Home';
import Profile from './../Screens/Profile/index';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS } from './../constants/theme';
import { Ionicons, FontAwesome5 } from 'react-native-vector-icons';
import Wallet from '../Screens/Wallet';
import AddAddress from './../Screens/Profile/Address';
import AddDocument from './../Screens/Profile/AddDocument';
import InstructorUser from '../Screens/Users/instructor';
import StudentUser from '../Screens/Users/student';
import RenterUser from '../Screens/Users/renter';
import Aircraft from '../Screens/Aircraft';
import { UserAdd,AddAircraft,AircraftDetails,EditAircraft,Addadoc,
EditADoc,EditUser,UserRating,Iprice,UserDetails,AddUAddress,
AddUDoc,EditUDoc,AddMoney,EditAddUs,Reservations,AddReservation,Maintenance,
AddMaintenance,EdMaintenance,InvoiceList,Rating,RatingType,RatingPrice,
RatingAdd,RatingEd,RatingTypeAdd,RatingTypeEd,AddRatingPrice,EdRatingPrice,
InvoiceCreate,InvoicePay,EdReservation} from '../Screens';

// create a component
const Stack =createNativeStackNavigator ();
const Tab = createBottomTabNavigator();
const Navigator = () => {
    return (
       
        <Stack.Navigator>
          <Stack.Screen name="Home" component={BottomTab}
            options={{
                    headerShown: false
            }}
          />
         <Stack.Screen name="Addas" component={AddAddress}
            options={{
                    headerShown: false
            }}
          />
          <Stack.Screen name="useri" component={InstructorUser}
            options={{
                    headerShown: false
            }}
          />
          <Stack.Screen name="AddDoc" component={AddDocument}
            options={{
                    headerShown: false
            }}
          />
          <Stack.Screen name="userst" component={StudentUser}
            options={{
                    headerShown: false
            }}
          />
          <Stack.Screen name="userre" component={RenterUser}
            options={{
                    headerShown: false
            }}
          />
           <Stack.Screen name="aircraft" component={Aircraft}
            options={{
                    headerShown: false
            }}
          />
          <Stack.Screen name="adduser" component={UserAdd}
            options={{
                    headerShown: false
            }}
          />
          <Stack.Screen name="addaircraft" component={AddAircraft}
            options={{
                    headerShown: false
            }}
          />
          <Stack.Screen name="editaircraft" component={EditAircraft}
            options={{
                    headerShown: false
            }}
          />
          <Stack.Screen name="aircraftdetails" component={AircraftDetails}
            options={{
                    headerShown: false
            }}
          />
           <Stack.Screen name="adocadd" component={Addadoc}
            options={{
                    headerShown: false
            }}
          />
           <Stack.Screen name="editadoc" component={EditADoc}
            options={{
                    headerShown: false
            }}
          />
          <Stack.Screen name="edituser" component={EditUser}
            options={{
                    headerShown: false
            }}
          />
          <Stack.Screen name="urating" component={UserRating}
            options={{
                    headerShown: false
            }}
          />
          <Stack.Screen name="iprice" component={Iprice}
            options={{
                    headerShown: false
            }}
          />
          <Stack.Screen name="udetail" component={UserDetails}
            options={{
                    headerShown: false
            }}
          />
          <Stack.Screen name="Addua" component={AddUAddress}
            options={{
                    headerShown: false
            }}
          />
          <Stack.Screen name="Addudoc" component={AddUDoc}
            options={{
                    headerShown: false
            }}
          />
          <Stack.Screen name="Edudoc" component={EditUDoc}
            options={{
                    headerShown: false
            }}
          />
          <Stack.Screen name="addMoney" component={AddMoney}
            options={{
                    headerShown: false
            }}
          />
           <Stack.Screen name="eduAdds" component={EditAddUs}
            options={{
                    headerShown: false
            }}
          />
           <Stack.Screen name="reservation" component={Reservations}
            options={{
                    headerShown: false
            }}
          />
          <Stack.Screen name="resadd" component={AddReservation}
            options={{
                    headerShown: false
            }}
          />
          <Stack.Screen name="resedt" component={EdReservation}
            options={{
                    headerShown: false
            }}
          />
          <Stack.Screen name="maint" component={Maintenance}
            options={{
                    headerShown: false
            }}
          />
           <Stack.Screen name="amaint" component={AddMaintenance}
            options={{
                    headerShown: false
            }}
          />
           <Stack.Screen name="edmaint" component={EdMaintenance}
            options={{
                    headerShown: false
            }}
          />
          <Stack.Screen name="inList" component={InvoiceList}
            options={{
                    headerShown: false
            }}
          />
          <Stack.Screen name="inCr" component={InvoiceCreate}
            options={{
                    headerShown: false
            }}
          />
          <Stack.Screen name="inPay" component={InvoicePay}
            options={{
                    headerShown: false
            }}
          />
          <Stack.Screen name="rat" component={Rating}
            options={{
                    headerShown: false
            }}
          />
          <Stack.Screen name="ratty" component={RatingType}
            options={{
                    headerShown: false
            }}
          />
          <Stack.Screen name="ratpr" component={RatingPrice}
            options={{
                    headerShown: false
            }}
          />
          <Stack.Screen name="ratadd" component={RatingAdd}
            options={{
                    headerShown: false
            }}
          />
          <Stack.Screen name="rated" component={RatingEd}
            options={{
                    headerShown: false
            }}
          />
          <Stack.Screen name="rattyad" component={RatingTypeAdd}
            options={{
                    headerShown: false
            }}
          />
          <Stack.Screen name="rattyed" component={RatingTypeEd}
            options={{
                    headerShown: false
            }}
          />
           <Stack.Screen name="ratpadd" component={AddRatingPrice}
            options={{
                    headerShown: false
            }}
          />
           <Stack.Screen name="ratpaed" component={EdRatingPrice}
            options={{
                    headerShown: false
            }}
          />
        </Stack.Navigator>
      
    );
};

const BottomTab = (props) => {
  return (

      <Tab.Navigator 
      screenOptions={{
        tabBarActiveTintColor:COLORS.dark,
        tabBarInactiveTintColor:COLORS.limegray,
        tabBarActiveBackgroundColor:COLORS.lightgray,
        tabBarInactiveBackgroundColor:COLORS.lightdark,
        tabBarStyle:{justifyContent:'center',alignItems:'center',alignSelf:'center'},
        headerShown:false
      }}
      >

          <Tab.Screen name='Home' component={Home}
              options={{
                  tabBarIcon: ({ color }) => (
                      <FontAwesome5 name='home' size={25} color={color} style={{ justifyContent: 'center', alignItems: 'center' }} />
                  ),
                  title: ''
              }}
          />
          <Tab.Screen name='Wallet' component={Wallet}
              options={{
                  tabBarIcon: ({ color }) => (
                      <FontAwesome5 name='wallet' size={25} color={color} style={{ justifyContent: 'center', alignItems: 'center' }} />
                  ),
                  title: ''
              }}
          />

          <Tab.Screen name='Profile' component={Profile}
              options={{
                  tabBarIcon: ({ color }) => (
                      <FontAwesome5 name='user-circle' size={25} color={color} style={{ justifyContent: 'center', alignItems: 'center' }} />
                  ),
                  title: ''
              }}
          />

          
      </Tab.Navigator>

  )
}

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
export default Navigator;
