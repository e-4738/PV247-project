import { initializeApp } from 'firebase/app';
import {
	collection,
	CollectionReference,
	getFirestore
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

// Firestore
const db = getFirestore();

export type Game = {
	spotifyUserId: string;
	spotifyDisplayName: string;
	spotifyUserProfileLink: string;
	userProfilePictureLink: string;
	playlistName: string;
	playlistLink: string;
	score: number;
	duration: number;
};

export const gamesCollection = collection(
	db,
	'games'
) as CollectionReference<Game>;
