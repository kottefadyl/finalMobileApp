import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useEffect, useState } from 'react';
import Homejsx from './Homejsx';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function Home({ navigation }) {
  const [contain, setContain] = useState(<Homejsx />)

  return (

    <LinearGradient
      colors={['black', '#101611', '#090F0A']}
      start={{ x: 0, y: 0,z:1 }} 
      end={{ x: 1, y: 1 }}
      locations={[0.3, 0.6 ,0.3]} // Emplacements pour contrôler la transparence
      style={styles2.container}
    >
      {contain}
      <View style={styles2.header}>
        <TouchableOpacity style={styles2.ViewNav}
          onPress={() => navigation.navigate('customDatePicker')}>
          <AntDesign name="calendar" size={20} color="#D5D597" />
          <Text style={styles2.TextNav}>calandar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles2.ViewNav}>
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
    </LinearGradient>
    
  );
}

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#222121',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    position: "relative",
    paddingTop:33
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
    paddingHorizontal: 12,
    paddingVertical: 5,
    backgroundColor: 'rgba(59, 57, 57,0.2)', // Couleur blanche avec 50% de transparence
    borderRadius: 35,
    margin: 1,
    position: 'relative',

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