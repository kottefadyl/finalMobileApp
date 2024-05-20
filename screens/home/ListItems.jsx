import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
// import { AntDesign } from '@expo/vector-icons';
// import { useSQLiteContext } from "expo-sqlite/next";
import { AntDesign } from '@expo/vector-icons';

export default function ListItems({reviews,deleteDay,reviewsNow}) {

    return (
        <View style={[styles.container, { gap: 22, flex: 1 }]}>
            {reviewsNow.map((review) => {
                
                let iconColor;
                switch (review.group_use) {
                    case 0:
                        iconColor = "green";
                        break;
                    case 1:
                        iconColor = "yellow";
                        break;
                    case 2:
                        iconColor = "red";
                        break;
                    default:
                        iconColor = "green";
                    break;
                }

                return (
                    <TouchableOpacity key={review.date_id} activeOpacity={0.7} style={styles.touchContainer}
                        onLongPress={()=> deleteDay(review.date_id)}
                    >
                        <View>
                            <AntDesign name="infocirlce" size={24} color={iconColor} />
                        </View>
                        <View>
                            <Text style={[styles.text, { fontWeight: "bold", fontSize: 16 }]}>${review.total_eaux}</Text>
                            <Text style={styles.text}>{convertDateToWords(review.date_id)}</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "center" }}>
                            {review.vente_piece > 0 ? (
                                <>
                                    <Ionicons name="arrow-up-outline" color="#25F100" size={15} />
                                    <Text style={{ color: "#25F100", marginLeft: 5 }}>{review.vente_piece}</Text>
                                </>
                            ) : (
                                <>
                                    <Ionicons name="arrow-down-outline" color="red" size={15} />
                                    <Text style={{ color: "red", marginLeft: 5 }}>{review.vente_piece}</Text>
                                </>
                            )}
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 35,
    },
    touchContainer: {
        paddingHorizontal: 10,
        backgroundColor: 'rgba(75, 79, 66  ,0.4)',
        flexDirection: "row",
        borderRadius: 10,
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    text: {
        color: 'white',
    },
});

function convertDateToWords(dateString) {
    if (!dateString) {
        return "Date non disponible"; // ou une autre valeur par défaut
    }
    
    const [day, month, year] = dateString.split('/');
    const date = new Date(year, month - 1, day);
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat('fr-FR', options).format(date);
}

