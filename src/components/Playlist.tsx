import { Box, Button, Paper, Typography } from '@mui/material';
import { Dispatch, FC, SetStateAction } from 'react';

import { SpotifyPlaylist } from '../pages/PlayQuiz.tsx';

type Props = {
	playlist: SpotifyPlaylist;
	openDetail: Dispatch<SetStateAction<string>>;
};
const Playlist: FC<Props> = ({ playlist, openDetail }) => (
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
		<Button onClick={() => openDetail(playlist.id)}>Play</Button>
	</Paper>
);

export default Playlist;
