import { Avatar, Box, Paper, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { FC, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';

import useLoggedInUser from '../hooks/useLoggedInUser';
import { SpotifyPlaylist } from '../pages/PlayQuiz';

import PlaylistThumbnail from './PlaylistThumbnail';
import ItemScore from './ItemScore';

type Props = {
	position: number;
	playerName: string;
	playerAvatarLink: string;
	playerSpotifyProfileLink: string;
	playlistId: string;
	gameScore: number;
	gameMaxScore: number;
};

const LeaderBoardItem: FC<Props> = ({
	position,
	playerName,
	playerAvatarLink,
	playerSpotifyProfileLink,
	playlistId,
	gameScore,
	gameMaxScore
}) => {
	const user = useLoggedInUser();
	const [playlist, setPlaylist] = useState<SpotifyPlaylist>();

	const { data } = useQuery({
		queryKey: [playlistId],
		queryFn: () =>
			fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${user?.accessToken}`
				}
			}).then(res => res.json())
	});

	useEffect(() => {
		setPlaylist(data);
	}, [data]);

	return (
		<Paper
			sx={{
				p: 2,
				display: 'flex',
				width: '90%',
				flexDirection: 'row',
				alignItems: 'center'
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					width: '40%',
					pl: 2
				}}
			>
				<Typography variant="body1" sx={{ fontSize: 28, fontWeight: 600 }}>
					#{position + 1}
				</Typography>
				<Link href={playerSpotifyProfileLink}>
					<Avatar
						src={playerAvatarLink}
						sx={{ width: 45, height: 45, ml: 2 }}
					/>
				</Link>
				<Typography
					variant="body1"
					sx={{ fontSize: 28, fontWeight: 600, ml: 2 }}
				>
					{playerName}
				</Typography>
			</Box>

			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					width: '30%'
				}}
			>
				<ItemScore gameScore={gameScore} gameMaxScore={gameMaxScore} />
			</Box>

			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					width: '30%',
					justifyContent: 'center'
				}}
			>
				<PlaylistThumbnail playlistId={playlistId} />
			</Box>
		</Paper>
	);
};

export default LeaderBoardItem;
