import { Text, View, StyleSheet, TouchableOpacity,Dimensions } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker'
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';



export default function CustomDatePicker() {
   const navigation = useNavigation();

  const [showPicker, setShowPicker] = useState(false)
  const [date, setDate] = useState(null)

  // ...
  const handleDateChange = (event, selectedDate) => {
    if (event.type === 'set') {
      const currentDate = selectedDate || date;

      // Extraction du jour, du mois et de l'année
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1; // Les mois sont indexés à partir de zéro
      const year = currentDate.getFullYear();
      const dateString = currentDate.toISOString(); // Convertir en chaîne de caractères

      // Formater la date comme "dd/mm/aaaa"
      const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;


      setDate(currentDate);

      navigation.navigate('jour', {
        formattedDate:formattedDate
      }); // Transmettre la chaîne de caractères et les valeurs jour, mois et année
    }
    setShowPicker(false);
  };
  // ...
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.inputContainerStyle} >
        <Text style={styles.TextStyle}>open date picker</Text>
      </TouchableOpacity>
      {
        showPicker && (
          <DateTimePicker
            mode={'date'}
            value={date || new Date()}
            onChange={handleDateChange} />
        )
      }
            <View style={styles2.header}>
        <TouchableOpacity style={styles2.ViewNav}
          onPress={() => navigation.navigate('customDatePicker')}>
          <AntDesign name="calendar" size={20} color="#D5D597" />
          <Text style={styles2.TextNav}>calandar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles2.ViewNav}
        onPress={() => navigation.navigate('home')}>
          <Entypo name="home" size={20} color="#D5D597" />
          <Text style={styles2.TextNav}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles2.ViewNav}>
          <Ionicons name="save-outline" size={20} color="#D5D597" />
          <Text style={styles2.TextNav}>all day</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles2.ViewNav}
        onPress={() => navigation.navigate('charging')}>
          <Entypo name="back-in-time" size={20} color="#D5D597" s />
          <Text style={styles2.TextNav}>pass month</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  inputContainerStyle: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#CAD3DF',
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 10,
    paddingRight: 10,
    height: 50,
  },
  TextStyle: {
    fontSize: 16,
    marginHorizontal: 10
  }
})

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#222121',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 6,
    position: "relative",
  },
  header: {
    left:10,
    bottom:10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
    paddingHorizontal: 12,
    paddingVertical: 5,
    backgroundColor: '#2E2E2D', // Couleur blanche avec 50% de transparence
    borderRadius: 35,
    margin: 1,
    position: 'absolute',
    width:Dimensions.get('window').width - 18,
  },
  ViewNav: {
    alignContent: "center",
    alignItems: "center",
  },
  TextNav: {
    fontSize: 12,
    color: "#D5D597",
  },
});
