import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import {
  getReactNativePersistence,
  initializeAuth,
  connectAuthEmulator,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth/react-native';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import Constants from 'expo-constants';

export function initialize() {
  const firebaseApp = initializeApp(Constants.expoConfig?.extra?.firebase);
  const auth = initializeAuth(firebaseApp, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
  const firestore = getFirestore();

  if (__DEV__) {
    const normalizeUrl = Constants.experienceUrl.replace('exp://', 'http://');
    const url = new URL(normalizeUrl);

    connectAuthEmulator(auth, `http://${url.hostname}:9099`);
    connectFirestoreEmulator(firestore, Constants.experienceUrl, 8080);
  }

  return {
    firebaseApp,
    auth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    firestore,
  };
}
