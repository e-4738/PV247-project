import { Avatar, Grid, Link, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { FC } from 'react';

import { Game } from '../firebase';

type Prop = {
	position: number;
	game: Game;
};
const PlaylistLeaderBoardItem: FC<Prop> = ({ position, game }) => (
	<Grid container sx={{ alignItems: 'center' }}>
		<Grid
			item
			xs={6}
			sx={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				p: 2,
				gap: 3
			}}
		>
			<Typography variant="body1" sx={{ fontSize: 28, fontWeight: 600 }}>
				#{position + 1}
			</Typography>
			<Link href={game.spotifyUserProfileLink}>
				<Avatar
					src={game.userProfilePictureLink}
					sx={{ width: 45, height: 45, ml: 2 }}
				/>
			</Link>
			<Typography variant="body1" sx={{ fontSize: 28, fontWeight: 600, ml: 2 }}>
				{game.spotifyDisplayName}
			</Typography>
		</Grid>

		<Grid
			item
			xs={6}
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
				{game.score} / {game.maxScore}
			</Typography>
			<Typography color={grey[500]} variant="overline">
				Score
			</Typography>
		</Grid>
	</Grid>
);

export default PlaylistLeaderBoardItem;