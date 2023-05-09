import { Grid, Paper, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { FC } from 'react';

import { PlaylistTrack } from '../hooks/usePlaylistsTracks';

type Prop = {
	position: number;
	playlistTrack: PlaylistTrack;
};

const TrackDetail: FC<Prop> = ({ position, playlistTrack }) => (
	<Paper sx={{ width: '90%' }}>
		<Grid container sx={{ alignItems: 'center' }}>
			<Grid
				item
				xs={12}
				lg={4}
				sx={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					p: 2,
					gap: 3
				}}
			>
				<Typography variant="body1" sx={{ fontSize: 28, fontWeight: 600 }}>
					#{position}
				</Typography>
				<img
					src={playlistTrack.track.album.images[0]?.url}
					alt="album_cover"
					width="100px"
				/>
				<Typography variant="body1" sx={{ fontSize: 28, fontWeight: 600 }}>
					{playlistTrack.track.name}
				</Typography>
			</Grid>

			<Grid
				item
				xs={6}
				lg={4}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center'
				}}
			>
				<Typography
					variant="body1"
					color="secondary"
					textAlign="center"
					sx={{ fontSize: 28, fontWeight: 600 }}
				>
					{playlistTrack.track.artists[0]?.name}
				</Typography>
				<Typography color={grey[500]} variant="overline">
					Artist
				</Typography>
			</Grid>

			<Grid
				item
				xs={6}
				lg={4}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center'
				}}
			>
				<Typography
					variant="body1"
					textAlign="center"
					sx={{ fontSize: 28, fontWeight: 600 }}
				>
					{playlistTrack.track.album.name}
				</Typography>
				<Typography color={grey[500]} variant="overline">
					Album
				</Typography>
			</Grid>
		</Grid>
	</Paper>
);

export default TrackDetail;
