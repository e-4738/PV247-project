import { Box, Button, Typography } from '@mui/material';
import { Link } from '@tanstack/react-router';
import { FC } from 'react';
import { grey } from '@mui/material/colors';

import { GameTrack } from '../pages/Quiz';

import TrackDetail from './TrackDetail';

type Prop = {
	score: number;
	tracks: GameTrack[];
};

const GameResult: FC<Prop> = ({ score, tracks }) => (
	<>
		<Typography variant="h4">Game Results</Typography>
		<Typography
			variant="body1"
			fontSize={24}
			fontWeight="bold"
			color={grey[300]}
		>
			Your final score is {score}/{tracks.length * 100}.
		</Typography>
		<Box
			sx={{
				width: '100%',
				flexWrap: 'wrap',
				display: 'flex',
				flexDirection: 'row',
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
