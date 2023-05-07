import { initializeApp } from 'firebase/app';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut as authSignOut,
	onAuthStateChanged,
	User
} from 'firebase/auth';
import {
	collection,
	CollectionReference,
	doc,
	DocumentReference,
	getFirestore,
	getDoc
} from 'firebase/firestore';

// Initialize Firebase
initializeApp({
	apiKey: 'AIzaSyATxg3VtTYYu8YcRaG-Cg3rN3g4HxEOAig',
	authDomain: 'pv247-final-project.firebaseapp.com',
	projectId: 'pv247-final-project',
	storageBucket: 'pv247-final-project.appspot.com',
	messagingSenderId: '116546591898',
	appId: '1:116546591898:web:03da99b045ea5cbcc81323'
});

// Authentication
const auth = getAuth();

// Sign up handler
export const signUp = (email: string, password: string) =>
	createUserWithEmailAndPassword(auth, email, password);

// Sign in handler
export const signIn = (email: string, password: string) =>
	signInWithEmailAndPassword(auth, email, password);

// Sign out handler
export const signOut = () => authSignOut(auth);

// Subscribe to auth state changes
export const onAuthChanged = (callback: (u: User | null) => void) =>
	onAuthStateChanged(auth, callback);

// Firestore
const db = getFirestore();

export type SpotifyUser = {
	mail: string;
	spotifyUserId: string;
	displayName: string;
	image: string;
	profileLink: string;
	accessToken: string;
	refreshToken: string;
};

export const usersCollection = collection(
	db,
	'users'
) as CollectionReference<SpotifyUser>;

export const userDocument = (mail: string) =>
	doc(db, 'users', mail) as DocumentReference<SpotifyUser>;

export const getSpotifyUserFromDB = async (mail?: string) => {
	if (!mail) return null;

	const docSnap = await getDoc(userDocument(mail));

	if (docSnap.exists()) {
		const SU: SpotifyUser = {
			mail: docSnap.get('mail'),
			spotifyUserId: docSnap.get('spotifyUserId'),
			displayName: docSnap.get('displayName'),
			image: docSnap.get('image'),
			profileLink: docSnap.get('profileLink'),
			accessToken: docSnap.get('accessToken'),
			refreshToken: docSnap.get('refreshToken')
		};
		return SU;
	} else {
		console.log(`could not retriev user with email${mail}`);
		return null;
	}
};

export const getRefreshToken = async (
	mail: string
): Promise<string | undefined> => {
	const docSnap = await getDoc(userDocument(mail));

	return docSnap.get('refreshToken');
};

export const getAccessToken = async (
	mail: string
): Promise<string | undefined> => {
	const docSnap = await getDoc(userDocument(mail));

	return docSnap.get('accessToken');
};
