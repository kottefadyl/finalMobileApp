import React, { useState, useEffect } from "react";
import { SQLiteProvider } from "expo-sqlite/next";
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Charging from './screens/charging/Charging';
import CustomDatePicker from './screens/customDatePicker/CustomDatePicker';
import Mois from './screens/mois/Mois';
import Jours from './screens/jours/Jour';
import Home from './screens/home/Home';
import AddDay from './screens/addDay/AddDay';
import { ActivityIndicator, Text, View } from 'react-native';

const Stack = createStackNavigator();



const loadDatabase = async () => {
  const dbName = "gest.db";
  const dbAsset = require("./assets/gest.db");
  const dbUri = Asset.fromModule(dbAsset).uri;
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
  if (!fileInfo.exists) {
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}SQLite`,
      { intermediates: true }
    );
    await FileSystem.downloadAsync(dbUri, dbFilePath);
  }
}



export default function App() {
  const [dbLoaded, setDbLoaded] = useState(false);

  useEffect(() => {
    loadDatabase()
      .then(() => setDbLoaded(true))
      .catch((e) => console.error(e));
  }, [])

  if (!dbLoaded) {
    return (
      <Charging />
    );
  }

  return (
    <NavigationContainer>
      <React.Suspense
        fallback={
          <View style={{ flex: 1 }} >
            <ActivityIndicator size={"large"} />
            <Text>
              Loading Database ...
            </Text>
          </View>
        }
      >
        <SQLiteProvider
          databaseName="gest.db"
          useSuspense
        >
          <Stack.Navigator initialRouteName="home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="jour" component={Jours} />
            <Stack.Screen name="customDatePicker" component={CustomDatePicker} />
            <Stack.Screen name="mois" component={Mois} />
            <Stack.Screen name="charging" component={Charging} />
            <Stack.Screen name="home" component={Home} />
            <Stack.Screen name="addDay" component={AddDay} />
          </Stack.Navigator>
        </SQLiteProvider>
      </React.Suspense>
    </NavigationContainer>
  );
}
