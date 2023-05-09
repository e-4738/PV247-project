import { Button, Typography } from '@mui/material';
import { useParams } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import usePageTitle from '../hooks/usePageTitle';
import useLoggedInUser from '../hooks/useLoggedInUser';
import usePlaylistsTracks, { PlaylistTrack } from '../hooks/usePlaylistsTracks';

import GamePreview from './GamePreview';
import QuizQuestion from './QuizQuestion';

const Quiz = () => {
	usePageTitle('Quiz');
	const [started, setStarted] = useState<boolean>(false);
	const [activeQuestion, setActiveQuestion] = useState<number>(0);
	const [score, setScore] = useState<number>(0);
	const [duration, setDuration] = useState<number>(0);
	const [finished, setFinished] = useState(false);

	const user = useLoggedInUser();

	useEffect(() => {
		if (tracks && activeQuestion === tracks.length - 1) {
			setFinished(true);
		}
	}, [activeQuestion]);

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
	console.log(tracks);

	return !started ? (
		<>
			<GamePreview playlist={data} />
			<Button variant="contained" onClick={() => setStarted(true)}>
				<Typography variant="h6">Play</Typography>
			</Button>
		</>
	) : !finished ? (
		<QuizQuestion
			playlistTrack={tracks[activeQuestion]}
			onNext={() => setActiveQuestion(prev => prev + 1)}
			onCorrect={() => {
				setScore(prev => prev + 1);
			}}
		/>
	) : (
		<Typography>
			Final score is: {score}/{activeQuestion}.
		</Typography>
	);
};

export default Quiz;
