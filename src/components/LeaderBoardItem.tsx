import { Avatar, Box, Button, Link, Paper, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { FC } from 'react';

import { convertGameTime } from '../utils/convertMsToHMS';

type Props = {
	position: number;
	playerName: string;
	playerAvatarLink: string;
	playerSpotifyProfileLink: string;
	playlistName: string;
	playlistLink: string;
	gameScore: number;
	gameDuration: number;
};

const LeaderBoardItem: FC<Props> = ({
	position,
	playerName,
	playerAvatarLink,
	playerSpotifyProfileLink,
	playlistName,
	playlistLink,
	gameScore,
	gameDuration
}) => (
	<Paper
		sx={{
			p: 2,
			display: 'flex',
			width: '80%',
			flexDirection: 'row',
			alignItems: 'center'
		}}
	>
		<Typography variant="body1" sx={{ fontSize: 28, fontWeight: 600 }}>
			#{position}
		</Typography>
		<Link href={playerSpotifyProfileLink} sx={{ display: 'flex' }}>
			<Avatar src={playerAvatarLink} sx={{ width: 45, height: 45, ml: 2 }} />
		</Link>
		<Typography variant="body1" sx={{ fontSize: 28, fontWeight: 600, ml: 2 }}>
			{playerName}
		</Typography>

		<Box
			sx={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'flex-end'
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					ml: 8
				}}
			>
				<Typography
					variant="body1"
					color="secondary"
					sx={{ fontSize: 28, fontWeight: 600 }}
				>
					{gameScore}/10
				</Typography>
				<Typography color={grey[500]} variant="overline">
					Score
				</Typography>
			</Box>

			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					ml: 6
				}}
			>
				<Typography variant="body1" sx={{ fontSize: 28, fontWeight: 600 }}>
					{convertGameTime(gameDuration)}
				</Typography>
				<Typography color={grey[500]} variant="overline">
					Duration
				</Typography>
			</Box>

			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					ml: 6
				}}
			>
				<Link href={playlistLink}>{playlistName}</Link>
				<Typography color={grey[500]} variant="overline">
					Playlist
				</Typography>
			</Box>
		</Box>
	</Paper>
);

export default LeaderBoardItem;
