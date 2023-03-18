import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth, connectAuthEmulator, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth/react-native';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import Constants from 'expo-constants';


export function initialize() {
    const firebaseApp = initializeApp(Constants.expoConfig?.extra?.firebase);
    const auth = initializeAuth(firebaseApp, { persistence: getReactNativePersistence(AsyncStorage) });
    const firestore = getFirestore();

    if (__DEV__) {
        connectAuthEmulator(auth, 'http://localhost:9099');
        connectFirestoreEmulator(firestore, 'localhost', 8080)
    }

    return { firebaseApp, auth, onAuthStateChanged, signInWithEmailAndPassword, signOut, firestore };
}