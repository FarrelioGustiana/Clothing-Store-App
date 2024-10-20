import { auth, db } from "@config/firebase";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const signUp = async (
	username: string,
	email: string,
	password: string
): Promise<void> => {
	try {
		const res = await createUserWithEmailAndPassword(auth, email, password);
		await setDoc(doc(db, "users", res.user.uid), {
			username,
			email,
			id: res.user.uid,
		});

		await setDoc(doc(db, "userCarts", res.user.uid), {
			carts: [],
		});
	} catch (error) {
		throw error as Error;
	}
};

export const signIn = async (
	email: string,
	password: string
): Promise<void> => {
	try {
		const res = await signInWithEmailAndPassword(auth, email, password);
	} catch (error) {
		throw error as Error;
	}
};
