import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button, Paper, Typography } from '@mui/material';

import useLoggedInUser from '../hooks/useLoggedInUser';

type Prop = {
	playlistId: string;
};

const GamePreview: FC<Prop> = ({ playlistId }) => {
	const user = useLoggedInUser();

	const { data } = useQuery({
		queryKey: [playlistId],
		queryFn: () =>
			fetch(`https://api.spotify.com/v1/browse/playlists/${playlistId}`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${user?.accessToken}`
				}
			}).then(res => res.json())
	});

	return (
		<Paper
			sx={{ width: '100vh', p: 2, display: 'flex', flexDirection: 'column' }}
		>
			<Typography>
				Here the details of the playlists will be alongside with prevoius game
				stats and option to play
			</Typography>
			<Typography>Playlist id: {playlistId}</Typography>
			<Button>Play!</Button>
		</Paper>
	);
};

export default GamePreview;
