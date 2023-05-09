import { FC } from 'react';
import { Box, Paper, Typography } from '@mui/material';

import { PlaylistTrack } from '../hooks/usePlaylistsTracks';

type Props = {
	track: PlaylistTrack;
	isCorrect: boolean;
};
const GuessedTrack: FC<Props> = ({ track, isCorrect }) => {
	console.log(`GuessedTrack: ${isCorrect}`);
	return (
		<Paper
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				p: 4,
				paddingBottom: 4,
				width: '500px',
				backgroundColor: isCorrect ? 'darkgreen' : 'darkred'
			}}
		>
			<Typography variant="h6">
				{isCorrect
					? 'You were right, good job!'
					: 'You did not guess the song :('}
			</Typography>

			<img
				src={track.track.album.images[0].url}
				alt="playlist_cover"
				width="350px"
				style={{
					marginTop: 20,
					marginBottom: 20
				}}
			/>
			<Typography variant="h6" sx={{ textAlign: 'center' }}>
				{track.track.name}
			</Typography>
			<Typography sx={{ textAlign: 'center' }}>
				{track.track.artists.map(a => a.name).join(',')}
			</Typography>
			<Box sx={{ flexGrow: 1 }} />
		</Paper>
	);
};

export default GuessedTrack;
