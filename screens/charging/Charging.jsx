import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function Charging() {
    return (
        <LinearGradient
        colors={['black', '#3D3D3B', '#6D6C68', 'white']} // Ajout de la quatrième couleur
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0.1, 0.3, 0.8, 1]} // Positions des couleurs en pourcentage de la largeur de l'écran
        style={styles.container}
      >
    </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})