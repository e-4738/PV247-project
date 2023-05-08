import { Paper, Typography } from '@mui/material';
import { FC } from 'react';

import { SpotifyPlaylist } from '../pages/PlayQuiz.tsx';

type Prop = {
	playlist: SpotifyPlaylist;
};
const Playlist: FC<Prop> = ({ playlist }) => (
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
	</Paper>
);

export default Playlist;
