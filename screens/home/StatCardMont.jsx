import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StatCardMont({reviewsNow}) {
  // const [somme]

  function getCurrentMonthAndYearAsString() {
    const months = [
      "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
      "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth(); // Récupère l'index du mois actuel
    const currentMonth = months[currentMonthIndex]; // Convertit l'index du mois en son nom
    const currentYear = currentDate.getFullYear(); // Récupère l'année actuelle
    // Formate le mois et l'année comme une chaîne de caractères "mois année"
    const currentMonthAndYear = `${currentMonth} ${currentYear}`;
    return currentMonthAndYear;
  }

// Fonction pour calculer la somme de total_eaux
function getTotalEaux(reviews) {
  if (reviews.length === 0) {
    return 0;
  }
  return reviews.reduce((total, review) => total + review.total_eaux, 0);
}

// Fonction pour calculer la somme de bouteille_vente
function getTotalBouteilleVente(reviews) {
  if (reviews.length === 0) {
    return 0;
  }
  return reviews.reduce((total, review) => total + review.bouteille_vente, 0);
}

// Fonction pour calculer la somme de vente_piece
function getTotalVentePiece(reviews) {
  if (reviews.length === 0) {
    return 0;
  }
  return reviews.reduce((total, review) => total + review.vente_piece, 0);
}


function getTotalGroup(reviews) {

  if (reviews.length === 0) {
    return 0;
  }
  // Utiliser reduce pour itérer sur chaque élément du tableau
  return reviews.reduce((total, review) => {
    // Vérifier la valeur de group_use
    if (review.group_use === 1) {
      // Si group_use vaut 1, ajouter la moitié de total_eaux à total
      return total + review.total_eaux / 2;
    } else if (review.group_use === 2) {
      // Si group_use vaut 2, ajouter total_eaux à total
      return total + review.total_eaux;
    } else {
      // Pour toutes les autres valeurs de group_use, ne pas ajouter total_eaux à total
      return total;
    }
  }, 0); // La valeur initiale de total est 0
}



  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.text, { color: 'white', fontWeight: "normal", fontSize: 23 }]}> {getCurrentMonthAndYearAsString()} </Text>
      </View>
      <View>
        <Text></Text>
        <View style={styles.container112}>
          <Text style={[styles.text, { color: 'white', fontWeight: "normal", fontSize: 20 }]}>Water bottle :</Text>
          <Text style={[styles.text, { color: 'white', fontWeight: "normal", fontSize: 20 }]}>${getTotalBouteilleVente(reviewsNow)}</Text>
        </View>
        <View style={styles.container112}>
          <Text style={[styles.text, { color: 'white', fontWeight: "normal", fontSize: 20 }]}>Energy :</Text>
          <Text style={[styles.text, { color: 'white', fontWeight: "normal", fontSize: 20 }]}>${getTotalGroup(reviewsNow)}</Text>
        </View>
        <View style={styles.container112}>
          <Text style={[styles.text, { color: 'white', fontWeight: "normal", fontSize: 20 }]}>Coins :</Text>
          <Text style={[styles.text, { color: 'white', fontWeight: "normal", fontSize: 20 }]}>$ {getTotalVentePiece(reviewsNow)}</Text>
        </View>
        <View style={styles.container112}>
          <Text style={[styles.text, { color: 'white', fontWeight: "normal", fontSize: 23 }]}>Total :</Text>
          <Text style={[styles.text, { color: '#25F100', fontWeight: "900", fontSize: 26 }]}>${getTotalEaux(reviewsNow)}</Text>
        </View>
        <Text> </Text>
      </View>
      <View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    color: "white",
    backgroundColor: "rgba(75, 79, 66  ,0.4)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    color: "#C9B9B9",

  },
  container112: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  text: {
    color: "white"
  }
});
