import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions, TextInput, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';
import Icons2 from 'react-native-vector-icons/AntDesign';
import AddDay from '../addDay/AddDay';
import { useSQLiteContext } from "expo-sqlite/next";
import { MaterialIcons } from '@expo/vector-icons';
import Icons3 from 'react-native-vector-icons/FontAwesome6';

export default function Jour({ route }) {

  const [totalAmount, setTotalAmount] = useState('');
  const [description, setDescription] = useState('');
  const [totalCoinCell, settotalCoinCell] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [totalBouteil, setTotalBouteil] = useState('');

  const [ifUpdateContent, setIfUpdateContent] = useState(false)
  const [updateContent, setUpdateContent] = useState()

  const handlePress = () => {
    if (ifUpdateContent === false) {
      setUpdateContent(<UpdateComponent formattedDate={formattedDate} updateDay={updateDay} />)
      setIfUpdateContent(true)
    }
    if (ifUpdateContent === true) {
      setUpdateContent()
      setIfUpdateContent(false)
    }
  }

  const { formattedDate } = route.params;

  const db = useSQLiteContext();
  const [element, setElement] = useState([]);

  useEffect(() => {
    getData1();  //Charger les données initiales lors du montage du composant
  }, []);

  async function getData1(date_id) {
    try {
      const result = await db.getAllAsync(`SELECT * FROM Jours WHERE date_id = ?;`, [formattedDate]);
      setElement(result);
      console.log(result);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  }

  async function updateDay(date_id, vente_piece, bouteille_vente, group_use, description, total_eaux) {
    try {
      if (!date_id || !bouteille_vente || !description || !total_eaux || !vente_piece) {
        throw new Error("Veuillez entrer toutes les valeurs du formulaire");
      }
      if (isNaN(parseInt(bouteille_vente)) || isNaN(parseInt(vente_piece)) || isNaN(parseInt(total_eaux)) || isNaN(parseInt(group_use))) {
        throw new Error("Veuillez entrer des chiffres là où c'est attendu");
      }

      await db.withTransactionAsync(async () => {
        await db.runAsync(
          `
        UPDATE jours
        SET vente_piece = ?,
            bouteille_vente = ?,
            group_use = ?,
            description = ?,
            total_eaux = ?
        WHERE date_id = ?;
        `,
          [
            parseInt(vente_piece),
            parseInt(bouteille_vente),
            parseInt(group_use), // Assurez-vous que group_use est bien numérique
            description,
            parseInt(total_eaux),
            date_id
          ]
        );

        await getData1(); // Si getData est une fonction disponible, assurez-vous qu'elle est correctement définie et accessible
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour d'un jour :", error);
      Alert.alert("Erreur", error.toString()); // Convertir l'objet error en chaîne de caractères
    }
  }


  async function FaddDay(date_id, vente_piece, bouteille_vente, group_use, description, total_eaux) {
    try {
      if (!date_id || !bouteille_vente || !description || !total_eaux || !vente_piece) {
        throw new Error("Veuillez entrer toutes les valeurs du formulaire");
      }
      if (isNaN(parseInt(bouteille_vente)) || isNaN(parseInt(vente_piece)) || isNaN(parseInt(total_eaux)) || isNaN(parseInt(group_use))) {
        throw new Error("Veuillez entrer des chiffres là où c'est attendu");
      }
      await db.withTransactionAsync(async () => {
        await db.runAsync(
          `
                  INSERT INTO jours (date_id, vente_piece, bouteille_vente, group_use, description, total_eaux) VALUES (?,?,?,?,?,?);
                  `,
          [
            date_id,
            parseInt(vente_piece),
            parseInt(bouteille_vente),
            parseInt(group_use), // Assurez-vous que group_use est bien numérique
            description,
            parseInt(total_eaux)
          ]
        );
        await getData1(); // Si getData est une fonction disponible, assurez-vous qu'elle est correctement définie et accessible
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout d'un jour :", error);
      Alert.alert("Erreur", error.toString()); // Convertir l'objet error en chaîne de caractères
    }
  }


  let inType = "null"; // Valeur par défaut si element est vide

  if (element.length > 0) {
    switch (element[0].group_use) {
      case 0:
        inType = "null";
        break;
      case 1:
        inType = "partiel";
        break;
      case 2:
        inType = "total";
        break;
      default:
        inType = "null";
        break;
    }
  }


  const formattedDateParts = formattedDate.split('/'); // Divise la date en jour, mois et année
  const day = parseInt(formattedDateParts[0], 10); // Jour
  const month = parseInt(formattedDateParts[1], 10); // Mois
  const year = parseInt(formattedDateParts[2], 10); // Année

  const dateObj = new Date(year, month - 1, day); // Crée un objet Date
  const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }; // Options de formatage

  const dateEnLettres = dateObj.toLocaleDateString('fr-FR', options); // Formatage de la date en texte

  if (element.length === 0) {
    return (
      <LinearGradient
        colors={['black', 'black', '#19191A']}
        start={{ x: 0, y: 0, z: 2 }}
        end={{ x: 1, y: 1 }}
        locations={[0.2, 0.8, 0.7]} style={[styles.container, { padding: 12 }]}>
        <Text style={[styles.text, { fontWeight: "900", fontSize: 22, marginBottom: 30, textAlign: 'center' }]}>{dateEnLettres}</Text>
        <ScrollView>
          <AddDay selectedDate={formattedDate} FaddDay={FaddDay} />
        </ScrollView>
      </LinearGradient>
    )
  } else {
    return (

      <LinearGradient
        colors={['black', 'black', '#19191A']}
        start={{ x: 0, y: 0, z: 2 }}
        end={{ x: 1, y: 1 }}
        locations={[0.2, 0.8, 0.7]} style={styles.container}>
        <ScrollView>
          <View style={styles.container2}>
            <Text style={[styles.text, { fontWeight: "900", fontSize: 22, marginBottom: 30, textAlign: 'center' }]}>{dateEnLettres}</Text>
            <View style={styles.container3}>
              <Text style={[styles.text, { fontSize: 20, fontWeight: "800" }]}>groupe  : </Text>
              <Text style={[styles.text, { fontSize: 20, fontWeight: "800" }]}> {inType}</Text>
            </View>
            <View style={styles.container3}>
              <Text style={[styles.text, { fontSize: 20, fontWeight: "800" }]}>bouteille vendu  : </Text>
              <Text style={[styles.text, { fontSize: 20, fontWeight: "800" }]}> {element[0].bouteille_vente}.OO $</Text>
            </View>
            <View style={styles.container3}>
              <Text style={[styles.text, { fontSize: 20, fontWeight: "800" }]}>peace vendu : </Text>
              <Text style={[styles.text, { fontSize: 20, fontWeight: "800" }]}> {element[0].vente_piece}.OO $</Text>
            </View>
            <View style={styles.container3}>
              <Text style={[styles.text, { fontSize: 20, fontWeight: "800" }]}>Total : </Text>
              <Text style={[styles.text, { fontSize: 20, fontWeight: "800" }]}> {element[0].total_eaux}.OO $</Text>
            </View>
          </View>
          <View style={[styles.container2, { marginTop: 20, backgroundColor: "#87713A" }]}>
            <Text style={[styles.text, { fontWeight: "900", fontSize: 22, marginBottom: 10, textAlign: 'center' }]}>Remarque/Description</Text>
            <Text style={[styles.text, { fontSize: 17, marginHorizontal: 20 }]}>{element[0].description} </Text>
          </View>
          <TouchableOpacity style={styles.update}
            onPress={() => handlePress()} >
            <MaterialIcons name="update" size={34} color="white" />
          </TouchableOpacity>
          {/* <UpdateComponent formattedDate={formattedDate} /> */}
          {updateContent}
        </ScrollView>
      </LinearGradient>
    );
  }
}

function UpdateComponent({ formattedDate, updateDay }) {
  const [totalAmount, setTotalAmount] = useState('');
  const [description, setDescription] = useState('');
  const [totalCoinCell, settotalCoinCell] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [totalBouteil, setTotalBouteil] = useState('');
  const [date, setDate] = useState(formattedDate);

  const handleRadioButtonPress = (value) => {
    setSelectedValue(value);
  };

  return (
    <View style={{ marginTop: 30, marginBottom: 30 }}>
      <Text style={styles.header}>Modification</Text>
      <View style={{ marginTop: 30 }}>
        <View style={styles.textInputContainer}>
          <Icons name='coins' size={20} color="#A9A9A9" style={styles.icon} />
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
          <Icon name="money" size={20} color="#A9A9A9" style={styles.icon} />
          <TextInput
            keyboardType='numeric'
            style={styles.textInput}
            placeholder='Total journalier en Fr cfa'
            placeholderTextColor='#A9A9A9'
            value={totalAmount}
            onChangeText={setTotalAmount}
          />
        </View>
        <Text style={styles.titreInput}>
          Definir l'utilisation du groupe pendant la journée
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
        <TouchableOpacity style={styles.submitButton} onPress={() => updateDay(date, totalCoinCell, totalBouteil, selectedValue, description, totalAmount)}>
          <Text style={styles.submitButtonText}>Soumettre</Text>
          <Icons2 name='rightcircle' size={50} color="blue" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: "white",
  },
  container2: {
    backgroundColor: "#19191A",
    padding: 12,
    borderRadius: 13,
    marginTop: 12,
    width: Dimensions.get('window').width - 18
  },
  container3: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 12
  },
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
  },
  update: {
    backgroundColor: "blue",
    borderRadius: 20,
    margin: 10,
    alignItems: 'center',
    marginTop: 40,
  }
});