import { Grid, Paper, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { FC } from 'react';

import {GameTrack} from "./Quiz.tsx";

type Prop = {
	position: number;
	gameTrack: GameTrack;
};

const TrackDetail: FC<Prop> = ({ position, gameTrack }) => (
	<Paper sx={{ width: '90%', backgroundColor: gameTrack.result ? "green" : "red" }}>
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
					src={gameTrack.track.album.images[0]?.url}
					alt="album_cover"
					width="100px"
				/>
				<Typography variant="body1" sx={{ fontSize: 28, fontWeight: 600 }}>
					{gameTrack.track.name}
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
					{gameTrack.track.artists[0]?.name}
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
					{gameTrack.track.album.name}
				</Typography>
				<Typography color={grey[500]} variant="overline">
					Album
				</Typography>
			</Grid>
		</Grid>
	</Paper>
);

export default TrackDetail;
