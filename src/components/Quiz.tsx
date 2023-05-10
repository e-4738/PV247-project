import { useParams } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import usePageTitle from '../hooks/usePageTitle';
import useLoggedInUser from '../hooks/useLoggedInUser';
import usePlaylistsTracks, { PlaylistTrack } from '../hooks/usePlaylistsTracks';

import GamePreview from './GamePreview';
import QuizQuestion from './QuizQuestion';
import GameResult from './GameResult';

const Quiz = () => {
	usePageTitle('Quiz');
	const [started, setStarted] = useState<boolean>(false);
	const [activeQuestion, setActiveQuestion] = useState<number>(0);
	const [score, setScore] = useState<number>(0);

	const user = useLoggedInUser();

	const { playlistId } = useParams();
	const { data } = useQuery({
		queryKey: [playlistId],
		queryFn: () =>
			fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${user?.accessToken}`
				}
			}).then(res => res.json())
	});

	const tracks: PlaylistTrack[] = usePlaylistsTracks(playlistId);

	const finished = useMemo(
		() => activeQuestion === tracks?.length,
		[activeQuestion]
	);

	return !started ? (
		<GamePreview playlist={data} onGameStart={() => setStarted(true)} />
	) : !finished ? (
		<QuizQuestion
			playlistTrack={tracks[activeQuestion]}
			onNext={() => {
				setActiveQuestion(prev => prev + 1);
			}}
			onCorrect={(points: number) => {
				setScore(prev => prev + points);
			}}
		/>
	) : (
		<GameResult score={score} tracks={tracks} />
	);
};

export default Quiz;
