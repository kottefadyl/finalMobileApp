import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons2 from 'react-native-vector-icons/AntDesign';
import Icons3 from 'react-native-vector-icons/FontAwesome6';



export default function AddDay({ selectedDate,FaddDay }) {
  
  // const {selectedDate} = use.params.selectedDate

  const [totalAmount, setTotalAmount] = useState('');
  const [description, setDescription] = useState('');
  const [totalCoinCell, settotalCoinCell] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [totalBouteil, setTotalBouteil] = useState('');
  const [date, setDate] = useState(selectedDate ? selectedDate : new Date().toLocaleDateString('fr-FR'));

  console.log("ici",selectedDate)
  console.log("date",date);

  const handleRadioButtonPress = (value) => {
    setSelectedValue(value);
  };

  return (
    <View>
      <Text style={styles.header}>Enregistrer fin de journée</Text>
      <View style={{ marginTop: 30 }}>
        <View style={styles.textInputContainer}>
          <Icon name="money" size={20} color="#A9A9A9" style={styles.icon} />
          <TextInput
            keyboardType="numeric"
            style={styles.textInput}
            placeholder='Total journalier en Fr cfa'
            placeholderTextColor='#A9A9A9'
            value={totalAmount}
            onChangeText={setTotalAmount}
          />
        </View>
        <View style={styles.textInputContainer}>
          <Icon name="pencil" size={20} color="#A9A9A9" style={styles.icon} />
          <TextInput
            style={styles.textInput}
            placeholder='Remarque ou description'
            placeholderTextColor='#A9A9A9'
            value={description}
            onChangeText={setDescription}
          />
        </View>
        <View style={styles.textInputContainer}>
          <Icons3 name='coins' size={20} color="#A9A9A9" style={styles.icon} />
          <TextInput
            keyboardType="numeric"
            style={styles.textInput}
            placeholder='Total de piece vendu'
            placeholderTextColor='#A9A9A9'
            value={totalCoinCell}
            onChangeText={settotalCoinCell}
          />
        </View>
        <View style={styles.textInputContainer}>
          <Icons3 name='bottle-water' size={20} color="#A9A9A9" style={styles.icon} />
          <TextInput
            keyboardType="numeric"
            style={styles.textInput}
            placeholder='prix total bouteille vendu'
            placeholderTextColor='#A9A9A9'
            value={totalBouteil}
            onChangeText={setTotalBouteil}
          />
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            style={[styles.textInput, { display: 'none' }]}
            placeholder='Date'
            placeholderTextColor='transparent'
            value={date}
            editable={false}
          />
        </View>
        <Text style={styles.titreInput}>
          Définir l'utilisation du groupe pendant la journée
        </Text>
        <View style={styles.radioButtonContainer}>
          <TouchableOpacity
            style={[styles.radioButton, selectedValue === 0 && styles.radioButtonSelected]}
            onPress={() => handleRadioButtonPress(0)}>
            <Text style={styles.radioButtonText}>Null</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.radioButton, selectedValue === 1 && styles.radioButtonSelected]}
            onPress={() => handleRadioButtonPress(1)}>
            <Text style={styles.radioButtonText}>Partiel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.radioButton, selectedValue === 2 && styles.radioButtonSelected]}
            onPress={() => handleRadioButtonPress(2)}>
            <Text style={styles.radioButtonText}>Total</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={()=>FaddDay(date,totalCoinCell,totalBouteil,selectedValue,description,totalAmount)}>
          <Text style={styles.submitButtonText}>Soumettre</Text>
          <Icons2 name='rightcircle' size={50} color="blue" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white"
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: "#2C2C2C",
    borderRadius: 15,
    paddingLeft: 17
  },
  textInput: {
    flex: 1,
    color: '#A9A9A9',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  icon: {
    marginRight: 10,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginHorizontal: 20
  },
  radioButton: {
    borderWidth: 1,
    borderColor: '#A9A9A9',
    borderRadius: 110,
    padding: 17,
    fontSize: 10,

  },
  radioButtonSelected: {
    backgroundColor: 'gray',
    color: "black",
  },
  radioButtonText: {
    color: '#A9A9A9',
    fontSize: 12
  },
  submitButton: {
    alignItems: 'center',
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "space-between",
  },
  submitButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',

  },
  titreInput: {
    color: "white",
    marginBottom: 10,
    fontWeight: "900"
  }
});
