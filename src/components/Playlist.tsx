import { Box, Paper, Typography } from '@mui/material';
import { FC } from 'react';
import { Link } from '@tanstack/react-router';

import { SpotifyPlaylist } from '../pages/PlayQuiz.tsx';

import { PlayButton } from './MusicButtons.tsx';

type Props = {
	playlist: SpotifyPlaylist;
};
const Playlist: FC<Props> = ({ playlist }) => (
	<Paper
		sx={{
			'm': 2,
			'p': 2,
			'display': 'flex',
			'flexDirection': 'column',
			'alignItems': 'center',
			'width': '150px',
			'boxShadow': '0 0 12px 1px rgba(255, 255, 255, 0.2)',
			'&:hover': {
				boxShadow: '0 0 12px 4px rgba(214, 92, 242, 1)'
			}
		}}
	>
		<img src={playlist.images[0]?.url} alt="playlist_cover" width="100px" />
		<Typography
			variant="body1"
			fontWeight="bold"
			sx={{ textAlign: 'center', pt: 2, pb: 1 }}
		>
			{playlist.name}
		</Typography>
		<Box sx={{ flexGrow: 1 }} />
		<Link
			style={{ textDecoration: 'none' }}
			to="/quiz/$playlistId"
			params={{
				playlistId: playlist.id
			}}
		>
			<PlayButton
				variant="outlined"
				description="Quiz"
				handleClick={() => {
					console.log(`play quiz with playlist ${playlist.name}`);
				}}
			/>
		</Link>
	</Paper>
);

export default Playlist;
