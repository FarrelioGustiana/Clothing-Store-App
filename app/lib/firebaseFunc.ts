import { auth, db } from "@config/firebase";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	setDoc,
	updateDoc,
} from "firebase/firestore";

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
		await signInWithEmailAndPassword(auth, email, password);
	} catch (error) {
		throw error as Error;
	}
};

export const addCategory = async (name: string): Promise<void> => {
	const newCategory = {
		categoryName: name,
		products: [],
	};
	try {
		await addDoc(collection(db, "categories"), newCategory);
	} catch (error) {
		throw error as Error;
	}
};

export const getCategories = async () => {
	try {
		const data = await getDocs(collection(db, "categories"));
		const filteredData = data.docs.map((c) => ({
			...c.data(),
			id: c.id,
		}));
		return filteredData;
	} catch (error) {
		throw error as Error;
	}
};

export const deleteCategory = async (id: string): Promise<void> => {
	try {
		await deleteDoc(doc(db, "categories", id));
	} catch (error) {
		throw error as Error;
	}
};

export const updateCategory = async (
	id: string,
	updatedName: string
): Promise<void> => {
	if (!updatedName.trim()) return;
	const categoryDoc = doc(db, "categories", id);

	try {
		await updateDoc(categoryDoc, { categoryName: updatedName });
	} catch (error) {
		throw error as Error;
	}
};
