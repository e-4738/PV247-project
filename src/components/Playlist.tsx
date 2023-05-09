import { Box, Button, Paper, Typography } from '@mui/material';
import { FC } from 'react';
import { Link } from '@tanstack/react-router';

import { SpotifyPlaylist } from '../pages/PlayQuiz.tsx';

type Props = {
	playlist: SpotifyPlaylist;
};
const Playlist: FC<Props> = ({ playlist }) => (
	<Paper
		sx={{
			m: 2,
			p: 2,
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			width: '150px'
		}}
	>
		<img src={playlist.images[0].url} alt="playlist_cover" width="100px" />
		<Typography sx={{ textAlign: 'center' }}>{playlist.name}</Typography>
		<Box sx={{ flexGrow: 1 }} />
		<Link
			style={{ textDecoration: 'none' }}
			to="/quizzes/$playlistId"
			params={{
				playlistId: playlist.id
			}}
		>
			<Button>Play</Button>
		</Link>
	</Paper>
);

export default Playlist;
