import { initializeApp } from 'firebase/app';
import {
	collection,
	CollectionReference,
	getFirestore,
	query,
	where,
	getDocs
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
	playlistId: string;
	score: number;
	maxScore: number;
};

export const gamesCollection = collection(
	db,
	'games'
) as CollectionReference<Game>;

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
			playlistId: doc.get('playlistId'),
			score: doc('score'),
			maxScore: doc.get('maxScore')
		};

		games.push(game);
	});

	return games;
};
