import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';

import usePageTitle from '../hooks/usePageTitle';
import { Game, getUsersGames } from '../firebase';
import useLoggedInUser from '../hooks/useLoggedInUser';
import GameRecord from '../components/GameRecord';

const YourGames = () => {
	usePageTitle('Your Games');
	const [games, setGames] = useState<Game[]>();
	const user = useLoggedInUser();
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			getUsersGames(user?.spotifyUserId).then(pastGames => setGames(pastGames));
		}
	}, []);

	useEffect(() => {
		if (!user) {
			navigate({ to: '/' });
		}
	}, []);

	return (
		<>
			<Typography variant="h4" textAlign="center">
				Records of your past games
			</Typography>

			{user && (
				<Box
					sx={{
						width: '100%',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: 2
					}}
				>
					{games?.map((game, key) => (
						<GameRecord
							key={key}
							playlistId={game.playlistId}
							gameScore={game.score}
							gameMaxScore={game.maxScore}
						/>
					))}
				</Box>
			)}
		</>
	);
};

export default YourGames;
