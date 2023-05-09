import { FC } from 'react';
import { Button, Paper, Typography } from '@mui/material';

import { SpotifyPlaylist } from '../pages/PlayQuiz';

type Prop = {
	playlist: SpotifyPlaylist;
	onGameStart: () => void;
};

// TODO: add previous quiz results
const GamePreview: FC<Prop> = ({ playlist, onGameStart }) => (
	<Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
		<img
			src={playlist?.images[0].url}
			alt="playlist_cover"
			width="350px"
			style={{ alignSelf: 'center', marginBottom: '30px' }}
		/>
		<Typography textAlign="center" variant="h4">
			{playlist?.name}
		</Typography>
		<Typography textAlign="center" variant="subtitle1">
			{playlist?.description}
		</Typography>
		<Button variant="contained" onClick={onGameStart}>
			<Typography variant="h6">Play</Typography>
		</Button>
	</Paper>
);

export default GamePreview;
