import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native'
import StatCardMont from './StatCardMont';
import { useSQLiteContext } from "expo-sqlite/next";
import ListItems from './ListItems';
import AddDay from '../addDay/AddDay';
import { AntDesign } from '@expo/vector-icons';


export default function Homejsx() {

    const db = useSQLiteContext();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        getData(); // Charger les données initiales lors du montage du composant
    }, []);

    function filterReviewsByCurrentMonthAndYear(reviews) {
        if (reviews.length === 0) {
            return []
        }
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // Les mois en JavaScript commencent à partir de 0, donc on ajoute 1
        const currentYear = currentDate.getFullYear();
        
        const reviewsNow = reviews.filter(review => {
          const [day, month, year] = review.date_id.split('/').map(Number);       
          return month === currentMonth && year === currentYear;
        });    
        return reviewsNow;
      }


    async function getData() {
        try {
            const result = await db.getAllAsync(`SELECT * FROM Jours;`);
            setReviews(result);
            console.log(result);
        } catch (error) {
            console.error("Erreur lors de la récupération des données :", error);
        }
    }

    async function deleteDay(id) {
        db.withTransactionAsync(async () => {
            await db.runAsync(`DELETE FROM jours WHERE date_id = ?;`, [id])
            Alert.alert("Deleted Successfuly");
            await getData();
        })
    }

    async function FaddDay(date_id, vente_piece, bouteille_vente, group_use, description, total_eaux) {
        try {
            if (!date_id || !bouteille_vente || !description || !total_eaux || !vente_piece) {
                throw new Error("Veuillez entrer toutes les valeurs du formulaire");
            }
            if (isNaN(parseInt(bouteille_vente)) || isNaN(parseInt(vente_piece)) || isNaN(parseInt(total_eaux)) || isNaN(parseInt(group_use))) {
                throw new Error("Veuillez entrer des chiffres là où c'est attendu");
            }
            if (reviews.find(review => review.date_id === date_id)) {
                console.log(reviews);
                throw new Error("vous ne pouvez pas avoir plusieur recette pour une meme journé");
            } else {
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
                    Alert.alert("added Succesfuly");
                    await getData();
                     // Si getData est une fonction disponible, assurez-vous qu'elle est correctement définie et accessible
                });
            }

        } catch (error) {
            console.error("Erreur lors de l'ajout d'un jour :", error);
            Alert.alert("Erreur", error.toString()); // Convertir l'objet error en chaîne de caractères
        }
    }

    const [contain1, setContain1] = useState()
    const [ifcontain, setIfcontain] = useState(false)
    const [icon, setIcon] = useState(<AntDesign name="pluscircleo" size={30} color={"white"} />)

    const handlePress = () => {
        if (ifcontain === false) {
            setContain1(<AddDay FaddDay={FaddDay} />)
            setIcon(<AntDesign name="minuscircleo" size={30} color={"white"} />)
            setIfcontain(true)
        }
        if (ifcontain === true) {
            setContain1()
            setIcon(<AntDesign name="pluscircleo" size={30} color={"white"} />)
            setIfcontain(false)
        }
    }

    return (
        <ScrollView >
            <StatCardMont reviewsNow={filterReviewsByCurrentMonthAndYear(reviews)}/>
            <View>
                <Text style={[styles.text, { fontWeight: "900", marginTop: 40, marginBottom: 20, fontSize: 15 }]}> Debuter l'utilisation de lapplication sous Droits  </Text>
                <Text style={[styles.text, { fontWeight: "normal", marginTop: 10, marginBottom: 20, color: '#A9A9A6' }]}>l'utilisation et ou la commercialisation de cette application sans droit d'administration peut exposer a des sanctions penale</Text>
            </View>
            <TouchableOpacity style={styles.plusContainer} onPress={() => handlePress()}>
                {icon}
            </TouchableOpacity>
            {contain1}
            <ListItems reviewsNow={filterReviewsByCurrentMonthAndYear(reviews)} reviews={reviews} deleteDay={deleteDay} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    plusContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "blue",
        borderRadius: 20,
        textAlign: "center",
        justifyContent: "center",
        paddingVertical: 3,
        marginBottom: 10
    },
    text: {
        color: "white",
    }
})