import { initializeApp } from "firebase/app";
import {
	GoogleAuthProvider,
	initializeAuth,
	getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
	apiKey: "AIzaSyCkij9SWk4F-nfL4bVWrswpALpOYqtsd0E",
	authDomain: "clothing-store-app-ab050.firebaseapp.com",
	projectId: "clothing-store-app-ab050",
	storageBucket: "clothing-store-app-ab050.appspot.com",
	messagingSenderId: "44554634644",
	appId: "1:44554634644:web:96f60e5272d9d6721ebb81",
	measurementId: "G-ZSWQL7B1HE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
