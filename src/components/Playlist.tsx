import { Paper, Typography } from '@mui/material';
import { FC } from 'react';
import {SpotifyPlaylist} from "../pages/PlayQuiz.tsx";

type Prop = {
	data: SpotifyPlaylist
}
const Playlist: FC<Prop> = ({ data }) => (
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
		<img src={data.images[0].url} alt="playlist_cover" width="100px" />
		<Typography sx={{ textAlign: 'center' }}>{data.name}</Typography>
	</Paper>
);

export default Playlist;
