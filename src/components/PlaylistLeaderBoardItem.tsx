import { Avatar, Box, Link, Paper, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { FC } from 'react';

import { Game } from '../firebase';

type Prop = {
	position: number;
	game: Game;
};
const PlaylistLeaderBoardItem: FC<Prop> = ({ position, game }) => (
	<Paper
		sx={{
			backgroundColor: grey[900],
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			gap: 3
		}}
	>
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				p: 2,
				pl: 3,
				width: '65%'
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
		</Box>

		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				width: '35%'
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
		</Box>
	</Paper>
);

export default PlaylistLeaderBoardItem;
