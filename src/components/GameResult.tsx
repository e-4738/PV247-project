import { Box, Button, Typography } from '@mui/material';
import { Link } from '@tanstack/react-router';
import { FC } from 'react';

import { PlaylistTrack } from '../hooks/usePlaylistsTracks';

import TrackDetail from './TrackDetail';

type Prop = {
	score: number;
	tracks: PlaylistTrack[];
};

const GameResult: FC<Prop> = ({ score, tracks }) => (
	<>
		<Typography variant="h4">Game Results</Typography>
		<Typography variant="h6">
			Final score is: {score}/{tracks.length * 100}.
		</Typography>
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: 2
			}}
		>
			{tracks.map((playlistTrack, i) => (
				<TrackDetail key={i} gameTrack={playlistTrack} position={i + 1} />
			))}
		</Box>
		<Link style={{ textDecoration: 'none' }} to="/play">
			<Button variant="contained">
				<Typography>Back to playlists</Typography>
			</Button>
		</Link>
	</>
);

export default GameResult;
