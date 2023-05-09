import { Box, Typography } from '@mui/material';
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
			Final score is: {score}/{tracks.length}.
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
				<TrackDetail key={i} playlistTrack={playlistTrack} position={i + 1} />
			))}
		</Box>
	</>
);

export default GameResult;
