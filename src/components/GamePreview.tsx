import { FC } from 'react';
import { Button, Paper, Typography } from '@mui/material';

import usePlaylistsTracks from '../hooks/usePlaylistsTracks';

type Prop = {
	playlistId: string;
};

const GamePreview: FC<Prop> = ({ playlistId }) => {
	const tracks = usePlaylistsTracks(playlistId);
	console.log(tracks);
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
