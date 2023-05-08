import { FC } from 'react';
import { Button, Paper, Typography } from '@mui/material';
import ReactAudioPlayer from 'react-audio-player';

import usePlaylistsTracks, { PlaylistTrack } from '../hooks/usePlaylistsTracks';

type Prop = {
	playlistId: string;
};

const GamePreview: FC<Prop> = ({ playlistId }) => {
	const tracks: PlaylistTrack[] = usePlaylistsTracks(playlistId);
	console.log(tracks);

	const track = tracks?.[0].track.preview_url;

	const printEnd = console.log('end');

	return (
		<Paper
			sx={{ width: '100vh', p: 2, display: 'flex', flexDirection: 'column' }}
		>
			<Typography>
				Here the details of the playlists will be alongside with prevoius game
				stats and option to play
			</Typography>
			<Typography>{tracks?.[0].track.preview_url}</Typography>
			<ReactAudioPlayer
				src={track}
				volume={0.3}
				onEnded={() => printEnd}
				autoPlay
			/>
			<Typography>Playlist id: {playlistId}</Typography>
			<Button>Play!</Button>
		</Paper>
	);
};

export default GamePreview;
