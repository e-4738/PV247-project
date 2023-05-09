import { FC } from 'react';
import { Paper, Typography } from '@mui/material';

import { SpotifyPlaylist } from '../pages/PlayQuiz';

type Prop = {
	playlist: SpotifyPlaylist;
};

// TODO: add previous quiz results
const GamePreview: FC<Prop> = ({ playlist }) => (
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
	</Paper>
);

export default GamePreview;
