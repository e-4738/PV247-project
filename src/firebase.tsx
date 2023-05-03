// import { initializeApp } from 'firebase/app';
// import {
// 	getAuth,
// 	createUserWithEmailAndPassword,
// 	signInWithEmailAndPassword,
// 	signOut as authSignOut,
// 	onAuthStateChanged,
// 	User
// } from 'firebase/auth';
// import {
// 	collection,
// 	CollectionReference,
// 	doc,
// 	DocumentReference,
// 	getFirestore,
// 	Timestamp
// } from 'firebase/firestore';

// import { BoardState, Winner } from './hooks/useGame';

// // Initialize Firebase
// initializeApp({
// 	apiKey: 'AIzaSyBI4b5lB8fB9_RXjThiXAdypt_Nf-iS21s',
// 	authDomain: 'pv247-heyshowshana.firebaseapp.com',
// 	projectId: 'pv247-heyshowshana',
// 	storageBucket: 'pv247-heyshowshana.appspot.com',
// 	messagingSenderId: '153947361152',
// 	appId: '1:153947361152:web:ec8b6ea8ca1b5eed663b65'
// });

// // Authentication
// const auth = getAuth();

// // Sign up handler
// export const signUp = (email: string, password: string) =>
// 	createUserWithEmailAndPassword(auth, email, password);

// // Sign in handler
// export const signIn = (email: string, password: string) =>
// 	signInWithEmailAndPassword(auth, email, password);

// // Sign out handler
// export const signOut = () => authSignOut(auth);

// // Subscribe to auth state changes
// export const onAuthChanged = (callback: (u: User | null) => void) =>
// 	onAuthStateChanged(auth, callback);

// // Firestore
// const db = getFirestore();

// // Reviews collection
// export type Review = {
// 	by: string;
// 	stars: number;
// 	description?: string;
// };

// export const reviewsCollection = collection(
// 	db,
// 	'reviews'
// ) as CollectionReference<Review>;

// export const reviewsDocument = (id: string) =>
// 	doc(db, 'reviews', id) as DocumentReference<Review>;

// // Matches collection
// export type Match = {
// 	by: string;
// 	winner: Winner;
// 	board: BoardState;
// 	date: Timestamp;
// };

// export const matchesCollection = collection(
// 	db,
// 	'matches'
// ) as CollectionReference<Match>;
