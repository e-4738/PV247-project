import { initializeApp } from 'firebase/app';
import {
	collection,
	CollectionReference,
	getFirestore,
	QuerySnapshot,
	query,
	orderBy,
	limit,
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

const getGamesFromSnapshot = (querySnapshot: QuerySnapshot<Game>): Game[] => {
	const games: Game[] = querySnapshot.docs.map(doc => doc.data() as Game);

	console.log(games);
	return games;
};

export const getUsersGames = async (userId: string) => {
	const q = query(gamesCollection, where('spotifyUserId', '==', userId));
	const querySnapshot = await getDocs(q);

	return getGamesFromSnapshot(querySnapshot);
};

export const getTopTenGames = async () => {
	const topTenGamesQuery = query(
		gamesCollection,
		orderBy('score', 'desc'),
		limit(10)
	);
	const snapshot = await getDocs(topTenGamesQuery);

	return getGamesFromSnapshot(snapshot);
};

export const getTopThreeGamesForPlaylist = async (playlistId: string) => {
	const topThreeForPlaylist = query(
		gamesCollection,
		where('playlistId', '==', playlistId),
		orderBy('score', 'desc'),
		limit(3)
	);
	const snapshot = await getDocs(topThreeForPlaylist);

	return getGamesFromSnapshot(snapshot);
};
