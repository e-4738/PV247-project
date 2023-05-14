import { Avatar, Box, Paper, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { FC, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';

import useLoggedInUser from '../hooks/useLoggedInUser';
import { SpotifyPlaylist } from '../pages/PlayQuiz';

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

	const { data, isLoading } = useQuery({
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
				<Typography
					variant="body1"
					color="secondary"
					sx={{ fontSize: 28, fontWeight: 600 }}
				>
					{gameScore}/{gameMaxScore}
				</Typography>
				<Typography color={grey[500]} variant="overline">
					Score
				</Typography>
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
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center'
					}}
				>
					<Paper
						sx={{
							backgroundColor: 'black',
							p: 1.5,
							display: 'flex',
							flexDirection: 'row',
							gap: 2,
							alignItems: 'center'
						}}
					>
						{playlist?.images && (
							<img
								src={playlist?.images[0]?.url}
								alt="playlist_cover"
								width="40px"
								style={{ alignSelf: 'center' }}
							/>
						)}
						<Link
							to="/quizzes/$playlistId"
							params={{
								playlistId
							}}
						>
							<Typography color="primary">{playlist?.name}</Typography>
						</Link>
					</Paper>

					<Typography color={grey[500]} variant="overline">
						Playlist
					</Typography>
				</Box>
			</Box>
		</Paper>
	);
};

export default LeaderBoardItem;
