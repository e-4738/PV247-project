import { initializeApp } from 'firebase/app';
import {
	collection,
	CollectionReference,
	doc,
	DocumentReference,
	getFirestore,
	query,
	where,
	getDocs,
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

export const gameDocument = (id: string) =>
	doc(db, 'games', id) as DocumentReference<Game>;

export const getUsersGames = async (userId: string) => {
	const q = query(gamesCollection, where('spotifyUserId', '==', userId));
	const querySnapshot = await getDocs(q);

	const games: Game[] = [];
	querySnapshot.forEach((doc: any) => {
		console.log(doc.id, ' => ', doc.data());

		const game: Game = {
			spotifyUserId: doc.get('spotifyUserId'),
			spotifyDisplayName: doc.get('spotifyDisplayName'),
			spotifyUserProfileLink: doc.get('spotifyUserProfileLink'),
			userProfilePictureLink: doc.get('userProfilePictureLink'),
			playlistName: doc.get('playlistName'),
			playlistLink: doc.get('playlistLink'),
			score: doc('score'),
			duration: doc.get('duration')
		};

		games.push(game);
	});

	return games;
};
