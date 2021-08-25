//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet,TouchableOpacity} from 'react-native';
import { COLORS } from './../../constants/theme';
import DateTimePicker from '@react-native-community/datetimepicker';
// create a component
const AddDocument = () => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    console.log(date)
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setShow(false)
    };
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };
    
      const showDatepicker = () => {
        showMode('date');
      };
    
   
    return (
        <View style={styles.container}>
        <TouchableOpacity onPress={showDatepicker} style={{width:120,height:50,backgroundColor:COLORS.dark,
        justifyContent:'center',alignItems:'center'}}>
            <Text >Select Date</Text>
        </TouchableOpacity>
            
            {show && (
        <DateTimePicker
          value={date}
          mode={mode}
          onChange={onChange}
        />
      )}
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
export default AddDocument;
