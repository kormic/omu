import AsyncStorage from '@react-native-async-storage/async-storage';
import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import {
	getReactNativePersistence,
	initializeAuth,
	connectAuthEmulator,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
	getAuth,
	Auth,
} from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator, Firestore } from 'firebase/firestore';
import Constants from 'expo-constants';

export function initializeFirebase() {
	let app: FirebaseApp | undefined = undefined,
		auth: Auth | undefined = undefined,
		firestore: Firestore | undefined = undefined;

	const isFirebaseInitialized = getApps().length > 0;

	if (isFirebaseInitialized) {
		app = getApp();
		auth = getAuth(app);
	}

	if (!isFirebaseInitialized) {
		try {
			app = initializeApp(Constants.expoConfig?.extra?.firebase);
			auth = initializeAuth(app, {
				persistence: getReactNativePersistence(AsyncStorage),
			});
			firestore = getFirestore(app);
		} catch (error) {
			throw 'Error initializing firebase: ' + error;
		}

		if (__DEV__ && Constants.expoConfig?.hostUri) {
			const hostUri = Constants.expoConfig.hostUri.split(':')[0];

			connectAuthEmulator(auth, `http://${hostUri}:9099`);
			connectFirestoreEmulator(firestore, hostUri, 8080);
		}
	}

	if (!app) {
		throw 'Error initializing firebase: app is undefined';
	}

	return {
		app,
		auth,
		onAuthStateChanged,
		signInWithEmailAndPassword,
		signOut,
		firestore,
	};
}
