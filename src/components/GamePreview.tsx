import { FC } from 'react';
import { Button, Grid, Paper, Typography } from '@mui/material';

import { SpotifyPlaylist } from '../pages/PlayQuiz';

type Prop = {
	playlist: SpotifyPlaylist;
	onGameStart: () => void;
};

// TODO: add previous quiz results
const GamePreview: FC<Prop> = ({ playlist, onGameStart }) => (
	<>
		<Paper sx={{ p: 2, width: '100%' }}>
			<Grid container spacing={2}>
				<Grid
					item
					md={6}
					xs={12}
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center'
					}}
				>
					<img
						src={playlist?.images[0].url}
						alt="playlist_cover"
						width="350px"
						style={{ alignSelf: 'center', marginBottom: '30px' }}
					/>
					<Typography textAlign="center" variant="h4">
						{playlist?.name}
					</Typography>
					<Typography
						sx={{ wordWrap: 'break-word' }}
						textAlign="center"
						variant="subtitle1"
					>
						{playlist?.description}
					</Typography>
				</Grid>
				<Grid
					item
					md={6}
					xs={12}
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center'
					}}
				>
					<Typography variant="h4">Matches</Typography>
				</Grid>
			</Grid>
		</Paper>
		<Button sx={{ px: 8 }} variant="contained" onClick={onGameStart}>
			<Typography variant="h6">Play</Typography>
		</Button>
	</>
);

export default GamePreview;
